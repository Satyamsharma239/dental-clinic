import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { REVIEWS } from '@/data/clinicInfo';

type PatientReviewCarouselProps = {
  limit?: number;
};

export default function PatientReviewCarousel({ limit }: PatientReviewCarouselProps) {
  const reviews = limit ? REVIEWS.slice(0, limit) : REVIEWS;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || reviews.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((index) => index + 1);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [isPaused, reviews.length]);

  const handleTransitionEnd = () => {
    if (activeIndex === reviews.length) setActiveIndex(0);
  };

  const goToPrevious = () => {
    setActiveIndex((index) => (index === 0 ? reviews.length - 1 : index - 1));
  };

  const goToNext = () => {
    setActiveIndex((index) => (index >= reviews.length - 1 ? reviews.length : index + 1));
  };

  return (
    <section
      role="region"
      aria-label="Patient reviews"
      aria-roledescription="carousel"
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="overflow-hidden">
        <div
          className="patient-review-track flex"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {[...reviews, reviews[0]].map((review, index) => (
            <article
              key={`${review.id}-${index === reviews.length ? 'loop' : 'review'}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${Math.min(index + 1, reviews.length)} of ${reviews.length}`}
              aria-hidden={index !== activeIndex || undefined}
              className="flex min-w-0 flex-[0_0_100%] flex-col justify-between p-6 sm:min-h-64 sm:p-9"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">
                  {review.treatment}
                </span>
                <blockquote className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700 sm:text-xl sm:leading-relaxed">
                  “{review.quote}”
                </blockquote>
              </div>
              <footer className="mt-7 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-semibold text-teal-800"
                  >
                    {review.patient.split(' ').map((part) => part[0]).join('')}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{review.patient}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{review.location}</p>
                  </div>
                </div>
                <span className="text-xs tabular-nums text-slate-500" aria-live="polite">
                  {Math.min(activeIndex + 1, reviews.length)} / {reviews.length}
                </span>
              </footer>
            </article>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 px-5 py-3">
        <p className="text-xs text-slate-500">Patient experiences at Aura Dental Studio</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Previous patient review"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:border-teal-600 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            type="button"
            onClick={goToNext}
            aria-label="Next patient review"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:border-teal-600 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}