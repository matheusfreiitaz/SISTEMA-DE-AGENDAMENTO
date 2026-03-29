 📋 BemUai – Documentação Completa do Sistema

> **Sistema Web de Agendamento Médico e Saúde Integrada**  
> Versão 2.0 · Atualizado em Março de 2026

---

 🗂️ Índice

1. [Visão Geral do Projeto](#1-visão-geral-do-projeto)
2. [Tecnologias Utilizadas](#2-tecnologias-utilizadas)
3. [Estrutura do Projeto](#3-estrutura-do-projeto)
4. [Guia de Instalação e Execução](#4-guia-de-instalação-e-execução)
5. [Funcionalidades Detalhadas](#5-funcionalidades-detalhadas)
6. [Sistema de Autenticação e Cadastro](#6-sistema-de-autenticação-e-cadastro)
7. [Banco de Dados (localStorage)](#7-banco-de-dados-localstorage)
8. [Assistente Virtual Inteligente](#8-assistente-virtual-inteligente)
9. [Sistema de Agendamento](#9-sistema-de-agendamento)
10. [Exames e Laudos Médicos](#10-exames-e-laudos-médicos)
11. [Confirmação por WhatsApp/SMS](#11-confirmação-por-whatsappsms)
12. [Acessibilidade (A11Y)](#12-acessibilidade-a11y)
13. [Responsividade Mobile](#13-responsividade-mobile)
14. [Personalização e Extensão](#14-personalização-e-extensão)
15. [Integração com API Real (Próximos Passos)](#15-integração-com-api-real-próximos-passos)

---

 1. Visão Geral do Projeto

**BemUai** é um sistema web completo de saúde que conecta pacientes a profissionais de saúde, permitindo agendamento de consultas, acesso a exames e assistência virtual por inteligência artificial.

 Objetivos Principais
- Facilitar o acesso à saúde para a população de Minas Gerais (especialmente região metropolitana de BH)
- Oferecer agendamento de consultas online de forma intuitiva
- Disponibilizar assistente virtual 24h para triagem de sintomas
- Centralizar resultados de exames e laudos médicos
- Garantir acessibilidade para todos os públicos

 Público-Alvo
- Pacientes em busca de consultas médicas
- Profissionais de saúde (psicólogos, fisioterapeutas, nutricionistas, etc.)
- Administradores de clínicas e unidades de saúde

---

 2. Tecnologias Utilizadas

| Tecnologia | Finalidade | Versão |
|-----------|-----------|--------|
| **HTML5** | Estrutura semântica das páginas | 5 |
| **CSS3** | Estilização, animações e responsividade | 3 |
| **JavaScript (Vanilla)** | Lógica de negócios, interatividade | ES2022 |
| **Font Awesome 6** | Ícones vetoriais | 6.4.0 |
| **Google Fonts** | Tipografia (Fraunces + DM Sans) | Latest |
| **localStorage** | Persistência de dados no cliente | Web API |
| **CSS Custom Properties** | Sistema de tokens de design | — |

 Fontes Tipográficas
- **Fraunces** — Fonte serif para títulos (elegante e distintiva)
- **DM Sans** — Fonte sans-serif para corpo do texto (legível e moderna)

 Dependências Externas (CDN)
```html
<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Fraunces:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap" rel="stylesheet">
```

> **⚠️ Importante:** O sistema funciona 100% no cliente (frontend). Para produção, recomenda-se integrar com um backend real (Node.js, Python, etc.) e banco de dados relacional.

---

 3. Estrutura do Projeto

```
bemuai/
│
├── bemuai.html                    # Arquivo principal (single-page application)
├── DOCUMENTACAO_BEMUAI.md         # Esta documentação
│
└── (futuro - separação de arquivos)
    ├── index.html
    ├── assets/
    │   ├── css/
    │   │   ├── main.css
    │   │   ├── components.css
    │   │   └── responsive.css
    │   ├── js/
    │   │   ├── app.js             # Inicialização
    │   │   ├── auth.js            # Autenticação
    │   │   ├── booking.js         # Agendamento
    │   │   ├── chatbot.js         # Assistente virtual
    │   │   └── exams.js           # Exames e laudos
    │   └── img/
    │       └── (imagens locais)
    └── README.md
```

 Seções da Single-Page Application (SPA)

| ID da Seção | Descrição | Requer Login |
|-------------|-----------|:------------:|
| `home` | Dashboard inicial | ❌ |
| `virtual` | Assistente Virtual (BemBot) | ✅ |
| `services` | Lista de profissionais | ✅ |
| `prof-detail` | Detalhe do profissional | ✅ |
| `agendamento` | Calendário de agendamento | ✅ |
| `book-confirm` | Confirmação do agendamento | ✅ |
| `exames` | Exames e resultados | ✅ |
| `my-bookings` | Meus agendamentos | ✅ |
| `profile` | Perfil do usuário | ✅ |

---

 4. Guia de Instalação e Execução

 Método 1: Simples (Recomendado para desenvolvimento)

```bash
# 1. Faça o download do arquivo bemuai.html
# 2. Abra diretamente no navegador:
# - Duplo clique no arquivo, OU
# - Arraste para o navegador

# Navegadores suportados:
# - Google Chrome 90+
# - Mozilla Firefox 88+
# - Microsoft Edge 90+
# - Safari 14+
```

 Método 2: Servidor local (Recomendado para desenvolvimento)

```bash
# Usando Python
python -m http.server 8000

# Usando Node.js (com npx)
npx serve .

# Usando PHP
php -S localhost:8000

# Acesse: http://localhost:8000/bemuai.html
```

 Método 3: Deploy em produção

```bash
# Netlify (drag and drop)
# 1. Acesse netlify.com
# 2. Arraste o arquivo para o painel
# 3. Pronto! URL gerada automaticamente

# GitHub Pages
git init
git add bemuai.html
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/seu-usuario/bemuai.git
git push -u origin main
# Ative GitHub Pages nas configurações do repositório
```

 Criar Conta de Teste

```
1. Acesse o sistema no navegador
2. Clique em qualquer funcionalidade protegida
3. No modal de autenticação, clique em "Criar conta gratuita"
4. Preencha:
   - Nome: João da Silva
   - CPF: 529.982.247-25 (CPF de teste válido)
   - Telefone: (31) 99999-1234
   - E-mail: teste@bemuai.com
   - Senha: Bemuai@2026
5. Clique em "Criar Conta"
```

---

 5. Funcionalidades Detalhadas

 5.1 Dashboard (Página Inicial)
- Banner de boas-vindas com saudação dinâmica (bom dia/tarde/noite)
- Cards de acesso rápido para as 4 funcionalidades principais
- Banner de próximos passos
- Estatísticas em tempo real do usuário logado
- Animação de gradiente no banner principal

 5.2 Navegação
- **Desktop:** Barra de navegação horizontal com links estilizados
- **Mobile:** Menu hambúrguer deslizante com animação suave
- **Bottom Nav:** Navegação inferior fixa para mobile (5 seções)
- Indicador visual da seção ativa
- Tecla `ESC` fecha menus e modais

---

 6. Sistema de Autenticação e Cadastro

 Campos do Cadastro

| Campo | Obrigatório | Validação |
|-------|:-----------:|-----------|
| Nome Completo | ✅ | Mínimo de preenchimento |
| CPF | ✅ | Algoritmo oficial de validação (dígitos verificadores) |
| Telefone/WhatsApp | ✅ | Formato (XX) XXXXX-XXXX, 10-11 dígitos |
| E-mail | ✅ | Formato válido de e-mail |
| Senha | ✅ | Mínimo 6 caracteres |
| Confirmar Senha | ✅ | Deve coincidir com a senha |

 Validação de CPF
O sistema implementa o algoritmo oficial brasileiro de validação de CPF:

```javascript
function validateCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  
  let sum = 0, rest;
  for (let i = 1; i <= 9; i++) sum += parseInt(cpf[i-1]) * (11-i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf[9])) return false;
  
  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cpf[i-1]) * (12-i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  return rest === parseInt(cpf[10]);
}
```

Indicador de Força de Senha
- 5 níveis: Muito fraca → Fraca → Média → Forte → Muito forte
- Avalia: comprimento, maiúsculas, números, caracteres especiais
- Feedback visual com barra colorida e texto

 Máscaras de Input
```javascript
// CPF: 000.000.000-00
function maskCPF(el) { /* formata automaticamente ao digitar */ }

// Telefone: (31) 99999-9999
function maskPhone(el) { /* formata automaticamente ao digitar */ }
```

 Fluxo de Login
1. Usuário insere e-mail e senha
2. Sistema busca no `localStorage`
3. Compara e-mail + senha (hash em produção)
4. Em caso de sucesso: atualiza interface, mostra saudação
5. Em caso de erro: exibe mensagem específica

---

 7. Banco de Dados (localStorage)

> **Nota:** Em produção, substituir por banco de dados real (PostgreSQL, MySQL, MongoDB).

Estrutura dos Dados

 Usuário (`bemUai_user`)
```json
{
  "name": "João da Silva",
  "email": "joao@exemplo.com",
  "cpf": "529.982.247-25",
  "phone": "(31) 99999-1234",
  "password": "senha123",
  "since": "29/03/2026"
}
```

 Agendamentos (`bemUai_bk_{email}`)
```json
[
  {
    "id": 1711737600000,
    "prof": {
      "id": 1,
      "name": "Dra. Ana Silva",
      "spec": "Psicologia",
      "cat": "psicologia",
      "price": "R$ 180/sessão"
    },
    "date": "2026-04-15",
    "time": "10:00",
    "notes": "Primeira consulta",
    "status": "confirmed",
    "modality": "presencial",
    "at": "2026-03-29T12:00:00.000Z"
  }
]
```

 Preferências de Acessibilidade
```
bU_theme    → "light" | "dark"
bU_fs       → "normal" | "large" | "xlarge"
bU_contrast → "normal" | "high"
bU_dys      → "off" | "on"
bU_motion   → "normal" | "reduced"
```

 Substituição por Backend Real

Para migrar para um backend real:

```javascript
// Substituir localStorage por chamadas de API:

// CADASTRO
async function registerUser(userData) {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
}

// LOGIN
async function loginUser(email, password) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
}

// AGENDAMENTO
async function createBooking(bookingData) {
  const response = await fetch('/api/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(bookingData)
  });
  return response.json();
}
```

---

 8. Assistente Virtual Inteligente

 Arquitetura do BemBot

O BemBot utiliza um sistema de fluxo conversacional com análise de palavras-chave:

```
Usuário digita mensagem
        ↓
Análise de palavras-chave (toLowerCase)
        ↓
Mapeamento para fluxo correspondente
        ↓
Exibição com delay realístico (600-1000ms)
        ↓
Opções de resposta apresentadas ao usuário
```

Fluxos Disponíveis

| Chave | Gatilhos | Destino |
|-------|---------|---------|
| `inicio` | "oi", "olá", "tudo bem" | Boas-vindas |
| `sintoma` | "sinto", "dor", "sintoma" | Triagem |
| `cabeca` | "cabeç", "enxaqueca", "cefal" | Neurologia |
| `corpo` | "muscul", "costas", "corpo" | Fisioterapia |
| `mental` | "ansied", "estress", "depress" | Psicologia |
| `digestivo` | "digest", "barriga", "nutri" | Nutrição |
| `cardiaco` | "coraç", "peito", "pressao" | Cardiologia |
| `cansaco` | "cansaç", "fatiga", "sono" | Hemograma + Personal |
| `urgencia` | "urgente", "emergencia", "grave" | SAMU + PS |
| `agendar` | "agenda", "consult", "marcar" | Agendamento |
| `exame` | "exame", "laborat", "resultado" | Exames |

 Análise de Sintomas (Algoritmo)

```javascript
function sendChat() {
  const t = txt.toLowerCase();
  let key = 'inicio'; // default
  
  if (t.includes('cabec') || t.includes('enxaqueca')) key = 'cabeca';
  else if (t.includes('ansied') || t.includes('estress')) key = 'mental';
  // ... demais condições
  
  setTimeout(() => botSay(key), 400);
}
```

 Integração com API de IA (Próximo Passo)

Para tornar o assistente ainda mais inteligente, integre com a API da Anthropic:

```javascript
async function sendToClaudeAI(userMessage, conversationHistory) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      system: `Você é o BemBot, assistente médico virtual do BemUai.
        Analise sintomas e sugira especialidades médicas.
        Sempre recomende consulta médica para diagnósticos.
        Responda em português brasileiro.`,
      messages: conversationHistory
    })
  });
  return response.json();
}
```

---

 9. Sistema de Agendamento

 Fluxo Completo

```
1. Selecionar Especialidade (select)
      ↓
2. Escolher Profissional (radio buttons)
      ↓
3. Navegar no Calendário (mini-cal)
      ↓
4. Selecionar Data disponível (não-domingos, não-passadas)
      ↓
5. Escolher Horário (grade de slots)
      ↓
6. Preencher Modalidade e Observações
      ↓
7. Revisar Resumo (atualizado em tempo real)
      ↓
8. Confirmar Agendamento
      ↓
9. Tela de Confirmação + Notificação WhatsApp
```

Calendário

- Navegação mês a mês (anterior/próximo)
- Dias passados: desabilitados (opacity 0.3)
- Domingos: desabilitados
- Dias com slots disponíveis: marcador verde
- Dia selecionado: fundo verde escuro
- Hoje: destaque especial

 Geração de Horários

```javascript
const slots = [
  '08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30',
  '14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30'
];
// 72% de chance de estar disponível (aleatório — em produção: consultar API)
const busy = Math.random() > 0.68;
```

---

 10. Exames e Laudos Médicos

Exames Disponíveis

| Exame | Categoria | Prazo do Resultado |
|-------|-----------|:-----------------:|
| Hemograma Completo | Laboratório | 2 dias |
| Raio-X de Tórax | Imagem | Na hora |
| Eletrocardiograma | Cardiologia | Na hora |
| Ultrassom Abdome | Imagem | 1 dia |
| Glicemia em Jejum | Laboratório | 1 dia |
| Holter 24h | Cardiologia | 3 dias |

Estrutura do Laudo Médico

Cada laudo contém:

```
LAUDO MÉDICO
============================================================
INSTITUIÇÃO: [Hospital/Laboratório]
DATA DO EXAME: [DD/MM/AAAA]
EXAME: [Nome do Exame]

DADOS DO PACIENTE
------------------------------------------------------------
Nome: [Nome Completo do Paciente]
CPF: [XXX.XXX.XXX-XX]
Telefone: [(XX) XXXXX-XXXX]

PROFISSIONAL RESPONSÁVEL
------------------------------------------------------------
Dr(a): [Nome do Médico]
Especialidade: [Área]
CRM: [CRM/UF XXXXX]

RESULTADOS
------------------------------------------------------------
• [Parâmetro]: [Valor] (Ref: [referência]) [Status]

CONCLUSÃO
------------------------------------------------------------
[Texto da conclusão médica]

STATUS GERAL: NORMAL | REQUER ATENÇÃO | ALTERADO
```

Export de Documentos

O sistema exporta laudos em formato `.txt` (compatível com Word). Para gerar `.docx` real:

```javascript
// Instalar: npm install docx
const { Document, Packer, Paragraph, TextRun } = require('docx');

async function generateDocx(laudoData) {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun({ text: 'LAUDO MÉDICO', bold: true, size: 32 })
          ]
        }),
        // ... demais parágrafos
      ]
    }]
  });
  const buffer = await Packer.toBuffer(doc);
  return buffer;
}
```

---

 11. Confirmação por WhatsApp/SMS

 Implementação Atual (Simulada)

O sistema simula o envio via toast notification:

```javascript
if (user?.phone) {
  setTimeout(() => toast(`📱 Mensagem enviada para ${user.phone}!`, 'ok'), 1200);
}
```

Integração Real com WhatsApp Business API

Para envio real de mensagens WhatsApp:

```javascript
// Usando Twilio
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function sendWhatsAppConfirmation(booking, user) {
  const message = `
*BemUai – Confirmação de Agendamento* ✅

Olá, *${user.name}*!

Seu agendamento foi confirmado:

👤 *Paciente:* ${user.name}
🪪 *CPF:* ${user.cpf}
👨‍⚕️ *Profissional:* ${booking.prof.name}
🏥 *Especialidade:* ${booking.prof.spec}
📅 *Data:* ${formatDate(booking.date)}
🕐 *Horário:* ${booking.time}
📍 *Modalidade:* ${booking.modality}

Para cancelar ou reagendar, acesse bemuai.com.br
  `.trim();

  return client.messages.create({
    from: 'whatsapp:+551140002000',  // Número BemUai
    to: `whatsapp:+55${user.phone.replace(/\D/g, '')}`,
    body: message
  });
}
```

 Integração com Z-API (Alternativa brasileira)

```javascript
async function sendWhatsAppZAPI(phone, message) {
  const response = await fetch(`https://api.z-api.io/instances/${process.env.ZAPI_INSTANCE}/token/${process.env.ZAPI_TOKEN}/send-text`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone: `55${phone.replace(/\D/g, '')}`,
      message
    })
  });
  return response.json();
}
```

Integração com SMS (Twilio)

```javascript
async function sendSMS(phone, message) {
  return client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE,
    to: `+55${phone.replace(/\D/g, '')}`
  });
}
```

---

12. Acessibilidade (A11Y)

 Funcionalidades Implementadas

| Recurso | Implementação |
|---------|--------------|
| **Modo Escuro** | `data-theme="dark"` + CSS custom properties |
| **Tamanho de Fonte** | `data-font-size="normal/large/xlarge"` + variáveis CSS |
| **Alto Contraste** | `data-contrast="high"` + override de cores |
| **Fonte Dislexia** | `data-dyslexia="on"` → Comic Sans + espaçamento |
| **Reduzir Animações** | `data-motion="reduced"` + `animation-duration: .01ms` |
| **Tecla Escape** | Fecha todos os modais e painéis |
| **ARIA Labels** | Todos os elementos interativos |
| **Skip Link** | Pular para conteúdo principal |
| **Focus Visible** | Outline customizado para navegação por teclado |
| **Roles ARIA** | `role="button"`, `role="dialog"`, `role="grid"`, etc. |
| **Live Regions** | `aria-live="polite"` nas listas dinâmicas |

 Conformidade
- Segue diretrizes **WCAG 2.1 nível AA**
- Compatível com leitores de tela (NVDA, VoiceOver)
- Navegação completa por teclado

---

13. Responsividade Mobile

Breakpoints

```css
/* Mobile First */
@media (max-width: 480px)  { /* smartphones pequenos */ }
@media (max-width: 768px)  { /* tablets e smartphones grandes */ }
@media (min-width: 769px)  { /* desktop */ }
```

Adaptações por Dispositivo

| Elemento | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Navbar | Hamburger | Hamburger | Links horizontais |
| Quick Grid | 2 colunas | 2 colunas | 4 colunas |
| Booking | 1 coluna | 1 coluna | 2 colunas |
| Prof Grid | 1 coluna | 2 colunas | 3-4 colunas |
| Stats Row | 2 colunas | 2 colunas | 4 colunas |
| Bottom Nav | Visível | Visível | Oculta |
| Header Nav | Oculta | Oculta | Visível |

---

14. Personalização e Extensão

Adicionar Novo Profissional

```javascript
// Em PROFS array:
{
  id: 7,
  name: 'Dr. Novo Profissional',
  spec: 'Dermatologia',
  cat: 'dermatologia',       // ← criar categoria correspondente
  rating: 4.7,
  reviews: 45,
  price: 'R$ 220/consulta',
  img: 'URL_DA_FOTO',
  desc: 'Descrição do profissional...'
}
```

Adicionar Nova Categoria

```html
<!-- No HTML das categorias -->
<div class="cat" data-c="dermatologia" onclick="setCat('dermatologia')" role="listitem">
  <i class="fas fa-skin"></i> Dermatologia
</div>
```

Alterar Identidade Visual

```css
/* Altere as variáveis principais em :root */
:root {
  --p:  #0F6B4F;  /* cor primária (verde) */
  --acc: #F97316; /* cor de destaque (laranja) */
  /* ... demais tokens */
}
```

Adicionar Fluxo ao BemBot

```javascript
// Em BOT_FLOWS:
minha_doença: {
  msg: 'Mensagem do bot sobre a doença...',
  opts: [
    { l: 'Opção 1', v: 'chave_do_proximo_fluxo' },
    { l: 'Voltar', v: 'inicio' }
  ]
}
```

---

15. Integração com API Real (Próximos Passos)

### Backend Sugerido (Node.js + Express)

```
backend/
├── server.js
├── routes/
│   ├── auth.js        # Login, cadastro, refresh token
│   ├── bookings.js    # CRUD de agendamentos
│   ├── professionals.js
│   ├── exams.js
│   └── notifications.js
├── models/
│   ├── User.js
│   ├── Booking.js
│   ├── Professional.js
│   └── Exam.js
├── middleware/
│   ├── auth.js        # JWT validation
│   └── validate.js    # Input validation
└── utils/
    ├── whatsapp.js
    └── email.js
```

 Banco de Dados Sugerido (PostgreSQL)

```sql
-- Usuários
CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(200) NOT NULL,
  cpf         VARCHAR(14) UNIQUE NOT NULL,
  phone       VARCHAR(15) NOT NULL,
  email       VARCHAR(200) UNIQUE NOT NULL,
  password    VARCHAR(255) NOT NULL,  -- bcrypt hash
  created_at  TIMESTAMP DEFAULT NOW()
);

-- Profissionais
CREATE TABLE professionals (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(200) NOT NULL,
  specialty   VARCHAR(100),
  crm         VARCHAR(20),
  bio         TEXT,
  price       DECIMAL(10,2),
  photo_url   TEXT,
  active      BOOLEAN DEFAULT TRUE
);

-- Agendamentos
CREATE TABLE bookings (
  id              SERIAL PRIMARY KEY,
  user_id         INTEGER REFERENCES users(id),
  professional_id INTEGER REFERENCES professionals(id),
  date            DATE NOT NULL,
  time            TIME NOT NULL,
  modality        VARCHAR(20) DEFAULT 'presencial',
  notes           TEXT,
  status          VARCHAR(20) DEFAULT 'confirmed',
  created_at      TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_date ON bookings(date);
```

### Segurança em Produção

- [ ] **Senhas:** Hash com `bcrypt` (nunca armazenar em texto plano)
- [ ] **Autenticação:** JWT com refresh tokens
- [ ] **CPF:** Criptografar em repouso (AES-256)
- [ ] **HTTPS:** TLS obrigatório
- [ ] **Rate Limiting:** Máximo de tentativas de login
- [ ] **CSRF Protection:** Tokens em formulários
- [ ] **Input Sanitization:** Prevenir XSS e SQL Injection
- [ ] **LGPD:** Política de privacidade e consentimento

---

## 📞 Suporte e Contato

**Sistema BemUai** — Saúde ao seu alcance  
📍 Ribeirão das Neves, Minas Gerais  
 contato@bemuai.com.br  
WhatsApp: (31) 99999-0000

---

*Documentação gerada para BemUai v2.0 — Março de 2026*  
*Todos os dados de pacientes e profissionais neste documento são fictícios.*
