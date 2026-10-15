import FadeIn from '@/components/FadeIn';
import { CLINIC, CLINIC_PHOTOS } from '@/data/clinicInfo';
import { ArrowRight, ShieldCheck, Eye, Sparkles, Calendar, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="flex flex-col bg-bg">
      
      <section className="pt-16 pb-20 lg:pt-24 lg:pb-28 border-b border-border bg-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-6">
          <FadeIn>
            <span className="editorial-badge">
              Philosophy & Standards
            </span>

            <h1 className="font-heading text-4xl sm:text-6xl text-primary font-normal tracking-tight">
              A deliberate standard of <br />
              <span className="italic font-light text-primary-light">contemporary dentistry.</span>
            </h1>

            <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              We designed Aura Dental Studio around a simple principle: dentistry should feel unhurried, evidence-based, and completely transparent from the first conversation.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-bg border-b border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              <div className="lg:col-span-5">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-white shadow-card">
                  <img 
                    src={CLINIC_PHOTOS.doctor} 
                    alt={CLINIC.doctor.name} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-text-muted px-1">
                  <span className="font-semibold text-primary">{CLINIC.doctor.name}</span>
                  <span className="font-mono text-[11px] text-text-light">Portfolio Sample Persona</span>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <span className="editorial-badge">
                  Clinical Lead
                </span>

                <h2 className="font-heading text-3xl sm:text-4xl text-primary font-normal leading-tight">
                  {CLINIC.doctor.name}
                </h2>

                <p className="text-sm font-mono text-text-muted uppercase tracking-wider">
                  {CLINIC.doctor.title} • {CLINIC.doctor.credentials}
                </p>

                <div className="text-text-muted text-base space-y-4 leading-relaxed max-w-prose">
                  <p>{CLINIC.doctor.bio}</p>
                  <p>
                    Throughout his orthodontic and restorative work, he focuses on digital diagnostic workflows. Rather than imposing invasive corrections, our practice guides patients through conservative choices, helping them understand longevity and hygiene impact.
                  </p>
                  <p className="italic text-primary border-l-2 border-accent pl-4 py-1">
                    "{CLINIC.doctor.philosophy}"
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link to="/booking" className="btn-primary text-xs py-3 px-6 font-semibold shadow-xs">
                    <Calendar size={14} className="text-accent" />
                    <span>Book consultation</span>
                  </Link>

                  <Link to="/services" className="btn-outline text-xs py-3 px-5 font-medium">
                    <span>View treatments</span>
                  </Link>
                </div>
              </div>

            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <FadeIn>
            
            <div className="max-w-2xl mb-14">
              <span className="editorial-badge mb-3">
                Our Commitments
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl text-primary font-normal">
                How we operate differently.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-bg border border-border rounded-xl p-8 space-y-4">
                <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest block">
                  01 / Conservation
                </span>
                <h3 className="font-heading text-xl font-semibold text-primary">
                  Structure-Preserving Dentistry
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  We believe natural tooth structure is irreplaceable. We avoid overtreating or recommending crown reductions when bonded ceramic inlays or restorative composite preserves healthy enamel.
                </p>
              </div>

              <div className="bg-bg border border-border rounded-xl p-8 space-y-4">
                <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest block">
                  02 / Transparency
                </span>
                <h3 className="font-heading text-xl font-semibold text-primary">
                  Visual Diagnostics First
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  Every patient receives a high-definition 3D intraoral scan. We review the imagery together on an unhurried monitor, ensuring you see the condition of every tooth before discussing treatment steps.
                </p>
              </div>

              <div className="bg-bg border border-border rounded-xl p-8 space-y-4">
                <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest block">
                  03 / Respect
                </span>
                <h3 className="font-heading text-xl font-semibold text-primary">
                  Uncompromised Comfort
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  Dental anxiety is completely valid. We maintain quiet appointment buffers, acoustic dampening, and computer-controlled anesthesia so procedures remain calm and painless.
                </p>
              </div>
            </div>

          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-bg border-b border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="editorial-badge mb-3">
                  Studio Atmosphere
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl text-primary font-normal">
                  A serene, architectural environment.
                </h2>
              </div>
              <Link to="/gallery" className="text-xs font-semibold text-primary hover:text-accent-hover transition-colors inline-flex items-center gap-1.5">
                <span>View full studio tour</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-border bg-white shadow-soft">
                  <img src={CLINIC_PHOTOS.operatory} alt="Operatory Suite" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="px-1">
                  <h4 className="font-heading text-base font-semibold text-primary">Clinical Suite</h4>
                  <p className="text-xs text-text-muted mt-0.5">Ergonomic seating with natural daylight exposure.</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-border bg-white shadow-soft">
                  <img src={CLINIC_PHOTOS.lounge} alt="Reception Lounge" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="px-1">
                  <h4 className="font-heading text-base font-semibold text-primary">Arrival Lounge</h4>
                  <p className="text-xs text-text-muted mt-0.5">Acoustically softened space without clinical odors.</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-border bg-white shadow-soft">
                  <img src={CLINIC_PHOTOS.instruments} alt="Precision Suite" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="px-1">
                  <h4 className="font-heading text-base font-semibold text-primary">Diagnostic Technology</h4>
                  <p className="text-xs text-text-muted mt-0.5">Intraoral scanners and digital radiography.</p>
                </div>
              </div>
            </div>

          </FadeIn>
        </div>
      </section>

      <section className="py-20 bg-white text-center">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 space-y-6">
          <FadeIn>
            <h2 className="font-heading text-3xl sm:text-4xl text-primary font-normal">
              Experience thoughtful dental care.
            </h2>
            <p className="text-text-muted text-base max-w-lg mx-auto">
              Schedule your first comprehensive digital assessment with our clinical team.
            </p>
            <div className="pt-2">
              <Link to="/booking" className="btn-primary text-sm px-8 py-4 font-semibold">
                <span>Book consultation</span>
                <ArrowRight size={15} className="text-accent" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
