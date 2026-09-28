import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { NAV_CTA, NAV_ITEMS } from '@/data/navigation';
import { Logo } from '@/components/brand/Logo';
import { getIcon } from '@/lib/icons';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM } from '@/lib/motion';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const location = useLocation();
  const reduce = useReducedMotion();
  const megaId = useId();

  /* --- Scroll state: transparent over hero, glass once scrolled ---------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* --- Close everything on route change --------------------------------- */
  useEffect(() => {
    setOpen(false);
    setMega(null);
  }, [location.pathname]);

  /* --- Lock body scroll while the mobile sheet is open ------------------- */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  /* --- Escape closes menus ---------------------------------------------- */
  useEffect(() => {
    if (!open && !mega) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        setMega(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, mega]);

  const openMega = useCallback((label: string) => {
    window.clearTimeout(closeTimer.current);
    setMega(label);
  }, []);

  const scheduleClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMega(null), 140);
  }, []);

  const isItemActive = (to: string) => location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to main content
      </a>

      <motion.header
        initial={reduce ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_PREMIUM }}
        onMouseLeave={scheduleClose}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-premium',
          scrolled || open || mega
            ? 'border-b border-line bg-white/80 shadow-[0_1px_0_rgba(228,231,236,0.9),0_8px_30px_rgba(16,24,40,0.05)] backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <nav aria-label="Primary" className="mx-auto w-full max-w-container px-5 sm:px-8 lg:px-10">
          <div
            className="flex items-center justify-between transition-[height] duration-300 ease-premium"
            style={{ height: 'var(--nav-h)' }}
          >
            <Logo />

            {/* ---------------- Desktop links ---------------- */}
            <ul className="hidden items-center gap-0.5 lg:flex">
              {NAV_ITEMS.map((item) => {
                const itemActive = isItemActive(item.to);
                const hasMega = Boolean(item.groups?.length);
                return (
                  <li
                    key={item.label}
                    onMouseEnter={() => (hasMega ? openMega(item.label) : setMega(null))}
                  >
                    <NavLink
                      to={item.to}
                      onFocus={() => (hasMega ? openMega(item.label) : setMega(null))}
                      aria-expanded={hasMega ? mega === item.label : undefined}
                      aria-controls={hasMega ? megaId : undefined}
                      className={cn(
                        'relative flex h-9 items-center gap-1 rounded-full px-3 text-[0.875rem] font-medium transition-colors duration-200',
                        itemActive ? 'text-brand' : 'text-ink-soft hover:text-ink',
                      )}
                    >
                      {item.label}
                      {hasMega ? (
                        <svg
                          viewBox="0 0 12 12"
                          aria-hidden="true"
                          className={cn(
                            'h-2.5 w-2.5 transition-transform duration-300',
                            mega === item.label && 'rotate-180',
                          )}
                        >
                          <path
                            d="M2.5 4.5 6 8l3.5-3.5"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : null}
                      <span
                        className={cn(
                          'absolute inset-x-3 -bottom-px h-px origin-left scale-x-0 bg-brand transition-transform duration-300 ease-premium',
                          (itemActive || mega === item.label) && 'scale-x-100',
                        )}
                        aria-hidden="true"
                      />
                    </NavLink>
                  </li>
                );
              })}
            </ul>

            {/* ---------------- Desktop CTA ---------------- */}
            <div className="hidden items-center gap-3 lg:flex">
              <Link
                to={NAV_CTA.to}
                className="group/cta relative inline-flex h-10 items-center gap-2 overflow-hidden rounded-full bg-brand px-5 text-[0.875rem] font-medium text-white shadow-blue-sm transition-all duration-200 hover:bg-brand-700 hover:shadow-blue"
              >
                <span
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-premium group-hover/cta:translate-x-full"
                  aria-hidden="true"
                />
                <span className="relative">{NAV_CTA.label}</span>
                <ArrowUpRight
                  className="relative h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>

            {/* ---------------- Mobile trigger ---------------- */}
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/80 text-ink backdrop-blur transition-colors hover:border-brand-200 hover:text-brand lg:hidden"
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>

        {/* ---------------- Desktop mega menu ---------------- */}
        <AnimatePresence>
          {mega ? (
            <MegaPanel
              id={megaId}
              label={mega}
              groups={NAV_ITEMS.find((item) => item.label === mega)?.groups ?? []}
              onEnter={openMega}
              reduce={Boolean(reduce)}
            />
          ) : null}
        </AnimatePresence>
      </motion.header>

      {/* ---------------- Mobile sheet ---------------- */}
      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />
            <motion.div
              key="sheet"
              id="mobile-navigation"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -18 }}
              transition={{ duration: 0.38, ease: EASE_PREMIUM }}
              className="fixed inset-x-0 top-[var(--nav-h)] z-50 max-h-[calc(100dvh-var(--nav-h))] overflow-y-auto overscroll-contain border-b border-line bg-white/95 px-5 pb-8 pt-4 shadow-card backdrop-blur-xl lg:hidden sm:px-8"
            >
              <ul className="flex flex-col divide-y divide-line">
                {NAV_ITEMS.map((item, index) => (
                  <motion.li
                    key={item.label}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.04 + index * 0.035, ease: EASE_PREMIUM }}
                  >
                    <NavLink
                      to={item.to}
                      className={cn(
                        'flex items-center justify-between py-4 font-display text-lg font-semibold transition-colors',
                        isItemActive(item.to) ? 'text-brand' : 'text-ink',
                      )}
                    >
                      {item.label}
                      <ArrowUpRight className="h-4 w-4 text-ink-muted" aria-hidden="true" />
                    </NavLink>

                    {item.groups?.length ? (
                      <ul className="mb-4 grid gap-1.5 sm:grid-cols-2">
                        {item.groups.flatMap((group) => group.items).map((child) => {
                          const Icon = getIcon(child.icon);
                          return (
                            <li key={child.to}>
                              <Link
                                to={child.to}
                                className="flex items-start gap-2.5 rounded-xl border border-line bg-canvas px-3 py-2.5 text-sm text-ink-soft transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand"
                              >
                                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                                <span className="leading-snug">{child.label}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.28, ease: EASE_PREMIUM }}
                className="mt-6"
              >
                <Link
                  to={NAV_CTA.to}
                  className="flex h-12 items-center justify-center gap-2 rounded-full bg-brand text-[0.9375rem] font-medium text-white shadow-blue"
                >
                  {NAV_CTA.label}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </motion.div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function MegaPanel({
  id,
  label,
  groups,
  onEnter,
  reduce,
}: {
  id: string;
  label: string;
  groups: { title: string; items: { label: string; to: string; description: string; icon: string }[] }[];
  onEnter: (label: string) => void;
  reduce: boolean;
}) {
  return (
    <motion.div
      id={id}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
      transition={{ duration: 0.28, ease: EASE_PREMIUM }}
      className="absolute inset-x-0 top-full hidden border-b border-line bg-white/95 shadow-card backdrop-blur-xl lg:block"
    >
      <div className="mx-auto w-full max-w-container px-10">
        <div className="grid grid-cols-12 gap-8 py-9">
          <div className="col-span-3 flex flex-col justify-between border-r border-line pr-8">
            <div>
              <p className="font-mono text-eyebrow uppercase text-brand">Explore</p>
              <p className="mt-3 font-display text-display-sm text-ink">{label}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Applied intelligence delivered as production engineering — scoped, measured and documented.
              </p>
            </div>
            <Link
              to="/contact"
              className="group/mega mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand"
            >
              <span className="link-sweep">Talk to an engineer</span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover/mega:-translate-y-0.5 group-hover/mega:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          {groups.map((group) => (
            <div
              key={group.title}
              className="col-span-3"
              onMouseEnter={() => onEnter(label)}
            >
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">{group.title}</p>
              <ul className="mt-4 space-y-1">
                {group.items.map((child) => {
                  const Icon = getIcon(child.icon);
                  return (
                    <li key={child.to}>
                      <Link
                        to={child.to}
                        className="group/item -mx-3 flex gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-brand-50"
                      >
                        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand transition-colors duration-200 group-hover/item:bg-brand group-hover/item:text-white">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[0.9375rem] font-medium text-ink transition-colors group-hover/item:text-brand">
                            {child.label}
                          </span>
                          <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-muted">
                            {child.description}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Fills the trailing columns so the panel grid stays even. */}
          <div className="col-span-3" aria-hidden="true" />
        </div>
      </div>
    </motion.div>
  );
}
