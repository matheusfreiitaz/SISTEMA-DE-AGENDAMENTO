/**
 * chat.js — BemUai
 * Assistente Virtual BemBot — fluxo de conversa baseado em palavras-chave
 */

import { auth } from './auth.js';

const BOT_FLOWS = {
  inicio:   { msg:'Olá! 👋 Sou o <b>BemBot</b>, assistente virtual de saúde do BemUai.<br>Como posso ajudar você hoje?', opts:[{l:'🤒 Estou sentindo algo',v:'sintoma'},{l:'📅 Quero agendar consulta',v:'agendar'},{l:'🔬 Informações sobre exames',v:'exame'},{l:'💊 Dúvidas sobre saúde',v:'duvidas'}] },
  sintoma:  { msg:'Entendi. Pode descrever o que está sentindo, ou selecionar uma das opções:', opts:[{l:'🧠 Dor de cabeça / Enxaqueca',v:'cabeca'},{l:'🦴 Dores musculares / Corpo',v:'corpo'},{l:'🍃 Ansiedade / Estresse',v:'mental'},{l:'🥗 Digestivo / Alimentar',v:'digestivo'},{l:'❤️ Coração / Pressão',v:'cardiaco'},{l:'💤 Sono / Cansaço',v:'cansaco'}] },
  cabeca:   { msg:'Pode ser enxaqueca, cefaleia tensional, hipertensão ou alterações neurológicas.<br><br><i class="fas fa-brain" style="color:var(--purple)"></i> <b>Dra. Luana Ramos – Neurologia</b><br><span style="font-size:.8rem;color:var(--t3)">⭐ 4.8 · R$ 250</span><br><br>⚠️ Se a dor for muito forte ou súbita, procure urgência.', opts:[{l:'📅 Agendar com Dra. Luana',v:'agendar_ramos'},{l:'💊 Dicas para dor de cabeça',v:'info_cabeca'},{l:'🔙 Voltar',v:'sintoma'}] },
  corpo:    { msg:'Pode ser tensão muscular, fibromialgia, deficiência de vitaminas ou lesão.<br><br><i class="fas fa-person-walking" style="color:var(--p)"></i> <b>Dr. Carlos Mendes – Fisioterapia</b><br><span style="font-size:.8rem;color:var(--t3)">⭐ 4.8 · R$ 150</span>', opts:[{l:'📅 Agendar com Dr. Carlos',v:'agendar_carlos'},{l:'👥 Ver outros profissionais',v:'ver_profs'},{l:'🔙 Voltar',v:'sintoma'}] },
  mental:   { msg:'Ansiedade, estresse crônico e burnout são condições tratáveis. Você não está sozinho. 💙<br><br><i class="fas fa-brain" style="color:var(--purple)"></i> <b>Dra. Ana Silva – Psicologia</b><br><span style="font-size:.8rem;color:var(--t3)">⭐ 4.9 · R$ 180</span>', opts:[{l:'📅 Agendar com Dra. Ana',v:'agendar_ana'},{l:'💡 Técnicas de respiração',v:'respiracao'},{l:'🔙 Voltar',v:'sintoma'}] },
  digestivo:{ msg:'Gastrite, intolerâncias alimentares e síndrome do intestino irritável são comuns.<br><br><i class="fas fa-apple-whole" style="color:var(--acc)"></i> <b>Dra. Juliana Santos – Nutrição</b><br><span style="font-size:.8rem;color:var(--t3)">⭐ 4.9 · R$ 200</span>', opts:[{l:'📅 Agendar com Dra. Juliana',v:'agendar_juliana'},{l:'🔙 Voltar',v:'sintoma'}] },
  cardiaco: { msg:'⚠️ Sintomas cardíacos merecem atenção. Se sentir dor no peito ou falta de ar, procure urgência imediatamente.', opts:[{l:'🔬 Ver exames cardíacos',v:'goto_exames'},{l:'🚨 É urgente!',v:'urgencia'},{l:'🔙 Voltar',v:'sintoma'}] },
  cansaco:  { msg:'Cansaço excessivo pode ser anemia, hipotireoidismo, apneia do sono ou burnout.<br><br>🔬 Recomendo um <b>Hemograma Completo</b>.', opts:[{l:'🔬 Ver exames',v:'goto_exames'},{l:'📅 Agendar Personal',v:'agendar_roberto'},{l:'🔙 Voltar',v:'inicio'}] },
  urgencia: { msg:'🚨 <b>SITUAÇÃO DE URGÊNCIA</b><br><br>📞 <b>SAMU: 192</b><br>🏥 Pronto-Socorro mais próximo<br><br>Não perca tempo — chame ajuda agora!', opts:[{l:'📞 Entendi',v:'inicio'}] },
  agendar:  { msg:'Você pode filtrar por especialidade e escolher o profissional ideal. 📅', opts:[{l:'🗓️ Ir para Agendamento',v:'goto_agendar'},{l:'👨‍⚕️ Ver Profissionais',v:'ver_profs'},{l:'🔙 Voltar',v:'inicio'}] },
  exame:    { msg:'Oferecemos: Hemograma, Glicemia, Raio-X, Ultrassom, ECG, Holter.<br>📍 Parceiros: UPA Centro, Lab Fleury, Santa Casa, CardioMed', opts:[{l:'🔬 Ver Exames',v:'goto_exames'},{l:'🔙 Voltar',v:'inicio'}] },
  duvidas:  { msg:'Sobre o que você tem dúvidas?', opts:[{l:'🛡️ Prevenção',v:'prevencao'},{l:'💊 Medicamentos',v:'med'},{l:'🥗 Alimentação',v:'alim'},{l:'🔙 Voltar',v:'inicio'}] },
  prevencao:{ msg:'✅ Exames anuais · Vacinas em dia · 150 min/semana de atividade física · Alimentação equilibrada · Hidratação.', opts:[{l:'🔬 Agendar exame preventivo',v:'goto_exames'},{l:'🔙 Voltar',v:'inicio'}] },
  med:      { msg:'⚠️ Nunca se automedique sem orientação médica. Consulte um médico ou farmacêutico.', opts:[{l:'👨‍⚕️ Consultar médico',v:'ver_profs'},{l:'🔙 Voltar',v:'inicio'}] },
  alim:     { msg:'✅ Priorize frutas e vegetais · Reduza açúcar · Beba 2L de água/dia · Fracione as refeições.', opts:[{l:'🍏 Nutricionista',v:'agendar_juliana'},{l:'🔙 Voltar',v:'inicio'}] },
  respiracao:{ msg:'🌬️ <b>Técnica 4-7-8:</b><br>• Inspire por 4 segundos<br>• Segure por 7 segundos<br>• Expire por 8 segundos<br>• Repita 4 vezes', opts:[{l:'📅 Agendar Psicóloga',v:'agendar_ana'},{l:'🔙 Voltar',v:'mental'}] },
  info_cabeca:{ msg:'💧 Hidrate-se · Descanse em ambiente escuro · Compressa fria · Sono regular.', opts:[{l:'📅 Neurologia',v:'agendar_ramos'},{l:'🔙 Voltar',v:'inicio'}] },
  agendar_ramos:   { msg:'Levando para agendar com a Dra. Luana Ramos. 📅', opts:[] },
  agendar_carlos:  { msg:'Levando para agendar com o Dr. Carlos. 📅', opts:[] },
  agendar_juliana: { msg:'Levando para agendar com a Dra. Juliana. 📅', opts:[] },
  agendar_ana:     { msg:'Levando para agendar com a Dra. Ana. 💙', opts:[] },
  agendar_roberto: { msg:'Levando para agendar com o Prof. Roberto. 💪', opts:[] },
  ver_profs:       { msg:'Abrindo lista de especialistas! 👨‍⚕️', opts:[] },
  goto_agendar:    { msg:'Abrindo o agendamento online! 📅', opts:[] },
  goto_exames:     { msg:'Abrindo a seção de exames! 🔬', opts:[] },
};

