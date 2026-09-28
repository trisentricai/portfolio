/**
 * Technology ecosystem.
 *
 * These are Trisentri AI's engineering capabilities, not a claim of exclusivity
 * or a certification. The copy is deliberately framed as "what we build with".
 */

export interface TechnologyCategory {
  id: TechnologyCategoryId;
  title: string;
  icon: string;
  description: string;
  /** Grouping shown as sub-headings inside the category. */
  groups: { title: string; items: string[] }[];
}

export type TechnologyCategoryId =
  | 'ai'
  | 'machine-learning'
  | 'deep-learning'
  | 'computer-vision'
  | 'generative-ai'
  | 'data-engineering'
  | 'cloud'
  | 'software-engineering';

export const TECHNOLOGY_CATEGORIES: TechnologyCategory[] = [
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    icon: 'BrainCircuit',
    description:
      'Applied AI system design — where a model fits into a workflow, what it is allowed to decide, and how a human stays in control.',
    groups: [
      { title: 'Applied AI', items: ['Applied AI design', 'Decision systems', 'AI governance', 'Human-in-the-loop design'] },
      { title: 'Operations', items: ['MLOps', 'Model registries', 'Feature stores', 'Drift monitoring'] },
      { title: 'Evaluation', items: ['Offline evaluation', 'Shadow deployment', 'Online experimentation', 'Fairness review'] },
    ],
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    icon: 'TrendingUp',
    description:
      'Classical and modern learning methods chosen per problem, benchmarked against a baseline your business already understands.',
    groups: [
      { title: 'Core', items: ['scikit-learn', 'XGBoost', 'LightGBM', 'Statsmodels'] },
      { title: 'Applied', items: ['Time-series forecasting', 'Anomaly detection', 'Ranking models', 'Reinforcement learning'] },
      { title: 'Tooling', items: ['MLflow', 'DVC', 'Feature engineering', 'Experiment tracking'] },
    ],
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning',
    icon: 'Cpu',
    description:
      'Custom architectures, fine-tuning and distillation for problems where pretrained models alone will not reach the required quality.',
    groups: [
      { title: 'Frameworks', items: ['PyTorch', 'TensorFlow', 'JAX', 'Hugging Face Transformers'] },
      { title: 'Training', items: ['Distributed training', 'Mixed precision', 'LoRA fine-tuning', 'Distillation'] },
      { title: 'Serving', items: ['ONNX Runtime', 'TensorRT', 'Triton', 'Quantization'] },
    ],
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision',
    icon: 'ScanEye',
    description:
      'Perception built for real operating conditions — variable lighting, occlusion, motion blur and imperfect capture hardware.',
    groups: [
      { title: 'Core', items: ['OpenCV', 'PyTorch Vision', 'Ultralytics', 'ONNX'] },
      { title: 'Tasks', items: ['Object detection', 'Instance segmentation', 'OCR', 'Pose estimation'] },
      { title: 'Edge', items: ['TensorRT', 'OpenVINO', 'Jetson', 'Raspberry Pi'] },
    ],
  },
  {
    id: 'generative-ai',
    title: 'Generative AI',
    icon: 'Sparkles',
    description:
      'Grounded generation with evaluation. Retrieval, guardrails and traceability built in from the first sprint.',
    groups: [
      { title: 'Models', items: ['OpenAI', 'Anthropic', 'Google Gemini', 'Meta Llama', 'Mistral'] },
      { title: 'Orchestration', items: ['LangChain', 'LangGraph', 'LlamaIndex', 'Model Context Protocol'] },
      { title: 'Retrieval', items: ['pgvector', 'Hybrid search', 'Reranking', 'Query expansion'] },
      { title: 'Quality', items: ['Evaluation harnesses', 'Guardrails', 'Red-teaming', 'Citation tracing'] },
    ],
  },
  {
    id: 'data-engineering',
    title: 'Data Engineering',
    icon: 'Database',
    description:
      'The layer everything else depends on: ingestion, modelling, quality gates and a semantic layer with one definition per metric.',
    groups: [
      { title: 'Languages', items: ['Python', 'SQL', 'Apache Spark', 'dbt'] },
      { title: 'Warehouses', items: ['Snowflake', 'BigQuery', 'PostgreSQL', 'Apache Iceberg'] },
      { title: 'Pipelines', items: ['Apache Airflow', 'dbt', 'Kafka', 'Change Data Capture'] },
      { title: 'Quality', items: ['Data testing', 'Lineage', 'Great Expectations', 'Cataloguing'] },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & Infrastructure',
    icon: 'Cloud',
    description:
      'Infrastructure chosen for reliability and cost, with infrastructure as code and observability that pages the right person.',
    groups: [
      { title: 'Platforms', items: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Kubernetes'] },
      { title: 'Delivery', items: ['Docker', 'Terraform', 'GitHub Actions', 'ArgoCD'] },
      { title: 'Operations', items: ['Prometheus', 'Grafana', 'OpenTelemetry', 'Sentry'] },
      { title: 'Security', items: ['Secrets management', 'IAM design', 'Network isolation', 'Backup & DR'] },
    ],
  },
  {
    id: 'software-engineering',
    title: 'Software Engineering',
    icon: 'Code2',
    description:
      'Product engineering at a standard that survives handover: typed codebases, tested boundaries, and interfaces people can use.',
    groups: [
      { title: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'WebGL / Three.js'] },
      { title: 'Backend', items: ['Node.js', 'Django', 'FastAPI', 'Go', 'GraphQL'] },
      { title: 'Mobile', items: ['React Native', 'Flutter', 'Swift', 'Kotlin'] },
      { title: 'Practice', items: ['Testing strategy', 'CI/CD', 'Design systems', 'Accessibility (WCAG)'] },
    ],
  },
];

/** Flat list of every named technology, used by the marquee and search. */
export const ALL_TECHNOLOGIES: string[] = Array.from(
  new Set(TECHNOLOGY_CATEGORIES.flatMap((category) => category.groups.flatMap((group) => group.items))),
).sort((a, b) => a.localeCompare(b));

/** Compact "Built with modern technology" strip on the home page. */
export interface TechStripItem {
  label: string;
  icon: string;
}

export const TECH_STRIP: TechStripItem[] = [
  { label: 'Artificial Intelligence', icon: 'BrainCircuit' },
  { label: 'Machine Learning', icon: 'TrendingUp' },
  { label: 'Computer Vision', icon: 'ScanEye' },
  { label: 'Generative AI', icon: 'Sparkles' },
  { label: 'Cloud', icon: 'Cloud' },
  { label: 'Data Engineering', icon: 'Database' },
  { label: 'Automation', icon: 'Workflow' },
];

export function getTechnologyCategory(id: string): TechnologyCategory | undefined {
  return TECHNOLOGY_CATEGORIES.find((category) => category.id === id);
}
