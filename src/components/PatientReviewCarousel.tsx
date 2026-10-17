import { useEffect, useRef } from 'react';
import { REVIEWS } from '@/data/clinicInfo';

export default function PatientReviewCarousel() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const track = trackRef.current;
    if (!marquee || !track) return;

    const updateScrollDistance = () => {
      const distance = Math.max(0, track.scrollWidth - marquee.clientWidth);
      marquee.style.setProperty('--review-scroll-distance', `-${distance}px`);
    };

    const observer = new ResizeObserver(updateScrollDistance);
    observer.observe(marquee);
    observer.observe(track);
    updateScrollDistance();

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={marqueeRef}
      className="patient-review-marquee"
      role="region"
      aria-label="Patient reviews"
      aria-roledescription="review list"
      tabIndex={0}
    >
      <div ref={trackRef} className="patient-review-track" role="list">
        {REVIEWS.map((review) => (
          <article
            key={review.id}
            className="patient-review-card flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            role="listitem"
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
    </div>
  );
}