const NAV_ACTIONS = {
  agendar_ramos:   () => { auth('agendamento'); setTimeout(() => import('./professionals.js').then(m => m.preSelectProf(6)), 450); },
  agendar_carlos:  () => { auth('agendamento'); setTimeout(() => import('./professionals.js').then(m => m.preSelectProf(2)), 450); },
  agendar_juliana: () => { auth('agendamento'); setTimeout(() => import('./professionals.js').then(m => m.preSelectProf(4)), 450); },
  agendar_ana:     () => { auth('agendamento'); setTimeout(() => import('./professionals.js').then(m => m.preSelectProf(1)), 450); },
  agendar_roberto: () => { auth('agendamento'); setTimeout(() => import('./professionals.js').then(m => m.preSelectProf(5)), 450); },
  ver_profs:       () => auth('services'),
  goto_agendar:    () => auth('agendamento'),
  goto_exames:     () => auth('exames'),
};

export function initChat() {
  document.getElementById('chatBody').innerHTML = '';
  setTimeout(() => botSay('inicio'), 500);
}

function botSay(key) {
  const cb   = document.getElementById('chatBody');
  const flow = BOT_FLOWS[key]; if (!flow) return;

  const typing = document.createElement('div');
  typing.className = 'msg msg-bot';
  typing.innerHTML = '<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>';
  cb.appendChild(typing); cb.scrollTop = cb.scrollHeight;

  setTimeout(() => {
    typing.remove();
    const msg = document.createElement('div');
    msg.className = 'msg msg-bot';
    const now = new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
    const optsHtml = flow.opts?.length
      ? `<div class="chat-options">${flow.opts.map(o=>`<button class="chat-opt" onclick="handleChatOpt('${o.v}','${o.l}')">${o.l}</button>`).join('')}</div>`
      : '';
    msg.innerHTML = `<div class="bubble bubble-bot">${flow.msg}</div>${optsHtml}<span class="msg-time">${now}</span>`;
    cb.appendChild(msg); cb.scrollTop = cb.scrollHeight;
    if (NAV_ACTIONS[key]) setTimeout(NAV_ACTIONS[key], 1000);
  }, 600 + Math.random()*400);
}

