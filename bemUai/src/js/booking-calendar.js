/**
 * booking-calendar.js — BemUai
 * Calendário interativo, seleção de horários e confirmação de agendamento
 */

import { PROFS, MONTHS, WDAYS } from './data.js';
import { toast, fmtDateLong }   from './utils.js';
import { getUser }              from './auth.js';
import { addBooking, updateStats } from './bookings.js';
import { go }                   from './navigation.js';

let calYear  = new Date().getFullYear();
let calMonth = new Date().getMonth();
let selDate  = null;
let selSlot  = null;
let selProfForBooking = null;

export function getSelProfForBooking() { return selProfForBooking }
export function setSelProfForBooking(p) { selProfForBooking = p }

export function buildCal() {
  document.getElementById('calMonthLabel').textContent = MONTHS[calMonth] + ' ' + calYear;
  const grid  = document.getElementById('calGrid');
  const today = new Date();
  grid.innerHTML = WDAYS.map(d => `<div class="cal-day-head">${d}</div>`).join('');
  const first = new Date(calYear, calMonth, 1).getDay();
  const days  = new Date(calYear, calMonth+1, 0).getDate();
  for (let i=0; i<first; i++) grid.innerHTML += `<div class="cal-day empty"></div>`;
  for (let d=1; d<=days; d++) {
    const date   = new Date(calYear, calMonth, d);
    const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const isToday = d===today.getDate() && calMonth===today.getMonth() && calYear===today.getFullYear();
    const dateStr = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const isSel   = selDate === dateStr;
    const isWeekend = date.getDay() === 0;
    const hasSlot   = !isPast && !isWeekend;
    grid.innerHTML += `<div class="cal-day${isPast?' past':''}${isToday?' today':''}${isSel?' selected':''}${hasSlot?' has-slot':''}"
      ${isPast||isWeekend ? 'aria-disabled="true"' : `onclick="pickDate('${dateStr}')" tabindex="0"`}
      role="gridcell" aria-label="${d} de ${MONTHS[calMonth]}">${d}</div>`;
  }
}

export function calPrev() { calMonth--; if (calMonth<0) { calMonth=11; calYear--; } buildCal(); }
export function calNext() { calMonth++; if (calMonth>11) { calMonth=0; calYear++; } buildCal(); }

export function pickDate(d) {
  selDate = d; buildCal();
  document.getElementById('timePlaceholder').style.display = 'none';
  document.getElementById('timeGrid').style.display = 'grid';
  buildTimeSlots(); updateSummary();
}

export function buildTimeSlots() {
  const slots = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30'];
  selSlot = null;
  document.getElementById('timeGrid').innerHTML = slots.map(s => {
    const busy = Math.random() > .68;
    return `<div class="tslot${busy?' busy':''}" role="option" aria-selected="false" ${busy?'aria-disabled="true"':'tabindex="0"'}
      ${busy ? '' : `onclick="pickSlot('${s}',this)"`}>${s}</div>`;
  }).join('');
}

export function pickSlot(t, el) {
  document.querySelectorAll('.tslot').forEach(s => { s.classList.remove('sel'); s.setAttribute('aria-selected','false'); });
  el.classList.add('sel'); el.setAttribute('aria-selected','true');
  selSlot = t; updateSummary();
}

export function updateProfFromSpec() {
  const spec  = document.getElementById('bkSpec').value;
  const profs = PROFS.filter(p => p.cat === spec || spec === '');
  const cont  = document.getElementById('availProfs');
  if (!profs.length) {
    cont.innerHTML = `<p style="color:var(--t3);font-size:var(--fs-s);padding:.5rem 0"><i class="fas fa-info-circle"></i> Selecione uma especialidade acima</p>`;
    return;
  }
  cont.innerHTML = profs.map(p => `
    <label style="display:flex;align-items:center;gap:.75rem;padding:.7rem;border:1.5px solid var(--bdr);border-radius:var(--r1);cursor:pointer;transition:all var(--tr);background:var(--inp)">
      <input type="radio" name="profSel" value="${p.id}" style="accent-color:var(--p)"
             onchange="selProfForBooking=PROFS.find(x=>x.id===${p.id});updateBookingProfInfo();updateSummary()">
      <img src="${p.img}" style="width:38px;height:38px;border-radius:8px;object-fit:cover;flex-shrink:0">
      <div style="min-width:0">
        <div style="font-weight:700;font-size:var(--fs-s)">${p.name}</div>
        <div style="font-size:.74rem;color:var(--t3)">${p.price}</div>
      </div>
    </label>`).join('');
}

