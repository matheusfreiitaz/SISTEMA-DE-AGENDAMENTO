/**
 * professionals.js — BemUai
 * Listagem, busca e detalhe de profissionais de saúde
 */

import { PROFS, REVIEWS }      from './data.js';
import { stars, fmtDateLong }  from './utils.js';
import { go, auth }            from './navigation.js';
import { toast }               from './utils.js'; 

let selCat    = 'all';
let curProf   = null;

export function getCurProf() { return curProf }

export function setCat(c) {
  selCat = c;
  document.querySelectorAll('.cat[data-c]').forEach(el => el.classList.remove('active'));
  const a = document.querySelector(`.cat[data-c="${c}"]`); if (a) a.classList.add('active');
  renderProfs();
}

export function renderProfs() {
  const grid = document.getElementById('profGrid');
  const q    = (document.getElementById('searchInput')||{}).value?.toLowerCase() || '';
  const list = PROFS.filter(p =>
    (selCat === 'all' || p.cat === selCat) &&
    (p.name.toLowerCase().includes(q) || p.spec.toLowerCase().includes(q))
  );
  if (!list.length) {
    grid.innerHTML = `<div class="empty" style="grid-column:1/-1">
      <i class="fas fa-search"></i><h3>Nenhum resultado</h3>
      <p>Tente ajustar os filtros de busca</p>
    </div>`;
    return;
  }
  grid.innerHTML = list.map(p => `
    <article class="prof-card" onclick="showProfDetail(${p.id})" tabindex="0" role="button"
             aria-label="${p.name}" onkeydown="if(event.key==='Enter')showProfDetail(${p.id})">
      <img src="${p.img}" alt="${p.name}" class="prof-img" loading="lazy">
      <div class="prof-body">
        <div class="prof-name">${p.name}</div>
        <div class="prof-spec">${p.spec}</div>
        <div class="rat-row"><span class="stars">${stars(p.rating)}</span>
          <span class="rat-txt">${p.rating} (${p.reviews} avaliações)</span></div>
        <span class="price-tag"><i class="fas fa-tag"></i>${p.price}</span>
        <span class="avail-badge"><i class="fas fa-circle"></i>Disponível</span>
      </div>
    </article>`).join('');
}

export function showProfDetail(id) {
  const p = PROFS.find(x => x.id === id); if (!p) return;
  curProf = p;
  const revs = REVIEWS[id] || [];
  document.getElementById('profDetailContent').innerHTML = `
    <div class="prof-detail-hero">
      <div class="prof-detail-banner"></div>
      <img src="${p.img}" alt="${p.name}" class="prof-detail-avatar">
      <div class="prof-detail-info">
        <h2>${p.name}</h2>
        <div class="info-row">
          <span class="chip chip-green"><i class="fas fa-stethoscope"></i>${p.spec}</span>
          <span class="chip chip-orange"><i class="fas fa-tag"></i>${p.price}</span>
          <span class="chip chip-blue"><span class="stars">${stars(p.rating)}</span>&nbsp;${p.rating} (${p.reviews})</span>
        </div>
        <p style="color:var(--t2);line-height:1.75;margin-bottom:1.35rem">${p.desc}</p>
        <button class="btn btn-acc" onclick="auth('agendamento');setTimeout(()=>preSelectProf(${p.id}),350)">
          <i class="fas fa-calendar-check"></i> Agendar com ${p.name.split(' ').slice(0,2).join(' ')}
        </button>
      </div>
    </div>
    <div class="detail-grid">
      <div class="det-card">
        <h3><i class="fas fa-star"></i> Avaliações</h3>
        ${revs.map(r=>`<div class="review-item"><div class="rev-head"><span class="rev-author">${r.a}</span><span class="stars">${stars(r.r)}</span></div><p class="rev-text">${r.t}</p></div>`).join('')}
      </div>
      <div class="det-card">
        <h3><i class="fas fa-clock"></i> Disponibilidade</h3>
        <p style="color:var(--t2);font-size:var(--fs-s);line-height:1.9">
          <strong style="color:var(--t1)">Segunda a Sexta:</strong> 08h – 18h<br>
          <strong style="color:var(--t1)">Sábados:</strong> 08h – 12h<br>
          <strong style="color:var(--t1)">Duração:</strong> 50 min<br>
          <strong style="color:var(--t1)">Modalidade:</strong> Presencial e Online
        </p>
      </div>
    </div>`;
  go('prof-detail');
}

export function preSelectProf(id) {
  const p = PROFS.find(x => x.id === id); if (!p) return;
  import('./booking-calendar.js').then(m => {
    m.setSelProfForBooking(p);
    document.getElementById('bkSpec').value = p.cat;
    m.updateProfFromSpec();
    m.updateBookingProfInfo();
  });
}
