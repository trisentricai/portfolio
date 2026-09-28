import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { PlaceholderVisual } from '@/components/ui/Disclosure';
import type { Product } from '@/data/products';
import { cn } from '@/lib/cn';

const ACCENTS: Record<Product['accent'], { wash: string; ring: string; dot: string }> = {
  blue: { wash: 'from-brand/[0.08]', ring: 'border-brand/40', dot: 'bg-brand' },
  lime: { wash: 'from-accent/[0.12]', ring: 'border-accent/60', dot: 'bg-accent' },
  mixed: { wash: 'from-brand/[0.08] to-accent/[0.1]', ring: 'border-brand/30', dot: 'bg-gradient-to-br from-brand to-accent' },
};

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const accent = ACCENTS[product.accent];

  return (
    <Card as="article" interactive className={cn('h-full overflow-hidden', className)}>
      {/* Abstract generated artwork — no fake product screenshots. */}
      <div className={cn('relative border-b border-line', `bg-gradient-to-br ${accent.wash} to-transparent`)}>
        <PlaceholderVisual label={`${product.name} — concept visual`} ratio="aspect-[16/9]" className="rounded-none border-0 border-b-0" />
        <div className="absolute left-5 top-5">
          <Badge tone="outline" className="bg-white/90 backdrop-blur">
            {product.category}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-[1.375rem] font-semibold tracking-[-0.02em]">{product.name}</h3>
          <span
            className={cn('h-2 w-2 shrink-0 rounded-full', accent.dot)}
            aria-hidden="true"
          />
        </div>

        <p className="mt-2 text-[0.9375rem] font-medium leading-snug text-brand">{product.tagline}</p>

        <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">{product.description}</p>

        <ul className="mt-6 space-y-2">
          {product.features.slice(0, 3).map((feature) => (
            <li key={feature.title} className="flex items-start gap-2 text-[0.8125rem] leading-snug text-ink-soft">
              <span className={cn('mt-[0.45rem] h-1 w-1 shrink-0 rounded-full', accent.dot)} aria-hidden="true" />
              <span className="font-medium text-ink">{feature.title}</span>
              <span className="text-ink-muted">— {feature.detail}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-5">
          <Badge tone="neutral">{product.status}</Badge>
          <Link
            to="/contact"
            className="group/enquire inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-brand"
          >
            <span className="link-sweep">Enquire about this</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-premium group-hover/enquire:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
