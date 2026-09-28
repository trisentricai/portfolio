import { Check } from 'lucide-react';
import { getIcon } from '@/lib/icons';
import { Reveal } from '@/components/ui/Reveal';

export interface PipelineStage {
  step: string;
  title: string;
  detail: string;
}

/**
 * Horizontal/vertical step rail used on solution pages and as a generic
 * "how it works" component. Renders as an ordered list for correct semantics.
 */
export function SolutionPipeline({
  stages,
  className,
  title,
}: {
  stages: PipelineStage[];
  className?: string;
  title?: string;
}) {
  if (!stages.length) return null;

  return (
    <div className={className}>
      {title ? <h3 className="font-display text-[1.25rem] font-semibold tracking-[-0.02em]">{title}</h3> : null}
      <ol className={title ? 'mt-6 space-y-4' : 'space-y-4'}>
        {stages.map((stage, index) => {
          const Icon = getIcon(stageIcon(index));
          return (
            <Reveal as="li" key={stage.step} delay={index * 0.06} y={16}>
              <div className="group/stage relative flex gap-5 rounded-2xl border border-line bg-white p-5 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-brand-200 hover:shadow-card sm:p-6">
                <div className="flex flex-col items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand transition-colors duration-300 group-hover/stage:bg-brand group-hover/stage:text-white">
                    <Icon className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
                  </span>
                  {index < stages.length - 1 ? (
                    <span className="hidden w-px flex-1 bg-line sm:block" aria-hidden="true" />
                  ) : null}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-brand numeric">
                      {stage.step}
                    </span>
                  </div>
                  <h4 className="mt-2 font-display text-[1.125rem] font-semibold tracking-[-0.015em]">{stage.title}</h4>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{stage.detail}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
}

/** Feature list with lime check marks. */
export function CheckList({
  items,
  columns = 1,
  className,
}: {
  items: string[];
  columns?: 1 | 2;
  className?: string;
}) {
  return (
    <ul
      className={
        columns === 2
          ? `grid gap-3 sm:grid-cols-2 ${className ?? ''}`
          : `space-y-3 ${className ?? ''}`
      }
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-ink-soft">
          <span
            className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/30 text-[#3F5D00]"
            aria-hidden="true"
          >
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function stageIcon(index: number): string {
  return ['Search', 'Blocks', 'Wrench', 'ShieldCheck', 'GraduationCap'][index % 5];
}
