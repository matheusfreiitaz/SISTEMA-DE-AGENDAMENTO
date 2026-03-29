# 🏥 BemUai — Saúde ao seu alcance

> Plataforma web de saúde focada em Minas Gerais. Agendamento de consultas, assistente virtual com IA, gestão de exames e laudos — tudo em um só lugar.

![BemUai Screenshot](assets/screenshot.png)

## ✨ Funcionalidades

| Módulo | Descrição |
|--------|-----------|
| 🤖 **Assistente Virtual (BemBot)** | Chatbot baseado em palavras-chave para triagem de sintomas e encaminhamento a especialistas |
| 👨‍⚕️ **Área Médica** | Listagem de profissionais com busca, filtro por especialidade, avaliações e perfil detalhado |
| 📅 **Agendamento** | Calendário interativo com seleção de data, horários disponíveis e confirmação com "notificação WhatsApp" |
| 🔬 **Exames** | Catálogo de exames por categoria, tabela de resultados e exportação de laudos em `.txt` |
| 👤 **Perfil** | Gerenciamento de dados pessoais e preferências de acessibilidade |
| ♿ **Acessibilidade (WCAG)** | Modo escuro, alto contraste, fonte para dislexia, redução de animações, Skip Link e ARIA |

## 🗂️ Estrutura de Pastas

```
bemUai/
├── index.html              # Entrypoint da SPA
├── src/
│   ├── css/
│   │   ├── tokens.css      # Design tokens (cores, tipografia, espaçamento)
│   │   ├── base.css        # Reset, animações e utilitários
│   │   ├── components.css  # Botões, cards, formulários, modais, toast
│   │   ├── layout.css      # Header, nav, bottom nav, painel A11y
│   │   └── pages.css       # Estilos específicos de cada seção/página
│   └── js/
│       ├── data.js             # Dados estáticos (profissionais, exames, laudos)
│       ├── utils.js            # Funções utilitárias (toast, stars, formatação de datas)
│       ├── auth.js             # Autenticação (login, cadastro, logout, validações)
│       ├── navigation.js       # Roteamento SPA entre seções
│       ├── a11y.js             # Acessibilidade (tema, fonte, contraste, dislexia)
│       ├── chat.js             # Chatbot BemBot (fluxo de conversa por palavras-chave)
│       ├── professionals.js    # Listagem e detalhe de profissionais
│       ├── booking-calendar.js # Calendário, horários e confirmação de agendamento
│       ├── bookings.js         # Gerenciamento de agendamentos do usuário
│       └── exams.js            # Exames, filtros e exportação de laudos
├── assets/                 # Imagens e recursos estáticos
├── docs/                   # Documentação técnica
└── README.md
```

## 🚀 Como executar

Por ser uma SPA (Single Page Application) em HTML/CSS/JS puro com ES Modules, basta servir a pasta com qualquer servidor HTTP local:

```bash
# Python 3
python -m http.server 8080

# Node.js (npx)
npx serve .

# VS Code
# Instale a extensão "Live Server" e clique em "Go Live"
```

Acesse `http://localhost:8080` no navegador.

> ⚠️ **Importante:** ES Modules (`type="module"`) requerem um servidor HTTP. Abrir `index.html` diretamente pelo sistema de arquivos (`file://`) causará erro de CORS.

## 🛠️ Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Estrutura | HTML5 semântico |
| Estilo | CSS3 puro (Custom Properties, Grid, Flexbox, Animações) |
| Lógica | JavaScript ES2022+ (ES Modules, `async/await`) |
| Persistência | `localStorage` (dados do usuário e agendamentos) |
| Ícones | Font Awesome 6.4 |
| Fontes | Google Fonts — DM Sans + Fraunces |
| Deploy | Qualquer servidor estático (GitHub Pages, Netlify, Vercel) |

## 🎨 Design System

Todas as variáveis visuais estão centralizadas em `src/css/tokens.css`:

- **Cor primária:** `#0F6B4F` (verde saúde)
- **Cor de destaque:** `#F97316` (laranja)
- **Tipografia:** DM Sans (corpo) + Fraunces (títulos)
- **Temas:** Claro e Escuro via `data-theme` no `<html>`

## ♿ Acessibilidade

- Skip Link para navegação por teclado
- Atributos ARIA em todos os elementos interativos
- Suporte a `prefers-reduced-motion`
- Modo de alto contraste
- Fonte adaptada para dislexia (Comic Sans / Chalkboard)
- Tamanhos de fonte ajustáveis (Normal / Grande / Extra Grande)
- Conformidade com WCAG 2.1 AA

## 💾 Persistência de Dados

Todos os dados são salvos em `localStorage` — não há backend:

| Chave | Conteúdo |
|-------|----------|
| `bemUai_user` | Dados do usuário logado |
| `bemUai_bk_{email}` | Agendamentos do usuário |
| `bU_theme` | Preferência de tema |
| `bU_fs` | Tamanho de fonte preferido |
| `bU_contrast` | Alto contraste |
| `bU_dys` | Fonte para dislexia |
| `bU_motion` | Reduzir animações |

## 📄 Licença

MIT © 2026 BemUai
