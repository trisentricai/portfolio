/**
 * Insights / editorial content.
 *
 * Structure is intentionally block-based (see `ArticleBlock`) so a headless CMS
 * can return the same shape without touching the renderer. Articles are authored
 * as Trisentri AI team pieces — no external authors, clients or results are
 * referenced.
 */

export type ArticleCategory = 'AI' | 'Engineering' | 'Research' | 'Technology';

export type ArticleBlock =
  | { type: 'lead'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'ordered'; items: string[] }
  | { type: 'code'; language: string; code: string }
  | { type: 'callout'; title: string; text: string }
  | { type: 'quote'; text: string; attribution?: string };

export interface Article {
  slug: string;
  title: string;
  dek: string;
  category: ArticleCategory;
  /** Display author. Team bylines keep the content honest and replaceable. */
  author: string;
  authorRole: string;
  /** ISO date. */
  date: string;
  readMinutes: number;
  tags: string[];
  body: ArticleBlock[];
  featured: boolean;
}

export const ARTICLES: Article[] = [
  {
    slug: 'rag-is-a-data-problem',
    title: 'RAG is a data problem before it is a prompt problem',
    dek: 'Most retrieval-augmented generation projects fail on retrieval quality, not generation quality. Fixing the index is nearly always the higher-leverage move.',
    category: 'AI',
    author: 'Trisentri AI · Applied AI',
    authorRole: 'Applied AI practice',
    date: '2026-08-18',
    readMinutes: 8,
    tags: ['RAG', 'Retrieval', 'Evaluation', 'Data engineering'],
    featured: true,
    body: [
      {
        type: 'lead',
        text: 'When a retrieval-augmented generation system produces a wrong answer, the instinct is to blame the model. In our engagements, the model is rarely the problem. Retrieval is.',
      },
      {
        type: 'paragraph',
        text: 'A grounded generation system has two independent failure modes. The generator either does not follow the retrieved context, or the retrieved context did not contain the answer. These look identical to a user, and they have completely different fixes. Most teams measure only the first, because the second requires instrumentation they have not built yet.',
      },
      { type: 'heading', text: 'Measure retrieval separately, always' },
      {
        type: 'paragraph',
        text: 'Retrieval has its own metrics — recall at k, rank of the correct chunk, and the rate at which a question returns nothing usable. Track them independently of generation quality. If recall is poor, no amount of prompt engineering will rescue the answer, and the effort you spend tuning the prompt is wasted.',
      },
      {
        type: 'code',
        language: 'python',
        code: `# Evaluate retrieval in isolation from generation.
# If recall@k is low, generation quality is a downstream symptom.
def retrieval_report(cases, retriever, k=8):
    rows = []
    for case in cases:
        chunks = retriever.search(case.query, k=k)
        ids = {c.source_id for c in chunks}
        ranks = [i for i, c in enumerate(chunks) if c.source_id in case.expected_ids]
        rows.append({
            "query": case.query,
            "recall_at_k": bool(ranks),
            "rank_of_answer": min(ranks) if ranks else None,
            "returned_anything": bool(chunks),
        })
    return summarise(rows)`,
      },
      { type: 'heading', text: 'The four retrieval failures we see most' },
      {
        type: 'ordered',
        items: [
          'Chunking that splits a fact across two windows, so neither window answers the question alone.',
          'Embeddings that were never re-indexed after the source content changed, so the index silently drifts from the source of truth.',
          'Hybrid search that is configured for keyword only, missing semantically similar phrasing.',
          'No abstention path, so a weak retrieval result is dressed up in confident language.',
        ],
      },
      {
        type: 'callout',
        title: 'The cheapest high-impact fix',
        text: 'Most retrieval quality problems we see are fixed by re-indexing, not by re-architecting. If the index has not been rebuilt since the corpus changed, start there before anything else.',
      },
      { type: 'heading', text: 'Chunking is a design decision, not a default' },
      {
        type: 'paragraph',
        text: 'The default chunk size is chosen to be safe, not effective. A chunking strategy should be chosen against a real evaluation set: take two hundred representative questions, index the corpus several ways, and measure which strategy produces the highest recall. Structure-aware chunking — splitting on headings, table boundaries and section markers — usually beats fixed-size windows on technical documentation.',
      },
      {
        type: 'paragraph',
        text: 'This is why we insist on building the evaluation set before the interface. Without a scored question set, chunk size becomes a matter of taste, and nobody can tell when a change makes things worse.',
      },
      { type: 'heading', text: 'Freshness is a correctness property' },
      {
        type: 'paragraph',
        text: 'In a long-lived system, the index is a cache of a source of truth that keeps moving. Treat staleness as a bug, not a maintenance chore: re-index on publish, expose the source timestamp in the answer, and let ranking prefer fresh content when the older version has been superseded.',
      },
      {
        type: 'quote',
        text: 'A confident answer with no citation is the most expensive failure mode in a production AI system. It is indistinguishable from a correct answer until someone relies on it.',
        attribution: 'Design principle we apply to every grounded system',
      },
      { type: 'heading', text: 'What to build first' },
      {
        type: 'list',
        items: [
          'A retrieval evaluation harness with a few hundred real questions and known answers.',
          'Per-field confidence and an explicit abstain path, so weak retrieval is visible rather than hidden.',
          'Citations that point to specific source spans, not just documents.',
          'Index freshness telemetry: last successful re-index per source, alerting on staleness.',
        ],
      },
      {
        type: 'paragraph',
        text: 'With those four in place, prompt work becomes productive instead of speculative — because you can now tell whether a prompt change actually helped. That is the difference between tuning a system and guessing at one.',
      },
    ],
  },
  {
    slug: 'evaluation-before-prompts',
    title: 'Build the evaluation set before you build the interface',
    dek: 'The single highest-leverage decision in an AI product is the one made first: defining how quality will be measured.',
    category: 'Engineering',
    author: 'Trisentri AI · Platform Engineering',
    authorRole: 'Platform engineering practice',
    date: '2026-07-29',
    readMinutes: 7,
    tags: ['Evaluation', 'Testing', 'Delivery', 'MLOps'],
    featured: false,
    body: [
      {
        type: 'lead',
        text: 'Ask five teams to improve an AI feature without an evaluation set and you get five different definitions of better. That ambiguity, not model quality, is where most AI projects lose their time.',
      },
      { type: 'heading', text: 'The failure mode of unmeasured quality' },
      {
        type: 'paragraph',
        text: 'Without a scored set, every change is argued rather than measured. A model upgrade, a chunking change, a prompt edit — each produces subjective reactions, and the loudest opinion wins. Teams ship changes that feel better and cannot tell whether they broke an edge case that mattered.',
      },
      { type: 'paragraph',
        text: 'The evaluation set is what converts an AI feature from a demo into an engineering artifact. It is also the thing most often deferred, because it feels like overhead until the first regression lands in production.',
      },
      { type: 'heading', text: 'What a minimal evaluation set looks like' },
      {
        type: 'ordered',
        items: [
          'One hundred to three hundred real inputs, drawn from actual usage or a domain expert, not invented edge cases.',
          'An expected outcome per input, written in a form that can be scored automatically where possible.',
          'At least a slice of adversarial inputs — the cases the system is expected to get wrong.',
          'A threshold for each metric, agreed before the first run, so "good enough" is a decision rather than a negotiation.',
        ],
      },
      {
        type: 'callout',
        title: 'Start smaller than feels useful',
        text: 'One hundred cases with expected outputs is enough to prevent most regressions. Teams routinely delay for weeks trying to build a thousand-case suite. A hundred cases run on every commit beats a thousand cases that exist in a spreadsheet.',
      },
      { type: 'heading', text: 'Score the failure that matters' },
      {
        type: 'paragraph',
        text: 'Not all errors are equal. In a triage system, a false negative and a false flag have very different costs, so aggregate accuracy is the wrong headline number. Decide the error you are optimising for, weight the metric toward it, and report the other direction as a constraint rather than an average.',
      },
      {
        type: 'code',
        language: 'python',
        code: `# Report the asymmetric cost, not the average.
# A miss costs 40x a false flag in this use case.
COST = {"miss": 40, "false_flag": 1}

def weighted_error_rate(results):
    total = sum(COST[r.outcome] for r in results)
    return total / max(len(results), 1)

# Aggregate accuracy would have reported ~0.94 here,
# which understates the risk almost entirely.`,
      },
      { type: 'heading', text: 'Make the evaluation set grow' },
      {
        type: 'paragraph',
        text: 'Every production escalation and every human correction is a labelled example. Wire that feedback into the evaluation set on a regular cadence and the suite improves with the product instead of decaying as the system drifts.',
      },
      {
        type: 'quote',
        text: 'Quality you cannot measure is quality you will argue about instead of improve.',
      },
      { type: 'heading', text: 'Where it fits in the build order' },
      {
        type: 'list',
        items: [
          'Scope the use case and its success criteria with the business owner.',
          'Build the evaluation set and get thresholds agreed.',
          'Build the baseline — even a rules-based stub is a valid baseline.',
          'Only then optimise, with each change measured against the suite.',
        ],
      },
    ],
  },
  {
    slug: 'computer-vision-conditions',
    title: 'Computer vision fails in the conditions, not the benchmark',
    dek: 'Model quality is decided long before training starts — by lighting, camera placement, and whether anyone measured what the sensor actually captures.',
    category: 'Research',
    author: 'Trisentri AI · Vision Practice',
    authorRole: 'Computer vision practice',
    date: '2026-07-11',
    readMinutes: 9,
    tags: ['Computer vision', 'Data quality', 'Edge', 'Deployment'],
    featured: false,
    body: [
      {
        type: 'lead',
        text: 'The gap between a vision model that scores well in a notebook and one that works on a production line is almost never an architecture problem. It is a capture problem, and it is decided weeks before anyone writes training code.',
      },
      { type: 'heading', text: 'Set the ceiling with the camera' },
      {
        type: 'paragraph',
        text: 'Every performance number you will later achieve is bounded by what the sensor records. Lens choice, working distance, exposure, frame rate and lighting all sit above the model in the causal chain. A model cannot recover detail the capture never preserved.',
      },
      {
        type: 'paragraph',
        text: 'We spend the first week of a vision engagement on the floor with operators, not in a notebook. A surprisingly large share of vision projects are resolved by relocating a camera or adding diffuse lighting — a fraction of the cost of a larger model.',
      },
      { type: 'heading', text: 'The three conditions that break production vision' },
      {
        type: 'list',
        items: [
          'Variable lighting. A model trained in one lighting condition and deployed under a mixture of fluorescent, daylight and shadowed zones will fail on the transitions.',
          'Motion blur. Frame rate has to be matched to the speed of the thing being inspected. Blur is not recoverable downstream.',
          'Occlusion and partial visibility. Real production objects are rarely presented in the clean canonical view the training set was curated around.',
        ],
      },
      {
        type: 'callout',
        title: 'Collect data in the failure conditions, not just the happy ones',
        text: 'A training set that only contains clean, well-lit, fully-visible examples produces a model that is confidently wrong in exactly the situations that matter. Deliberately capture the transitions and the edge conditions.',
      },
      { type: 'heading', text: 'Edge deployment changes the model' },
      {
        type: 'paragraph',
        text: 'If inference runs on edge hardware, accuracy is a function of the latency budget, not just the architecture. Quantisation and reduced input resolution are architectural decisions that must be made with the target device in the loop, benchmarked end to end. A model that needs 40ms on a device with a 20ms budget is not a production model.',
      },
      {
        type: 'code',
        language: 'python',
        code: `# Benchmark the deployed artefact, not the training graph.
for precision in ("fp32", "fp16", "int8"):
    session = build_session(model, precision=precision, device=target_device)
    p50, p95 = benchmark(session, frames=production_frames)
    acc = evaluate(session, eval_set)
    print(f"{precision}: p50={p50:.1f}ms p95={p95:.1f}ms acc={acc:.3f}")

# Choose the highest precision that still fits the frame budget.`,
      },
      { type: 'heading', text: 'Design for the human in the loop from the start' },
      {
        type: 'paragraph',
        text: 'Full autonomy is rarely the right target for inspection tasks, and pretending otherwise creates systems that must be trusted blindly. A confidence-gated design — where the model handles the clear majority and routes ambiguity to a person — is easier to operate, easier to evaluate, and generates the labelled data that makes the next version better.',
      },
      {
        type: 'list',
        items: [
          'Set a confidence threshold and measure the resulting review volume before deployment.',
          'Make the reviewer correction a single interaction, or the loop will not be used.',
          'Feed every correction back into active learning so the model improves on the cases that are genuinely hard.',
        ],
      },
    ],
  },
  {
    slug: 'designing-ai-for-enterprise-buyers',
    title: 'What enterprise buyers are actually evaluating in an AI system',
    dek: 'Model quality is table stakes in an enterprise evaluation. The differentiators are control, traceability and the ability to say no.',
    category: 'Technology',
    author: 'Trisentri AI · Solutions',
    authorRole: 'Solutions practice',
    date: '2026-06-24',
    readMinutes: 6,
    tags: ['Enterprise', 'Governance', 'Adoption', 'Architecture'],
    featured: false,
    body: [
      {
        type: 'lead',
        text: 'When an organisation evaluates an AI system, the model is rarely the deciding factor. It is assumed. What gets evaluated is everything around it: who can see what, what happens when it is wrong, and whether anyone can prove how a decision was reached.',
      },
      { type: 'heading', text: 'The questions behind the procurement checklist' },
      {
        type: 'paragraph',
        text: 'A security questionnaire reads like a compliance formality, but each item maps to a real operational fear. Can we restrict what the system can reach? What data leaves our environment? Who is accountable when the output is wrong? Answering these concretely — with architecture, not policy language — is most of what separates a shortlisted vendor from a rejected one.',
      },
      { type: 'heading', text: 'Traceability outranks accuracy' },
      {
        type: 'paragraph',
        text: 'Buyers consistently accept lower measured accuracy when every output is traceable to a source, a model version and a set of inputs. This is not irrational: an explainable ninety percent is deployable in a regulated process in a way that an opaque ninety-eight percent is not. Lineage is what makes a system auditable after the fact.',
      },
      {
        type: 'list',
        items: [
          'Every model version pinned, with the dataset and prompt that produced it.',
          'Every generated answer carrying its source span, not just a document link.',
          'Every human override captured with a reason that feeds the next iteration.',
          'Access decisions evaluated at query time, so restricted content is never retrieved in the first place.',
        ],
      },
      { type: 'callout',
        title: 'Design the "no" path early',
        text: 'The most important capability in an enterprise AI system is declining to answer. A system that abstains when its retrieval is weak is trusted; one that always produces a confident answer is quietly distrusted and then quietly bypassed.',
      },
      { type: 'heading', text: 'Adoption is an engineering problem' },
      {
        type: 'paragraph',
        text: 'Systems get abandoned when they demand more work than they save. The design decisions that matter are unglamorous: where the assistant appears in the workflow people already use, whether corrections are a single interaction, and whether the user can see why the system made a suggestion. None of this is model work, and all of it determines whether the model gets used.',
      },
    ],
  },
  {
    slug: 'data-contracts-and-ownership',
    title: 'Data contracts and the end of the "who broke production" meeting',
    dek: 'When analytics disagreements get resolved in a spreadsheet, the real problem is that ownership ended at the database boundary.',
    category: 'Engineering',
    author: 'Trisentri AI · Data Engineering',
    authorRole: 'Data engineering practice',
    date: '2026-06-05',
    readMinutes: 7,
    tags: ['Data engineering', 'Governance', 'Semantic layer', 'Quality'],
    featured: false,
    body: [
      {
        type: 'lead',
        text: 'Every data team we join has the same recurring meeting. Two teams disagree about a number, both are defensible, and the resolution depends on who has more seniority. The fix is not a better dashboard. It is deciding who owns each definition.',
      },
      { type: 'heading', text: 'Definitions drift when nobody owns them' },
      {
        type: 'paragraph',
        text: 'A metric like "active customer" is unambiguous in the moment it is defined and ambiguous within a quarter. Products change, source systems change, and the definition accretes small variations until the same name means two things in two dashboards. By the time anyone notices, downstream reports have disagreed for months.',
      },
      { type: 'heading', text: 'A contract is an ownership statement' },
      {
        type: 'paragraph',
        text: 'A data contract specifies what a dataset guarantees: the fields it contains, their types, whether they are nullable, the update frequency, and who is accountable when any of that changes. The important part is not the schema. It is the named owner who is notified on change.',
      },
      {
        type: 'code',
        language: 'yaml',
        code: `# contracts/orders.yaml
dataset: orders
owner: commerce-analytics@trisentri.ai
description: Canonical order events, deduplicated by order_id.
grain: one row per order
update_cadence: hourly
breaking_change_policy: notify_owner_and_block_deploy
columns:
  - name: order_id
    type: string
    nullable: false
    tests: [unique, not_null]
  - name: net_amount
    type: decimal
    nullable: false
    description: Order total after discounts, excluding tax.
  - name: refunded_at
    type: timestamp
    nullable: true`,
      },
      { type: 'heading', text: 'One metric, one home' },
      {
        type: 'paragraph',
        text: 'The structural fix is a semantic layer. A metric defined once in version control, tested, and published for every consumer removes the entire category of disagreement. Dashboards, API endpoints and models all read the same definition, so a change to it propagates or fails loudly — which is the correct outcome.',
      },
      {
        type: 'list',
        items: [
          'Metrics defined in version control, never in a BI tool UI.',
          'Automated tests on freshness, volume and relationships for every model.',
          'Breaking schema changes blocked in CI rather than discovered in production.',
          'Column-level lineage from source system to every published metric.',
        ],
      },
      {
        type: 'callout',
        title: 'Quality tests are cheaper than reconciliation',
        text: 'Automated freshness and volume tests catch the overwhelming majority of data incidents in minutes. The rest are caught downstream by a stakeholder comparing numbers. Build the first category before you invest in the second.',
      },
    ],
  },
  {
    slug: 'agent-autonomy-boundaries',
    title: 'How much autonomy should an AI agent actually have?',
    dek: 'Agent reliability is a scoping problem, not a prompting problem. Narrow the blast radius and useful autonomy gets much easier.',
    category: 'AI',
    author: 'Trisentri AI · Agent Systems',
    authorRole: 'Agent systems practice',
    date: '2026-05-16',
    readMinutes: 8,
    tags: ['Agents', 'Tool use', 'Safety', 'Architecture'],
    featured: false,
    body: [
      {
        type: 'lead',
        text: 'The interesting question about an agent is not how capable it is. It is how much damage it can do when it is confidently wrong. Every useful autonomy decision is really a decision about blast radius.',
      },
      { type: 'heading', text: 'Scope beats prompting' },
      {
        type: 'paragraph',
        text: 'No prompt makes an open-ended agent reliable. What works is narrowing the environment: a small typed tool surface, an explicit allow-list of reachable systems, hard budgets on time and spend, and a requirement for human approval before any irreversible action. Constrain the environment and reliability becomes an engineering problem rather than a research problem.',
      },
      {
        type: 'code',
        language: 'python',
        code: `from dataclasses import dataclass

@dataclass(frozen=True)
class AgentPolicy:
    allowed_tools: frozenset[str]
    max_steps: int
    max_spend_usd: float
    requires_approval: frozenset[str]  # irreversible side effects
    confidence_floor: float           # below this, escalate

# The agent cannot reach anything not named here.
# Approval is a hard gate, not a suggestion in the system prompt.`,
      },
      { type: 'heading', text: 'Where autonomy is genuinely earned' },
      {
        type: 'paragraph',
        text: 'Autonomy pays off when the task is genuinely ambiguous, the steps vary between runs, and every step is reversible or cheap to undo. It pays off badly when the path is fixed — a deterministic script is faster, cheaper and easier to verify than any agent asked to do the same work.',
      },
      {
        type: 'list',
        items: [
          'Good fit: research and briefing, support resolution, data investigation, multi-system operational tasks.',
          'Poor fit: fixed-path data transformation, anything with a deterministic solution, irreversible actions with no undo.',
        ],
      },
      {
        type: 'callout',
        title: 'If a script would do the job, write the script',
        text: 'One of the most useful questions in agent design is whether this task needed an agent at all. Frequently it did not, and the deterministic version is the more valuable deliverable.',
      },
      { type: 'heading', text: 'Tracing is what makes it operable' },
      {
        type: 'paragraph',
        text: 'An agent you cannot inspect is an agent you cannot debug. Record every step: the plan, each tool call with its arguments, the result, the confidence at each decision point, and the final output. When a run goes wrong — and it will — the trace is the difference between a five-minute diagnosis and an archaeology project.',
      },
      {
        type: 'ordered',
        items: [
          'Define the task with explicit success criteria and an explicit list of things the agent must never do.',
          'Give it the smallest tool surface that can still complete the task.',
          'Require approval at the irreversible steps, enforced in code rather than in the prompt.',
          'Trace every run, and build a regression set from the failures.',
        ],
      },
      {
        type: 'quote',
        text: 'The goal is not an agent that never fails. It is a system where failure is bounded, visible and cheap.',
      },
    ],
  },
];

export const ARTICLE_CATEGORIES: ArticleCategory[] = ['AI', 'Engineering', 'Research', 'Technology'];

export function getArticle(slug: string | undefined): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}

export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticle(slug);
  if (!current) return ARTICLES.filter((a) => !a.featured).slice(0, limit);
  const sameCategory = ARTICLES.filter((a) => a.slug !== slug && a.category === current.category);
  const others = ARTICLES.filter((a) => a.slug !== slug && a.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export function formatArticleDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
