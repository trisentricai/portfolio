import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Reveal } from '@/components/ui/Reveal';
import { ArticleCard } from '@/components/cards/ArticleCard';
import { InlineCTA } from '@/components/sections/CTASection';
import { Badge } from '@/components/ui/Badge';
import { getArticle, getRelatedArticles, formatArticleDate, type ArticleBlock } from '@/data/articles';
import { usePageMeta, absoluteUrl, breadcrumbJsonLd } from '@/lib/seo';
import { EASE_PREMIUM } from '@/lib/motion';
import NotFound from '@/pages/NotFound';

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticle(slug);
  const related = getRelatedArticles(slug ?? '', 3);

  usePageMeta({
    title: article ? `${article.title} — Insights` : 'Article not found',
    description: article?.dek ?? 'This article could not be found.',
    path: article ? `/insights/${article.slug}` : undefined,
    type: 'article',
    publishedTime: article?.date,
    authors: article ? [article.author] : undefined,
    noIndex: !article,
    jsonLd: article
      ? [
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Insights', path: '/insights' },
            { name: article.title, path: `/insights/${article.slug}` },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: article.title,
            description: article.dek,
            url: absoluteUrl(`/insights/${article.slug}`),
            datePublished: article.date,
            dateModified: article.date,
            author: { '@type': 'Organization', name: article.author, jobTitle: article.authorRole },
            publisher: {
              '@type': 'Organization',
              name: 'Trisentric AI',
              logo: { '@type': 'ImageObject', url: absoluteUrl('/favicon.svg') },
            },
            keywords: article.tags.join(', '),
            isAccessibleForFree: true,
          },
        ]
      : undefined,
  });

  if (!article) return <NotFound />;

  return (
    <>
      {/* ---- Article header ---- */}
      <header className="relative overflow-hidden bg-canvas pt-32 sm:pt-36 lg:pt-40">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-grid-lines opacity-60 mask-fade-b" />
          <div className="blob -right-24 -top-32 h-[26rem] w-[26rem] bg-brand/[0.08]" />
        </div>

        <div className="container-page relative">
          <div className="mx-auto max-w-3xl">
            <Breadcrumbs
              items={[
                { label: 'Home', to: '/' },
                { label: 'Insights', to: '/insights' },
                { label: article.category },
              ]}
              className="mb-8"
            />

            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="brand">{article.category}</Badge>
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {article.readMinutes} min read
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_PREMIUM }}
              className="mt-6 text-balance font-display text-display-lg"
            >
              {article.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE_PREMIUM }}
              className="lede mt-6"
            >
              {article.dek}
            </motion.p>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-6 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted">
              <span className="text-ink">{article.author}</span>
              <span className="text-ink-muted">{article.authorRole}</span>
              <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
            </div>
          </div>
        </div>
      </header>

      {/* ---- Body ---- */}
      <article className="section bg-white">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-6">
              {article.body.map((block, index) => (
                <BlockRenderer key={index} block={block} index={index} />
              ))}
            </div>

            {article.tags.length ? (
              <ul className="mt-14 flex flex-wrap gap-2 border-t border-line pt-8">
                {article.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line bg-canvas px-3 py-1.5 font-mono text-[0.6875rem] text-ink-soft"
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-10">
              <Link
                to="/insights"
                className="group/back inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink-soft transition-colors hover:text-brand"
              >
                <ArrowLeft
                  className="h-4 w-4 transition-transform duration-200 group-hover/back:-translate-x-1"
                  aria-hidden="true"
                />
                Back to all insights
              </Link>
            </div>

            <Reveal className="mt-12">
              <InlineCTA
                title="Working through a problem like this?"
                body="Bring the specifics — your data, your constraints, your deadline. We will tell you what we would do and what we would not."
              />
            </Reveal>
          </div>
        </div>
      </article>

      {/* ---- Related ---- */}
      {related.length ? (
        <section className="section bg-canvas">
          <div className="container-page">
            <h2 className="font-display text-display-md">Keep reading</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ArticleCard key={item.slug} article={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

/** Renders one CMS-shaped content block. */
function BlockRenderer({ block, index }: { block: ArticleBlock; index: number }) {
  const delay = Math.min(index * 0.03, 0.3);

  switch (block.type) {
    case 'lead':
      return (
        <Reveal delay={delay} y={16}>
          <p className="border-l-2 border-accent pl-5 text-lg leading-relaxed text-ink sm:text-xl sm:leading-[1.6]">
            {block.text}
          </p>
        </Reveal>
      );

    case 'paragraph':
      return (
        <Reveal delay={delay} y={16}>
          <p className="text-[1.0625rem] leading-[1.75] text-ink-soft">{block.text}</p>
        </Reveal>
      );

    case 'heading':
      return (
        <Reveal delay={delay} y={14}>
          <h2 className="pt-6 font-display text-[1.5rem] font-semibold leading-snug tracking-[-0.02em] sm:text-[1.75rem]">
            {block.text}
          </h2>
        </Reveal>
      );

    case 'list':
      return (
        <Reveal delay={delay} y={14}>
          <ul className="space-y-2.5">
            {block.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[1.0625rem] leading-relaxed text-ink-soft">
                <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand/50" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      );

    case 'ordered':
      return (
        <Reveal delay={delay} y={14}>
          <ol className="space-y-3">
            {block.items.map((item, itemIndex) => (
              <li key={item} className="flex items-start gap-4 text-[1.0625rem] leading-relaxed text-ink-soft">
                <span
                  className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 font-mono text-[0.6875rem] font-medium text-brand numeric"
                  aria-hidden="true"
                >
                  {itemIndex + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </Reveal>
      );

    case 'code':
      return (
        <Reveal delay={delay} y={14}>
          <figure className="overflow-hidden rounded-2xl border border-line bg-[#0B1220]">
            <figcaption className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-white/50">
              <span>{block.language}</span>
              <span>example</span>
            </figcaption>
            <pre className="overflow-x-auto px-4 py-4 text-[0.8125rem] leading-relaxed text-white/85">
              <code>{block.code}</code>
            </pre>
          </figure>
        </Reveal>
      );

    case 'callout':
      return (
        <Reveal delay={delay} y={14}>
          <aside className="rounded-2xl border border-brand-100 bg-brand-50/60 p-6">
            <h3 className="font-display text-[1.0625rem] font-semibold tracking-[-0.015em] text-brand-900">
              {block.title}
            </h3>
            <p className="mt-2.5 leading-relaxed text-brand-900/80">{block.text}</p>
          </aside>
        </Reveal>
      );

    case 'quote':
      return (
        <Reveal delay={delay} y={14}>
          <figure className="border-l-2 border-brand pl-6">
            <blockquote className="font-display text-[1.25rem] leading-relaxed tracking-[-0.015em] text-ink sm:text-[1.5rem]">
              “{block.text}”
            </blockquote>
            {block.attribution ? (
              <figcaption className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted">
                {block.attribution}
              </figcaption>
            ) : null}
          </figure>
        </Reveal>
      );

    default:
      return null;
  }
}
