import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { Article } from '@/data/articles';
import { formatArticleDate } from '@/data/articles';
import { cn } from '@/lib/cn';

/** Abstract editorial artwork — deterministic per category, never a stock photo. */
function ArticleArtwork({ category, className }: { category: Article['category']; className?: string }) {
  const tint: Record<Article['category'], string> = {
    AI: '#2457FF',
    Engineering: '#6D8DFF',
    Research: '#101828',
    Technology: '#2457FF',
  };
  const color = tint[category];

  return (
    <div className={cn('relative h-40 overflow-hidden bg-canvas sm:h-48', className)} aria-hidden="true">
      <div className="absolute inset-0 bg-grid-dots opacity-60" />
      <svg viewBox="0 0 400 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`ts-art-${category}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.16" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <rect x="90" y="24" width="220" height="152" rx="18" fill={`url(#ts-art-${category})`} />
        {Array.from({ length: 6 }, (_, i) => (
          <rect
            key={i}
            x={110}
            y={44 + i * 22}
            width={150 - (i % 3) * 38}
            height="7"
            rx="3.5"
            fill={color}
            fillOpacity={0.16 + (i % 3) * 0.07}
          />
        ))}
        <circle cx="288" cy="152" r="7" fill="#C8FF3D" />
        <path d="M96 24 L96 176" stroke={color} strokeOpacity="0.24" strokeWidth="1.4" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white/85 to-transparent" />
    </div>
  );
}

export function ArticleCard({
  article,
  className,
  variant = 'default',
}: {
  article: Article;
  className?: string;
  variant?: 'default' | 'featured' | 'compact';
}) {
  if (variant === 'compact') {
    return (
      <Card as="article" interactive className={cn('h-full', className)}>
        <div className="flex h-full flex-col p-5">
          <div className="flex items-center gap-3">
            <Badge tone="neutral">{article.category}</Badge>
            <span className="font-mono text-[0.6875rem] text-ink-muted">{article.readMinutes} min</span>
          </div>
          <h3 className="mt-4 font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.015em]">
            <Link to={`/insights/${article.slug}`} className="before:absolute before:inset-0 before:content-['']">
              {article.title}
            </Link>
          </h3>
          <p className="mt-2.5 flex-1 text-[0.875rem] leading-relaxed text-ink-soft">{article.dek}</p>
          <time
            dateTime={article.date}
            className="mt-4 block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted"
          >
            {formatArticleDate(article.date)}
          </time>
        </div>
      </Card>
    );
  }

  const featured = variant === 'featured';

  return (
    <Card as="article" interactive className={cn('h-full overflow-hidden', className)}>
      <ArticleArtwork category={article.category} className={featured ? 'sm:h-72' : undefined} />
      <div className={cn('flex flex-1 flex-col', featured ? 'p-6 sm:p-9' : 'p-6 sm:p-7')}>
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="brand">{article.category}</Badge>
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted">
            {article.readMinutes} min read
          </span>
        </div>

        <h3
          className={cn(
            'mt-5 font-display font-semibold leading-tight tracking-[-0.02em]',
            featured ? 'text-[1.75rem] sm:text-[2rem]' : 'text-[1.3125rem] sm:text-[1.375rem]',
          )}
        >
          <Link to={`/insights/${article.slug}`} className="before:absolute before:inset-0 before:content-['']">
            {article.title}
          </Link>
        </h3>

        <p
          className={cn(
            'mt-3 flex-1 leading-relaxed text-ink-soft',
            featured ? 'text-base sm:text-[1.0625rem]' : 'text-[0.9375rem]',
          )}
        >
          {article.dek}
        </p>

        <div
          className={cn(
            'mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5',
          )}
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted">
              {article.author}
            </span>
            <time dateTime={article.date} className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted">
              {formatArticleDate(article.date)}
            </time>
          </div>
          <ArrowUpRight
            className="h-[1.125rem] w-[1.125rem] text-ink-muted transition-all duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
            aria-hidden="true"
          />
        </div>
      </div>
    </Card>
  );
}
