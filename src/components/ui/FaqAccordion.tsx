import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM } from '@/lib/motion';

/**
 * Accessible FAQ accordion. Each item is a button controlling its own region,
 * so it works with a keyboard and announces correctly in a screen reader.
 */
export function FaqAccordion({
  items,
  className,
  defaultOpen = -1,
}: {
  items: { question: string; answer: string }[];
  className?: string;
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState<number>(defaultOpen);
  const baseId = useId();

  if (!items.length) return null;

  return (
    <div className={cn('divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white', className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-btn-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : index)}
                className="group/faq flex w-full items-start justify-between gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-canvas focus-visible:outline-brand sm:px-6"
              >
                <span className="font-display text-[1rem] font-semibold tracking-[-0.015em] text-ink sm:text-[1.0625rem]">
                  {item.question}
                </span>
                <span
                  className={cn(
                    'mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
                    isOpen
                      ? 'rotate-45 border-brand bg-brand text-white'
                      : 'border-line bg-canvas text-ink-soft group-hover/faq:border-brand group-hover/faq:text-brand',
                  )}
                  aria-hidden="true"
                >
                  <Plus className="h-3.5 w-3.5" />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="content"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.34, ease: EASE_PREMIUM }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 pr-12 text-[0.9375rem] leading-relaxed text-ink-soft sm:px-6 sm:pr-16">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
