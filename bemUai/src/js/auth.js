/**
 * auth.js — BemUai
 * Módulo de autenticação: login, cadastro, logout, validação
 */

import { toast }           from './utils.js';
import { loadBookings, updateStats } from './bookings.js';
import { syncProfileToggles }        from './a11y.js';

let user = null;
let loginMode = true;
let pendNav   = null;

/** Retorna o usuário atual */
export function getUser()     { return user }
export function getPendNav()  { return pendNav }
export function setPendNav(v) { pendNav = v }

/** Mostra modal de auth se não autenticado, senão navega direto */
export function auth(id) {
  if (!user) { pendNav = id; showAuth() }
  else import('./navigation.js').then(m => m.go(id));
}

export function showAuth() { document.getElementById('authModal').classList.add('active') }
export function hideAuth() { document.getElementById('authModal').classList.remove('active') }

export function toggleAuth() {
  loginMode = !loginMode;
  document.getElementById('nameField').style.display          = loginMode ? 'none' : 'block';
  document.getElementById('confirmPassField').style.display   = loginMode ? 'none' : 'block';
  document.getElementById('authTitle').textContent             = loginMode ? 'Bem-vindo ao BemUai' : 'Criar Conta Gratuita';
  document.getElementById('authBtnTxt').textContent            = loginMode ? 'Entrar' : 'Criar Conta';
  document.getElementById('authFootTxt').textContent           = loginMode ? 'Não tem conta?' : 'Já tem conta?';
  document.getElementById('authSub').textContent               = loginMode
    ? 'Entre para agendar consultas e muito mais'
    : 'Cadastre-se gratuitamente e cuide da sua saúde';
  clearAuthErrors();
}

function clearAuthErrors() {
  ['nameErr','cpfErr','phoneErr','emailErr','passErr','passConfirmErr'].forEach(id => {
    const el = document.getElementById(id); if (el) el.style.display = 'none';
  });
  document.querySelectorAll('#authModal .field.has-error').forEach(f => f.classList.remove('has-error'));
}

export function handleAuth(e) {
  e.preventDefault();
  const email = document.getElementById('authEmail').value.trim();
  const pass  = document.getElementById('authPass').value;
  let valid = true;

  if (!validateEmail(email)) { setFieldError('authEmail','emailErr',true);  valid = false } else setFieldError('authEmail','emailErr',false);
  if (pass.length < 6)       { setFieldError('authPass','passErr',true);    valid = false } else setFieldError('authPass','passErr',false);

  if (loginMode) {
    if (!valid) return;
    const stored = localStorage.getItem('bemUai_user');
    if (stored) {
      const u = JSON.parse(stored);
      if (u.email === email && u.password === pass) {
        user = u;
        toast('Bem-vindo de volta, ' + u.name.split(' ')[0] + '! 👋', 'ok');
        hideAuth(); afterLogin();
        if (pendNav) { import('./navigation.js').then(m => m.go(pendNav)); pendNav = null; }
      } else toast('E-mail ou senha incorretos', 'err');
    } else toast('Usuário não encontrado. Crie uma conta!', 'warn');
  } else {
    const name        = document.getElementById('authName').value.trim();
    const cpf         = document.getElementById('authCpf').value;
    const phone       = document.getElementById('authPhone').value;
    const passConfirm = document.getElementById('authPassConfirm').value;
    if (!name)              { setFieldError('authName','nameErr',true);             valid = false } else setFieldError('authName','nameErr',false);
    if (!validateCPF(cpf))  { setFieldError('authCpf','cpfErr',true);              valid = false } else setFieldError('authCpf','cpfErr',false);
    if (!validatePhone(phone)){ setFieldError('authPhone','phoneErr',true);         valid = false } else setFieldError('authPhone','phoneErr',false);
    if (pass !== passConfirm){ setFieldError('authPassConfirm','passConfirmErr',true); valid = false } else setFieldError('authPassConfirm','passConfirmErr',false);
    if (!valid) return;
    const u = { name, email, cpf, phone, password: pass, since: new Date().toLocaleDateString('pt-BR') };
    localStorage.setItem('bemUai_user', JSON.stringify(u));
    user = u;
    toast('Conta criada! Bem-vindo(a), ' + name.split(' ')[0] + '! 🎉', 'ok');
    hideAuth(); afterLogin();
    if (pendNav) { import('./navigation.js').then(m => m.go(pendNav)); pendNav = null; }
  }
  document.getElementById('authForm').reset();
  document.getElementById('pwdBar').style.width = '0';
  document.getElementById('pwdLabel').textContent = '';
}

