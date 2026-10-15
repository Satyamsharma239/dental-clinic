import { Link } from 'react-router-dom';
import { REVIEWS, CLINIC } from '@/data/clinicInfo';
import { Calendar, MessageCircle, ArrowRight } from 'lucide-react';

export default function ReviewsPage() {
  const waReviewUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(
    'Hello Dr. Sharma, I read your patient feedback and would like to book a consultation at Aura Dental Studio.'
  )}`;

  return (
    <div className="bg-surface-subtle py-10 md:py-16 text-slate">
      <div className="max-w-container mx-auto px-4 sm:px-8">
        
        <div className="max-w-2xl mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block">
            Patient Stories
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate tracking-tight">
            Notes from our patients.
          </h1>
          <p className="text-sm sm:text-base text-slate-secondary">
            Every patient visit centers on unhurried checkups, clear dialogue, and gentle clinical execution. Read firsthand feedback from patients across Bandra, Khar, BKC, and Mumbai.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl border border-border p-6 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <span className="text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 inline-block">
                  {review.treatment}
                </span>

                <p className="text-xs sm:text-sm text-slate leading-relaxed">
                  "{review.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-border text-xs">
                <div className="font-bold text-slate">{review.patient}</div>
                <div className="text-slate-muted">{review.location}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-slate">
              Experience gentle, unhurried dentistry yourself.
            </h3>
            <p className="text-xs sm:text-sm text-slate-secondary">
              Book a 30-minute consultation with Dr. Satyam Sharma at Studio 204, Waterfield Road, Bandra West.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link to="/book" className="btn-primary text-xs h-10 px-4">
              <Calendar size={14} />
              <span>Book Online</span>
            </Link>
            <a
              href={waReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-xs h-10 px-4"
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
