import PageHero from '@/components/PageHero';
import PatientReviewCarousel from '@/components/PatientReviewCarousel';
import PatientFeedbackVideos from '@/components/PatientFeedbackVideos';

export default function ReviewsPage() {
  return (
    <div className="bg-canvas pb-12 text-ink sm:pb-20">
      <PageHero
        eyebrow="Patient Feedback"
        title="Patient experiences at Aura Dental Studio"
        description="Hear from patients about their visits, treatment, and the care they received from Dr. Satyam Sharma."
      />

      <main className="max-w-container mx-auto space-y-12 px-4 py-10 sm:px-8 sm:py-14">
        <section aria-label="Patient feedback" className="space-y-6">
          <div className="mx-auto max-w-2xl space-y-2 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Patient feedback</span>
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">What our patients say</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              Experiences shared by patients about their care and visits at Aura Dental Studio.
            </p>
          </div>
          <PatientReviewCarousel />
        </section>

        <PatientFeedbackVideos />
      </main>
    </div>
  );
}
