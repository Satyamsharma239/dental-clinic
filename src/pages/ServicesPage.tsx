import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, ShieldCheck, Sparkles, Clock, CheckCircle2, Phone, Calendar } from 'lucide-react';
import FadeIn from '@/components/FadeIn';
import { SERVICES } from '@/data/services';
import { CLINIC } from '@/data/clinicInfo';
import { DentalToothIcon } from '@/components/common/DentalToothIcon';

export default function ServicesPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'preventive' | 'restorative' | 'cosmetic'>('all');

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredServices = SERVICES.filter((service) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'preventive') return service.id === 'svc-1' || service.id === 'svc-7';
    if (activeCategory === 'restorative') return service.id === 'svc-2' || service.id === 'svc-3' || service.id === 'svc-4' || service.id === 'svc-8';
    if (activeCategory === 'cosmetic') return service.id === 'svc-5' || service.id === 'svc-6';
    return true;
  });

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="section-padding bg-gradient-to-b from-primary-50/60 to-bg border-b border-primary/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-primary/20 text-xs font-semibold text-primary mb-4 shadow-sm">
              <DentalToothIcon size={14} className="text-accent" />
              <span>Ethical Dental Care & Honest Pricing</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary font-bold mb-4 tracking-tight">
              Clinical Treatments & Transparent Fees
            </h1>
            <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
              Clear clinical explanations, realistic timelines, and itemized upfront costs. We never recommend procedures you don’t genuinely need.
            </p>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
              {[
                { id: 'all', label: 'All Dental Procedures' },
                { id: 'preventive', label: 'Preventive & Hygiene' },
                { id: 'restorative', label: 'Restorative & Pain Relief' },
                { id: 'cosmetic', label: 'Orthodontics & Cosmetics' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeCategory === tab.id
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-white border border-primary/15 text-text-muted hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {filteredServices.map((service, index) => {
              const isExpanded = expandedId === service.id;
              
              return (
                <FadeIn key={service.id} delay={index * 0.05}>
                  <div className="bg-bg rounded-2xl border border-primary/10 p-6 flex flex-col hover:border-primary/30 transition-all hover:shadow-card">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <DentalToothIcon size={16} className="text-accent" />
                        </div>
                        <h3 className="text-xl font-heading text-primary font-bold">{service.name}</h3>
                      </div>
                      <span className="bg-primary-50 text-primary border border-primary/20 rounded-md text-[11px] px-2.5 py-1 font-semibold whitespace-nowrap font-mono">
                        {service.durationMins} mins
                      </span>
                    </div>
                    
                    <p className="text-text-muted text-xs leading-relaxed mb-4">
                      {service.shortDescription}
                    </p>
                    
                    <div className="flex justify-between items-center pt-3 border-t border-primary/10 text-xs mb-4">
                      <div>
                        <span className="text-[10px] text-text-muted block">Estimated Fee</span>
                        <span className="font-bold text-primary text-sm font-mono">{service.priceRange}</span>
                      </div>
                      
                      <button 
                        onClick={() => toggleExpand(service.id)}
                        className="text-primary font-semibold text-xs flex items-center hover:text-accent focus:outline-none"
                      >
                        {isExpanded ? 'Hide details' : 'Procedure details'}
                        <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {/* Expandable Clinical Details & FAQs */}
                    {isExpanded && (
                      <div className="bg-white p-4 rounded-xl border border-primary/10 text-xs space-y-3 shadow-inner mb-4 animate-fadeIn">
                        <div>
                          <h4 className="font-bold text-primary mb-1">Clinical Protocol:</h4>
                          <p className="text-text-muted leading-relaxed">{service.description}</p>
                        </div>
                        
                        {service.faqs && service.faqs.length > 0 && (
                          <div className="pt-2 border-t border-primary/10 space-y-2">
                            <h4 className="font-bold text-primary">Patient Questions:</h4>
                            {service.faqs.map((faq, i: number) => (
                              <div key={i} className="space-y-0.5">
                                <p className="font-semibold text-text text-[11px]">Q: {faq.q}</p>
                                <p className="text-text-muted text-[11px] leading-relaxed">A: {faq.a}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Book Action */}
                    <div className="pt-1">
                      <Link 
                        to={`/booking?service=${service.slug}`} 
                        className="btn-primary w-full text-xs py-2.5 flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Calendar size={13} />
                        <span>Book Appointment</span>
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* Not Sure Consultation Card */}
          <FadeIn delay={0.2}>
            <div className="mt-12 p-8 rounded-2xl bg-primary text-white flex flex-col lg:flex-row items-center justify-between gap-6 shadow-card">
              <div className="space-y-2 text-center lg:text-left">
                <span className="text-xs font-bold text-accent uppercase tracking-wider">
                  Unsure which treatment fits your symptoms?
                </span>
                <h3 className="font-heading text-2xl md:text-3xl font-bold">
                  Book a Comprehensive Clinical Examination
                </h3>
                <p className="text-xs md:text-sm text-white/70 max-w-2xl leading-relaxed">
                  Dr. Satyam Sharma will perform an intraoral examination, review your oral health, answer all questions, and provide a clear, pressure-free treatment quote.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link to="/booking" className="btn-primary text-xs py-3 px-6 shadow-md">
                  Book Consultation (₹500)
                </Link>
                <a href={`tel:${CLINIC.phone}`} className="btn-outline bg-white/10 text-white border-white/20 hover:bg-white/20 text-xs py-3 px-5">
                  <Phone size={14} />
                  Call Clinic
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
