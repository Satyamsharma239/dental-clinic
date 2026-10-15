import { Link } from 'react-router-dom';
import { TREATMENTS } from '@/data/services';
import { CLINIC } from '@/data/clinicInfo';
import { Clock, MessageCircle, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function TreatmentsPage() {
  return (
    <div className="bg-surface-subtle py-10 md:py-16 text-slate">
      <div className="max-w-container mx-auto px-4 sm:px-8">
        
        <div className="max-w-2xl mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block">
            Services & Procedures
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate tracking-tight">
            Clear, gentle dental treatments.
          </h1>
          <p className="text-sm sm:text-base text-slate-secondary">
            Every procedure at Aura Dental Studio is delivered with natural tooth conservation in mind. We explain every clinical step, realistic recovery time, and exact fee before starting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {TREATMENTS.map((treatment) => {
            const waUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(
              `Hi Dr. Sharma, I want to inquire about ${treatment.name} at Aura Dental Studio.`
            )}`;

            return (
              <div
                key={treatment.id}
                className="bg-white rounded-2xl border border-border overflow-hidden flex flex-col justify-between shadow-xs hover:border-brand-300 transition-all"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <img
                      src={treatment.image}
                      alt={treatment.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded-md text-xs font-bold text-slate shadow-xs">
                      {treatment.category}
                    </div>
                    <div className="absolute top-3 right-3 bg-slate-900/80 text-white px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 font-mono">
                      <Clock size={12} />
                      <span>{treatment.durationLabel}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h2 className="text-lg font-bold text-slate">
                      <Link to={`/treatments/${treatment.slug}`} className="hover:text-brand-600 transition-colors">
                        {treatment.name}
                      </Link>
                    </h2>
                    
                    <p className="text-xs sm:text-sm text-slate-secondary leading-relaxed">
                      {treatment.shortDescription}
                    </p>

                    <div className="pt-2 border-t border-border/60 space-y-1.5">
                      {treatment.steps.slice(0, 3).map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-secondary">
                          <CheckCircle2 size={13} className="text-brand-600 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-border mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-muted block">Starting Fee</span>
                    <span className="text-base font-bold text-slate num-tabular">{treatment.priceFormatted}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-[#1EBE5D] hover:bg-[#25D366]/10 rounded-lg transition-colors"
                      title="Inquire on WhatsApp"
                    >
                      <MessageCircle size={17} />
                    </a>
                    <Link
                      to={`/treatments/${treatment.slug}`}
                      className="text-xs font-bold text-brand-700 hover:text-brand-800 bg-brand-50 hover:bg-brand-100 px-3 py-2 rounded-lg transition-colors"
                    >
                      Details & FAQs
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-slate">
              Need a general dental checkup first?
            </h3>
            <p className="text-xs sm:text-sm text-slate-secondary">
              Book a comprehensive examination and 3D digital scan for ₹500. No obligation to start treatment.
            </p>
          </div>
          <Link to="/book" className="btn-primary text-xs h-11 px-6 shrink-0">
            <Calendar size={15} />
            <span>Book Checkup</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
