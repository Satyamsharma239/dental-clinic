import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import StickyMobileBar from '@/components/StickyMobileBar';

export default function Layout() {
  const location = useLocation();
  const isBookingFlow = location.pathname.startsWith('/booking');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={`flex-1 ${isBookingFlow ? 'pb-8' : 'pb-24 md:pb-0'}`}>
        <Outlet />
      </main>
      <Footer />
      {!isBookingFlow && <StickyMobileBar />}
    </div>
  );
}
