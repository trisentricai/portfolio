export interface NavChild {
  label: string;
  to: string;
  description: string;
  icon: string;
}

export interface NavItem {
  label: string;
  to: string;
  /** Mega-menu groups. An item without `groups` is a plain link. */
  groups?: { title: string; items: NavChild[] }[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Solutions',
    to: '/solutions',
    groups: [
      {
        title: 'Intelligence',
        items: [
          {
            label: 'AI & Machine Learning',
            to: '/solutions/ai-machine-learning',
            description: 'Predictive models that learn from your operational data.',
            icon: 'BrainCircuit',
          },
          {
            label: 'Generative AI',
            to: '/solutions/generative-ai',
            description: 'Assistants, copilots and grounded RAG systems.',
            icon: 'Sparkles',
          },
          {
            label: 'AI Agents',
            to: '/solutions/ai-agents',
            description: 'Tool-using agents that execute real workflows.',
            icon: 'Workflow',
          },
        ],
      },
      {
        title: 'Systems',
        items: [
          {
            label: 'Computer Vision',
            to: '/solutions/computer-vision',
            description: 'Turn images and video into structured signals.',
            icon: 'ScanEye',
          },
          {
            label: 'Intelligent Automation',
            to: '/solutions/intelligent-automation',
            description: 'Remove repetitive work from critical processes.',
            icon: 'Bot',
          },
          {
            label: 'Data & Analytics',
            to: '/solutions/data-analytics',
            description: 'A trustworthy data layer and decision surfaces.',
            icon: 'BarChart3',
          },
          {
            label: 'Custom AI Systems',
            to: '/solutions/custom-ai',
            description: 'End-to-end systems designed around your moat.',
            icon: 'Blocks',
          },
        ],
      },
    ],
  },
  { label: 'Technologies', to: '/technologies' },
  { label: 'Industries', to: '/industries' },
  { label: 'Products', to: '/products' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Company', to: '/company' },
  { label: 'Insights', to: '/insights' },
];

export const NAV_CTA = {
  label: 'Start a Project',
  to: '/contact',
} as const;

/** Anchors inside the home page that the mega menu and footer link into. */
export const HOME_ANCHORS = {
  capabilities: '/#capabilities',
  process: '/#process',
  stack: '/#stack',
} as const;
