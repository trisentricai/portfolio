import { SITE } from '@/lib/seo';

/** Internal route link, or an external/mailto link. */
export type FooterLink =
  | { label: string; to: string }
  | { label: string; href: string; external?: boolean };

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const SOCIAL_LINKS: FooterLink[] = (
  [
    SITE.social.linkedin ? { label: 'LinkedIn', href: SITE.social.linkedin, external: true } : null,
    SITE.social.github ? { label: 'GitHub', href: SITE.social.github, external: true } : null,
    SITE.social.x ? { label: 'X', href: SITE.social.x, external: true } : null,
  ] as (FooterLink | null)[]
).filter((link): link is FooterLink => link !== null);

export const CATEGORIES: FooterColumn[] = [
  {
    title: 'Solutions',
    links: [
      { label: 'AI & Machine Learning', to: '/solutions/ai-machine-learning' },
      { label: 'Generative AI', to: '/solutions/generative-ai' },
      { label: 'Computer Vision', to: '/solutions/computer-vision' },
      { label: 'Intelligent Automation', to: '/solutions/intelligent-automation' },
      { label: 'AI Agents', to: '/solutions/ai-agents' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/company' },
      { label: 'Careers', to: '/company#careers' },
      { label: 'Insights', to: '/insights' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Case Studies', to: '/case-studies' },
      { label: 'Technologies', to: '/technologies' },
      { label: 'Industries', to: '/industries' },
      { label: 'Products', to: '/products' },
    ],
  },
  {
    title: 'Connect',
    links: [...SOCIAL_LINKS, { label: 'Email', href: `mailto:${SITE.email}` }],
  },
];
