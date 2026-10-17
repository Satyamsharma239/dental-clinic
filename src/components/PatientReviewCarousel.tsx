import { REVIEWS } from '@/data/clinicInfo';

export default function PatientReviewCarousel() {
  return (
    <div
      className="patient-review-marquee"
      role="region"
      aria-label="Patient reviews"
      aria-roledescription="carousel"
      tabIndex={0}
    >
      <div className="patient-review-track">
        {[false, true].map((duplicate) => (
          <div
            key={duplicate ? 'duplicate-reviews' : 'patient-reviews'}
            className="patient-review-group"
            aria-hidden={duplicate || undefined}
            role={duplicate ? undefined : 'list'}
          >
            {REVIEWS.map((review) => (
              <article
                key={review.id}
                className="patient-review-card flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                role={duplicate ? undefined : 'listitem'}
              >
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-teal-700">
                    {review.treatment}
                  </span>
                  <blockquote className="mt-3 text-sm leading-relaxed text-slate-700">
                    “{review.quote}”
                  </blockquote>
                </div>
                <footer className="mt-5 border-t border-slate-100 pt-4">
                  <p className="text-sm font-semibold text-slate-900">{review.patient}</p>
                  <p className="mt-1 text-xs text-slate-500">{review.location}</p>
                </footer>
              </article>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
