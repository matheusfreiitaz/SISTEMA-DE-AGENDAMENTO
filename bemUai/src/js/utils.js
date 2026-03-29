/**
 * utils.js — BemUai
 * Funções utilitárias compartilhadas
 */

/** Exibe um toast de notificação */
export function toast(msg, type = 'ok') {
  const icons = { ok: 'fa-circle-check', err: 'fa-circle-xmark', warn: 'fa-triangle-exclamation' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.setAttribute('role', 'alert');
  el.innerHTML = `<i class="fas ${icons[type]}"></i><span>${msg}</span>`;
  document.getElementById('toast-cnt').appendChild(el);
  setTimeout(() => {
    el.style.transition = 'opacity .35s,transform .35s';
    el.style.opacity = '0'; el.style.transform = 'translateX(130%)';
    setTimeout(() => el.remove(), 350);
  }, 3500);
}

/** Gera string de estrelas HTML */
export function stars(r) {
  return '<i class="fas fa-star"></i>'.repeat(Math.floor(r)) +
    (r % 1 ? '<i class="fas fa-star-half-alt"></i>' : '');
}

/** Formata data pt-BR longa */
export function fmtDateLong(dateStr) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('pt-BR', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
  });
}

/** Formata data pt-BR curta */
export function fmtDateShort(dateStr) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric'
  });
}
