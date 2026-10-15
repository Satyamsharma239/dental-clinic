import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, Clock, Sparkles, HelpCircle } from 'lucide-react';
import FadeIn from '@/components/FadeIn';
import { SERVICES, Service } from '@/data/services';
import { CLINIC } from '@/data/clinicInfo';

export default function ServicesPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'orthodontics' | 'restorative' | 'preventive' | 'cosmetic'>('all');

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredServices = SERVICES.filter((service) => {
    if (activeCategory === 'all') return true;
    return service.category === activeCategory;
  });

  return (
    <div className="flex flex-col bg-bg">
      <section className="pt-16 pb-20 lg:pt-24 lg:pb-28 border-b border-border bg-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-6">
          <FadeIn>
            <span className="editorial-badge">
              Clinical Catalog & Pricing Guide
            </span>

            <h1 className="font-heading text-4xl sm:text-6xl text-primary font-normal tracking-tight">
              Comprehensive disciplines, <br />
              <span className="italic font-light text-primary-light">transparent sample fees.</span>
            </h1>

            <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              We practice conservative, evidence-based dentistry. Explore our clinical services below with sample fee guides and common clinical questions.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-4" role="tablist">
              {[
                { id: 'all', label: 'All Services' },
                { id: 'orthodontics', label: 'Orthodontics & Aligners' },
                { id: 'restorative', label: 'Restorative Care' },
                { id: 'preventive', label: 'Preventative & Hygiene' },
                { id: 'cosmetic', label: 'Cosmetic' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeCategory === tab.id
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-bg border border-border text-text-muted hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-bg">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {filteredServices.map((service, index) => {
              const isExpanded = expandedId === service.id;

              return (
                <FadeIn key={service.id} delay={index * 0.04}>
                  <div className="bg-white rounded-2xl border border-border p-7 sm:p-8 space-y-6 shadow-soft transition-all duration-200 hover:border-primary/30">
                    
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-text-light">
                          {service.category}
                        </span>
                        <h2 className="font-heading text-2xl font-semibold text-primary mt-1">
                          {service.name}
                        </h2>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted bg-bg px-2.5 py-1 rounded border border-border shrink-0">
                        <Clock size={12} />
                        {service.durationMins}m
                      </span>
                    </div>

                    <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                      {service.shortDescription}
                    </p>

                    <div className="pt-4 border-t border-border flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-text-light block">
                          Sample Fee Range
                        </span>
                        <span className="font-semibold text-primary text-sm sm:text-base">
                          {service.priceRange}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => toggleExpand(service.id)}
                          className="text-xs font-medium text-text-muted hover:text-primary flex items-center gap-1 transition-colors"
                          aria-expanded={isExpanded}
                        >
                          <span>{isExpanded ? 'Less' : 'Details'}</span>
                          <ChevronDown
                            size={14}
                            className={`transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        <Link
                          to={`/booking?service=${service.slug}`}
                          className="btn-primary text-xs py-2 px-3.5 font-semibold"
                        >
                          <span>Reserve</span>
                          <ArrowRight size={13} className="text-accent" />
                        </Link>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="pt-5 border-t border-border space-y-5 animate-fadeIn">
                        <div className="space-y-2">
                          <h4 className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                            Clinical Overview
                          </h4>
                          <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                            {service.description}
                          </p>
                        </div>

                        {service.faqs.length > 0 && (
                          <div className="space-y-3 pt-2">
                            <h4 className="text-xs font-mono uppercase tracking-wider text-primary font-semibold flex items-center gap-1.5">
                              <HelpCircle size={13} className="text-accent" />
                              Common Patient Questions
                            </h4>
                            <div className="space-y-2.5">
                              {service.faqs.map((faq, fIdx) => (
                                <div key={fIdx} className="bg-bg p-3.5 rounded-lg border border-border text-xs">
                                  <p className="font-semibold text-primary mb-1">
                                    Q: {faq.q}
                                  </p>
                                  <p className="text-text-muted leading-relaxed">
                                    {faq.a}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                </FadeIn>
              );
            })}
          </div>

          <div className="mt-14 bg-white border border-border rounded-2xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4">
            <span className="mint-pill">
              <Sparkles size={13} />
              Unsure Where To Start?
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-normal text-primary">
              Begin with an unhurried digital consultation.
            </h3>
            <p className="text-text-muted text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Every smile is unique. We conduct a thorough visual assessment, discuss your concerns, and construct a conservative care plan without obligation.
            </p>
            <div className="pt-2">
              <Link to="/booking" className="btn-primary text-xs py-3 px-6 font-semibold">
                <span>Book general consultation</span>
                <ArrowRight size={14} className="text-accent" />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
