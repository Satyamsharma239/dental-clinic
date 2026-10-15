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
    return <Navigate to="/services" replace />;
  }

  const waTreatmentUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(
    `Hello Dr. Sharma, I want to book an appointment for ${treatment.name} at Aura Dental Studio.`
  )}`;

  return (
    <div className="bg-canvas py-10 sm:py-16 text-ink">
      <div className="max-w-container mx-auto px-4 sm:px-8">
        
        <div className="mb-6 font-sans">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted hover:text-sage-800 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to All Services</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4 font-sans">
            <div className="bg-white rounded-sm border border-hairline p-6 shadow-2xs space-y-5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-sand-700 bg-sand-50 px-2.5 py-0.5 rounded-xs inline-block mb-2 border border-sand-200">
                  {treatment.category} · Aura Dental Studio
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-medium text-ink leading-tight">
                  {treatment.name}
                </h1>
                <p className="font-sans text-xs sm:text-sm text-ink-secondary mt-2 leading-relaxed">
                  {treatment.benefit}
                </p>
              </div>

              <div className="p-4 rounded-xs bg-canvas-subtle border border-hairline space-y-2 num-tabular">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ink-muted">Starting Fee</span>
                  <span className="font-mono text-xl font-semibold text-ink">{treatment.priceFormatted}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-ink-secondary pt-2 border-t border-hairline">
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-sand-700" />
                    <span>Appointment Duration</span>
                  </span>
                  <span className="font-mono font-medium text-ink">{treatment.durationLabel}</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-1">
                <Link
                  to={`/book?service=${treatment.slug}`}
                  className="btn-primary w-full text-xs h-11"
                >
                  <Calendar size={15} />
                  <span>Schedule Consultation</span>
                </Link>

                <a
                  href={waTreatmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full text-xs h-11"
                >
                  <MessageCircle size={15} />
                  <span>Ask Dr. Sharma on WhatsApp</span>
                </a>

                <a
                  href={`tel:${CLINIC.phone}`}
                  className="btn-secondary w-full text-xs h-10"
                >
                  <Phone size={13} className="text-ink-muted" />
                  <span>Call Clinic: {CLINIC.phoneDisplay}</span>
                </a>
              </div>

              <div className="pt-3 border-t border-hairline space-y-2 text-xs text-ink-muted">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-sage-700 shrink-0" />
                  <span>Computerized slow-delivery anesthesia</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-sage-700 shrink-0" />
                  <span>0% Interest monthly installments (EMI) available</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-sage-700 shrink-0" />
                  <span>Full itemized written estimate upfront</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8 font-sans">
            
            <div className="bg-white rounded-sm border border-hairline p-6 sm:p-8 space-y-4 shadow-2xs">
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-ink">
                Clinical Overview
              </h2>
              <p className="font-sans text-sm text-ink-secondary leading-relaxed">
                {treatment.description}
              </p>
            </div>

            <div className="bg-white rounded-sm border border-hairline p-6 sm:p-8 space-y-5 shadow-2xs">
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-ink">
                Procedural Protocol
              </h2>
              <div className="space-y-3">
                {treatment.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-ink-secondary">
                    <span className="w-6 h-6 rounded-xs bg-sage-100 text-sage-900 font-mono text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-canvas-subtle rounded-sm border border-hairline p-6 sm:p-8 space-y-3">
              <h3 className="font-serif text-lg font-medium text-ink">
                Aftercare & Recovery Notes
              </h3>
              <p className="font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {treatment.aftercare}
              </p>
            </div>

            {treatment.faqs && treatment.faqs.length > 0 && (
              <div className="bg-white rounded-sm border border-hairline p-6 sm:p-8 space-y-4 shadow-2xs">
                <h2 className="font-serif text-xl sm:text-2xl font-medium text-ink">
                  Frequently Asked Questions
                </h2>

                <div className="divide-y divide-hairline border-y border-hairline">
                  {treatment.faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div key={idx} className="py-4">
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full flex items-center justify-between text-left gap-4"
                        >
                          <span className="font-serif text-base font-medium text-ink">
                            {faq.q}
                          </span>
                          <ChevronDown
                            size={16}
                            className={`text-ink-muted shrink-0 transition-transform ${
                              isOpen ? 'rotate-180 text-sage-800' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="pt-2.5 font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
