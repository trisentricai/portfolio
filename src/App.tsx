import { lazy, Suspense, type ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import Home from '@/pages/Home';

/* Every secondary route is split so the home bundle stays small. */
const Solutions = lazy(() => import('@/pages/Solutions'));
const SolutionDetail = lazy(() => import('@/pages/SolutionDetail'));
const Technologies = lazy(() => import('@/pages/Technologies'));
const Industries = lazy(() => import('@/pages/Industries'));
const Products = lazy(() => import('@/pages/Products'));
const CaseStudies = lazy(() => import('@/pages/CaseStudies'));
const CaseStudyDetail = lazy(() => import('@/pages/CaseStudyDetail'));
const Company = lazy(() => import('@/pages/Company'));
const Insights = lazy(() => import('@/pages/Insights'));
const ArticleDetail = lazy(() => import('@/pages/ArticleDetail'));
const Contact = lazy(() => import('@/pages/Contact'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function RouteFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center" role="status" aria-live="polite">
      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-ink-muted">Loading</span>
    </div>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      {/* tabIndex={-1} so the skip link actually moves focus here, not just the
          scroll position, in every browser. */}
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Shell>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/solutions/:slug" element={<SolutionDetail />} />
            <Route path="/technologies" element={<Technologies />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/products" element={<Products />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/company" element={<Company />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<ArticleDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Shell>
      </Suspense>
    </>
  );
}
