/**
 * exams.js — BemUai
 * Módulo de Exames: listagem, filtros e exportação de laudos
 */

import { EXAMS, EXAM_RESULTS, LAUDO_DATA } from './data.js';
import { toast } from './utils.js';
import { getUser } from './auth.js';

let examFilter = 'all';
let curLaudo   = null;

export function setExamFilter(f) {
  examFilter = f;
  document.querySelectorAll('.cat[data-ef]').forEach(b => b.classList.remove('active'));
  const a = document.querySelector(`.cat[data-ef="${f}"]`); if (a) a.classList.add('active');
  renderExams();
}

export function renderExams() {
  const grid = document.getElementById('examGrid');
  const list = examFilter === 'all' ? EXAMS : EXAMS.filter(e => e.cat === examFilter);
  grid.innerHTML = list.map(e => `
    <div class="exam-card" tabindex="0" role="button" aria-label="${e.name}"
         onclick="toast('Agendamento de ${e.name}: em breve!','ok')">
      <div class="exam-icon" style="background:${e.bg};color:${e.color}"><i class="${e.icon}"></i></div>
      <h4>${e.name}</h4>
      <p>${e.desc}</p>
      <span class="exam-badge" style="background:${e.bg};color:${e.color}">
        <i class="fas fa-clock"></i> Resultado em ${e.time}
      </span>
    </div>`).join('');
}

export function renderExamResults() {
  document.getElementById('examResultTable').innerHTML = EXAM_RESULTS.map(r => `
    <tr>
      <td><b>${r.name}</b></td>
      <td style="color:var(--t3)">${r.date}</td>
      <td style="color:var(--t3)">${r.hospital}</td>
      <td><span class="status-pill sp-${r.status}">${r.label}</span></td>
      <td><button class="btn btn-sm btn-ghost" onclick="showLaudo('${r.id}')">
        <i class="fas fa-file-medical"></i> Ver Laudo
      </button></td>
    </tr>`).join('');
}

export function showLaudo(id) {
  const data = { ...LAUDO_DATA[id] };
  if (!data) return;
  const u = getUser();
  if (u) { data.patient = u.name; data.cpf = u.cpf || '—'; data.phone = u.phone || '—'; }
  curLaudo = { id, data };

  const statusColor = { ok:'var(--ok)', warn:'var(--warn)', err:'var(--err)' };
  const statusLabel = { ok:'Normal', warn:'Requer Atenção', err:'Alterado' };
  document.getElementById('laudoTitle').textContent = 'Laudo – ' + data.exam;
  document.getElementById('laudoContent').innerHTML = `
    <div class="laudo-preview">
      <h4><i class="fas fa-hospital"></i> ${data.hospital}</h4>
      <p><b>Exame:</b> ${data.exam}</p>
      <p><b>Data:</b> ${data.date}</p>
      <p><b>Paciente:</b> ${data.patient || 'Paciente'}</p>
      <p><b>CPF:</b> ${data.cpf || '—'}</p>
      <p style="margin-top:.75rem"><b>Responsável:</b> ${data.doctor}</p>
      <p><b>CRM:</b> ${data.crm}</p>
      <p style="margin-top:.75rem;font-weight:700;color:var(--t1)">Resultados:</p>
      ${data.results.map(r => `<p style="color:${statusColor[r.status]||'var(--t2)'}">• ${r.param}: ${r.value} <span style="color:var(--t3)">(Ref: ${r.ref})</span></p>`).join('')}
      <p style="margin-top:.75rem;font-weight:700">Conclusão:</p>
      <p>${data.conclusion}</p>
    </div>
    <div style="background:${statusColor[data.status]}15;border:1px solid ${statusColor[data.status]}40;border-radius:var(--r1);padding:.75rem 1rem;font-size:var(--fs-s);margin-bottom:.5rem;display:flex;align-items:center;gap:.5rem">
      <i class="fas fa-circle-info" style="color:${statusColor[data.status]}"></i>
      Status: <b style="color:${statusColor[data.status]}">${statusLabel[data.status] || 'Normal'}</b>
    </div>`;
  document.getElementById('laudoModal').classList.add('active');
}

export function hideLaudo() { document.getElementById('laudoModal').classList.remove('active') }

export async function downloadLaudo() {
  if (!curLaudo) { toast('Nenhum laudo selecionado', 'err'); return; }
  const { data } = curLaudo;
  const btn = document.getElementById('laudoDownloadBtn');
  btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gerando...';
  try {
    const txt  = generateLaudoText(data);
    const blob = new Blob([txt], { type:'text/plain;charset=utf-8' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = `Laudo_${data.exam.replace(/\s+/g,'_')}_${data.date.replace(/\//g,'-')}.txt`;
    a.click(); URL.revokeObjectURL(url);
    toast('Laudo exportado! 📄', 'ok'); hideLaudo();
  } catch(err) {
    toast('Erro ao exportar. Tente novamente.', 'err'); console.error(err);
  } finally {
    btn.disabled = false; btn.innerHTML = '<i class="fas fa-download"></i> Baixar Laudo (.docx)';
  }
}

function generateLaudoText(data) {
  const line = '='.repeat(60);
  const statusLabel = { ok:'NORMAL', warn:'REQUER ATENÇÃO', err:'ALTERADO' };
  let txt = `${line}\n                    LAUDO MÉDICO\n${line}\n\n`;
  txt += `INSTITUIÇÃO: ${data.hospital}\nDATA DO EXAME: ${data.date}\nEXAME: ${data.exam}\n\n`;
  txt += `${'-'.repeat(60)}\nDADOS DO PACIENTE\n${'-'.repeat(60)}\n`;
  txt += `Nome: ${data.patient||'Paciente'}\nCPF: ${data.cpf||'—'}\nTelefone: ${data.phone||'—'}\n\n`;
  txt += `${'-'.repeat(60)}\nPROFISSIONAL RESPONSÁVEL\n${'-'.repeat(60)}\n`;
  txt += `Dr(a): ${data.doctor}\nEspecialidade: ${data.specialty}\nCRM: ${data.crm}\n\n`;
  txt += `${'-'.repeat(60)}\nRESULTADOS\n${'-'.repeat(60)}\n`;
  data.results.forEach(r => {
    const s = r.status==='ok'?'✓ Normal':r.status==='warn'?'⚠ Atenção':'✗ Alterado';
    txt += `• ${r.param}: ${r.value} (Ref: ${r.ref}) [${s}]\n`;
  });
  txt += `\n${'-'.repeat(60)}\nCONCLUSÃO\n${'-'.repeat(60)}\n${data.conclusion}\n\n`;
  txt += `STATUS GERAL: ${statusLabel[data.status]||'NORMAL'}\n\n`;
  txt += `${line}\nDocumento gerado pelo sistema BemUai em ${new Date().toLocaleString('pt-BR')}\n${line}\n`;
  return txt;
}
