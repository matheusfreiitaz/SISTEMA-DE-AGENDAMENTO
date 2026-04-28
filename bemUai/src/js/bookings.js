/**
 * bookings.js — BemUai 
 * Módulo de gerenciamento de agendamentos
 */ 

import { getUser }      from './auth.js'; 
import { toast, fmtDateLong, fmtDateShort } from './utils.js';
import { go }           from './navigation.js';
 
let bookings = [];

export function getBookings() { return bookings }

export function loadBookings() {
  const u = getUser();
  if (u) {
    const s = localStorage.getItem(`bemUai_bk_${u.email}`);
    if (s) bookings = JSON.parse(s);
  }
}

export function saveBookings() {
  const u = getUser();
  if (u) localStorage.setItem(`bemUai_bk_${u.email}`, JSON.stringify(bookings));
}

export function addBooking(bk) {
  bookings.push(bk);
  saveBookings();
}

export function renderBookings() {
  const c = document.getElementById('bookingsList');
  if (!bookings.length) {
    c.innerHTML = `<div class="empty">
      <i class="fas fa-calendar-xmark"></i>
      <h3>Nenhum agendamento ainda</h3>
      <p>Que tal agendar sua primeira consulta?</p>
      <button class="btn" onclick="import('./navigation.js').then(m=>m.go('agendamento'))">
        <i class="fas fa-calendar-check"></i> Agendar Agora
      </button>
    </div>`;
    return;
  }
  c.innerHTML = [...bookings]
    .sort((a,b) => new Date(b.at) - new Date(a.at))
    .map(b => `
      <div class="bk-card">
        <img src="${b.prof.img}" alt="${b.prof.name}" class="bk-avatar">
        <div class="bk-info">
          <h4>${b.prof.name}</h4>
          <p style="color:var(--p);font-weight:600">${b.prof.spec}</p>
          <p><i class="fas fa-calendar" style="color:var(--p);font-size:.8rem"></i> ${fmtDateShort(b.date)} às ${b.time}</p>
          <p><i class="fas fa-${b.modality==='online'?'video':'hospital'}" style="color:var(--t3);font-size:.8rem"></i> ${b.modality==='online'?'Online':'Presencial'}</p>
          ${b.notes ? `<p style="font-style:italic;color:var(--t3)"><i class="fas fa-note-sticky" style="font-size:.8rem"></i> ${b.notes}</p>` : ''}
        </div>
        <div class="bk-right">
          <span class="bk-status ${b.status}">${b.status==='confirmed'?'Confirmado':'Cancelado'}</span>
          ${b.status==='confirmed' ? `<button class="btn btn-sm btn-ghost" onclick="cancelBk(${b.id})"><i class="fas fa-times"></i> Cancelar</button>` : ''}
        </div>
      </div>`).join('');
}

export function cancelBk(id) {
  if (!confirm('Tem certeza que deseja cancelar este agendamento?')) return;
  const b = bookings.find(x => x.id === id);
  if (b) { b.status = 'cancelled'; saveBookings(); renderBookings(); updateStats(); toast('Agendamento cancelado', 'warn'); }
}

export function updateStats() {
  const u = getUser();
  document.getElementById('st1').textContent = bookings.length;
  const ps1 = document.getElementById('ps1'); if (ps1) ps1.textContent = bookings.length;
  const ps2 = document.getElementById('ps2'); if (ps2) ps2.textContent = bookings.filter(b=>b.status==='confirmed').length;
  const ps3 = document.getElementById('ps3'); if (ps3) ps3.textContent = bookings.filter(b=>b.status==='cancelled').length;
}

export function updateProfile() {
  const u = getUser(); if (!u) return;
  document.getElementById('pName').textContent  = u.name;
  document.getElementById('pEmail').textContent = u.email;
  document.getElementById('piName').textContent  = u.name;
  document.getElementById('piCpf').textContent   = u.cpf   || '—';
  document.getElementById('piPhone').textContent = u.phone  || '—';
  document.getElementById('piEmail').textContent = u.email;
  document.getElementById('piSince').textContent = 'Membro desde ' + u.since;
  updateStats();
}
