/**
 * Case studies.
 *
 * IMPORTANT — placeholder content.
 * These entries document *structure and approach only*. No real Trisentri AI
 * client, engagement, metric or testimonial is represented here. Every record
 * carries `placeholder: true`, which renders a visible disclosure banner in the
 * UI, and the `results` field is scoped as *targets agreed at discovery* rather
 * than achieved outcomes.
 *
 * To publish real work: replace the fields below and set `placeholder: false`.
 */

export interface CaseStudyMetric {
  label: string;
  /** Target or measured value. Prefixed with a tilde for target ranges. */
  value: string;
  note: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  /** Sector label. */
  industry: string;
  industrySlug: string;
  /** Composable archetype, e.g. "Retail · Forecasting". */
  archetype: string;
  summary: string;
  /** Two-sentence overview used at the top of the detail page. */
  overview: string;
  challenge: string[];
  approach: { title: string; detail: string }[];
  solution: { title: string; detail: string }[];
  architecture: { layer: string; components: string[]; detail: string }[];
  technology: string[];
  results: CaseStudyMetric[];
  /** Screenshots are represented as labelled placeholders, not fake images. */
  visuals: { caption: string; kind: 'dashboard' | 'pipeline' | 'model' | 'mobile' }[];
  duration: string;
  team: string;
  relatedSlugs: string[];
  placeholder: true;
  featured: boolean;
  year: number;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'retail-demand-forecasting',
    title: 'Multi-region demand forecasting for a retail network',
    industry: 'Retail',
    industrySlug: 'retail',
    archetype: 'Retail · Forecasting',
    summary:
      'A hierarchical forecasting system that replaced manual planning across hundreds of locations, with promotions and seasonality handled explicitly.',
    overview:
      'Planning teams were maintaining spreadsheets across hundreds of locations, each with its own judgement calls. The engagement built a hierarchical forecasting service that models store, region and network levels together, with promotional lift modelled as a first-class input rather than a manual override.',
    challenge: [
      'Demand was forecast manually in spreadsheets, with no shared methodology between regions.',
      'Promotional periods broke historical patterns, so models had to be hand-corrected every cycle.',
      'Replenishment decisions were made against forecasts that planners did not fully trust.',
      'No mechanism existed to tell whether a forecast change came from data or from a manual override.',
    ],
    approach: [
      {
        title: 'Process mapping before modelling',
        detail:
          'We documented the actual planning cycle, including the workarounds planners had invented, before choosing any algorithm. Two of those workarounds turned out to be better signals than the transactional data.',
      },
      {
        title: 'Hierarchical reconciliation',
        detail:
          'Forecasts are produced at store level and reconciled upward so every level sums consistently. Store planners see their own location; regional planners see the aggregate without contradicting it.',
      },
      {
        title: 'Promotion as a first-class input',
        detail:
          'Rather than letting models treat a promotion as noise, promotion type, depth and duration are explicit features, giving the model a pattern to learn instead of an anomaly to chase.',
      },
      {
        title: 'Shadow deployment before handover',
        detail:
          'The service ran in parallel with the existing spreadsheet process for a full planning cycle, so accuracy claims were measured against a live baseline rather than a historical backtest alone.',
      },
    ],
    solution: [
      {
        title: 'Forecasting service',
        detail:
          'A containerised service that produces store-level forecasts with prediction intervals, exposed through a typed API and a scheduler for monthly and weekly cycles.',
      },
      {
        title: 'Planner workspace',
        detail:
          'An interface that shows the forecast, its confidence range, the drivers behind it, and lets planners record overrides with a reason code that feeds the next training cycle.',
      },
      {
        title: 'Drift and accuracy monitoring',
        detail:
          'Per-location error tracking with alerting when a location degrades beyond tolerance, so regressions surface before they reach a replenishment decision.',
      },
    ],
    architecture: [
      {
        layer: 'Data',
        components: ['Point-of-sale', 'Inventory', 'Promotion calendar', 'Weather (optional)'],
        detail: 'Daily batch ingestion with freshness and volume tests on every source before the model ever sees the data.',
      },
      {
        layer: 'Modelling',
        components: ['Global model', 'Per-series reconciliation', 'Promotion features'],
        detail: 'A single global model with hierarchical reconciliation layers, retrained on a scheduled cadence with full lineage.',
      },
      {
        layer: 'Serving',
        components: ['FastAPI', 'Scheduled jobs', 'Prediction store'],
        detail: 'Typed API with cached responses for the planner workspace and a batch endpoint for the replenishment system.',
      },
      {
        layer: 'Interface',
        components: ['React workspace', 'Regional dashboards', 'Override capture'],
        detail: 'Role-scoped views with the confidence interval always visible alongside the point forecast.',
      },
      {
        layer: 'Observability',
        components: ['Error tracking', 'Accuracy metrics', 'Drift alerts'],
        detail: 'Location-level accuracy tracked continuously, with alerting thresholds agreed with the planning team.',
      },
    ],
    technology: ['Python', 'PyTorch', 'MLflow', 'FastAPI', 'PostgreSQL', 'Airflow', 'React', 'TypeScript', 'Grafana'],
    results: [
      { label: 'Forecast error reduction', value: '~20–30%', note: 'Target agreed at discovery, measured against the incumbent spreadsheet process.' },
      { label: 'Planning cycle time', value: 'Days → hours', note: 'Target outcome for automated generation and reconciliation.' },
      { label: 'Locations covered', value: 'All sites', note: 'Scope objective — no location left on a manual process.' },
      { label: 'Override visibility', value: '100%', note: 'Every manual adjustment captured with a reason code.' },
    ],
    visuals: [
      { caption: 'Planner workspace — regional demand overview with confidence bands', kind: 'dashboard' },
      { caption: 'Data pipeline and freshness monitoring', kind: 'pipeline' },
      { caption: 'Model evaluation against the incumbent baseline', kind: 'model' },
    ],
    duration: '6 months',
    team: 'Cross-functional squad',
    relatedSlugs: ['manufacturing-defect-inspection', 'saas-support-automation'],
    placeholder: true,
    featured: true,
    year: 2025,
  },
  {
    slug: 'manufacturing-defect-inspection',
    title: 'Vision-based defect inspection on a production line',
    industry: 'Manufacturing',
    industrySlug: 'manufacturing',
    archetype: 'Manufacturing · Computer Vision',
    summary:
      'An edge-deployed inspection model that flags likely defects at line speed, with low-confidence frames routed to a human reviewer.',
    overview:
      'Manual visual inspection was the bottleneck on a high-volume line, with quality escaping to customers. The engagement built a detection model trained on site-specific imagery and deployed to edge hardware, designed around a human review loop rather than full autonomy.',
    challenge: [
      'Inspection throughput capped by available operators, limiting achievable line speed.',
      'Subtle defects that trained inspectors miss under production pressure.',
      'Variable lighting and reflective surfaces made general-purpose models unreliable.',
      'Full manual replacement of inspectors was both unsafe and operationally unacceptable.',
    ],
    approach: [
      {
        title: 'Capture strategy first',
        detail:
          'Camera placement, lens selection, lighting and frame rate were settled on the line with operators before a single label was created. Capture quality determined the achievable model ceiling.',
      },
      {
        title: 'Active labelling',
        detail:
          'A small seed set was labelled to bootstrap the model, then the deployed system selected the most informative frames for human review — annotation effort went to genuinely hard cases.',
      },
      {
        title: 'Edge optimisation',
        detail:
          'The model was exported to ONNX, quantised and benchmarked on the target hardware until inference fit inside the frame budget at production line speed.',
      },
      {
        title: 'Confidence-gated human review',
        detail:
          'Frames below the agreed confidence threshold are routed to an operator with the model overlay attached. The system escalates rather than guesses.',
      },
    ],
    solution: [
      {
        title: 'Detection service',
        detail: 'A quantised detector running on edge hardware, streaming results with bounding boxes and calibrated confidence over a local network.',
      },
      {
        title: 'Review console',
        detail: 'An operator interface for the low-confidence queue, with one-click accept/reject feeding the active learning loop.',
      },
      {
        title: 'Line analytics',
        detail: 'Defect type, location and frequency analytics to surface process drift that manual logs never captured.',
      },
    ],
    architecture: [
      {
        layer: 'Capture',
        components: ['Industrial cameras', 'Lighting rig', 'Trigger system'],
        detail: 'Hardware-in-the-loop capture at the line, with a dedicated lighting arrangement for reflective surfaces.',
      },
      {
        layer: 'Training',
        components: ['Ultralytics YOLO', 'Active learning loop', 'Augmentation pipeline'],
        detail: 'Site-specific training with augmentation tuned to the actual variability observed on the line.',
      },
      {
        layer: 'Deployment',
        components: ['ONNX Runtime', 'TensorRT', 'Edge device'],
        detail: 'Quantised export benchmarked against the frame budget, running locally with no cloud dependency.',
      },
      {
        layer: 'Review',
        components: ['React console', 'Override capture', 'Reviewer feedback loop'],
        detail: 'Confidence-gated queue where every reviewer decision becomes a labelled sample.',
      },
      {
        layer: 'Observability',
        components: ['Accuracy tracking', 'Latency metrics', 'Drift alerts'],
        detail: 'Continuous accuracy per defect class, with alerting when a class degrades below the agreed floor.',
      },
    ],
    technology: ['Python', 'PyTorch', 'Ultralytics', 'OpenCV', 'ONNX', 'TensorRT', 'React', 'TypeScript', 'Docker'],
    results: [
      { label: 'Throughput increase', value: '2–3×', note: 'Target outcome for inspection capacity per shift.' },
      { label: 'Human review load', value: 'Reduced', note: 'Only low-confidence frames reach an operator — target design outcome.' },
      { label: 'Inference budget', value: 'Sub-frame', note: 'Engineered constraint: inference must complete inside one frame interval.' },
      { label: 'Line analytics', value: 'New capability', note: 'Defect frequency and location trends that were previously unrecorded.' },
    ],
    visuals: [
      { caption: 'Detection overlay with calibrated confidence scores', kind: 'model' },
      { caption: 'Operator review console for low-confidence frames', kind: 'dashboard' },
      { caption: 'Edge deployment pipeline and latency telemetry', kind: 'pipeline' },
    ],
    duration: '5 months',
    team: 'Cross-functional squad',
    relatedSlugs: ['retail-demand-forecasting', 'logistics-yard-visibility'],
    placeholder: true,
    featured: true,
    year: 2025,
  },
  {
    slug: 'saas-support-automation',
    title: 'Grounded support automation for a B2B SaaS platform',
    industry: 'SaaS',
    industrySlug: 'saas',
    archetype: 'SaaS · Generative AI',
    summary:
      'A retrieval-grounded assistant that resolves common product questions with cited answers and hands off anything outside its confidence.',
    overview:
      'Support volume was growing faster than the team, with a large share of tickets asking the same product questions. The engagement built a grounded assistant over product documentation and prior resolved tickets, with a scored evaluation set and a hard handoff to a human when confidence dropped.',
    challenge: [
      'A high share of tickets were repetitive product questions already answered in documentation.',
      'Existing macro replies were frequently wrong for the customer\'s specific configuration.',
      'No way to know whether a generated answer was grounded or plausible-sounding.',
      'Hallucinated answers would be worse than a slow escalation, given the trust cost.',
    ],
    approach: [
      {
        title: 'Grounding over generation',
        detail:
          'Every answer is retrieved from versioned documentation and resolved ticket history, with citations shown to the customer and the agent. Unretrieved answers are not sent.',
      },
      {
        title: 'Evaluation set before the interface',
        detail:
          'A scored set of representative questions and expected answers was built first, so quality became a measurable number rather than an opinion gathered after launch.',
      },
      {
        title: 'Confidence-gated handoff',
        detail:
          'Below a tuned retrieval and generation threshold, the ticket goes to a human with the retrieved context already attached so the agent starts from a head start.',
      },
      {
        title: 'Feedback as a training signal',
        detail:
          'Every escalation and every agent correction is captured as a labelled example and fed back into the evaluation set weekly.',
      },
    ],
    solution: [
      {
        title: 'Retrieval layer',
        detail: 'Hybrid keyword and vector search over documentation and resolved tickets, with permission-aware filtering and re-ranking.',
      },
      {
        title: 'Assistant service',
        detail: 'A generation layer that answers only from retrieved context, attaches citations, and emits a structured confidence signal.',
      },
      {
        title: 'Agent workspace',
        detail: 'A support console where draft answers are editable, and edits become evaluation data rather than being thrown away.',
      },
      {
        title: 'Quality dashboard',
        detail: 'Groundedness, citation validity, resolution and escalation rates tracked continuously per question category.',
      },
    ],
    architecture: [
      {
        layer: 'Knowledge',
        components: ['Documentation', 'Resolved tickets', 'Product metadata'],
        detail: 'Versioned sources with re-indexing on publish, so the assistant never cites a retired page.',
      },
      {
        layer: 'Retrieval',
        components: ['pgvector', 'Hybrid search', 'Re-ranker'],
        detail: 'Vector plus keyword retrieval with re-ranking, filtered by the requester\'s entitlements.',
      },
      {
        layer: 'Generation',
        components: ['LLM API', 'Citation enforcement', 'Policy checks'],
        detail: 'Generation constrained to retrieved context, with post-generation grounding verification.',
      },
      {
        layer: 'Interface',
        components: ['Customer widget', 'Agent console', 'Escalation queue'],
        detail: 'Customer-facing answers with citations; agent-facing drafts with inline correction capture.',
      },
      {
        layer: 'Evaluation',
        components: ['Eval dataset', 'Groundedness scoring', 'Regression suite'],
        detail: 'A weekly regression run against the growing evaluation set blocks regressions before release.',
      },
    ],
    technology: ['TypeScript', 'Node.js', 'Python', 'pgvector', 'PostgreSQL', 'OpenAI', 'LangChain', 'React', 'Redis'],
    results: [
      { label: 'Repetitive ticket deflection', value: 'Target set at discovery', note: 'Measured on category level once baseline volume stabilises.' },
      { label: 'Answer groundedness', value: 'Enforced', note: 'Design guarantee — ungrounded answers are blocked, not merely flagged.' },
      { label: 'Citation coverage', value: '100% of answers', note: 'Every generated answer carries its source references.' },
      { label: 'Evaluation cadence', value: 'Weekly regression', note: 'Structural outcome: quality is continuously measurable.' },
    ],
    visuals: [
      { caption: 'Customer-facing answer with source citations', kind: 'dashboard' },
      { caption: 'Agent workspace with correction capture', kind: 'dashboard' },
      { caption: 'Evaluation and groundedness dashboard', kind: 'model' },
    ],
    duration: '4 months',
    team: 'Cross-functional squad',
    relatedSlugs: ['enterprise-knowledge-assistant', 'finance-document-review'],
    placeholder: true,
    featured: true,
    year: 2026,
  },
  {
    slug: 'healthcare-imaging-triage',
    title: 'Imaging triage assistance for a diagnostic imaging network',
    industry: 'Healthcare',
    industrySlug: 'healthcare',
    archetype: 'Healthcare · Computer Vision',
    summary:
      'A prioritisation assist that surfaces time-critical studies for earlier review, with the reporting radiologist remaining fully responsible.',
    overview:
      'Worklist prioritisation was largely manual, meaning urgent studies were found by radiologists scanning a long queue. The engagement built a triage assist that orders the worklist and surfaces likely findings for review, with explicit design boundaries on what the model is allowed to do.',
    challenge: [
      'Urgent studies were identified by radiologists scanning a long, unprioritised worklist.',
      'Any false negative carries direct clinical consequence, so error asymmetry mattered more than raw accuracy.',
      'The model would support a regulated decision and must be documentable and traceable.',
      'Existing viewers could not be modified, so integration had to work through existing systems.',
    ],
    approach: [
      {
        title: 'Define the boundary first',
        detail:
          'The model prioritises the queue and flags studies. It never produces a diagnosis and never closes a study. That boundary was agreed with clinical governance before any training began.',
      },
      {
        title: 'Optimise for the error that matters',
        detail:
          'Evaluation prioritised sensitivity on time-critical classes over overall accuracy, because the cost of a miss is not symmetric with the cost of a false flag.',
      },
      {
        title: 'Full traceability',
        detail:
          'Every prioritisation decision is stored with the model version, input hash and confidence, so any past study can be reconstructed for review.',
      },
      {
        title: 'Shadow before clinical use',
        detail:
          'The system ranked the worklist in shadow mode and was compared against radiologist ordering before it influenced any clinical queue.',
      },
    ],
    solution: [
      {
        title: 'Triage service', detail: 'A prioritisation service producing a ranked worklist with calibrated urgency scores per study.' },
      {
        title: 'Viewer integration', detail: 'Findings surfaced through the existing viewer workflow without requiring a new application.' },
      {
        title: 'Governance layer', detail: 'Model versioning, approval records, drift monitoring and an auditable decision log.' },
      { title: 'Monitoring', detail: 'Continuous review of sensitivity, override rate and disagreement patterns by site and class.' },
    ],
    architecture: [
      { layer: 'Ingress', components: ['DICOM gateway', 'Study metadata'], detail: 'Studies normalised and de-identified at the boundary before storage.' },
      { layer: 'Model', components: ['CNN classifier', 'Calibration layer'], detail: 'Calibration ensures scores are comparable across sites and acquisition devices.' },
      { layer: 'Serving', components: ['Inference service', 'Queue integration'], detail: 'Latency budgeted below the worklist refresh interval; failure leaves the existing queue untouched.' },
      { layer: 'Interface', components: ['Viewer overlay', 'Priority list'], detail: 'Surfaces in the workflow the radiologist already uses, with the model confidence visible.' },
      { layer: 'Governance', components: ['Decision log', 'Model registry', 'Override tracking'], detail: 'Every ranking and every override is recorded and reviewable.' },
    ],
    technology: ['Python', 'PyTorch', 'MONAI', 'FastAPI', 'PostgreSQL', 'Docker', 'Kubernetes', 'Grafana'],
    results: [
      { label: 'Urgent study surfacing', value: 'Design outcome', note: 'Time-critical studies surfaced earlier in the queue — the primary objective.' },
      { label: 'Sensitivity on critical classes', value: 'Optimised for', note: 'Evaluated asymmetrically, prioritising misses over false flags.' },
      { label: 'Decision traceability', value: 'Full', note: 'Model version, inputs and confidence stored for every ranking decision.' },
      { label: 'Regulatory readiness', value: 'Structured', note: 'Versioning and approval records designed for clinical governance review.' },
    ],
    visuals: [
      { caption: 'Prioritised worklist with confidence indicators', kind: 'dashboard' },
      { caption: 'Viewer overlay and reporting integration', kind: 'dashboard' },
      { caption: 'Governance and drift monitoring', kind: 'pipeline' },
    ],
    duration: '9 months',
    team: 'Cross-functional squad',
    relatedSlugs: ['manufacturing-defect-inspection', 'enterprise-knowledge-assistant'],
    placeholder: true,
    featured: false,
    year: 2025,
  },
  {
    slug: 'logistics-yard-visibility',
    title: 'Yard and dock visibility for a distribution network',
    industry: 'Logistics',
    industrySlug: 'logistics',
    archetype: 'Logistics · Computer Vision',
    summary:
      'Camera-based dock and yard monitoring that replaced clipboard-based status tracking with a live operational picture.',
    overview:
      'Yard and dock status was tracked manually, making dwell time and congestion invisible until they became a problem. The engagement deployed a vision system across dock doors to produce a live, accurate status picture feeding planning systems.',
    challenge: [
      'Dock and yard status was recorded manually, with reporting lagging reality by hours.',
      'Dwell time and congestion were only visible after they had already cost money.',
      'A fixed camera estate already existed but produced no usable data.',
      'Sites operated on unreliable connectivity, so processing had to work locally.',
    ],
    approach: [
      {
        title: 'Reuse existing hardware',
        detail:
          'The camera estate was already installed. The engagement was about turning those feeds into structured state, not replacing equipment.',
      },
      {
        title: 'State, not objects',
        detail:
          'The model classifies discrete operational states per door — occupied, loading, idle, blocked — because that is the signal planning systems actually need.',
      },
      {
        title: 'Local-first processing',
        detail: 'Inference runs on site with buffered event sync, so a network outage degrades reporting rather than losing visibility.',
      },
      {
        title: 'Ground truth in operations', detail: 'Dock-level status was reconciled against the existing TMS for an initial period to validate accuracy before handover.' },
    ],
    solution: [
      { title: 'State detection service', detail: 'Per-door state classification with dwell timers and event emission.' },
      { title: 'Operations dashboard', detail: 'Live yard and dock picture with congestion, dwell and throughput views.' },
      { title: 'TMS integration', detail: 'Events written back to the transport management system through an event API.' },
      { title: 'Site health monitoring', detail: 'Camera and edge device uptime, so a silent failure is detected rather than assumed.' },
    ],
    architecture: [
      { layer: 'Capture', components: ['Fixed cameras', 'Edge devices'], detail: 'Existing hardware re-purposed; per-site configuration for lighting conditions.' },
      { layer: 'Inference', components: ['State classifier', 'Local buffer'], detail: 'On-device inference with buffered event sync for intermittent connectivity.' },
      { layer: 'Events', components: ['Event bus', 'Dwell timer service'], detail: 'State transitions become durable events with site and door identifiers.' },
      { layer: 'Interface', components: ['Yard dashboard', 'Alerting'], detail: 'Live operational picture with alerting on abnormal dwell and blocked doors.' },
      { layer: 'Integration', components: ['TMS connector', 'Reporting API'], detail: 'Events and rollups written back to existing systems rather than creating a new silo.' },
    ],
    technology: ['Python', 'PyTorch', 'OpenCV', 'ONNX', 'Docker', 'Kubernetes', 'PostgreSQL', 'React', 'TypeScript'],
    results: [
      { label: 'Status reporting latency', value: 'Hours → live', note: 'Design outcome: state available as it happens rather than at end of shift.' },
      { label: 'Dwell visibility', value: 'Continuous', note: 'Historical dwell analysis was not previously possible.' },
      { label: 'Connectivity dependency', value: 'Local-first', note: 'Sites continue operating through network outages.' },
      { label: 'Hardware change', value: 'None required', note: 'Reused the installed camera estate.' },
    ],
    visuals: [
      { caption: 'Live yard and dock operations view', kind: 'dashboard' },
      { caption: 'Per-door state detection and dwell timers', kind: 'model' },
      { caption: 'Edge pipeline and device health', kind: 'pipeline' },
    ],
    duration: '7 months',
    team: 'Cross-functional squad',
    relatedSlugs: ['manufacturing-defect-inspection', 'retail-demand-forecasting'],
    placeholder: true,
    featured: false,
    year: 2024,
  },
  {
    slug: 'finance-document-review',
    title: 'Document and compliance review for a financial services group',
    industry: 'Finance',
    industrySlug: 'finance',
    archetype: 'Finance · Generative AI',
    summary:
      'An extraction and review pipeline for regulatory documentation, with complete lineage from source document to reviewer decision.',
    overview:
      'Compliance review depended on manual reading of high volumes of regulatory documents and client submissions. The engagement built an extraction and classification pipeline that prepares cases for a reviewer, with the reviewer remaining the decision-maker and every output traceable to its source.',
    challenge: [
      'High-volume document review was the dominant manual cost in a control function.',
      'Regulatory requirements demand a defensible audit trail for every decision.',
      'Client submissions arrived in inconsistent formats and quality levels.',
      'A model-assisted error would carry regulatory consequence, so escalation had to be easy.',
    ],
    approach: [
      {
        title: 'Extraction before judgement',
        detail:
          'The pipeline reliably extracts and structures fields first. Classification and review suggestions are layered on top of accurate extraction, not on top of raw scans.',
      },
      {
        title: 'Reviewer stays in control',
        detail:
          'The system assembles a case with source excerpts highlighted. A human approves or rejects. There is no fully automated compliance decision in the loop.',
      },
      {
        title: 'Lineage by construction',
        detail:
          'Every extracted field retains a pointer to its source span, so any conclusion can be traced back to the exact text that produced it.',
      },
      {
        title: 'Format robustness',        detail: 'A confidence score per field drives a routing rule: confident extractions go straight through, uncertain ones are queued for correction before review.' },
    ],
    solution: [
      { title: 'Extraction pipeline', detail: 'Layout-aware parsing producing structured, typed fields with per-field confidence.' },
      { title: 'Case assembly', detail: 'A review workspace presenting the document, extracted fields and highlighted source spans together.' },
      { title: 'Rule and policy engine', detail: 'Deterministic policy checks applied to extracted data before the reviewer sees the case.' },
      { title: 'Audit export', detail: 'Complete decision lineage exported for internal audit and regulatory examination.' },
    ],
    architecture: [
      { layer: 'Ingest', components: ['Document gateway', 'Format normalisation', 'OCR where required'], detail: 'Inconsistent inputs normalised at the boundary with OCR as fallback for scanned material.' },
      { layer: 'Extraction', components: ['Layout parser', 'Field models', 'Confidence scoring'], detail: 'Per-field confidence drives the routing decision between straight-through and correction.' },
      { layer: 'Policy', components: ['Rule engine', 'Reference data'], detail: 'Deterministic checks applied before any model suggestion reaches a reviewer.' },
      { layer: 'Review', components: ['Case workspace', 'Source highlighting', 'Decision capture'], detail: 'Reviewer decision captured with rationale and linked to the source span.' },
      { layer: 'Audit', components: ['Immutable log', 'Lineage export', 'Retention policy'], detail: 'Tamper-evident decision record retained per the organisation\'s policy.' },
    ],
    technology: ['Python', 'LayoutParser', 'PyTorch', 'PostgreSQL', 'dbt', 'React', 'TypeScript', 'AWS'],
    results: [
      { label: 'Reviewer focus', value: 'Design outcome', note: 'Reviewers spend time on exceptions rather than first-pass data entry.' },
      { label: 'Field-level lineage', value: 'Complete', note: 'Every extracted field traces to its exact source span.' },
      { label: 'Decision model', value: 'Human-approved', note: 'Structural guarantee: no automated compliance decisions.' },
      { label: 'Audit readiness', value: 'Exportable', note: 'Decision records prepared for examination without manual reconstruction.' },
    ],
    visuals: [
      { caption: 'Case review workspace with source highlighting', kind: 'dashboard' },
      { caption: 'Extraction pipeline and field confidence', kind: 'pipeline' },
      { caption: 'Audit lineage view', kind: 'model' },
    ],
    duration: '8 months',
    team: 'Cross-functional squad',
    relatedSlugs: ['saas-support-automation', 'healthcare-imaging-triage'],
    placeholder: true,
    featured: false,
    year: 2025,
  },
  {
    slug: 'enterprise-knowledge-assistant',
    title: 'Unified knowledge assistant across an enterprise estate',
    industry: 'Enterprise',
    industrySlug: 'enterprise',
    archetype: 'Enterprise · Generative AI',
    summary:
      'A permission-aware internal assistant that answers policy, process and product questions across dozens of systems.',
    overview:
      'Employees could not find answers without knowing which system held them. The engagement built a retrieval layer spanning internal sources with the requester\'s permissions applied at query time, so nobody sees content they are not entitled to.',
    challenge: [
      'Critical answers were distributed across many systems with no unified search.',
      'Answers frequently required assembling several documents rather than finding one.',
      'Content access control is complex, and the assistant had to respect it exactly.',
      'Answers changed over time, so stale content was a genuine correctness risk.',
    ],
    approach: [
      {
        title: 'Permissions at query time',
        detail:
          'Entitlements are evaluated during retrieval, not filtered afterwards. A user without access never has the text in the context window at all.',
      },
      {
        title: 'Freshness as a ranking signal',
        detail: 'Recency and ownership metadata influence ranking, so retired procedures stop being the top answer for current questions.' },
      {
        title: 'Answer or abstain',        detail: 'When retrieval is weak, the assistant says so and links to the source system rather than assembling a plausible answer.' },
      { title: 'Adoption measured, not assumed', detail: 'Success was defined by questions resolved without escalation, tracked per department from week one.' },
    ],
    solution: [
      { title: 'Unified retrieval', detail: 'Federated search across documentation, tickets, wikis and internal systems with entitlement filtering.' },
      { title: 'Assistant interface', detail: 'Chat and search surfaces with citations, source freshness indicators and an explicit abstain state.' },
      { title: 'Admin console', detail: 'Source onboarding, ownership metadata, indexing health and per-team analytics.' },
      { title: 'Evaluation harness', detail: 'A question set per department that runs as a regression check on every release.' },
    ],
    architecture: [
      { layer: 'Sources', components: ['Documentation', 'Tickets', 'Wikis', 'Internal APIs'], detail: 'Source onboarding with ownership metadata and freshness tracking at ingestion.' },
      { layer: 'Index', components: ['Vector index', 'Keyword index', 'Entitlement store'], detail: 'Dual retrieval with entitlement joins applied during the query.' },
      { layer: 'Answering', components: ['Query planner', 'Generator', 'Abstention logic'], detail: 'Weak retrieval triggers an explicit abstain rather than a generated answer.' },
      { layer: 'Interface', components: ['Search', 'Chat', 'Citations'], detail: 'Every answer carries its source, its date, and a path to the full document.' },
      { layer: 'Governance', components: ['Access audit', 'Question analytics', 'Regression suite'], detail: 'Entitlements logged and analytics reviewed per department for coverage gaps.' },
    ],
    technology: ['Python', 'TypeScript', 'Node.js', 'pgvector', 'PostgreSQL', 'OpenAI', 'React', 'Redis', 'Docker'],
    results: [
      { label: 'Search scope', value: 'Unified', note: 'Design outcome: one query across all onboarded internal sources.' },
      { label: 'Access control', value: 'Query-time enforced', note: 'Structural guarantee: unauthorised content never enters model context.' },
      { label: 'Staleness', value: 'Ranked down', note: 'Freshness metadata influences ranking so retired procedures lose prominence.' },
      { label: 'Abstention', value: 'Explicit', note: 'Weak retrieval produces an honest "not found" instead of a fabricated answer.' },
    ],
    visuals: [
      { caption: 'Assistant with citations and source freshness', kind: 'dashboard' },
      { caption: 'Federated retrieval and entitlement flow', kind: 'pipeline' },
      { caption: 'Per-department coverage analytics', kind: 'model' },
    ],
    duration: '6 months',
    team: 'Cross-functional squad',
    relatedSlugs: ['saas-support-automation', 'finance-document-review'],
    placeholder: true,
    featured: false,
    year: 2025,
  },
];

export const FEATURED_CASE_STUDIES = CASE_STUDIES.filter((study) => study.featured);

export function getCaseStudy(slug: string | undefined): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}

export function getRelatedCaseStudies(slugs: string[]): CaseStudy[] {
  return slugs
    .map((slug) => getCaseStudy(slug))
    .filter((study): study is CaseStudy => Boolean(study));
}

export const CASE_STUDY_SLUGS = CASE_STUDIES.map((study) => study.slug);
