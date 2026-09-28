/**
 * Solutions catalogue.
 *
 * `capabilities`, `useCases` and `technologies` are rendered directly by the
 * solutions pages and the mega menu, so adding a solution here automatically
 * produces a complete, fully-styled detail page.
 */

export interface Solution {
  slug: string;
  title: string;
  shortTitle: string;
  /** One line, used in cards and the mega menu. */
  summary: string;
  /** Two or three sentences, used at the top of the detail page. */
  description: string;
  icon: string;
  /** Ordered pipeline rendered as the "how it works" rail. */
  pipeline: { step: string; title: string; detail: string }[];
  capabilities: { title: string; detail: string; icon: string }[];
  useCases: string[];
  technologies: string[];
  outcomes: string[];
  faqs: { question: string; answer: string }[];
  /** Two-digit label used in section eyebrows. */
  index: string;
  /** Overrides `title` on the compact home-page cards. */
  cardTitle?: string;
  /** Whether this is one of the six "What We Build" cards. */
  featured: boolean;
}

export const SOLUTIONS: Solution[] = [
  {
    slug: 'ai-machine-learning',
    index: '01',
    title: 'AI & Machine Learning',
    shortTitle: 'AI & ML',
    icon: 'BrainCircuit',
    summary: 'Predictive and intelligent systems that learn from your data.',
    description:
      'We build machine learning systems that turn historical and live operational data into decisions your teams can act on — from demand forecasting and risk scoring to recommendation and anomaly detection.',
    pipeline: [
      { step: '01', title: 'Data foundation', detail: 'We audit, unify and quality-gate the data your model will depend on.' },
      { step: '02', title: 'Model design', detail: 'Algorithm choice, feature engineering and evaluation criteria agreed up front.' },
      { step: '03', title: 'Build & validate', detail: 'Trained, benchmarked against a baseline, and tested against real edge cases.' },
      { step: '04', title: 'Deploy & monitor', detail: 'Shipped behind an API, with drift and performance monitoring in place.' },
    ],
    capabilities: [
      { title: 'Supervised learning', detail: 'Classification and regression tuned to a measurable baseline.', icon: 'LineChart' },
      { title: 'Time-series forecasting', detail: 'Demand, capacity and cash-flow models with confidence bands.', icon: 'TrendingUp' },
      { title: 'Anomaly & risk detection', detail: 'Unsupervised monitoring that surfaces what rule systems miss.', icon: 'Radar' },
      { title: 'Recommendation systems', detail: 'Ranking, personalisation and next-best-action models.', icon: 'Target' },
      { title: 'MLOps & monitoring', detail: 'Reproducible training, versioning and drift alerting.', icon: 'Recycle' },
      { title: 'Model governance', detail: 'Documentation, lineage and audit trails for regulated contexts.', icon: 'ShieldCheck' },
    ],
    useCases: [
      'Demand and revenue forecasting',
      'Credit and risk scoring',
      'Churn prediction and retention',
      'Quality inspection and defect detection',
      'Capacity and workforce planning',
      'Personalised ranking and recommendations',
    ],
    technologies: ['Python', 'PyTorch', 'TensorFlow', 'scikit-learn', 'MLflow', 'Ray', 'PostgreSQL', 'Redis'],
    outcomes: [
      'A model that beats the manual baseline on a metric your business already tracks',
      'Reproducible training and a clear rollback path',
      'Monitoring that flags degradation before it reaches a decision',
    ],
    faqs: [
      {
        question: 'Do we need a large dataset before starting?',
        answer:
          'No. We start by finding the highest-leverage prediction in your workflow, then scope the minimum viable data for it. Many useful models work on a narrow, well-defined problem rather than a full data lake.',
      },
      {
        question: 'How do you measure whether the model is actually useful?',
        answer:
          'We agree on a baseline and a business metric before training starts, then validate against a held-out period and a shadow deployment. A model is only finished when it improves the metric under real conditions.',
      },
    ],
    featured: true,
  },
  {
    slug: 'generative-ai',
    index: '02',
    title: 'Generative AI',
    shortTitle: 'Generative AI',
    icon: 'Sparkles',
    summary: 'Assistants, copilots, RAG systems and grounded generation.',
    description:
      'We build generative systems that are grounded in your own knowledge, evaluated for correctness, and designed to hand work back to a person rather than quietly improvise. Useful, auditable, and safe to deploy.',
    pipeline: [
      { step: '01', title: 'Use-case scoping', detail: 'Pick the workflows where generation genuinely removes effort.' },
      { step: '02', title: 'Grounding layer', detail: 'Retrieval over your own sources with citations and access control.' },
      { step: '03', title: 'Evaluation harness', detail: 'A scored test set that keeps quality measurable as models change.' },
      { step: '04', title: 'Guarded rollout', detail: 'Human-in-the-loop, rate limits, fallbacks and monitoring.' },
    ],
    capabilities: [
      { title: 'Retrieval-augmented generation', detail: 'Grounded answers with source attribution and permission awareness.', icon: 'Search' },
      { title: 'Enterprise copilots', detail: 'Assistants embedded in the tools your teams already open each day.', icon: 'MessageSquare' },
      { title: 'Document intelligence', detail: 'Extraction, classification and structuring from unstructured documents.', icon: 'Layers' },
      { title: 'Evaluation & guardrails', detail: 'Offline benchmarks plus runtime checks on relevance and safety.', icon: 'ShieldCheck' },
      { title: 'Prompt & context engineering', detail: 'Versioned prompt pipelines with tested retrieval strategies.', icon: 'Terminal' },
      { title: 'Fine-tuning & distillation', detail: 'Adapt open models when retrieval alone is not enough.', icon: 'TestTube2' },
    ],
    useCases: [
      'Internal knowledge assistants',
      'Support and case deflection',
      'Contract and document review',
      'Report and proposal drafting',
      'Developer and analyst copilots',
      'Semantic search across a product catalogue',
    ],
    technologies: ['Python', 'TypeScript', 'FastAPI', 'LangChain', 'LlamaIndex', 'pgvector', 'OpenAI', 'Redis'],
    outcomes: [
      'Answers grounded in your sources, with citations a reviewer can check',
      'A scored evaluation set that prevents silent quality regressions',
      'Clear human handoff points instead of blind automation',
    ],
    faqs: [
      {
        question: 'RAG or fine-tuning — which do we need?',
        answer:
          'Retrieval first. Most enterprise knowledge problems are solved by grounding a capable model in the right sources with the right permissions. Fine-tuning is worth it when you need a specific output format, a specialised domain style, or you need to avoid sending context to an external API.',
      },
      {
        question: 'How do you keep generated output trustworthy?',
        answer:
          'Every generation path returns its sources, runs a relevance and policy check, and falls back to a human when confidence is low. We build the evaluation set before the interface so quality is a number, not an opinion.',
      },
    ],
    featured: true,
  },
  {
    slug: 'computer-vision',
    index: '03',
    title: 'Computer Vision',
    shortTitle: 'Computer Vision',
    icon: 'ScanEye',
    summary: 'Turn images and video into actionable intelligence.',
    description:
      'We build perception systems for inspection, counting, recognition and understanding — designed for the lighting, occlusion and edge conditions of your environment rather than a benchmark image set.',
    pipeline: [
      { step: '01', title: 'Capture strategy', detail: 'Camera placement, lighting and frame rates agreed with your operators.' },
      { step: '02', title: 'Labelling', detail: 'Annotation tooling and guidelines that match how experts actually judge.' },
      { step: '03', title: 'Model training', detail: 'Detection, segmentation or classification tuned to the real scene.' },
      { step: '04', title: 'Edge deployment', detail: 'Optimised for the available hardware with live accuracy monitoring.' },
    ],
    capabilities: [
      { title: 'Defect & anomaly detection', detail: 'Find the things a trained inspector would miss, at line speed.', icon: 'Eye' },
      { title: 'Object detection & tracking', detail: 'Locate, count and follow assets across a space or a frame.', icon: 'Boxes' },
      { title: 'OCR & document capture', detail: 'Reliable extraction from scans, photos and handwritten fields.', icon: 'FileScan' },
      { title: 'Segmentation', detail: 'Pixel-accurate masks for measurement and robotics.', icon: 'Hexagon' },
      { title: 'Edge optimisation', detail: 'TensorRT and quantisation so inference fits the edge budget.', icon: 'Cpu' },
      { title: 'Human review loop', detail: 'Low-confidence frames routed to an operator for labelling.', icon: 'Users' },
    ],
    useCases: [
      'Manufacturing quality inspection',
      'Warehouse and yard counting',
      'Retail shelf and planogram auditing',
      'Medical and scientific imaging support',
      'Site safety and compliance monitoring',
      'Document and invoice capture',
    ],
    technologies: ['Python', 'PyTorch', 'OpenCV', 'Ultralytics', 'TensorRT', 'ONNX', 'Raspberry Pi', 'Kubernetes'],
    outcomes: [
      'Detection tuned to your actual production conditions',
      'A human review path for anything below the confidence threshold',
      'Inference sized to run on the hardware already on site',
    ],
    faqs: [
      {
        question: 'Do we need to label thousands of images?',
        answer:
          'Usually not. We start with a small, carefully labelled set plus active learning, so annotation effort is spent on the cases the model actually finds hard.',
      },
      {
        question: 'Can this run without a cloud connection?',
        answer:
          'Yes. Vision workloads are well suited to edge deployment. We optimise and quantise the model to run on local hardware when latency, privacy or connectivity rules out the cloud.',
      },
    ],
    featured: true,
  },
  {
    slug: 'intelligent-automation',
    index: '04',
    title: 'Intelligent Automation',
    shortTitle: 'Automation',
    icon: 'Bot',
    summary: 'Automate repetitive workflows and business processes.',
    description:
      'We map how work actually moves through your organisation, then automate the parts that are high-volume, rule-bound and expensive — with the audit trail and escalation paths regulated processes require.',
    pipeline: [
      { step: '01', title: 'Process mapping', detail: 'We document the real flow, including the workarounds people invented.' },
      { step: '02', title: 'Automation design', detail: 'Rules, model steps, human checkpoints and failure handling defined.' },
      { step: '03', title: 'Build & integrate', detail: 'Connected to the systems the process already touches.' },
      { step: '04', title: 'Monitor & extend', detail: 'Run rates, exceptions and SLA tracking from day one.' },
    ],
    capabilities: [
      { title: 'Workflow orchestration', detail: 'Durable, observable pipelines with retries and dead-letter handling.', icon: 'Workflow' },
      { title: 'Document processing', detail: 'Classify, extract, validate and route documents at volume.', icon: 'FileStack' },
      { title: 'RPA modernisation', detail: 'Replacing brittle scripted bots with maintained services.', icon: 'Recycle' },
      { title: 'Integration layers', detail: 'Event-driven connectors between legacy and modern systems.', icon: 'GitBranch' },
      { title: 'Human-in-the-loop', detail: 'Escalation queues, approvals and confidence thresholds.', icon: 'Users' },
      { title: 'Process telemetry', detail: 'Cycle time, throughput and exception reporting per process.', icon: 'Activity' },
    ],
    useCases: [
      'Invoice and claims processing',
      'Order and exception handling',
      'Customer onboarding and KYC',
      'Reconciliation and reporting',
      'Ticket triage and routing',
      'Compliance documentation',
    ],
    technologies: ['Python', 'TypeScript', 'Node.js', 'Temporal', 'Airflow', 'RabbitMQ', 'PostgreSQL', 'Redis'],
    outcomes: [
      'A process map that reflects reality, including manual workarounds',
      'Observable automation with exception queues, not silent failures',
      'Throughput and cycle-time reporting per automated process',
    ],
    faqs: [
      {
        question: 'Will automation remove roles?',
        answer:
          'In our engagements it rarely does. It removes the repetitive work inside roles, and the people move to the judgement-heavy parts of the process. We are explicit about that transition in the scoping conversation.',
      },
      {
        question: 'What happens when an automated step fails?',
        answer:
          'Every step is retryable, idempotent and observable. Failures land in a queue with context, route to a human above the configured threshold, and leave an audit trail.',
      },
    ],
    featured: true,
  },
  {
    slug: 'data-analytics',
    index: '05',
    title: 'Data & Analytics',
    shortTitle: 'Data & Analytics',
    icon: 'BarChart3',
    summary: 'Transform complex data into useful business intelligence.',
    description:
      'We build the data layer that makes everything else possible — ingestion, modelling, governance and the decision surfaces your teams use every day. Analytics is only as useful as the trust underneath it.',
    pipeline: [
      { step: '01', title: 'Source inventory', detail: 'Every system that holds truth, and how fresh it needs to be.' },
      { step: '02', title: 'Warehouse modelling', detail: 'A dimensional model with documented definitions and lineage.' },
      { step: '03', title: 'Governance', detail: 'Ownership, quality tests, PII handling and access policy.' },
      { step: '04', title: 'Decision surfaces', detail: 'Dashboards, semantic layers and APIs built for daily decisions.' },
    ],
    capabilities: [
      { title: 'Modern data platforms', detail: 'Batch and streaming pipelines on a warehouse built for the workload.', icon: 'Database' },
      { title: 'Semantic layer', detail: 'One definition per metric, shared by every tool downstream.', icon: 'Layers' },
      { title: 'Data quality & observability', detail: 'Automated freshness, volume and anomaly tests on every table.', icon: 'Activity' },
      { title: 'Self-serve analytics', detail: 'Governed models that non-technical teams can safely explore.', icon: 'Users' },
      { title: 'Privacy & access', detail: 'Row-level security, masking and consent-aware pipelines.', icon: 'Lock' },
      { title: 'Embedded analytics', detail: 'Metrics and charts delivered inside your own product.', icon: 'Package' },
    ],
    useCases: [
      'Unified reporting across systems',
      'Executive and operational dashboards',
      'Data platform migration',
      'Customer and product analytics',
      'Cost and margin modelling',
      'Regulatory and audit reporting',
    ],
    technologies: ['Python', 'SQL', 'dbt', 'Airflow', 'Snowflake', 'BigQuery', 'PostgreSQL', 'Power BI'],
    outcomes: [
      'A single source of truth with documented metric definitions',
      'Automated quality tests so silent data failures stop',
      'Governed access, so self-serve does not become a security incident',
    ],
    faqs: [
      {
        question: 'Do we need a data warehouse to work with you?',
        answer:
          'Not necessarily. If your data volumes and question set are modest, a well-modelled PostgreSQL instance with a semantic layer is often the right answer. We recommend the smallest platform that survives your requirements.',
      },
      {
        question: 'How do you keep reports trustworthy?',
        answer:
          'Definitions live in a semantic layer, tests run on every model, and ownership is explicit. Disagreements about numbers get resolved once, in the model, rather than in every spreadsheet.',
      },
    ],
    featured: true,
  },
  {
    slug: 'ai-agents',
    index: '06',
    title: 'AI Agents',
    shortTitle: 'AI Agents',
    icon: 'Workflow',
    summary: 'Tool-using autonomous systems that complete real work.',
    description:
      'We build agents that plan, call your real tools, and finish tasks end to end — scoped tightly enough to be dependable, observed closely enough to be trusted, and bounded so they cannot cause damage.',
    pipeline: [
      { step: '01', title: 'Task definition', detail: 'Precise success criteria, constraints and escalation rules.' },
      { step: '02', title: 'Tool surface', detail: 'A small, well-described tool interface over your real systems.' },
      { step: '03', title: 'Control loop', detail: 'Planning, execution, verification and self-correction.' },
      { step: '04', title: 'Guardrails', detail: 'Budgets, allow-lists, sandboxing and full trace retention.' },
    ],
    capabilities: [
      { title: 'Tool-calling systems', detail: 'Typed, validated tool interfaces over internal APIs.', icon: 'Wrench' },
      { title: 'Planning & execution', detail: 'Decomposition with verification checkpoints between steps.', icon: 'GitBranch' },
      { title: 'Memory & context', detail: 'Scoped short-term and durable organisational memory.', icon: 'Database' },
      { title: 'Multi-agent coordination', detail: 'Role separation where a single agent would lose coherence.', icon: 'Network' },
      { title: 'Sandboxing & budgets', detail: 'Bounded compute, spend and blast radius per run.', icon: 'ShieldCheck' },
      { title: 'Tracing & replay', detail: 'Every run is inspectable step by step and replayable.', icon: 'Activity' },
    ],
    useCases: [
      'Customer support resolution',
      'Research and briefing generation',
      'Data querying and reporting agents',
      'Codebase maintenance and migration',
      'Sales research and qualification',
      'Back-office document processing',
    ],
    technologies: ['Python', 'TypeScript', 'FastAPI', 'LangGraph', 'MCP', 'PostgreSQL', 'pgvector', 'Redis'],
    outcomes: [
      'A bounded blast radius: explicit allow-lists, budgets and kill switch',
      'Full step-by-step traces for every run',
      'Escalation to a human the moment confidence drops',
    ],
    faqs: [
      {
        question: 'How do you stop an agent from doing something harmful?',
        answer:
          'Scope beats prompting. The agent gets a small typed tool surface, an allow-list of what it may touch, hard budgets on time and spend, and mandatory human approval for irreversible actions. Every run is traced.',
      },
      {
        question: 'When is an agent the wrong answer?',
        answer:
          'When a deterministic script would do. Agents earn their complexity on tasks with ambiguity and variable steps. If your workflow has a fixed path, we will tell you to automate it with code instead.',
      },
    ],
    featured: false,
  },
  {
    slug: 'custom-ai',
    index: '07',
    title: 'Custom AI Systems',
    cardTitle: 'Custom Software',
    shortTitle: 'Custom AI',
    icon: 'Blocks',
    summary: 'End-to-end systems designed around your specific advantage.',
    description:
      'Some problems do not fit a product. We design and build the complete system — data, models, services, interfaces and the operating model that keeps it working after we leave.',
    pipeline: [
      { step: '01', title: 'Architecture', detail: 'System design, boundaries and technology choices with written rationale.' },
      { step: '02', title: 'Delivery', detail: 'Incremental releases against a working vertical slice, not a big bang.' },
      { step: '03', title: 'Hardening', detail: 'Load, failure modes, security review and observability before launch.' },
      { step: '04', title: 'Transfer', detail: 'Documentation, runbooks and team enablement so you own the system.' },
    ],
    capabilities: [
      { title: 'Platform architecture', detail: 'Service boundaries, data contracts and integration strategy.', icon: 'Blocks' },
      { title: 'Model customisation', detail: 'Fine-tuning, distillation and edge optimisation where needed.', icon: 'Cpu' },
      { title: 'Interface engineering', detail: 'Web, mobile and internal tools built for the workflow, not a template.', icon: 'Smartphone' },
      { title: 'Reliability engineering', detail: 'SLIs, alerting, runbooks and incident readiness.', icon: 'Activity' },
      { title: 'Security engineering', detail: 'Threat modelling, secrets handling and access design.', icon: 'Lock' },
      { title: 'Technical enablement', detail: 'Pairing, documentation and team training included in delivery.', icon: 'GraduationCap' },
    ],
    useCases: [
      'Greenfield AI-native products',
      'Internal intelligence platforms',
      'Legacy system modernisation',
      'Data platform rebuilds',
      'Enterprise application suites',
      'Regulated-environment systems',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Kubernetes', 'AWS'],
    outcomes: [
      'A written architecture you can review and challenge',
      'Working software every iteration, not a final reveal',
      'A team that can run and extend the system without us',
    ],
    faqs: [
      {
        question: 'How do you keep a large build from going off track?',
        answer:
          'We work in vertical slices — a narrow but genuinely working path through the whole stack every iteration. Risk surfaces in the first week, not the last month, and each slice is independently shippable.',
      },
      {
        question: 'Do we own the code and infrastructure?',
        answer:
          'Yes. Everything is delivered in your repositories and your cloud accounts, with documentation and runbooks. There is no proprietary layer you need us to maintain in order to keep running.',
      },
    ],
    featured: true,
  },
];

export const FEATURED_SOLUTIONS = SOLUTIONS.filter((solution) => solution.featured);

export function getSolution(slug: string | undefined): Solution | undefined {
  return SOLUTIONS.find((solution) => solution.slug === slug);
}

export const SOLUTION_SLUGS = SOLUTIONS.map((solution) => solution.slug);
