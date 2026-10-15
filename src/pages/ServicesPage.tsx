import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TREATMENTS } from '@/data/services';
import { CLINIC } from '@/data/clinicInfo';
import { Clock, MessageCircle, Calendar, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

const CATEGORIES = ['All', 'Orthodontics', 'Restorative', 'Cosmetic', 'Preventative', 'Surgical', 'Pediatric'];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTreatments = selectedCategory === 'All'
    ? TREATMENTS
    : TREATMENTS.filter((t) => t.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="bg-slate-50 text-slate-800 font-sans">
      
      <section className="py-14 sm:py-20 bg-gradient-to-br from-teal-50 via-slate-50 to-emerald-50/50 border-b border-slate-200">
        <div className="max-w-container mx-auto px-4 sm:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white border border-teal-200 text-teal-800 shadow-xs">
            <Sparkles size={14} className="text-teal-600" />
            <span>Dental Services · Waterfield Road, Bandra West</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Our Dental Services & Honest Pricing
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Every procedure at Aura Dental Studio is delivered with natural tooth conservation in mind. We explain every step, recovery time, and exact fee before starting.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-container mx-auto px-4 sm:px-8">

        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 pb-4">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'bg-white border border-slate-300 text-slate-600 hover:text-slate-900 hover:border-slate-400'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredTreatments.map((treatment) => {
            const waUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(
              `Hi Dr. Sharma, I want to inquire about ${treatment.name} at Aura Dental Studio.`
            )}`;

            return (
              <div
                key={treatment.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <img
                      src={treatment.image}
                      alt={treatment.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3.5 left-3.5 bg-white/95 px-3 py-1 rounded-lg text-xs font-bold text-slate-800 shadow-xs">
                      {treatment.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3.5">
                    <h2 className="text-xl font-bold text-slate-900">
                      <Link to={`/services/${treatment.slug}`} className="hover:text-teal-700 transition-colors">
                        {treatment.name}
                      </Link>
                    </h2>
                    
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {treatment.shortDescription}
                    </p>

                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      {treatment.steps.slice(0, 3).map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 size={14} className="text-teal-600 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Starting Fee</span>
                    <span className="text-base font-extrabold text-teal-800">{treatment.priceFormatted}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-[#25D366] hover:bg-emerald-50 rounded-lg border border-slate-200 transition-colors"
                      title="Inquire on WhatsApp"
                      aria-label="WhatsApp Inquiry"
                    >
                      <MessageCircle size={18} />
                    </a>
                    <Link
                      to={`/services/${treatment.slug}`}
                      className="text-xs font-bold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-3.5 py-2 rounded-lg border border-teal-200 transition-colors"
                    >
                      Details & FAQs
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-8 sm:p-10 bg-teal-900 text-white rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300 block">Not sure which treatment you need?</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Book a Comprehensive Dental Checkup
            </h3>
            <p className="text-sm text-teal-100 max-w-xl leading-relaxed">
              Dr. Satyam Sharma will examine your teeth, show you chairside 3D optical scans on the screen, and explain all viable options with upfront written pricing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/book"
              className="btn-primary bg-white text-teal-900 hover:bg-teal-50 border-white text-xs h-11 px-5"
            >
              <Calendar size={15} />
              <span>Book Consultation</span>
            </Link>

            <a
              href={`https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent('Hello Dr. Sharma, I am not sure which dental treatment I need and would like advice.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-xs h-11 px-5"
            >
              <MessageCircle size={15} />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  </div>
  );
}
