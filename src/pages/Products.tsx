import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { PageHeader } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ProductCard } from '@/components/cards/ProductCard';
import { CTASection } from '@/components/sections/CTASection';
import { Disclosure, PlaceholderVisual } from '@/components/ui/Disclosure';
import { EmptyState, FilterBar, type FilterOption } from '@/components/ui/FilterBar';
import { Badge } from '@/components/ui/Badge';
import { PRODUCTS, PRODUCT_CATEGORIES } from '@/data/products';
import { usePageMeta, breadcrumbJsonLd, absoluteUrl } from '@/lib/seo';
import { EASE_PREMIUM } from '@/lib/motion';

export default function Products() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  usePageMeta({
    title: 'Products',
    description:
      'Concept products from Trisentric AI — reference platforms and components for AI engineering. Published as concepts with example scope, not as shipping commercial products.',
    path: '/products',
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Concept products',
        itemListElement: PRODUCTS.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: product.name,
          url: absoluteUrl(`/products#${product.slug}`),
        })),
      },
    ],
  });

  const options = useMemo<FilterOption[]>(
    () => [
      { value: 'all', label: 'All', count: PRODUCTS.length },
      ...PRODUCT_CATEGORIES.map((category) => ({
        value: category,
        label: category,
        count: PRODUCTS.filter((product) => product.category === category).length,
      })),
    ],
    [],
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const matchesFilter = filter === 'all' || product.category === filter;
      const matchesQuery =
        !term ||
        [product.name, product.tagline, product.description, ...product.technology].join(' ').toLowerCase().includes(term);
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="Reusable pieces, built from real project work."
        lede="Most of what we build eventually generalises. These concepts are the patterns we would rather rebuild than reinvent — documented as concepts, with example scope rather than pricing."
        aside={<ProductAside />}
      />

      <section className="section bg-white">
        <div className="container-page">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Products' }]} className="mb-10" />

          <Disclosure title="Concept products — not shipping commercial software" tone="warn">
            Every product below is a concept: a reference architecture or component we describe at the level of
            engineering detail, not a product you can buy today. Status, scope and interfaces are illustrative. No
            pricing, customer or availability claim is made.
          </Disclosure>

          <FilterBar
            className="mt-10"
            query={query}
            onQueryChange={setQuery}
            options={options}
            value={filter}
            onValueChange={setFilter}
            searchLabel="Search products"
            searchPlaceholder="Search by name or technology"
          />

          <p
            className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted numeric"
            role="status"
            aria-live="polite"
          >
            Showing {filtered.length} of {PRODUCTS.length}
          </p>

          {filtered.length ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((product, index) => (
                  <motion.div
                    key={product.slug}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.24), ease: EASE_PREMIUM }}
                    className="h-full"
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <EmptyState
              className="mt-8"
              title="No products match those filters"
              body="Try a different term, or reset the filters to see every concept."
              onReset={() => {
                setQuery('');
                setFilter('all');
              }}
            />
          )}
        </div>
      </section>

      {/* ---- Concept detail ---- */}
      <section className="section bg-canvas">
        <div className="container-page">
          <div className="max-w-2xl">
            <h2 className="text-balance font-display text-display-md">Concept detail</h2>
            <p className="lede mt-5">
              Select a concept to see the capabilities we would build, the technology underneath and the kind of team
              it suits.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {filtered.map((product) => {
              const open = openSlug === product.slug;
              return (
                <article
                  key={product.slug}
                  id={product.slug}
                  className="scroll-mt-32 overflow-hidden rounded-3xl border border-line bg-white"
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenSlug(open ? null : product.slug)}
                      aria-expanded={open}
                      aria-controls={`${product.slug}-panel`}
                      className="group/toggle flex w-full items-start justify-between gap-6 p-6 text-left transition-colors duration-200 hover:bg-canvas focus-visible:outline-brand sm:p-8"
                    >
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-2.5">
                          <span className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.5rem]">
                            {product.name}
                          </span>
                          <Badge tone="neutral">{product.status}</Badge>
                        </span>
                        <span className="mt-2 block text-[0.9375rem] text-brand">{product.tagline}</span>
                      </span>
                      <span
                        className={
                          open
                            ? 'mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand bg-brand text-white'
                            : 'mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-canvas text-ink-soft transition-colors duration-200 group-hover/toggle:border-brand group-hover/toggle:text-brand'
                        }
                        aria-hidden="true"
                      >
                        <span className="text-lg leading-none">+</span>
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        key="panel"
                        id={`${product.slug}-panel`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE_PREMIUM }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-8 border-t border-line p-6 sm:p-8 lg:grid-cols-12">
                          <div className="lg:col-span-7">
                            <p className="text-[0.9375rem] leading-relaxed text-ink-soft">{product.description}</p>

                            <h4 className="mt-7 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">
                              Capabilities
                            </h4>
                            <ul className="mt-3.5 space-y-2.5">
                              {product.features.map((feature) => (
                                <li
                                  key={feature.title}
                                  className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-ink-soft"
                                >
                                  <span
                                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/30 text-[#3F5D00]"
                                    aria-hidden="true"
                                  >
                                    <Check className="h-3 w-3" strokeWidth={3} />
                                  </span>
                                  <span>
                                    <span className="font-medium text-ink">{feature.title}</span> — {feature.detail}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="lg:col-span-5">
                            <PlaceholderVisual
                              label={`${product.name} — concept visual`}
                              ratio="aspect-[4/3]"
                              className="mb-6"
                            />

                            <h4 className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">
                              Technology
                            </h4>
                            <ul className="mt-3 flex flex-wrap gap-1.5">
                              {product.technology.map((item) => (
                                <li
                                  key={item}
                                  className="rounded-lg border border-line bg-canvas px-2.5 py-1.5 font-mono text-[0.6875rem] text-ink-soft"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>

                            <h4 className="mt-6 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">
                              Best for
                            </h4>
                            <ul className="mt-3 space-y-1.5">
                              {product.bestFor.map((item) => (
                                <li key={item} className="flex items-start gap-2 text-[0.875rem] text-ink-soft">
                                  <span className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-brand/50" aria-hidden="true" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Build vs buy"
        title="Not sure whether you need a product?"
        body="Often the honest answer is that you need something purpose-built. Tell us the problem and we will tell you whether an existing component helps or a custom build is the right call."
      />
    </>
  );
}

function ProductAside() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-card">
      <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-50" aria-hidden="true" />
      <div className="relative">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">Library</p>
        <dl className="mt-5 space-y-3">
          <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
            <dt className="text-[0.8125rem] text-ink-muted">Concepts documented</dt>
            <dd className="font-display text-[1.125rem] font-semibold numeric">{PRODUCTS.length}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
            <dt className="text-[0.8125rem] text-ink-muted">Categories</dt>
            <dd className="font-display text-[1.125rem] font-semibold numeric">{PRODUCT_CATEGORIES.length}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-[0.8125rem] text-ink-muted">Available to purchase</dt>
            <dd className="font-display text-[1.125rem] font-semibold">0</dd>
          </div>
        </dl>
        <p className="mt-5 border-t border-line pt-4 text-[0.8125rem] leading-relaxed text-ink-muted">
          These are engineering references. We do not sell licences, and nothing here is presented as a finished
          commercial product.
        </p>
      </div>
    </div>
  );
}
