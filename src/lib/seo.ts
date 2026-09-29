/**
 * SEO layer.
 *
 * A single `usePageMeta` hook owns document head management: title, description,
 * canonical URL, Open Graph, Twitter cards and optional JSON-LD. Route changes
 * unmount the previous page, so every call site automatically overwrites the
 * previous page's tags and cleans up its structured data.
 */
import { useEffect } from 'react';

export const SITE = {
  name: 'Trisentric AI',
  shortName: 'Trisentric',
  legalName: 'Trisentric AI',
  tagline: 'Engineering Intelligence for the Real World.',
  description:
    'Trisentric AI builds intelligent software, AI systems, automation platforms and data-driven solutions for complex real-world problems.',
  /** Used to build canonical + OG URLs. Configure per environment. */
  url: (import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://trisentricai.in',
  locale: 'en_US',
  email: (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) ?? 'info@trisentricai.in',
  /**
   * Social profiles are opt-in. Nothing is rendered — in the footer or in the
   * Organization graph — until a real profile URL is configured, so the site
   * never links to a profile it does not own.
   */
  social: {
    linkedin: (import.meta.env.VITE_SOCIAL_LINKEDIN as string | undefined) ?? '',
    github: (import.meta.env.VITE_SOCIAL_GITHUB as string | undefined) ?? '',
    x: (import.meta.env.VITE_SOCIAL_X as string | undefined) ?? '',
  },
} as const;

export interface PageMeta {
  title: string;
  description: string;
  /** Absolute path, e.g. `/solutions`. Defaults to the current location path. */
  path?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  authors?: string[];
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const MANAGED = 'data-seo-managed';

function upsertMeta(selector: string, attrs: Record<string, string>): HTMLMetaElement {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(MANAGED, 'true');
    document.head.appendChild(el);
  }
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
  return el;
}

function upsertLink(rel: string, href: string): HTMLLinkElement {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    el.setAttribute(MANAGED, 'true');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  return el;
}

function upsertJsonLd(data: PageMeta['jsonLd']): void {
  document.head.querySelectorAll(`script[${MANAGED}-ld]`).forEach((node) => node.remove());
  if (!data) return;
  const payload = Array.isArray(data) ? data : [data];
  payload.forEach((entry) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute(`${MANAGED}-ld`, 'true');
    script.textContent = JSON.stringify(entry);
    document.head.appendChild(script);
  });
}

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE.url.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
}

export function usePageMeta(meta: PageMeta): void {
  const {
    title,
    description,
    path,
    image = '/og-image.svg',
    type = 'website',
    publishedTime,
    authors,
    noIndex = false,
    jsonLd,
  } = meta;

  useEffect(() => {
    const canonicalPath = path ?? window.location.pathname;
    const url = absoluteUrl(canonicalPath);
    const fullTitle = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;
    const imageUrl = absoluteUrl(image);

    document.title = fullTitle;

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
    });

    upsertLink('canonical', url);

    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: type });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE.name });

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl });

    if (publishedTime) {
      upsertMeta('meta[property="article:published_time"]', {
        property: 'article:published_time',
        content: publishedTime,
      });
    }

    if (authors?.length) {
      upsertMeta('meta[name="author"]', { name: 'author', content: authors.join(', ') });
    }

    upsertJsonLd(jsonLd);
    // `jsonLd` is a fresh object each render; the primitive fields are the contract.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, image, type, publishedTime, authors?.join(','), noIndex, jsonLd]);
}

/** Standard Organization graph used across marketing pages. */
export function organizationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    url: `${SITE.url}/`,
    logo: absoluteUrl('/favicon.svg'),
    description: SITE.description,
    email: SITE.email,
    sameAs: Object.values(SITE.social).filter(Boolean),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: SITE.email,
        availableLanguage: ['English'],
      },
    ],
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
