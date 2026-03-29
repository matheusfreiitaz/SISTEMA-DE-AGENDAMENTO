/**
 * data.js — BemUai
 * Dados estáticos: profissionais, avaliações, exames e laudos
 */

export const PROFS = [
  {
    id: 1,
    name: 'Dra. Ana Silva',
    spec: 'Psicologia',
    cat: 'psicologia',
    rating: 4.9,
    reviews: 127,
    price: 'R$ 180/sessão',
    img: 'https://static.prod-images.emergentagent.com/jobs/2af4cfcd-82e9-44ee-8c4e-61f5496ec8d5/images/ea2d0d62224300ef931d89a3af67d1a95e07b1be175173f56771f5508f64e620.png',
    desc: 'Psicóloga clínica com 10+ anos em terapia cognitivo-comportamental. Especialista em ansiedade, depressão, burnout e autoconhecimento.'
  },
  {
    id: 2,
    name: 'Dr. Carlos Mendes',
    spec: 'Fisioterapia',
    cat: 'fisioterapia',
    rating: 4.8,
    reviews: 94,
    price: 'R$ 150/sessão',
    img: 'https://static.prod-images.emergentagent.com/jobs/2af4cfcd-82e9-44ee-8c4e-61f5496ec8d5/images/1efd584dbf6bf7dbe787c8ac748454c2f110b453c4cd485f7fd9156f33713f0c.png',
    desc: 'Fisioterapeuta especializado em reabilitação ortopédica e esportiva. Foco em resultados rápidos e duradouros para lesões e dores crônicas.'
  },
  {
    id: 3,
    name: 'Marina Costa',
    spec: 'Massagem Terapêutica',
    cat: 'massagem',
    rating: 5.0,
    reviews: 203,
    price: 'R$ 120/sessão',
    img: 'https://static.prod-images.emergentagent.com/jobs/2af4cfcd-82e9-44ee-8c4e-61f5496ec8d5/images/6bb2d10f23e0442df17309ac11a51f098fae97ffb5705b30f92cf86a36939390.png',
    desc: 'Massoterapeuta certificada em relaxamento, massagem sueca, shiatsu e terapia myofascial. Especialista em alívio de tensões e bem-estar.'
  },
  {
    id: 4,
    name: 'Dra. Juliana Santos',
    spec: 'Nutrição',
    cat: 'nutricao',
    rating: 4.9,
    reviews: 156,
    price: 'R$ 200/consulta',
    img: 'https://static.prod-images.emergentagent.com/jobs/2af4cfcd-82e9-44ee-8c4e-61f5496ec8d5/images/3f3f186076ba656b92733ce6bb59482ae966b698e70017849338956134700357.png',
    desc: 'Nutricionista clínica especializada em emagrecimento saudável e reeducação alimentar. Planos 100% personalizados baseados em evidências.'
  },
  {
    id: 5,
    name: 'Prof. Roberto Lima',
    spec: 'Personal Trainer',
    cat: 'personal',
    rating: 4.7,
    reviews: 88,
    price: 'R$ 100/treino',
    img: 'https://static.prod-images.emergentagent.com/jobs/2af4cfcd-82e9-44ee-8c4e-61f5496ec8d5/images/1efd584dbf6bf7dbe787c8ac748454c2f110b453c4cd485f7fd9156f33713f0c.png',
    desc: 'Personal trainer com certificação internacional ACSM. Treino funcional, hipertrofia, emagrecimento e condicionamento cardiovascular.'
  },
  {
    id: 6,
    name: 'Dra. Luana Ramos',
    spec: 'Neurologia',
    cat: 'neurologia',
    rating: 4.8,
    reviews: 112,
    price: 'R$ 250/consulta',
    img: 'https://static.prod-images.emergentagent.com/jobs/2af4cfcd-82e9-44ee-8c4e-61f5496ec8d5/images/ea2d0d62224300ef931d89a3af67d1a95e07b1be175173f56771f5508f64e620.png',
    desc: 'Neurologista com 8 anos de experiência clínica. Especialista em enxaqueca, epilepsia, doenças neurodegenerativas e distúrbios do sono.'
  },
];

