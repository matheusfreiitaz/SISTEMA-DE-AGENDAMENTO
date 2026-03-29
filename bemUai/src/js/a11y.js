/**
 * a11y.js — BemUai
 * Módulo de Acessibilidade: tema, fonte, contraste, dislexia, animações
 */

export function toggleA11y() {
  const p = document.getElementById('a11yPanel');
  const b = document.getElementById('a11yBtn');
  const o = p.classList.toggle('open');
  p.setAttribute('aria-hidden', !o);
  b.setAttribute('aria-expanded', o);
}
export function closeA11y() {
  document.getElementById('a11yPanel').classList.remove('open');
  document.getElementById('a11yPanel').setAttribute('aria-hidden', 'true');
  document.getElementById('a11yBtn').setAttribute('aria-expanded', 'false');
}

export function setTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  updateThemeUI(dark);
  document.getElementById('tglTheme').checked = dark;
  const pt = document.getElementById('profileTheme'); if (pt) pt.checked = dark;
  localStorage.setItem('bU_theme', dark ? 'dark' : 'light');
}
export function quickTheme() {
  setTheme(document.documentElement.getAttribute('data-theme') !== 'dark');
}
function updateThemeUI(dark) {
  const i = document.querySelector('#themeBtn i');
  if (i) i.className = dark ? 'fas fa-sun' : 'fas fa-moon';
}

export function setFS(s) {
  document.documentElement.setAttribute('data-font-size', s);
  document.querySelectorAll('.abt').forEach(b => b.classList.remove('on'));
  const a = document.getElementById('fs-' + s); if (a) a.classList.add('on');
  localStorage.setItem('bU_fs', s);
}
export function setContrast(on) {
  document.documentElement.setAttribute('data-contrast', on ? 'high' : 'normal');
  document.getElementById('tglContrast').checked = on;
  const p = document.getElementById('profileContrast'); if (p) p.checked = on;
  localStorage.setItem('bU_contrast', on ? 'high' : 'normal');
}
export function setDys(on) {
  document.documentElement.setAttribute('data-dyslexia', on ? 'on' : 'off');
  document.getElementById('tglDys').checked = on;
  const p = document.getElementById('profileDys'); if (p) p.checked = on;
  localStorage.setItem('bU_dys', on ? 'on' : 'off');
}
export function setMotion(on) {
  document.documentElement.setAttribute('data-motion', on ? 'reduced' : 'normal');
  document.getElementById('tglMotion').checked = on;
  const p = document.getElementById('profileMotion'); if (p) p.checked = on;
  localStorage.setItem('bU_motion', on ? 'reduced' : 'normal');
}

export function loadA11y() {
  const th = localStorage.getItem('bU_theme')    || 'light';
  const fs = localStorage.getItem('bU_fs')       || 'normal';
  const co = localStorage.getItem('bU_contrast') || 'normal';
  const dy = localStorage.getItem('bU_dys')      || 'off';
  const mo = localStorage.getItem('bU_motion')   || 'normal';
  const dark = th === 'dark';
  document.documentElement.setAttribute('data-theme',     th);
  document.documentElement.setAttribute('data-font-size', fs);
  document.documentElement.setAttribute('data-contrast',  co);
  document.documentElement.setAttribute('data-dyslexia',  dy);
  document.documentElement.setAttribute('data-motion',    mo);
  document.getElementById('tglTheme').checked    = dark;
  document.getElementById('tglContrast').checked = co === 'high';
  document.getElementById('tglDys').checked      = dy === 'on';
  document.getElementById('tglMotion').checked   = mo === 'reduced';
  updateThemeUI(dark); setFS(fs);
}

export function syncProfileToggles() {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  const pt = document.getElementById('profileTheme');    if (pt) pt.checked = dark;
  const pc = document.getElementById('profileContrast'); if (pc) pc.checked = document.documentElement.getAttribute('data-contrast') === 'high';
  const pd = document.getElementById('profileDys');      if (pd) pd.checked = document.documentElement.getAttribute('data-dyslexia') === 'on';
  const pm = document.getElementById('profileMotion');   if (pm) pm.checked = document.documentElement.getAttribute('data-motion') === 'reduced';
}
