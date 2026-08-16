import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppFab } from '@/components/WhatsAppFab';
import { Seo } from '@/seo/Seo';

import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Work from '@/pages/Work';
import Testimonials from '@/pages/Testimonials';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

/**
 * Restores scroll on navigation, and honours #hash deep links
 * (e.g. /services#qr-access-management from the footer).
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <>
      <Seo />
      <ScrollManager />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ink-900 focus:px-5 focus:py-3 focus:text-cream-50"
      >
        Skip to content
      </a>

      <div className="flex min-h-screen flex-col">
        <Header />

        <main id="main" className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/work" element={<Work />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>

      <WhatsAppFab />
    </>
  );
}
