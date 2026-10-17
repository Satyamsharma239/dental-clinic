import { Link } from 'react-router-dom';
import { CLINIC } from '@/data/clinicInfo';
import { Calendar, MessageCircle } from 'lucide-react';
import PageHero from '@/components/PageHero';
import PatientReviewCarousel from '@/components/PatientReviewCarousel';
import DentalVideos from '@/components/DentalVideos';

export default function ReviewsPage() {
  const waReviewUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(
    'Hello Dr. Sharma, I read your patient feedback and would like to book a consultation at Aura Dental Studio.'
  )}`;

  return (
    <div className="bg-canvas pb-12 text-ink sm:pb-20">
      <PageHero
        eyebrow="Patient Feedback"
        title="Patient experiences at Aura Dental Studio"
        description="Hear from patients about their visits, treatment, and the care they received from Dr. Satyam Sharma."
      />

      <main className="max-w-container mx-auto space-y-12 px-4 py-10 sm:px-8 sm:py-14">
        <section aria-label="Patient feedback" className="space-y-6">
          <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[220px_1fr] sm:gap-8">
            <img
              src="/images/dr-satyam-sharma.jpg"
              alt="Dr. Satyam Sharma at Aura Dental Studio"
              className="aspect-[4/3] w-full rounded-xl object-cover"
              loading="eager"
            />
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Patient feedback</span>
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">What our patients say</h2>
              <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
                Experiences shared by patients about their care and visits at Aura Dental Studio.
              </p>
            </div>
          </div>
          <PatientReviewCarousel />
          <DentalVideos compact embedded />
        </section>

        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-teal-900 p-6 text-white sm:flex-row sm:p-8">
          <div className="space-y-1.5 text-center sm:text-left">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Experience gentle, unhurried dentistry yourself.
            </h2>
            <p className="max-w-lg text-xs text-teal-100 sm:text-sm">
              Schedule a 30-minute consultation with Dr. Satyam Sharma at Studio 204, Waterfield Road, Bandra West.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={waReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-teal-200 bg-transparent px-5 text-xs font-semibold text-teal-100 transition-colors hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <MessageCircle size={15} />
              <span>WhatsApp Dr. Sharma</span>
            </a>
            <Link to="/book" className="btn-primary h-10 border-white bg-white px-5 text-xs text-teal-900 hover:bg-teal-50">
              <Calendar size={14} />
              <span>Book Appointment</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
