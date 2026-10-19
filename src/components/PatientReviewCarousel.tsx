import { useEffect, useRef, useState } from 'react';
import { REVIEWS } from '@/data/clinicInfo';

export default function PatientReviewCarousel() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const track = trackRef.current;
    if (!marquee || !track) return;

    const updateScrollDistance = () => {
      const lastCard = track.lastElementChild;
      if (!(lastCard instanceof HTMLElement)) return;

      const distance = Math.max(
        0,
        lastCard.getBoundingClientRect().right -
          track.getBoundingClientRect().left -
          marquee.clientWidth
      );
      marquee.style.setProperty('--review-scroll-distance', `-${distance}px`);
    };

    const observer = new ResizeObserver(updateScrollDistance);
    observer.observe(marquee);
    observer.observe(track);
    updateScrollDistance();

    const progressTimer = window.setInterval(() => {
      const animation = track.getAnimations()[0];
      const duration = animation?.effect?.getComputedTiming().duration;
      if (typeof duration !== 'number' || duration <= 0) return;

      const progress = Math.min(Number(animation.currentTime ?? 0) / duration, 1);
      setActiveReview(Math.min(REVIEWS.length - 1, Math.floor(progress * REVIEWS.length)));
    }, 250);

    return () => {
      observer.disconnect();
      window.clearInterval(progressTimer);
    };
  }, []);

  const navigateToReview = (index: number) => {
    const track = trackRef.current;
    const animation = track?.getAnimations()[0];
    const duration = animation?.effect?.getComputedTiming().duration;
    if (animation && typeof duration === 'number') {
      animation.currentTime = duration * (index / REVIEWS.length);
      setActiveReview(index);
      return;
    }

    const marquee = marqueeRef.current;
    const card = track?.firstElementChild;
    if (!marquee || !track || !(card instanceof HTMLElement)) return;
    const gap = Number.parseFloat(getComputedStyle(track).gap) || 0;
    marquee.scrollTo({ left: index * (card.offsetWidth + gap), behavior: 'smooth' });
    setActiveReview(index);
  };

  return (
    <div>
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
      <div className="mt-5 flex items-center justify-center gap-2" role="group" aria-label="Choose a review">
        {REVIEWS.map((review, index) => (
          <button
            key={review.id}
            type="button"
            onClick={() => navigateToReview(index)}
            aria-label={`Go to review ${index + 1} of ${REVIEWS.length}`}
            aria-current={activeReview === index ? 'true' : undefined}
            className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 ${
              activeReview === index ? 'w-6 bg-teal-700' : 'w-2.5 bg-slate-300 hover:bg-teal-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
