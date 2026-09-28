export interface Industry {
  slug: string;
  name: string;
  icon: string;
  /** Short positioning line shown on the card. */
  tagline: string;
  description: string;
  /** Three to four concrete AI applications for this sector. */
  applications: string[];
  /** Representative regulatory or technical constraints. */
  considerations: string[];
  metrics: string[];
  accentIndex: number;
}

export const INDUSTRIES: Industry[] = [
  {
    slug: 'education',
    name: 'Education',
    icon: 'GraduationCap',
    tagline: 'Personalised learning paths at institutional scale.',
    description:
      'Adaptive assessment, content recommendation and administrative automation for education providers and edtech platforms — built around measurement, not hype.',
    applications: [
      'Adaptive learning and mastery modelling',
      'Automated grading and rubric feedback',
      'Early-warning dropout and engagement signals',
      'Content and assessment generation with review',
    ],
    considerations: [
      'Student data privacy and consent',
      'Bias review in assessment models',
      'Accessibility requirements for all learners',
      'Academic integrity and provenance',
    ],
    metrics: ['Learning outcomes', 'Completion rates', 'Grading turnaround', 'Support ticket volume'],
    accentIndex: 0,
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    icon: 'HeartPulse',
    tagline: 'Clinical and operational intelligence with strict boundaries.',
    description:
      'Decision support, imaging assistance and administrative automation for healthcare organisations — designed so a clinician always remains accountable for the outcome.',
    applications: [
      'Medical imaging triage and assistance',
      'Clinical documentation and coding support',
      'Patient flow and capacity forecasting',
      'Prior authorisation and records automation',
    ],
    considerations: [
      'Clinical validation and human oversight',
      'HIPAA / data residency requirements',
      'Model traceability for regulated review',
      'Bias across patient populations',
    ],
    metrics: ['Documentation time', 'Read turnaround', 'Capacity utilisation', 'Administrative cost'],
    accentIndex: 1,
  },
  {
    slug: 'retail',
    name: 'Retail',
    icon: 'Store',
    tagline: 'Forecasting, personalisation and loss prevention.',
    description:
      'Demand forecasting, recommendation, pricing and visual auditing for retailers and commerce brands operating across physical and digital channels.',
    applications: [
      'Demand and replenishment forecasting',
      'Personalised ranking and recommendations',
      'Shelf and planogram auditing via vision',
      'Dynamic pricing and promotion optimisation',
    ],
    considerations: [
      'Seasonality and promotional lift',
      'Cold-start and sparse SKU data',
      'Real-time inference at store scale',
      'Explainability for pricing decisions',
    ],
    metrics: ['Forecast accuracy', 'Stock-out rate', 'Basket size', 'Markdown exposure'],
    accentIndex: 2,
  },
  {
    slug: 'finance',
    name: 'Finance',
    icon: 'Landmark',
    tagline: 'Risk, compliance and document intelligence at scale.',
    description:
      'Risk modelling, fraud detection, document intelligence and reporting automation for financial services — engineered for auditability and regulatory review.',
    applications: [
      'Fraud and anomaly detection',
      'Credit and counterparty risk scoring',
      'KYC, AML and document review',
      'Regulatory reporting automation',
    ],
    considerations: [
      'Model risk management and documentation',
      'Explainability requirements',
      'Data lineage for audit',
      'Strict segregation of duties',
    ],
    metrics: ['False positive rate', 'Review cycle time', 'Loss rate', 'Reporting effort'],
    accentIndex: 3,
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    icon: 'Factory',
    tagline: 'Visual quality, predictive maintenance and process control.',
    description:
      'Machine vision inspection, predictive maintenance and process optimisation for production environments where downtime and defect rate carry real cost.',
    applications: [
      'Automated visual defect inspection',
      'Predictive maintenance on critical assets',
      'Process parameter optimisation',
      'Yield and energy analysis',
    ],
    considerations: [
      'Real-time line-speed inference',
      'Harsh lighting and physical environments',
      'Edge deployment and offline operation',
      'Safety-critical change control',
    ],
    metrics: ['Defect rate', 'Unplanned downtime', 'Overall equipment effectiveness', 'Scrap'],
    accentIndex: 4,
  },
  {
    slug: 'logistics',
    name: 'Logistics',
    icon: 'Truck',
    tagline: 'Network visibility and autonomous routing decisions.',
    description:
      'Route optimisation, ETA prediction, yard visibility and document automation for carriers, 3PLs and distribution networks.',
    applications: [
      'Dynamic route and capacity optimisation',
      'ETA and delay prediction',
      'Proof of delivery and invoice matching',
      'Yard and dock vision monitoring',
    ],
    considerations: [
      'Real-time data and event latency',
      'Multi-stop and constraint-heavy planning',
      'Data sharing across trading partners',
      'Robustness under disruption',
    ],
    metrics: ['On-time delivery', 'Cost per shipment', 'Dwell time', 'Empty miles'],
    accentIndex: 5,
  },
  {
    slug: 'enterprise',
    name: 'Enterprise',
    icon: 'Building2',
    tagline: 'Internal intelligence across departments and systems.',
    description:
      'Knowledge assistants, process automation and a trusted data layer for large organisations running many systems with fragmented information.',
    applications: [
      'Enterprise knowledge assistants',
      'Document and contract intelligence',
      'Cross-system process automation',
      'Unified executive reporting',
    ],
    considerations: [
      'Identity and access across systems',
      'Data residency and sovereignty',
      'Change management and adoption',
      'Legacy integration constraints',
    ],
    metrics: ['Time to information', 'Process cycle time', 'Manual effort', 'Adoption rate'],
    accentIndex: 6,
  },
  {
    slug: 'saas',
    name: 'SaaS',
    icon: 'Package',
    tagline: 'AI features that measurably move product metrics.',
    description:
      'Embedded AI features, product analytics and support automation for software companies — shipped as production engineering, not prototypes.',
    applications: [
      'Embedded AI features and copilots',
      'Natural-language product analytics',
      'Support triage and resolution agents',
      'Churn signals and expansion scoring',
    ],
    considerations: [
      'Inference cost per active user',
      'Latency budgets in interactive paths',
      'Cold-start for new accounts',
      'Safe handling of tenant data',
    ],
    metrics: ['Feature adoption', 'Retention', 'Support resolution time', 'Gross margin impact'],
    accentIndex: 7,
  },
];

export function getIndustry(slug: string | undefined): Industry | undefined {
  return INDUSTRIES.find((industry) => industry.slug === slug);
}
