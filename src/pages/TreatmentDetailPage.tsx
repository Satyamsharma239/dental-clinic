import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, MessageCircle, Phone, CheckCircle2, ChevronDown, ShieldCheck } from 'lucide-react';
import { TREATMENTS } from '@/data/services';
import { CLINIC } from '@/data/clinicInfo';

export default function TreatmentDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const treatment = TREATMENTS.find((t) => t.slug === slug);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!treatment) {
    return <Navigate to="/treatments" replace />;
  }

  const waTreatmentUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(
    `Hello Dr. Sharma, I want to book an appointment for ${treatment.name} at Aura Dental Studio.`
  )}`;

  return (
    <div className="bg-surface-subtle py-10 md:py-16 text-slate">
      <div className="max-w-container mx-auto px-4 sm:px-8">
        
        <div className="mb-6">
          <Link
            to="/treatments"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-muted hover:text-brand-600 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to All Treatments</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            <div className="bg-white rounded-2xl border border-border p-6 shadow-xs space-y-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full inline-block mb-2">
                  {treatment.category} · Aura Dental Studio
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate">
                  {treatment.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-secondary mt-2 leading-relaxed">
                  {treatment.benefit}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-subtle border border-border space-y-2 num-tabular">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-muted font-medium">Starting Fee</span>
                  <span className="text-xl font-extrabold text-slate">{treatment.priceFormatted}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-secondary pt-2 border-t border-border">
                  <span className="flex items-center gap-1">
                    <Clock size={13} className="text-brand-600" />
                    <span>Appointment Duration</span>
                  </span>
                  <span className="font-bold text-slate">{treatment.durationLabel}</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-1">
                <Link
                  to={`/book?service=${treatment.slug}`}
                  className="btn-primary w-full text-sm h-11"
                >
                  <Calendar size={16} />
                  <span>Book This Treatment</span>
                </Link>

                <a
                  href={waTreatmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full text-sm h-11"
                >
                  <MessageCircle size={17} />
                  <span>Ask Questions on WhatsApp</span>
                </a>

                <a
                  href={`tel:${CLINIC.phone}`}
                  className="btn-secondary w-full text-xs h-10"
                >
                  <Phone size={14} className="text-brand-600" />
                  <span>Call Reception ({CLINIC.phoneDisplay})</span>
                </a>
              </div>

              <div className="pt-3 border-t border-border space-y-2 text-xs text-slate-muted">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={15} className="text-emerald-600 shrink-0" />
                  <span>Painless computerized local anesthesia</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={15} className="text-emerald-600 shrink-0" />
                  <span>0% Interest monthly installments (EMI) available</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            
            <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-xs space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-slate">
                About this Treatment
              </h2>
              <p className="text-sm sm:text-base text-slate-secondary leading-relaxed">
                {treatment.description}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-xs space-y-5">
              <h2 className="text-lg sm:text-xl font-bold text-slate">
                Procedure Steps
              </h2>
              <div className="space-y-3">
                {treatment.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-surface-subtle border border-border/80">
                    <span className="w-6 h-6 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-xs space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate">
                Aftercare Guidelines
              </h2>
              <div className="p-4 rounded-xl bg-brand-50 border border-brand-200 text-xs sm:text-sm text-brand-950 leading-relaxed">
                {treatment.aftercare}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-xs space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-slate">
                Common Questions about {treatment.name}
              </h2>
              <div className="space-y-2.5">
                {treatment.faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className="border border-border rounded-xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate hover:text-brand-600 transition-colors bg-white"
                        aria-expanded={isOpen}
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          size={16}
                          className={`text-slate-muted shrink-0 transition-transform ${
                            isOpen ? 'rotate-180 text-brand-600' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="p-4 pt-0 text-xs text-slate-secondary leading-relaxed border-t border-border bg-white">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
