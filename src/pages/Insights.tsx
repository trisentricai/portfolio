import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ArticleCard } from '@/components/cards/ArticleCard';
import { CTASection } from '@/components/sections/CTASection';
import { EmptyState, FilterBar, type FilterOption } from '@/components/ui/FilterBar';
import { ARTICLES, ARTICLE_CATEGORIES, formatArticleDate } from '@/data/articles';
import { usePageMeta, breadcrumbJsonLd, absoluteUrl } from '@/lib/seo';
import { EASE_PREMIUM } from '@/lib/motion';
import { Badge } from '@/components/ui/Badge';

export default function Insights() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  usePageMeta({
    title: 'Insights',
    description:
      'Writing from the Trisentri AI engineering team on machine learning, generative AI, computer vision, data engineering and building AI systems that survive production.',
    path: '/insights',
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Insights', path: '/insights' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Trisentri AI Insights',
        url: absoluteUrl('/insights'),
        blogPost: ARTICLES.map((article) => ({
          '@type': 'BlogPosting',
          headline: article.title,
          url: absoluteUrl(`/insights/${article.slug}`),
          datePublished: article.date,
          author: { '@type': 'Organization', name: 'Trisentri AI' },
        })),
      },
    ],
  });

  const options = useMemo<FilterOption[]>(
    () => [
      { value: 'all', label: 'All', count: ARTICLES.length },
      ...ARTICLE_CATEGORIES.map((category) => ({
        value: category,
        label: category,
        count: ARTICLES.filter((article) => article.category === category).length,
      })),
    ],
    [],
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return ARTICLES.filter((article) => {
      const matchesFilter = filter === 'all' || article.category === filter;
      const matchesQuery =
        !term || [article.title, article.dek, ...article.tags].join(' ').toLowerCase().includes(term);
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  const [featured, ...rest] = filtered;
  const isFiltered = Boolean(query.trim()) || filter !== 'all';

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Notes from the work."
        lede="Written by the engineers doing it. Practical notes on evaluation, data contracts, model reliability and the engineering decisions that decide whether an AI system survives contact with production."
        aside={<InsightsAside latest={ARTICLES.slice(0, 3)} />}
      />

      <section className="section bg-white">
        <div className="container-page">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Insights' }]} className="mb-10" />

          <FilterBar
            query={query}
            onQueryChange={setQuery}
            options={options}
            value={filter}
            onValueChange={setFilter}
            searchLabel="Search insights"
            searchPlaceholder="Search articles and topics"
          />

          <p
            className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted numeric"
            role="status"
            aria-live="polite"
          >
            {isFiltered ? `Showing ${filtered.length} of ${ARTICLES.length}` : `${ARTICLES.length} articles`}
          </p>

          {filtered.length ? (
            <>
              {!isFiltered && featured ? (
                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE_PREMIUM }}
                  className="mt-10"
                >
                  <ArticleCard article={featured} variant="featured" />
                </motion.div>
              ) : null}

              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {(isFiltered ? filtered : rest).map((article, index) => (
                    <motion.div
                      key={article.slug}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3), ease: EASE_PREMIUM }}
                      className="h-full"
                    >
                      <ArticleCard article={article} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <EmptyState
              className="mt-10"
              title="No articles match those filters"
              body="Try a different term or category — or reset to browse everything we have written."
              onReset={() => {
                setQuery('');
                setFilter('all');
              }}
            />
          )}
        </div>
      </section>

      <CTASection
        eyebrow="Stay in touch"
        title="Prefer a conversation to an article?"
        body="Most of what we write about comes up in scoping calls anyway. If you are working through a specific problem, bring it — we will tell you what we would actually do about it."
      />
    </>
  );
}

function InsightsAside({ latest }: { latest: typeof ARTICLES }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-card">
      <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-50" aria-hidden="true" />
      <div className="relative">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">Latest</p>
        <ul className="mt-5 space-y-4">
          {latest.map((article) => (
            <li key={article.slug} className="border-b border-line pb-4 last:border-0 last:pb-0">
              <div className="flex items-center gap-2.5">
                <Badge tone="neutral">{article.category}</Badge>
                <time
                  dateTime={article.date}
                  className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-muted"
                >
                  {formatArticleDate(article.date)}
                </time>
              </div>
              <p className="mt-2 text-[0.875rem] font-medium leading-snug text-ink">{article.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
