/**
 * navigation.js — BemUai
 * Controle de roteamento entre seções (SPA)
 */

import { auth } from './auth.js'; 

export function go(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const t = document.getElementById(id); 
  if (t) { t.classList.add('active'); setTimeout(() => t.focus(), 50); }

  document.querySelectorAll('.ni').forEach(n => n.classList.remove('active'));
  const ni = document.querySelector(`.ni[data-s="${id}"]`);
  if (ni) ni.classList.add('active');

  document.querySelectorAll('.hdr-link').forEach(l => l.classList.remove('active-nav'));
  const hl = document.querySelector(`.hdr-link[data-nav="${id}"]`);
  if (hl) hl.classList.add('active-nav');

  /* Lazy loaders de seção */
  if (id === 'services')     import('./professionals.js').then(m => m.renderProfs());
  if (id === 'my-bookings')  import('./bookings.js').then(m => m.renderBookings());
  if (id === 'profile')      import('./bookings.js').then(m => { m.updateProfile(); m.updateStats(); });
  if (id === 'exames')       import('./exams.js').then(m => m.renderExams());
  if (id === 'agendamento')  import('./booking-calendar.js').then(m => m.buildCal());

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function goBookBack(curProf) {
  if (curProf) import('./professionals.js').then(m => m.showProfDetail(curProf.id));
  else go('services');
}

export function toggleMobileMenu() {
  const mm = document.getElementById('mobileMenu');
  const hb = document.getElementById('hamburger');
  const isOpen = mm.classList.toggle('open');
  hb.classList.toggle('open', isOpen);
  hb.setAttribute('aria-expanded', isOpen);
}
export function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('hamburger').setAttribute('aria-expanded', 'false');
}
