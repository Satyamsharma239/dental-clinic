import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

import HomePage from '@/pages/HomePage';
import TreatmentsPage from '@/pages/TreatmentsPage';
import TreatmentDetailPage from '@/pages/TreatmentDetailPage';
import DoctorPage from '@/pages/DoctorPage';
import PricingPage from '@/pages/PricingPage';
import ReviewsPage from '@/pages/ReviewsPage';
import ContactPage from '@/pages/ContactPage';
import BookingPage from '@/pages/BookingPage';
import NotFoundPage from '@/pages/NotFoundPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function LegacyServiceRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={slug ? `/treatments/${slug}` : '/treatments'} replace />;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/treatments" element={<TreatmentsPage />} />
          <Route path="/treatments/:slug" element={<TreatmentDetailPage />} />
          <Route path="/doctor" element={<DoctorPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/book" element={<BookingPage />} />

          <Route path="/booking" element={<Navigate to="/book" replace />} />
          <Route path="/about" element={<Navigate to="/doctor" replace />} />
          <Route path="/services" element={<Navigate to="/treatments" replace />} />
          <Route path="/services/:slug" element={<LegacyServiceRedirect />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