export const REVIEWS = {
  1: [
    { a: 'Maria José', r: 5, t: 'Excelente! Muito atenciosa e competente. Me ajudou muito com ansiedade.' },
    { a: 'João Pedro', r: 5, t: 'Terapia transformadora. Recomendo demais para todos!' }
  ],
  2: [
    { a: 'Paula Lima',    r: 5, t: 'Melhor fisioterapeuta! Resolveu meu problema de coluna em poucas sessões.' },
    { a: 'Ricardo Sousa', r: 4, t: 'Ótimo atendimento e técnica precisa.' }
  ],
  3: [
    { a: 'Ana Clara',     r: 5, t: 'Massagem incrível! Saí completamente renovada de cada sessão.' },
    { a: 'Carlos Eduardo',r: 5, t: 'Técnica impecável, ambiente acolhedor.' }
  ],
  4: [
    { a: 'Fernanda Costa',r: 5, t: 'Perdi 12kg com o acompanhamento dela sem passar fome!' },
    { a: 'Lucas Martins', r: 5, t: 'Plano alimentar que funciona de verdade!' }
  ],
  5: [
    { a: 'Marcos Vinícius',r: 5, t: 'Treinos muito bem elaborados, resultados visíveis em 2 meses!' },
    { a: 'Patrícia Alves', r: 4, t: 'Excelente personal, muito motivador!' }
  ],
  6: [
    { a: 'Sandra Lima', r: 5, t: 'Diagnosticou minha enxaqueca corretamente após anos sofrendo.' },
    { a: 'Paulo Cesar', r: 5, t: 'Explica tudo de forma clara e humana.' }
  ]
};

export const EXAMS = [
  { id:'e1', name:'Hemograma Completo',   cat:'laboratorio', icon:'fas fa-vial',        color:'#7C3AED', bg:'#EDE9FE', desc:'Análise completa das células do sangue',      time:'2 dias' },
  { id:'e2', name:'Raio-X Tórax',          cat:'imagem',      icon:'fas fa-x-ray',        color:'#2563EB', bg:'#EFF6FF', desc:'Imagem diagnóstica do tórax',                 time:'Na hora' },
  { id:'e3', name:'Eletrocardiograma',      cat:'cardiologia', icon:'fas fa-heart-pulse',  color:'#DC2626', bg:'#FEF2F2', desc:'Registro da atividade elétrica do coração',   time:'Na hora' },
  { id:'e4', name:'Ultrassom Abdome',       cat:'imagem',      icon:'fas fa-wave-square',  color:'#2563EB', bg:'#EFF6FF', desc:'Exame de imagem do abdome completo',           time:'1 dia' },
  { id:'e5', name:'Glicemia em Jejum',      cat:'laboratorio', icon:'fas fa-droplet',      color:'#F97316', bg:'#FFF7ED', desc:'Medição de glicose no sangue em jejum',        time:'1 dia' },
  { id:'e6', name:'Holter 24h',             cat:'cardiologia', icon:'fas fa-heart',        color:'#DC2626', bg:'#FEF2F2', desc:'Monitoramento cardíaco por 24 horas',          time:'3 dias' },
];

export const EXAM_RESULTS = [
  { id:'r1', name:'Hemograma Completo', date:'15/03/2026', hospital:'UPA Centro', status:'ok',   label:'Normal',  crm:'CRM 12345' },
  { id:'r2', name:'Glicemia em Jejum',  date:'20/03/2026', hospital:'Lab Fleury', status:'warn', label:'Atenção', crm:'CRM 67890' },
  { id:'r3', name:'Raio-X Tórax',       date:'10/03/2026', hospital:'Santa Casa', status:'ok',   label:'Normal',  crm:'CRM 11111' },
  { id:'r4', name:'Eletrocardiograma',  date:'05/02/2026', hospital:'CardioMed',  status:'ok',   label:'Normal',  crm:'CRM 22222' },
];