export function handleChatOpt(v, l) {
  const cb  = document.getElementById('chatBody');
  const um  = document.createElement('div');
  um.className = 'msg msg-user';
  const now = new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
  um.innerHTML = `<div class="bubble bubble-user">${l}</div><span class="msg-time" style="text-align:right">${now}</span>`;
  cb.appendChild(um); cb.scrollTop = cb.scrollHeight;
  setTimeout(() => botSay(v), 400);
}

export function sendChat() {
  const inp = document.getElementById('chatInput');
  const txt = inp.value.trim(); if (!txt) return;
  const cb  = document.getElementById('chatBody');
  const um  = document.createElement('div');
  um.className = 'msg msg-user';
  const now = new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
  um.innerHTML = `<div class="bubble bubble-user">${txt}</div><span class="msg-time" style="text-align:right">${now}</span>`;
  cb.appendChild(um); inp.value = ''; cb.scrollTop = cb.scrollHeight;

  const t = txt.toLowerCase();
  let key = 'inicio';
  if      (t.includes('cabec')||t.includes('enxaqueca'))            key = 'cabeca';
  else if (t.includes('cansaç')||t.includes('fatiga')||t.includes('sono')) key = 'cansaco';
  else if (t.includes('ansied')||t.includes('estress')||t.includes('mental')) key = 'mental';
  else if (t.includes('digest')||t.includes('barriga')||t.includes('nutri')) key = 'digestivo';
  else if (t.includes('coraç')||t.includes('peito')||t.includes('pressao')) key = 'cardiaco';
  else if (t.includes('dor ')||t.includes('muscul')||t.includes('corpo'))   key = 'corpo';
  else if (t.includes('agenda')||t.includes('consult')||t.includes('marcar')) key = 'agendar';
  else if (t.includes('exame')||t.includes('laborat'))              key = 'exame';
  else if (t.includes('urgente')||t.includes('emergencia'))         key = 'urgencia';
  else if (t.includes('respira'))                                   key = 'respiracao';
  else if (t.includes('sintoma'))                                   key = 'sintoma';

  setTimeout(() => botSay(key), 400);
}
