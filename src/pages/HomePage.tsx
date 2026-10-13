import { useState } from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '@/components/FadeIn';
import { CLINIC, CLINIC_PHOTOS, PATIENT_EXPERIENCES } from '@/data/clinicInfo';
import { SERVICES, Service } from '@/data/services';
import { DentalToothIcon } from '@/components/common/DentalToothIcon';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Calendar, 
  Sparkles, 
  Check, 
  Clock, 
  MapPin, 
  Eye, 
  ShieldCheck, 
  SlidersHorizontal 
} from 'lucide-react';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'orthodontics' | 'restorative' | 'preventive'>('all');

  const featuredTreatment = SERVICES.find((s) => s.featured) || SERVICES[0];

  const secondaryTreatments = SERVICES.filter((s) => {
    if (s.id === featuredTreatment.id) return false;
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  return (
    <div className="flex flex-col bg-bg">
      
      {/* 1. HERO SECTION — ASYMMETRIC EDITORIAL COMPOSITION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 border-b border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Expressive Headline & Thoughtful Narrative */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* Demonstration Project Tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border text-xs text-text shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="font-semibold text-primary">{CLINIC.shortName} Studio</span>
                  <span className="text-border-dark">•</span>
                  <span className="text-text-muted">Portfolio Showcase & Dental Concept</span>
                </div>

                {/* Primary Editorial Headline */}
                <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl text-primary font-normal leading-[1.08] tracking-tight">
                  Dentistry, <br />
                  <span className="italic font-light text-primary-light">designed around you.</span>
                </h1>

                {/* Concise Supporting Direction */}
                <p className="text-base sm:text-lg lg:text-xl text-text-muted max-w-xl font-normal leading-relaxed">
                  Thoughtful care, clear choices, and a calmer experience at every step. We pair contemporary digital diagnostics with an unhurried, conservative approach.
                </p>

                {/* Clear Primary & Secondary Actions */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    to="/booking"
                    className="btn-primary text-sm px-7 py-4 font-semibold shadow-sm"
                  >
                    <span>Book consultation</span>
                    <ArrowRight size={16} className="text-accent" />
                  </Link>

                  <a
                    href="#treatments"
                    className="btn-outline text-sm px-6 py-4 font-medium"
                  >
                    <span>Explore treatments</span>
                  </a>
                </div>

                {/* Studio Architectural Core Pillars */}
                <div className="pt-6 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <span className="text-xs font-mono font-semibold text-primary block">01 / Digital Scans</span>
                    <p className="text-xs text-text-muted mt-1 leading-normal">
                      High-resolution 3D intraoral imaging before any treatment.
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold text-primary block">02 / Conservative</span>
                    <p className="text-xs text-text-muted mt-1 leading-normal">
                      Preserving natural tooth structure with minimal intervention.
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold text-primary block">03 / Upfront Estimates</span>
                    <p className="text-xs text-text-muted mt-1 leading-normal">
                      Transparent, itemized pricing guides with zero hidden additions.
                    </p>
                  </div>
                </div>

              </div>

              {/* Right Column: Architectural Interior Photography */}
              <div className="lg:col-span-5">
                <div className="relative">
                  <div className="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-white shadow-card">
                    <img
                      src={CLINIC_PHOTOS.hero}
                      alt="Aura Dental Studio Architectural Interior"
                      className="w-full h-full object-cover"
                      loading="eager"
                      fetchPriority="high"
                    />
                  </div>

                  {/* Restrained Architectural Caption */}
                  <div className="mt-3 flex items-center justify-between text-xs text-text-muted px-1">
                    <span>Clinical Suite • Bandra West, Mumbai</span>
                    <span className="font-mono text-[11px]">Natural daylight & acoustic design</span>
                  </div>
                </div>
              </div>

            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. RESTRAINED DEMONSTRATION DISCIPLINE STRIP (NO FAKE METRICS) */}
      <section className="py-6 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            <span className="font-mono uppercase tracking-wider text-text-light font-semibold">
              Clinical Disciplines
            </span>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-text font-medium">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Comprehensive 3D Diagnostics
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Aesthetic Clear Aligners
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Biomimetic Ceramic Restorations
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Gentle Ultrasonic Hygiene
              </span>
            </div>
            <span className="text-text-muted text-[11px] font-mono hidden xl:inline">
              Portfolio Demo
            </span>
          </div>
        </div>
      </section>

      {/* 3. EDITORIAL PHILOSOPHY — REPLACING IDENTICAL CARDS */}
      <section className="section-padding bg-bg border-b border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left: Section Framing */}
              <div className="lg:col-span-5 space-y-4">
                <span className="editorial-badge">
                  Our Care Philosophy
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-primary font-normal leading-tight">
                  A quieter, more deliberate way to care for teeth.
                </h2>
                <p className="text-text-muted text-base leading-relaxed">
                  Most dental visits feel transactional or hurried. We built this studio concept around conversational clarity, evidence-based dentistry, and complete clinical transparency.
                </p>
                <div className="pt-2">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent-hover transition-colors"
                  >
                    <span>Read about our clinical framework</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Right: Editorial Narrative Principles (Numbered layout with fine rules) */}
              <div className="lg:col-span-7 divide-y divide-border">
                
                <div className="py-8 first:pt-0">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest">
                      Principle 01
                    </span>
                    <span className="text-xs text-text-light font-mono">Diagnosis First</span>
                  </div>
                  <h3 className="font-heading text-2xl text-primary font-semibold mb-2">
                    Unhurried Consultations & Intraoral Visibility
                  </h3>
                  <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                    We project high-definition digital scans onto a chairside display before recommending any procedure. You see exactly what we see, understanding the rationale before giving consent.
                  </p>
                </div>

                <div className="py-8">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest">
                      Principle 02
                    </span>
                    <span className="text-xs text-text-light font-mono">Structure Conservation</span>
                  </div>
                  <h3 className="font-heading text-2xl text-primary font-semibold mb-2">
                    Conservative Biomimetic Techniques
                  </h3>
                  <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                    We preserve as much natural enamel and dentin as modern adhesive dentistry allows. Inlays and bonded composites are favored over aggressive, full-coverage reductions whenever clinically viable.
                  </p>
                </div>

                <div className="py-8 last:pb-0">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest">
                      Principle 03
                    </span>
                    <span className="text-xs text-text-light font-mono">Honest Economics</span>
                  </div>
                  <h3 className="font-heading text-2xl text-primary font-semibold mb-2">
                    Upfront Itemized Estimates
                  </h3>
                  <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                    Healthcare estimates should never be ambiguous. Every treatment plan is provided with clear line items, duration estimates, and no unexpected post-treatment charges.
                  </p>
                </div>

              </div>

            </div>
          </FadeIn>
        </div>
      </section>

      {/* 4. TREATMENTS SHOWCASE — ASYMMETRIC HIERARCHY (NO REPETITIVE GRID) */}
      <section id="treatments" className="section-padding bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <FadeIn>
            
            {/* Header & Category Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-border">
              <div>
                <span className="editorial-badge mb-3">
                  Clinical Services
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-primary font-normal">
                  Focused care disciplines.
                </h2>
                <p className="text-text-muted text-sm sm:text-base mt-2 max-w-lg">
                  Explore our core dental treatments. Pricing is presented as sample guide ranges for portfolio demonstration.
                </p>
              </div>

              {/* Accessible Filter Controls */}
              <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Treatment categories">
                {[
                  { id: 'all', label: 'All Disciplines' },
                  { id: 'orthodontics', label: 'Orthodontics' },
                  { id: 'restorative', label: 'Restorative' },
                  { id: 'preventive', label: 'Preventive' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={activeCategory === cat.id}
                    onClick={() => setActiveCategory(cat.id as any)}
                    className={`text-xs font-semibold px-4 py-2.5 rounded-lg transition-all duration-150 ${
                      activeCategory === cat.id
                        ? 'bg-primary text-white shadow-xs'
                        : 'bg-bg text-text-muted hover:text-primary hover:bg-border/60'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Asymmetric Showcase: 1 Large Featured Composition + Secondary List */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-12 items-start">
              
              {/* Featured Treatment Card (Hero Treatment) */}
              <div className="lg:col-span-5 bg-bg border border-border rounded-2xl p-7 sm:p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="mint-pill">
                    <Sparkles size={13} />
                    Featured Discipline
                  </span>
                  <span className="text-xs font-mono text-text-light">
                    {featuredTreatment.durationMins} min session
                  </span>
                </div>

                <div className="aspect-[16/10] rounded-xl overflow-hidden border border-border bg-white">
                  <img
                    src={CLINIC_PHOTOS.aligners}
                    alt={featuredTreatment.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-primary">
                    {featuredTreatment.name}
                  </h3>
                  <p className="text-text-muted text-sm mt-2 leading-relaxed">
                    {featuredTreatment.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-border/80">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-text-light block">
                      Fee Guide
                    </span>
                    <span className="text-sm font-semibold text-primary">
                      {featuredTreatment.priceRange}
                    </span>
                  </div>

                  <Link
                    to={`/booking?service=${featuredTreatment.slug}`}
                    className="btn-primary text-xs py-2.5 px-4 font-semibold"
                  >
                    <span>Reserve consult</span>
                    <ArrowRight size={13} className="text-accent" />
                  </Link>
                </div>
              </div>

              {/* Secondary Treatments: Editorial List with fine separators */}
              <div className="lg:col-span-7 divide-y divide-border">
                {secondaryTreatments.map((service) => (
                  <div
                    key={service.id}
                    className="py-6 first:pt-0 group transition-colors duration-150"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-heading text-xl font-semibold text-primary group-hover:text-primary-light transition-colors">
                          {service.name}
                        </h4>
                        <span className="text-[11px] font-mono text-text-light uppercase tracking-wider bg-bg px-2 py-0.5 rounded border border-border">
                          {service.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs text-text-muted font-medium">
                          {service.priceRange}
                        </span>
                        <Link
                          to={`/booking?service=${service.slug}`}
                          className="w-8 h-8 rounded-full bg-bg border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all"
                          aria-label={`Book ${service.name}`}
                        >
                          <ArrowUpRight size={15} />
                        </Link>
                      </div>
                    </div>

                    <p className="text-text-muted text-sm leading-relaxed max-w-xl">
                      {service.shortDescription}
                    </p>

                    <div className="mt-3 flex items-center gap-4 text-xs text-text-light">
                      <span className="flex items-center gap-1.5 font-mono">
                        <Clock size={13} />
                        ~{service.durationMins} mins
                      </span>
                      <span>•</span>
                      <Link
                        to="/services"
                        className="text-primary hover:text-accent-hover font-medium underline-offset-2 hover:underline"
                      >
                        Clinical overview & FAQs
                      </Link>
                    </div>
                  </div>
                ))}

                <div className="pt-6">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent-hover transition-colors"
                  >
                    <span>Browse full treatment catalog & fee guide</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

            </div>

          </FadeIn>
        </div>
      </section>

      {/* 5. CLINICAL LEAD & STORY SECTION — HONEST SAMPLE PRESENTATION */}
      <section className="section-padding bg-bg border-b border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Doctor Portrait Composition */}
              <div className="lg:col-span-5">
                <div className="relative">
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-white shadow-card">
                    <img
                      src={CLINIC_PHOTOS.doctor}
                      alt={`${CLINIC.doctor.name} — Clinical Director`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-text-muted px-1">
                    <span>{CLINIC.doctor.name}</span>
                    <span className="font-mono text-[11px] text-text-light">Portfolio Demonstration Profile</span>
                  </div>
                </div>
              </div>

              {/* Story Narrative */}
              <div className="lg:col-span-7 space-y-6">
                <span className="editorial-badge">
                  Clinical Director
                </span>

                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-primary font-normal leading-tight">
                  A calm approach to modern clinical practice.
                </h2>

                <p className="text-text font-medium text-base sm:text-lg">
                  {CLINIC.doctor.title} • {CLINIC.doctor.credentials}
                </p>

                <div className="text-text-muted text-sm sm:text-base space-y-4 leading-relaxed max-w-prose">
                  <p>{CLINIC.doctor.bio}</p>
                  <p className="italic text-primary border-l-2 border-accent pl-4 py-1">
                    "{CLINIC.doctor.philosophy}"
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    to="/booking"
                    className="btn-primary text-xs py-3 px-6 font-semibold shadow-xs"
                  >
                    <span>Schedule consultation</span>
                    <ArrowRight size={14} className="text-accent" />
                  </Link>

                  <Link
                    to="/about"
                    className="btn-outline text-xs py-3 px-5 font-medium"
                  >
                    <span>View clinical philosophy</span>
                  </Link>
                </div>
              </div>

            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6. PATIENT EXPERIENCES — CLEARLY LABELLED SAMPLE VIGNETTES (NO FAKE METRICS) */}
      <section className="section-padding bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <FadeIn>
            
            <div className="max-w-2xl mb-12">
              <span className="editorial-badge mb-3">
                Patient Perspectives
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl text-primary font-normal">
                Reflections on the studio experience.
              </h2>
              <p className="text-text-muted text-sm sm:text-base mt-2">
                Illustrative sample narratives representing typical patient journeys. For portfolio showcase only.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PATIENT_EXPERIENCES.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-bg border border-border rounded-xl p-7 flex flex-col justify-between space-y-6"
                >
                  <p className="text-text text-sm sm:text-base leading-relaxed italic">
                    "{exp.quote}"
                  </p>

                  <div className="pt-4 border-t border-border/80 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-primary block">
                        {exp.author}
                      </span>
                      <span className="text-text-muted text-[11px]">
                        {exp.context}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-text-light uppercase tracking-wider bg-white px-2 py-1 rounded border border-border">
                      Sample
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </FadeIn>
        </div>
      </section>

      {/* 7. NOT SURE WHERE TO START? — USEFUL GENERAL CTA (NO FAKE EMERGENCY HOTLINE) */}
      <section className="py-20 lg:py-28 bg-primary text-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-6">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-accent border border-white/15">
              <Sparkles size={13} />
              Personalized Guidance
            </span>

            <h2 className="font-heading text-3xl sm:text-5xl font-normal leading-tight text-white max-w-2xl mx-auto">
              Not sure where to begin? Start with a comprehensive digital scan.
            </h2>

            <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Book a 30-minute introductory consultation. We map your smile with high-resolution 3D imaging and talk through conservative care options without pressure.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/booking"
                className="btn-mint text-sm px-8 py-4 font-semibold shadow-md"
              >
                <span>Book consultation</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg border border-white/20 text-white font-medium text-sm hover:bg-white/10 transition-colors"
              >
                <span>View fee guide</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 8. SAMPLE STUDIO LOCATION & CLOSING VISITOR DETAILS */}
      <section className="py-16 bg-bg border-t border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-text-muted">
            <div className="space-y-2">
              <span className="font-mono uppercase tracking-wider text-text font-semibold block">
                Studio Location (Sample)
              </span>
              <p className="leading-relaxed">
                {CLINIC.address.full}
              </p>
              <p className="text-text-light text-[11px]">
                {CLINIC.transitGuide}
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono uppercase tracking-wider text-text font-semibold block">
                Consultation Hours
              </span>
              <p className="leading-relaxed">
                {CLINIC.hours.weekdays}
              </p>
              <p className="text-text-light text-[11px]">
                {CLINIC.hours.lunch}
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono uppercase tracking-wider text-text font-semibold block">
                Portfolio Demonstration
              </span>
              <p className="leading-relaxed">
                This website is a digital portfolio project demonstrating contemporary healthcare UI/UX, responsive React engineering, and architectural design systems.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
