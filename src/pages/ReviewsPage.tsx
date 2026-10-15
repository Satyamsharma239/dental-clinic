import { Link } from 'react-router-dom';
import { REVIEWS, CLINIC } from '@/data/clinicInfo';
import { Calendar, MessageCircle, ArrowRight } from 'lucide-react';

export default function ReviewsPage() {
  const waReviewUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(
    'Hello Dr. Sharma, I read your patient feedback and would like to book a consultation at Aura Dental Studio.'
  )}`;

  return (
    <div className="bg-canvas py-12 sm:py-20 text-ink">
      <div className="max-w-container mx-auto px-4 sm:px-8">
        
        <div className="max-w-2xl mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.14em] text-sand-700 block">
            Patient Feedback
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-ink tracking-tight leading-tight">
            Accounts from our patients in Bandra.
          </h1>
          <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
            Every patient visit centers on unhurried checkups, clear dialogue, and gentle clinical execution. Read firsthand feedback from patients across Bandra, Khar, BKC, and Mumbai.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14 font-sans">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-sm border border-hairline p-6 shadow-2xs flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-xs bg-canvas-subtle text-sage-800 border border-border/60 inline-block">
                  {review.treatment}
                </span>

                <p className="font-serif text-sm sm:text-base text-ink-secondary italic leading-relaxed">
                  "{review.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-hairline text-xs">
                <div className="font-medium text-ink">{review.patient}</div>
                <div className="text-ink-muted text-[11px] mt-0.5">{review.location}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-sm bg-sage-900 text-canvas shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6 font-sans">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="font-serif text-2xl font-normal">
              Experience gentle, unhurried dentistry yourself.
            </h3>
            <p className="text-xs sm:text-sm text-canvas/80 max-w-lg">
              Schedule a 30-minute consultation with Dr. Satyam Sharma at Studio 204, Waterfield Road, Bandra West.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link to="/book" className="btn-primary bg-sand-600 hover:bg-sand-700 text-white border-sand-600 text-xs h-10 px-5">
              <Calendar size={14} />
              <span>Schedule Checkup (₹500)</span>
            </Link>
            <a
              href={waReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-xs h-10 px-5"
            >
              <MessageCircle size={15} />
              <span>WhatsApp Desk</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