export const LAUDO_DATA = {
  r1: {
    exam: 'Hemograma Completo', date: '15/03/2026', hospital: 'UPA Centro',
    crm: 'CRM/MG 12345', doctor: 'Dr. Paulo Henrique Souza', specialty: 'Hematologia e Medicina Laboratorial',
    results: [
      { param:'Hemácias',    value:'4,8 milhões/mm³', ref:'4,5–5,5 M/mm³',       status:'ok' },
      { param:'Hemoglobina', value:'14,2 g/dL',       ref:'12–16 g/dL',           status:'ok' },
      { param:'Hematócrito', value:'42%',              ref:'36–50%',               status:'ok' },
      { param:'Leucócitos',  value:'7.200/mm³',        ref:'4.000–11.000/mm³',     status:'ok' },
      { param:'Plaquetas',   value:'220.000/mm³',      ref:'150.000–400.000/mm³',  status:'ok' },
    ],
    conclusion: 'Hemograma dentro dos parâmetros de normalidade. Não foram identificadas alterações hematológicas significativas. Recomenda-se repetir o exame em 12 meses como rotina.',
    status: 'ok'
  },
  r2: {
    exam: 'Glicemia em Jejum', date: '20/03/2026', hospital: 'Lab Fleury',
    crm: 'CRM/MG 67890', doctor: 'Dra. Carla Andrade Melo', specialty: 'Endocrinologia e Metabolismo',
    results: [
      { param:'Glicemia em jejum',        value:'108 mg/dL', ref:'70–99 mg/dL', status:'warn' },
      { param:'Hemoglobina Glicada (HbA1c)', value:'5,8%',  ref:'< 5,7%',      status:'warn' },
    ],
    conclusion: 'Glicemia em jejum e hemoglobina glicada levemente acima dos valores de referência, caracterizando pré-diabetes. Recomenda-se: orientação nutricional, atividade física regular e reavaliação em 3 meses.',
    status: 'warn'
  },
  r3: {
    exam: 'Raio-X de Tórax', date: '10/03/2026', hospital: 'Santa Casa',
    crm: 'CRM/MG 11111', doctor: 'Dr. Fernando Alves Costa', specialty: 'Radiologia e Diagnóstico por Imagem',
    results: [
      { param:'Campos pulmonares', value:'Sem condensações', ref:'Livres',      status:'ok' },
      { param:'Área cardíaca',     value:'Normal',           ref:'ICT < 0,5',   status:'ok' },
      { param:'Seios costofrênicos',value:'Livres',          ref:'Livres',      status:'ok' },
      { param:'Mediastino',        value:'Normal',           ref:'Normal',      status:'ok' },
    ],
    conclusion: 'Exame radiológico de tórax sem alterações patológicas. Parênquima pulmonar de aspecto normal. Área cardíaca dentro dos limites da normalidade.',
    status: 'ok'
  },
  r4: {
    exam: 'Eletrocardiograma (ECG)', date: '05/02/2026', hospital: 'CardioMed',
    crm: 'CRM/MG 22222', doctor: 'Dr. Marcelo Carvalho Lima', specialty: 'Cardiologia',
    results: [
      { param:'Ritmo',              value:'Sinusal regular', ref:'Sinusal',     status:'ok' },
      { param:'Frequência cardíaca',value:'72 bpm',          ref:'60–100 bpm',  status:'ok' },
      { param:'Intervalo PR',       value:'160 ms',          ref:'120–200 ms',  status:'ok' },
      { param:'Complexo QRS',       value:'80 ms',           ref:'< 120 ms',    status:'ok' },
      { param:'Intervalo QTc',      value:'420 ms',          ref:'< 450 ms',    status:'ok' },
    ],
    conclusion: 'Eletrocardiograma em repouso dentro dos limites da normalidade. Ritmo sinusal regular com frequência cardíaca normal. Ausência de distúrbios de condução, hipertrofia ou isquemia.',
    status: 'ok'
  }
};

export const MONTHS = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
export const WDAYS  = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
