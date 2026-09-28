/**
 * Company, process and marketing content.
 *
 * Rule for this file: no invented people, no invented numbers, no invented
 * awards, partnerships or certifications. Named team profiles are deliberately
 * omitted until real ones exist; the Company page renders role placeholders
 * with a visible note.
 */

/* -------------------------------------------------------------------------- */
/* Home — AI capabilities grid                                                 */
/* -------------------------------------------------------------------------- */

export interface Capability {
  name: string;
  description: string;
  icon: string;
  /** Two-letter monogram used in the compact chip variant. */
  code: string;
}

export const CAPABILITIES: Capability[] = [
  {
    name: 'Machine Learning',
    description: 'Supervised and unsupervised models benchmarked against a baseline you already track.',
    icon: 'TrendingUp',
    code: 'ML',
  },
  {
    name: 'Deep Learning',
    description: 'Custom architectures, fine-tuning and distillation where pretrained models are not enough.',
    icon: 'Cpu',
    code: 'DL',
  },
  {
    name: 'Generative AI',
    description: 'Grounded generation with citations, evaluation and explicit abstention.',
    icon: 'Sparkles',
    code: 'GA',
  },
  {
    name: 'LLM Applications',
    description: 'Assistants and copilots embedded in the tools your teams already open.',
    icon: 'MessageSquare',
    code: 'LL',
  },
  {
    name: 'AI Agents',
    description: 'Tool-using systems with bounded scope, hard budgets and full run traces.',
    icon: 'Workflow',
    code: 'AG',
  },
  {
    name: 'RAG Systems',
    description: 'Retrieval layers with permission-aware search, re-ranking and freshness control.',
    icon: 'Search',
    code: 'RG',
  },
  {
    name: 'Computer Vision',
    description: 'Inspection, recognition and monitoring built for real operating conditions.',
    icon: 'ScanEye',
    code: 'CV',
  },
  {
    name: 'Natural Language Processing',
    description: 'Extraction, classification, summarisation and intent understanding at volume.',
    icon: 'FileStack',
    code: 'NL',
  },
  {
    name: 'Predictive Analytics',
    description: 'Forecasting and risk scoring with confidence intervals, not single point estimates.',
    icon: 'LineChart',
    code: 'PA',
  },
  {
    name: 'Intelligent Automation',
    description: 'Durable orchestration that removes repetitive work and surfaces exceptions.',
    icon: 'Bot',
    code: 'AU',
  },
];

/* -------------------------------------------------------------------------- */
/* Home — process                                                              */
/* -------------------------------------------------------------------------- */

export interface ProcessStep {
  index: string;
  title: string;
  detail: string;
  deliverables: string[];
  icon: string;
}

export const PROCESS: ProcessStep[] = [
  {
    index: '01',
    title: 'Discover',
    detail:
      'We map the problem, the decisions involved and the data that actually exists. Most engagements get smaller and clearer here, which is the point.',
    deliverables: ['Problem definition', 'Data audit', 'Feasibility and risk'],
    icon: 'Search',
  },
  {
    index: '02',
    title: 'Architect',
    detail:
      'A written architecture with technology choices, data contracts and a delivery plan you can review and challenge before anything is built.',
    deliverables: ['System architecture', 'Data contracts', 'Delivery roadmap'],
    icon: 'Blocks',
  },
  {
    index: '03',
    title: 'Build',
    detail:
      'Short iterations against a genuinely working vertical slice through the whole stack. Risk surfaces in the first weeks, not the last month.',
    deliverables: ['Working software each iteration', 'Automated tests', 'Evaluation harness'],
    icon: 'Wrench',
  },
  {
    index: '04',
    title: 'Harden',
    detail:
      'Load, failure modes, security review, monitoring and runbooks. Production is a different standard from demo, and we hold both.',
    deliverables: ['Performance testing', 'Security review', 'Observability and alerting'],
    icon: 'ShieldCheck',
  },
  {
    index: '05',
    title: 'Transfer',
    detail:
      'Documentation, pairing and enablement so your team owns the system. No proprietary layer you need us to maintain in order to keep running.',
    deliverables: ['Documentation and runbooks', 'Team enablement', 'Handover review'],
    icon: 'GraduationCap',
  },
];