function afterLogin() {
  const ha = document.getElementById('hdrAuth');
  ha.classList.remove('hide'); ha.style.display = 'contents';
  const gc = document.getElementById('greetChip');
  gc.style.display = 'flex';
  document.getElementById('greetName').textContent = 'Olá, ' + user.name.split(' ')[0] + '!';
  loadBookings(); updateStats(); syncProfileToggles(); updateMobileAuthLinks();
}

export function loadUser() {
  const s = localStorage.getItem('bemUai_user');
  if (s) { user = JSON.parse(s); afterLogin(); }
  loadBookings();
}

export function logout() {
  user = null;
  localStorage.removeItem('bemUai_user');
  document.getElementById('hdrAuth').classList.add('hide');
  document.getElementById('greetChip').style.display = 'none';
  updateMobileAuthLinks();
  toast('Até logo! Cuide-se 😊', 'ok');
  import('./navigation.js').then(m => m.go('home'));
}

export function updateMobileAuthLinks() {
  document.getElementById('mobileAuthLinks').style.display = user ? 'block' : 'none';
  document.getElementById('mobileGuestLink').style.display = user ? 'none'  : 'block';
}

/* ══ VALIDAÇÕES ══ */
export function maskCPF(el) {
  let v = el.value.replace(/\D/g,'');
  v = v.replace(/(\d{3})(\d)/,'$1.$2');
  v = v.replace(/(\d{3})(\d)/,'$1.$2');
  v = v.replace(/(\d{3})(\d{1,2})$/,'$1-$2');
  el.value = v;
}
export function maskPhone(el) {
  let v = el.value.replace(/\D/g,'');
  v = v.replace(/^(\d{2})(\d)/,'($1) $2');
  v = v.replace(/(\d{5})(\d)/,'$1-$2');
  el.value = v;
}
export function validateCPF(cpf) {
  cpf = cpf.replace(/\D/g,'');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let sum = 0, rest;
  for (let i=1;i<=9;i++) sum += parseInt(cpf[i-1])*(11-i);
  rest = (sum*10)%11; if (rest===10||rest===11) rest=0;
  if (rest !== parseInt(cpf[9])) return false;
  sum = 0;
  for (let i=1;i<=10;i++) sum += parseInt(cpf[i-1])*(12-i);
  rest = (sum*10)%11; if (rest===10||rest===11) rest=0;
  return rest === parseInt(cpf[10]);
}
export function validatePhone(phone) { const d = phone.replace(/\D/g,''); return d.length>=10&&d.length<=11 }
export function validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) }

export function checkPwd(v) {
  const bar = document.getElementById('pwdBar'), lbl = document.getElementById('pwdLabel');
  if (!bar) return;
  let score = 0;
  if (v.length>=6) score++; if (v.length>=10) score++;
  if (/[A-Z]/.test(v)) score++; if (/[0-9]/.test(v)) score++; if (/[^A-Za-z0-9]/.test(v)) score++;
  const pcts   = ['0%','25%','50%','75%','90%','100%'];
  const colors = ['var(--bdr)','var(--err)','var(--warn)','#FBBF24','var(--ok)','var(--ok)'];
  const labels = ['','Muito fraca','Fraca','Média','Forte','Muito forte'];
  bar.style.width = pcts[score]; bar.style.background = colors[score];
  lbl.textContent = labels[score]; lbl.style.color = colors[score];
}

export function setFieldError(fieldId, errId, show) {
  const field = document.getElementById(fieldId)?.closest('.field');
  const err   = document.getElementById(errId);
  if (field) field.classList.toggle('has-error', show);
  if (err)   err.style.display = show ? 'block' : 'none';
}
