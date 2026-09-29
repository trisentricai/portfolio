import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { SITE } from '@/lib/seo';
import { CATEGORIES } from './footerData';

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-line bg-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-dots opacity-[0.5] mask-fade-b" />
        <div className="blob -bottom-40 left-1/3 h-[30rem] w-[30rem] bg-brand/[0.07]" />
      </div>

      <div className="relative">
        {/* ---------------- Final brand statement ---------------- */}
        <div className="container-page border-b border-line py-16 sm:py-20 lg:py-24">
          <h2 className="max-w-4xl text-balance font-display text-display-md">
            <span className="block text-ink">Engineering intelligence.</span>
            <span className="mt-1 block bg-gradient-to-r from-brand via-brand-400 to-brand bg-clip-text text-transparent">
              Building what comes next.
            </span>
          </h2>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              to="/contact"
              className="group/f inline-flex h-[3.25rem] items-center justify-center gap-2 self-start rounded-full bg-brand px-7 text-base font-medium text-white shadow-blue transition-all duration-200 hover:bg-brand-700"
            >
              Start a Project
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover/f:-translate-y-0.5 group-hover/f:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2 self-start px-1 py-3 text-base text-ink-soft transition-colors hover:text-brand"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span className="link-sweep">{SITE.email}</span>
            </a>
          </div>
        </div>

        {/* ---------------- Link columns ---------------- */}
        <div className="container-page grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-16">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-soft">
              Intelligent software, AI systems, automation platforms and data-driven engineering for
              complex real-world problems.
            </p>
            <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
              {SITE.locale} · Worldwide
            </p>
          </div>

          {CATEGORIES.map((column) => (
            <nav key={column.title} aria-label={column.title} className="lg:col-span-2">
              <h3 className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {'href' in link ? (
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noreferrer noopener' : undefined}
                        className="group/fi inline-flex items-center gap-1 text-sm text-ink-soft transition-colors duration-200 hover:text-brand"
                      >
                        <span className="link-sweep">{link.label}</span>
                        {link.external ? (
                          <ArrowUpRight
                            className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover/fi:opacity-100"
                            aria-hidden="true"
                          />
                        ) : null}
                      </a>
                    ) : (
                      <Link
                        to={link.to}
                        className="inline-flex items-center gap-1 text-sm text-ink-soft transition-colors duration-200 hover:text-brand"
                      >
                        <span className="link-sweep">{link.label}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ---------------- Bottom bar ---------------- */}
        <div className="border-t border-line">
          <div className="container-page flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted">
              © {YEAR} Trisentric AI. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link
                to="/company"
                className="text-[0.8125rem] text-ink-soft transition-colors hover:text-brand"
              >
                <span className="link-sweep">Privacy Policy</span>
              </Link>
              <Link
                to="/company"
                className="text-[0.8125rem] text-ink-soft transition-colors hover:text-brand"
              >
                <span className="link-sweep">Terms</span>
              </Link>

              <ul className="ml-1 flex items-center gap-1.5">
                {SOCIAL.map((social) => {
                  const isMail = social.href.startsWith('mailto:');
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        {...(isMail ? {} : { target: '_blank', rel: 'noreferrer noopener' })}
                        aria-label={`Trisentric AI on ${social.label}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-all duration-200 hover:border-brand hover:bg-brand hover:text-white"
                      >
                        <social.icon className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const SOCIAL = [
  SITE.social.linkedin ? { label: 'LinkedIn', href: SITE.social.linkedin, icon: Linkedin } : null,
  SITE.social.github ? { label: 'GitHub', href: SITE.social.github, icon: Github } : null,
  { label: 'Email', href: `mailto:${SITE.email}`, icon: Mail },
].filter((social): social is { label: string; href: string; icon: typeof Mail } => social !== null);