/* -------------------------------------------------------------------------- */
/* Home — about strip                                                          */
/* -------------------------------------------------------------------------- */

export const HOME_ABOUT = {
  eyebrow: 'About Trisentri',
  heading: 'An engineering company, organised around intelligence.',
  paragraphs: [
    'Trisentri AI was built by engineers who kept watching the same failure repeat: promising AI projects stalled between a convincing prototype and a system that could survive production. The data was incomplete, the evaluation was vibes, and nobody had designed for the day the model was wrong.',
    'We work differently. We start with the decision a system has to improve and the data required to make it, define how quality will be measured before we design the interface, and build the evaluation, monitoring and escalation paths as part of the product rather than as an afterthought.',
    'The result is work that keeps working after the engagement ends — systems your engineers understand, documented well enough to extend, and honest about what they do not know.',
  ],
  principles: [
    {
      title: 'Measure before you build',
      detail: 'A defined baseline and a scored evaluation set come before the interface, not after.',
      icon: 'Gauge',
    },
    {
      title: 'Bounded by design',
      detail: 'Autonomy gets an explicit blast radius, an allow-list and a kill switch.',
      icon: 'ShieldCheck',
    },
    {
      title: 'Own the whole stack',
      detail: 'Data, model, service and interface — one team, no handoff gaps.',
      icon: 'Layers',
    },
    {
      title: 'Leave it maintainable',
      detail: 'Documentation, runbooks and enablement are deliverables, not extras.',
      icon: 'BookOpen',
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Company page                                                                */
/* -------------------------------------------------------------------------- */

export const COMPANY = {
  hero: {
    eyebrow: 'Company',
    heading: 'Building the intelligence layer for the next generation of software.',
    lede: 'Trisentri AI is an engineering company focused on artificial intelligence, automation and data systems. We design, build and operate software that makes real work faster and more precise — and we hand it over documented.',
  },
  mission: {
    title: 'Mission',
    body: 'To make advanced intelligence a dependable part of everyday software, by engineering AI systems that are measurable, bounded and maintainable rather than impressive and fragile.',
  },
  vision: {
    title: 'Vision',
    body: 'A world where the systems organisations depend on are genuinely intelligent — where models are evaluated as rigorously as any other engineering component, and where the people relying on them can always see how a decision was reached.',
  },
  philosophy: {
    title: 'Engineering philosophy',
    body: 'We treat AI as an engineering discipline, not a research demonstration. That means agreeing on a baseline before training, insisting on an evaluation set before an interface, designing the failure path before the happy path, and treating monitoring and documentation as part of the product. We would rather tell you a script is the right answer than build an agent because it is more interesting.',
    points: [
      { title: 'The baseline comes first', detail: 'A system is only an improvement relative to something. We define what it must beat before we build it.' },
      { title: 'Design the failure path', detail: 'What happens when it is wrong, low-confidence or unavailable is an architectural decision, not an afterthought.' },
      { title: 'Boring where boring works', detail: 'We choose the simplest architecture that survives the requirements, and reserve complexity for where it earns its place.' },
      { title: 'Documentation is a feature', detail: 'If the next engineer cannot understand it in an hour, the design is not finished.' },
    ],
  },
  values: [
    {
      title: 'Clarity over cleverness',
      detail: 'We would rather ship something a colleague can explain in a sentence than something impressive that nobody can maintain.',
      icon: 'MessageSquare',
    },
    {
      title: 'Evidence over assertion',
      detail: 'Claims come with measurement. If we cannot show a number, we say the thing is unproven rather than implying otherwise.',
      icon: 'Gauge',
    },
    {
      title: 'Boundaries earn trust',
      detail: 'Knowing what a system should not do is as important as knowing what it should. Limits are designed, documented and enforced.',
      icon: 'ShieldCheck',
    },
    {
      title: 'Ownership to the end',
      detail: 'We build to be handed over. Documentation, runbooks and team enablement are part of the deliverable, not a follow-on engagement.',
      icon: 'Package',
    },
    {
      title: 'Craft without theatre',
      detail: 'Good engineering is invisible when it works. We optimise for systems that stay quiet, not demos that look impressive.',
      icon: 'Hexagon',
    },
    {
      title: 'Respect for the domain',
      detail: 'We learn the process before automating it. A technically elegant solution to the wrong problem is still the wrong solution.',
      icon: 'Target',
    },
  ],
  culture: {
    title: 'How we work',
    body: 'Small, senior, cross-functional teams with a written architecture before the first line of code and a working vertical slice before the first milestone. Decisions are made against a defined metric rather than the loudest opinion in the room, and disagreement about scope is resolved in writing.',
    points: [
      'Written decisions, so context survives the conversation.',
      'Short iterations against a working slice, not long builds against a plan.',
      'Direct technical critique as a default, treated as a favour to the work.',
      'Explicit scope boundaries, renegotiated in the open rather than absorbed silently.',
    ],
  },
  team: {
    title: 'Team',
    body: 'Trisentri AI is a small, senior engineering team spanning applied machine learning, data engineering, platform and product engineering.',
    note: 'Named profiles are not published yet. Roles below describe the structure of the team; individual profiles will be added as they are cleared for publication.',
  },
  roles: [
    { title: 'Applied AI & Machine Learning', detail: 'Model design, training pipelines, evaluation harnesses and inference optimisation.' },
    { title: 'Data Engineering', detail: 'Platform architecture, data contracts, semantic layers and pipeline reliability.' },
    { title: 'Platform & Infrastructure', detail: 'Cloud architecture, deployment, observability, security and reliability engineering.' },
    { title: 'Product Engineering', detail: 'Web, mobile and internal tooling — designed for the workflow, not a template.' },
    { title: 'Solutions Architecture', detail: 'Problem framing, technical strategy, scoping and client-facing design reviews.' },
  ],
  careers: {
    title: 'Careers',
    body: 'We hire engineers who want ownership of a problem end to end, and who would rather explain a trade-off than hide it. If that sounds like the work you want, we would like to hear from you.',
    note: 'Open roles are published on this page as they are approved. If nothing is listed, send a note describing the work you want to do and we will keep it on file.',
    openings: [] as { title: string; location: string; type: string }[],
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Engagement models / contact                                                 */
/* -------------------------------------------------------------------------- */

export const ENGAGEMENT_MODELS = [
  {
    title: 'AI Opportunity Assessment',
    duration: 'Short',
    detail: 'A structured review of a candidate use case: data readiness, feasibility, expected impact and a recommended first step.',
    icon: 'Search',
  },
  {
    title: 'Proof of Value',
    duration: 'Fixed scope',
    detail: 'A working vertical slice against your real data, with the evaluation harness in place before the interface.',
    icon: 'FlaskConical',
  },
  {
    title: 'Product Build',
    duration: 'Ongoing',
    detail: 'A cross-functional squad delivering a complete system, from architecture through to handover and enablement.',
    icon: 'Rocket',
  },
  {
    title: 'Embedded Engineering',
    duration: 'Ongoing',
    detail: 'Senior engineers working inside your delivery process and your repositories, accountable for outcomes.',
    icon: 'Users',
  },
] as const;

/**
 * Non-address contact facts. The actual mailbox is runtime-configured
 * (`VITE_CONTACT_EMAIL`) and rendered by the page, so nothing here can drift
 * out of sync or hardcode an address the team may not own.
 */
export const CONTACT_OFFICES = [
  {
    label: 'New business',
    value: 'Use the enquiry form',
    detail: 'It reaches the team directly and is read by an engineer.',
    icon: 'MessageSquare',
  },
  {
    label: 'What happens next',
    value: 'A reply with questions',
    detail: 'Not a pitch deck. If we are not the right fit, we will say so early.',
    icon: 'MessageCircle',
  },
] as const;
