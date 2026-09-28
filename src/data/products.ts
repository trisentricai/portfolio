/**
 * Product platform concepts.
 *
 * IMPORTANT — these are reference architectures and product *concepts* used to
 * demonstrate how Trisentri AI composes its capabilities. They are not released
 * Trisentri AI products, and no availability, pricing or customer claim is made.
 * Each record carries `example: true`, which renders a visible disclosure in the
 * UI. Replace the copy and set `example: false` when a real product ships.
 */

export type ProductStatus = 'Concept' | 'In development' | 'Private preview' | 'Generally available';

export interface ProductFeature {
  title: string;
  detail: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  status: ProductStatus;
  description: string;
  features: ProductFeature[];
  technology: string[];
  /** Accent used by the generated placeholder artwork. */
  accent: 'blue' | 'lime' | 'mixed';
  /** Deterministic seed for the generated product artwork. */
  seed: number;
  example: true;
  bestFor: string[];
}

export const PRODUCTS: Product[] = [
  {
    slug: 'lattice-ai-platform',
    name: 'Lattice',
    tagline: 'A governed platform for shipping AI features into products.',
    category: 'AI Platform',
    status: 'Concept',
    description:
      'A reference architecture for teams that need to move from notebook experiments to production inference with evaluation, monitoring and rollback built in rather than bolted on.',
    features: [
      { title: 'Model registry', detail: 'Versioned models, datasets and prompts with full lineage from training to endpoint.' },
      { title: 'Evaluation gates', detail: 'Regression suites that block a release when a model change degrades a tracked metric.' },
      { title: 'Online monitoring', detail: 'Latency, drift and quality telemetry with alerting thresholds per use case.' },
      { title: 'Cost visibility', detail: 'Per-endpoint token and compute spend, attributed to the feature that caused it.' },
    ],
    technology: ['Python', 'FastAPI', 'PostgreSQL', 'MLflow', 'Kubernetes', 'React', 'TypeScript'],
    accent: 'blue',
    seed: 7,
    example: true,
    bestFor: ['Teams moving models into production', 'Regulated environments needing lineage', 'Multiple models sharing one platform'],
  },
  {
    slug: 'vector-graph',
    name: 'VectorGraph',
    tagline: 'Retrieval infrastructure for grounded AI answers.',
    category: 'Generative AI',
    status: 'Concept',
    description:
      'A retrieval service pattern covering ingestion, hybrid search, re-ranking, evaluation and freshness — the parts of RAG that decide whether generated answers are worth trusting.',
    features: [
      { title: 'Hybrid retrieval', detail: 'Vector and keyword search combined, with re-ranking tuned against a real query set.' },
      { title: 'Entitlement-aware', detail: 'Access control evaluated during retrieval so restricted content never enters model context.' },
      { title: 'Freshness control', detail: 'Incremental re-indexing and recency signals so retired content stops being served.' },
      { title: 'Retrieval evaluation', detail: 'Recall and ranking metrics measured independently of generation quality.' },
    ],
    technology: ['Python', 'pgvector', 'PostgreSQL', 'OpenAI', 'FastAPI', 'Redis', 'Docker'],
    accent: 'mixed',
    seed: 19,
    example: true,
    bestFor: ['Grounded assistants', 'Enterprise knowledge search', 'Citation-requiring deployments'],
  },
  {
    slug: 'sightline-vision',
    name: 'Sightline',
    tagline: 'Computer vision pipelines for inspection and monitoring.',
    category: 'Computer Vision',
    status: 'Concept',
    description:
      'An end-to-end vision pipeline pattern: capture strategy, active labelling, edge-optimised inference and a confidence-gated human review loop.',
    features: [
      { title: 'Capture assessment', detail: 'Camera, lighting and frame-rate analysis before modelling, because capture sets the ceiling.' },
      { title: 'Active learning loop', detail: 'The deployed model selects the frames most worth a human label.' },
      { title: 'Edge export', detail: 'ONNX and TensorRT export paths with quantisation benchmarks against a latency budget.' },
      { title: 'Review console', detail: 'Low-confidence queue with overlay visualisation and one-click label capture.' },
    ],
    technology: ['Python', 'PyTorch', 'Ultralytics', 'OpenCV', 'ONNX', 'TensorRT', 'React', 'Docker'],
    accent: 'blue',
    seed: 33,
    example: true,
    bestFor: ['Manufacturing inspection', 'Yard and site monitoring', 'Quality and safety auditing'],
  },
  {
    slug: 'flowforge-automation',
    name: 'FlowForge',
    tagline: 'Durable automation for business-critical processes.',
    category: 'Automation',
    status: 'Concept',
    description:
      'An automation runtime pattern built around idempotent steps, explicit human checkpoints and exception queues that surface failures instead of swallowing them.',
    features: [
      { title: 'Durable execution', detail: 'Long-running workflows that survive restarts, with retry and dead-letter semantics.' },
      { title: 'Human checkpoints', detail: 'Approval and correction steps with SLA timers and escalation paths.' },
      { title: 'Process observability', detail: 'Cycle time, throughput and exception metrics per process version.' },
      { title: 'Connectors', detail: 'Event-driven connectors between legacy systems and modern services.' },
    ],
    technology: ['TypeScript', 'Node.js', 'Python', 'Temporal', 'PostgreSQL', 'RabbitMQ', 'React'],
    accent: 'lime',
    seed: 51,
    example: true,
    bestFor: ['Document-heavy processes', 'Exception-rich workflows', 'Legacy system integration'],
  },
  {
    slug: 'insight-warehouse',
    name: 'InsightMesh',
    tagline: 'A governed data layer with one definition per metric.',
    category: 'Data & Analytics',
    status: 'Concept',
    description:
      'A data platform pattern where definitions, quality tests and ownership live in the model — so disagreements about numbers get resolved once instead of in every spreadsheet.',
    features: [
      { title: 'Semantic layer', detail: 'Metrics defined once and reused by every dashboard, API and model downstream.' },
      { title: 'Quality tests', detail: 'Freshness, volume and relationship tests run on every model build.' },
      { title: 'Row-level security', detail: 'Access policy expressed in the model, not applied as a downstream filter.' },
      { title: 'Lineage', detail: 'Column-level lineage from source system to every published metric.' },
    ],
    technology: ['SQL', 'Python', 'dbt', 'Airflow', 'Snowflake', 'BigQuery', 'PostgreSQL', 'Power BI'],
    accent: 'blue',
    seed: 67,
    example: true,
    bestFor: ['Platform migrations', 'Regulatory reporting', 'Self-serve analytics enablement'],
  },
  {
    slug: 'agent-runtime',
    name: 'AgentRuntime',
    tagline: 'Bounded, traceable autonomy for tool-using systems.',
    category: 'AI Agents',
    status: 'Concept',
    description:
      'A control-loop pattern for agents: a small typed tool surface, explicit budgets, mandatory approval for irreversible actions and a step-by-step trace for every run.',
    features: [
      { title: 'Typed tool surface', detail: 'A narrow, validated interface over internal systems rather than open-ended access.' },
      { title: 'Budgets and allow-lists', detail: 'Hard limits on time, spend and reachable systems, with a kill switch.' },
      { title: 'Trace and replay', detail: 'Every step recorded and replayable for debugging and audit.' },
      { title: 'Escalation', detail: 'Confidence thresholds that route work to a human rather than guessing.' },
    ],
    technology: ['Python', 'TypeScript', 'LangGraph', 'Model Context Protocol', 'FastAPI', 'PostgreSQL', 'Redis'],
    accent: 'mixed',
    seed: 83,
    example: true,
    bestFor: ['Support resolution', 'Research and briefing', 'Multi-system operations'],
  },
];

export function getProduct(slug: string | undefined): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export const PRODUCT_CATEGORIES = Array.from(new Set(PRODUCTS.map((product) => product.category)));