export function updateBookingProfInfo() {
  const inf = document.getElementById('bookProfInfo');
  if (!selProfForBooking) { inf.innerHTML = ''; return; }
  const p = selProfForBooking;
  inf.innerHTML = `<div style="display:flex;align-items:center;gap:.9rem;background:var(--card);border:1.5px solid var(--bdr);border-radius:var(--r2);padding:1.1rem;margin-bottom:1.2rem">
    <img src="${p.img}" style="width:54px;height:54px;border-radius:var(--r1);object-fit:cover;flex-shrink:0">
    <div style="flex:1;min-width:0">
      <div style="font-weight:700;font-family:var(--fh)">${p.name}</div>
      <div style="color:var(--p);font-size:var(--fs-s);font-weight:700">${p.spec}</div>
    </div>
    <span class="price-tag"><i class="fas fa-tag"></i>${p.price}</span>
  </div>`;
}

export function updateSummary() {
  const sb = document.getElementById('bkSummary'), sc = document.getElementById('bkSummaryContent');
  if (!selDate && !selSlot && !selProfForBooking) { sb.style.display = 'none'; return; }
  sb.style.display = 'block';
  const fmtDate = selDate ? fmtDateLong(selDate) : '—';
  sc.innerHTML = `
    ${selProfForBooking ? `<b>Profissional:</b> ${selProfForBooking.name}<br><b>Especialidade:</b> ${selProfForBooking.spec}<br>` : ''}
    <b>Data:</b> ${fmtDate}<br><b>Horário:</b> ${selSlot||'—'}<br>
    <b>Modalidade:</b> ${document.getElementById('bkModality')?.value||'Presencial'}`;
}

export function confirmBooking() {
  if (!selDate)            { toast('Selecione uma data!','warn');          return; }
  if (!selSlot)            { toast('Selecione um horário!','warn');        return; }
  if (!selProfForBooking)  { toast('Selecione um profissional!','warn');   return; }
  const u = getUser();
  const modality = document.getElementById('bkModality').value;
  const bk = {
    id: Date.now(), prof: selProfForBooking, date: selDate, time: selSlot,
    notes: document.getElementById('bkNotes').value,
    status: 'confirmed', modality, at: new Date().toISOString()
  };
  addBooking(bk);
  const fmtDate = fmtDateLong(selDate);
  document.getElementById('confirmDetails').innerHTML = `
    <p><strong>Paciente:</strong> ${u?.name||'—'}</p>
    <p><strong>CPF:</strong> ${u?.cpf||'—'}</p>
    <p><strong>Profissional:</strong> ${selProfForBooking.name}</p>
    <p><strong>Especialidade:</strong> ${selProfForBooking.spec}</p>
    <p><strong>Data:</strong> ${fmtDate}</p>
    <p><strong>Horário:</strong> ${selSlot}</p>
    <p><strong>Modalidade:</strong> ${modality==='online'?'Online (Videochamada)':'Presencial'}</p>
    ${bk.notes ? `<p><strong>Observações:</strong> ${bk.notes}</p>` : ''}`;
  if (u?.phone) setTimeout(() => toast(`📱 Mensagem enviada para ${u.phone}!`,'ok'), 1200);
  toast('Agendamento confirmado! ✓','ok');
  go('book-confirm');
  selSlot = null; selDate = null; selProfForBooking = null;
  document.getElementById('bkNotes').value = '';
  document.getElementById('bkSummary').style.display = 'none';
  document.getElementById('bookProfInfo').innerHTML = '';
  updateStats();
}
