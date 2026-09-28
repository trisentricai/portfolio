import { Link } from 'react-router-dom';
import { ButtonLink } from '@/components/ui/Button';
import { usePageMeta, absoluteUrl } from '@/lib/seo';

const SUGGESTIONS = [
  { label: 'Solutions', to: '/solutions' },
  { label: 'Technologies', to: '/technologies' },
  { label: 'Industries', to: '/industries' },
  { label: 'Case studies', to: '/case-studies' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
];

/** 404. Also used as the fallback body for unknown detail-page slugs. */
export default function NotFound() {
  usePageMeta({
    title: 'Page not found',
    description: 'The page you are looking for does not exist or has moved.',
    noIndex: true,
  });

  return (
    <section className="relative overflow-hidden bg-canvas">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-lines opacity-50 mask-fade-b" />
        <div className="blob -right-20 top-0 h-[26rem] w-[26rem] bg-brand/[0.08]" />
      </div>

      <div className="container-page relative flex min-h-[78vh] flex-col items-center justify-center py-32 text-center">
        <p className="font-mono text-[4rem] font-semibold leading-none text-line sm:text-[6rem] numeric">404</p>
        <h1 className="mt-6 text-balance font-display text-display-md">This page could not be found.</h1>
        <p className="lede mx-auto mt-5 max-w-lg">
          The link may be out of date, or the page may have moved. Everything below still works.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <ButtonLink to="/" withArrow>
            Back to home
          </ButtonLink>
          <ButtonLink to="/contact" variant="secondary">
            Contact us
          </ButtonLink>
        </div>

        <nav aria-label="Suggested pages" className="mt-14 w-full max-w-2xl">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">Try one of these</p>
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {SUGGESTIONS.map((suggestion) => (
              <li key={suggestion.to}>
                <Link
                  to={suggestion.to}
                  className="inline-flex h-9 items-center rounded-full border border-line bg-white px-4 text-[0.875rem] text-ink-soft transition-all duration-200 hover:border-brand hover:text-brand"
                >
                  {suggestion.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-12 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted">
          {absoluteUrl('/')}
        </p>
      </div>
    </section>
  );
}
