import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TREATMENTS } from '@/data/services';
import { CLINIC } from '@/data/clinicInfo';
import { Clock, MessageCircle, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';

const CATEGORIES = ['All', 'Orthodontics', 'Restorative', 'Cosmetic', 'Preventative', 'Surgical', 'Pediatric'];

export default function TreatmentsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTreatments = selectedCategory === 'All'
    ? TREATMENTS
    : TREATMENTS.filter((t) => t.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="bg-canvas py-12 sm:py-20 text-ink">
      <div className="max-w-container mx-auto px-4 sm:px-8">
        
        <div className="max-w-2xl mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.14em] text-sand-700 block">
            Clinical Scope & Treatments
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-ink tracking-tight leading-tight">
            Conservative dental procedures in Bandra West.
          </h1>
          <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
            Every procedure at Aura Dental Studio is delivered with natural tooth conservation in mind. We explain every clinical step, realistic recovery time, and exact fee before starting.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-hairline font-sans">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xs text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-sage-800 text-canvas'
                    : 'bg-white border border-border text-ink-secondary hover:text-ink hover:bg-canvas-subtle'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredTreatments.map((treatment) => {
            const waUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(
              `Hi Dr. Sharma, I want to inquire about ${treatment.name} at Aura Dental Studio.`
            )}`;

            return (
              <div
                key={treatment.id}
                className="bg-white rounded-sm border border-hairline overflow-hidden flex flex-col justify-between shadow-2xs hover:border-border-strong transition-all"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-canvas-subtle overflow-hidden">
                    <img
                      src={treatment.image}
                      alt={treatment.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded-xs text-[10px] font-mono uppercase text-ink shadow-2xs">
                      {treatment.category}
                    </div>
                    <div className="absolute top-3 right-3 bg-ink/80 text-canvas px-2.5 py-1 rounded-xs text-[11px] font-mono flex items-center gap-1">
                      <Clock size={11} />
                      <span>{treatment.durationLabel}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h2 className="font-serif text-xl font-medium text-ink">
                      <Link to={`/treatments/${treatment.slug}`} className="hover:text-sage-800 transition-colors">
                        {treatment.name}
                      </Link>
                    </h2>
                    
                    <p className="font-sans text-xs text-ink-secondary leading-relaxed">
                      {treatment.shortDescription}
                    </p>

                    <div className="pt-2 border-t border-hairline space-y-1.5 font-sans">
                      {treatment.steps.slice(0, 3).map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-ink-secondary">
                          <CheckCircle2 size={12} className="text-sage-700 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-hairline mt-4 flex items-center justify-between font-sans">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-ink-muted block">Starting Fee</span>
                    <span className="text-sm font-mono font-semibold text-ink num-tabular">{treatment.priceFormatted}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-[#1EBE5D] hover:bg-emerald-50 rounded-xs border border-border transition-colors"
                      title="Inquire on WhatsApp"
                      aria-label="WhatsApp Inquiry"
                    >
                      <MessageCircle size={15} />
                    </a>
                    <Link
                      to={`/treatments/${treatment.slug}`}
                      className="text-xs font-medium text-sage-800 hover:text-sage-900 bg-canvas-subtle hover:bg-canvas-muted px-3 py-1.5 rounded-xs border border-border/80 transition-colors"
                    >
                      Protocol & FAQs
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-8 bg-sage-900 text-canvas rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-mono uppercase text-sand-500 block">Not certain which treatment is appropriate?</span>
            <h3 className="font-serif text-2xl font-normal">
              Book a comprehensive examination & 3D scan (₹500).
            </h3>
            <p className="font-sans text-xs sm:text-sm text-canvas/80 max-w-xl">
              Dr. Satyam Sharma will examine your oral health, show you chairside intraoral scans, and present all viable options with transparent itemized pricing before you decide anything.
            </p>
          </div>

          <Link
            to="/book"
            className="btn-primary bg-sand-600 hover:bg-sand-700 text-white border-sand-600 shrink-0 text-xs h-11 px-5"
          >
            <Calendar size={15} />
            <span>Book Initial Checkup</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
