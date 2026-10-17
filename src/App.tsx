import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ServicesPage from '@/pages/ServicesPage';
import TreatmentDetailPage from '@/pages/TreatmentDetailPage';
import ContactPage from '@/pages/ContactPage';
import BookingPage from '@/pages/BookingPage';
import ReviewsPage from '@/pages/ReviewsPage';
import BlogPage from '@/pages/BlogPage';
import NotFoundPage from '@/pages/NotFoundPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function LegacyTreatmentRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={slug ? `/services/${slug}` : '/services'} replace />;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<TreatmentDetailPage />} />
          <Route path="/testimonials" element={<ReviewsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/book" element={<BookingPage />} />

          <Route path="/doctor" element={<Navigate to="/about" replace />} />
          <Route path="/treatments" element={<Navigate to="/services" replace />} />
          <Route path="/treatments/:slug" element={<LegacyTreatmentRedirect />} />
          <Route path="/pricing" element={<Navigate to="/services" replace />} />
          <Route path="/reviews" element={<Navigate to="/testimonials" replace />} />
          <Route path="/booking" element={<Navigate to="/book" replace />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
