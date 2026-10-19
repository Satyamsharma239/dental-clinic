import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ConsultationCTA from './ConsultationCTA';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-canvas text-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-sage-800 focus:text-white focus:rounded-xs focus:outline-none focus:ring-2 focus:ring-sage-600 text-xs font-sans font-medium"
      >
        Skip to main content
      </a>

      <Header />
      
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      {pathname !== '/contact' && <ConsultationCTA />}
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
