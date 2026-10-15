import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-surface text-slate">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700 text-sm font-sans font-semibold"
      >
        Skip to main content
      </a>

      <Header />
      
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
