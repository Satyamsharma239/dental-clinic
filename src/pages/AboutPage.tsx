import FadeIn from '@/components/FadeIn';
import { CLINIC, CLINIC_PHOTOS } from '@/data/clinicInfo';
import { Shield, Heart, CheckCircle2, Award, Sparkles, GraduationCap, ArrowRight, Phone, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DentalToothIcon } from '@/components/common/DentalToothIcon';

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Header */}
      <section className="section-padding bg-gradient-to-b from-primary-50/60 to-bg border-b border-primary/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-primary/20 text-xs font-semibold text-primary mb-4 shadow-sm">
              <DentalToothIcon size={14} className="text-accent" />
              <span>Orthodontist & Clinical Director</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary font-bold mb-4 tracking-tight">
              About {CLINIC.doctor.name}
            </h1>
            <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
              Practicing gentle, ethical, and evidence-based dentistry in {CLINIC.city} for over 12 years.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Doctor Profile Section */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-card border border-primary/15 relative bg-bg">
                  <img 
                    src={CLINIC_PHOTOS.doctor} 
                    alt={CLINIC.doctor.name} 
                    className="w-full h-full object-cover min-h-[420px]"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-primary/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-primary">{CLINIC.doctor.qualification}</p>
                      <p className="text-[11px] text-accent font-semibold">{CLINIC.doctor.experience} Experience</p>
                    </div>
                    <span className="text-[10px] font-mono text-text-muted bg-primary-50 px-2 py-1 rounded">
                      Reg: {CLINIC.doctor.registration}
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-bold text-accent uppercase tracking-wider">
                    Clinical Expertise & Gentle Approach
                  </span>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mt-1">
                    Dr. Satyam Sharma, MDS
                  </h2>
                  <p className="text-sm font-semibold text-text mt-1">
                    Specialist in Orthodontics & Dentofacial Orthopedics
                  </p>
                </div>

                <div className="text-text-muted text-sm leading-relaxed space-y-3">
                  <p>{CLINIC.doctor.bio}</p>
                  <p>
                    Over his 12+ years in clinical practice, Dr. Satyam Sharma has treated thousands of cases ranging from simple dental fillings and smile makeovers to complex root canal treatments and orthodontic alignment. He actively attends continuous dental education workshops to implement the latest pain-reduction techniques.
                  </p>
                </div>

                {/* Key Qualifications */}
                <div className="bg-bg p-5 rounded-xl border border-primary/10 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  <div className="flex items-center gap-2.5 text-text font-medium">
                    <GraduationCap size={18} className="text-primary shrink-0" />
                    <span>BDS — Government Dental College</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-text font-medium">
                    <Award size={18} className="text-accent shrink-0" />
                    <span>MDS — Orthodontics (Govt. Ranked)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-text font-medium">
                    <CheckCircle2 size={18} className="text-emerald-700 shrink-0" />
                    <span>Certified Invisible Aligner Specialist</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-text font-medium">
                    <CheckCircle2 size={18} className="text-emerald-700 shrink-0" />
                    <span>Fellow — Indian Dental Association</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link to="/booking" className="btn-primary text-xs py-3 px-6 shadow-sm">
                    <Calendar size={15} />
                    <span>Schedule Consultation</span>
                  </Link>
                  <a href={`tel:${CLINIC.phone}`} className="btn-outline text-xs py-3 px-5">
                    <Phone size={15} />
                    <span>Call Dr. Sharma's Desk</span>
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Core Philosophy Section */}
      <section className="section-padding bg-bg border-y border-primary/10">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">
                Our Ethical Foundation
              </span>
              <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold mt-1 mb-3">
                Our Practice Philosophy
              </h2>
              <p className="text-text-muted text-sm leading-relaxed">
                "{CLINIC.doctor.philosophy}"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-7 rounded-xl border border-primary/10 shadow-soft space-y-3">
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary flex items-center justify-center">
                  <Shield size={22} className="text-accent" />
                </div>
                <h3 className="font-heading text-lg font-bold text-primary">Uncompromising Honesty</h3>
                <p className="text-text-muted text-xs leading-relaxed">
                  We never prescribe unnecessary root canals or cosmetic crowns if a conservative filling can preserve your natural tooth. What we recommend is what we would do for our own family.
                </p>
              </div>

              <div className="bg-white p-7 rounded-xl border border-primary/10 shadow-soft space-y-3">
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary flex items-center justify-center">
                  <Heart size={22} className="text-accent" />
                </div>
                <h3 className="font-heading text-lg font-bold text-primary">Zero-Anxiety Environment</h3>
                <p className="text-text-muted text-xs leading-relaxed">
                  We understand dental anxiety is real. You control the pace of treatment. We explain every sensation in advance and use topical anesthetic creams so you never feel uncomfortable.
                </p>
              </div>

              <div className="bg-white p-7 rounded-xl border border-primary/10 shadow-soft space-y-3">
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary flex items-center justify-center">
                  <CheckCircle2 size={22} className="text-accent" />
                </div>
                <h3 className="font-heading text-lg font-bold text-primary">Transparent Itemized Pricing</h3>
                <p className="text-text-muted text-xs leading-relaxed">
                  You receive an upfront written treatment plan before any procedure begins. No unexpected chair costs, sterilisation fees, or hidden billing.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Clinic Facility Photos */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">
                Hospital-Grade Hygiene
              </span>
              <h2 className="font-heading text-3xl font-bold text-primary mt-1 mb-2">
                Inside Bright Smiles Dental Clinic
              </h2>
              <p className="text-text-muted text-xs md:text-sm">
                Take a look at our clinical operatory rooms, sterilized instrumentation suite, and patient consultation lounge.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl overflow-hidden border border-primary/10 shadow-sm bg-bg group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={CLINIC_PHOTOS.operatory}
                    alt="Dental Operatory Suite"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-heading font-bold text-sm text-primary">Ergonomic Operatory Suite</h4>
                  <p className="text-[11px] text-text-muted mt-0.5">High-comfort memory foam dental chair with intraoral 4K camera</p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-primary/10 shadow-sm bg-bg group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={CLINIC_PHOTOS.sterilization}
                    alt="Class-B Autoclave Sterilisation Room"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-heading font-bold text-sm text-primary">Class-B Sterilisation Lab</h4>
                  <p className="text-[11px] text-text-muted mt-0.5">Vacuum autoclaving with individually sealed and dated instrument packs</p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-primary/10 shadow-sm bg-bg group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={CLINIC_PHOTOS.reception}
                    alt="Reception and Waiting Lounge"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-heading font-bold text-sm text-primary">Patient Reception & Lounge</h4>
                  <p className="text-[11px] text-text-muted mt-0.5">Calming tea bar, zero clinical odor, and friendly front-desk care</p>
                </div>
              </div>
            </div>

            {/* Bottom CTA Banner */}
            <div className="mt-14 p-8 rounded-2xl bg-primary text-white flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <h3 className="font-heading text-2xl font-bold">Ready to Experience Gentle Dental Care?</h3>
                <p className="text-xs md:text-sm text-white/70">
                  Book your consultation with Dr. Satyam Sharma today. New patients welcome.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link to="/booking" className="btn-primary text-xs py-3 px-6 shadow-md">
                  Book Online
                </Link>
                <Link to="/services" className="btn-outline bg-white/10 text-white border-white/20 hover:bg-white/20 text-xs py-3 px-5">
                  Browse Services
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
