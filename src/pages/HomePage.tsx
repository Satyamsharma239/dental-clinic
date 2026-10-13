import { useState } from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '@/components/FadeIn';
import { CLINIC, CLINIC_PHOTOS, PATIENT_REVIEWS } from '@/data/clinicInfo';
import { SERVICES } from '@/data/services';
import { DentalToothIcon } from '@/components/common/DentalToothIcon';
import { 
  Phone, 
  ArrowRight, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Calendar, 
  Zap, 
  Navigation, 
  Car, 
  MessageSquare, 
  GraduationCap,
  Award,
  HeartPulse,
  Eye,
  FileCheck,
  Sparkles
} from 'lucide-react';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'ortho' | 'pain' | 'preventive'>('all');

  const filteredServices = SERVICES.filter((service) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'ortho') return service.id === 'svc-6' || service.id === 'svc-5';
    if (activeCategory === 'pain') return service.id === 'svc-2' || service.id === 'svc-3' || service.id === 'svc-4' || service.id === 'svc-8';
    if (activeCategory === 'preventive') return service.id === 'svc-1' || service.id === 'svc-7';
    return true;
  });

  return (
    <div className="flex flex-col bg-bg">
      {/* 1. HERO SECTION — REFINED EDITORIAL CLINICAL EXPERIENCE */}
      <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-primary/10 overflow-hidden bg-gradient-to-b from-primary-50/70 via-bg to-bg">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Editorial Headline & Patient Reassurance */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Clinical Location & Specialist Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-primary/15 text-xs text-primary shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-primary">{CLINIC.area}, {CLINIC.city}</span>
                  <span className="text-text-muted">•</span>
                  <span className="text-accent font-semibold">{CLINIC.doctor.name} ({CLINIC.doctor.qualification})</span>
                </div>
                
                {/* Memorable Patient-Focused Headline */}
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-primary font-bold leading-[1.12] tracking-tight">
                  Thoughtful dental care. <br className="hidden sm:inline" />
                  <span className="italic font-normal text-primary-light">A more confident smile.</span>
                </h1>
                
                {/* Reassuring Subtitle */}
                <p className="text-base sm:text-lg text-text-muted max-w-prose leading-relaxed">
                  We practice unhurried, gentle, and transparent dentistry in {CLINIC.area}. With computerized pain-free numbing, 4K intraoral camera diagnosis, and upfront itemized estimates — your visit is always comfortable and pressure-free.
                </p>

                {/* Primary & Secondary Actions */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <Link 
                    to="/booking" 
                    className="btn-primary text-sm px-7 py-4 shadow-md inline-flex items-center gap-2"
                  >
                    <Calendar size={16} />
                    <span>Book Consultation</span>
                  </Link>

                  <a 
                    href={`tel:${CLINIC.phone}`} 
                    className="btn-outline text-sm px-6 py-4 inline-flex items-center gap-2"
                  >
                    <Phone size={15} className="text-primary" />
                    <span>Call Reception ({CLINIC.phoneDisplay})</span>
                  </a>
                </div>

                {/* Clinical Quality Standards */}
                <div className="pt-2">
                  <div className="p-4 rounded-2xl bg-white border border-primary/10 shadow-soft flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-text">
                    <span className="font-bold text-primary flex items-center gap-1.5">
                      <ShieldCheck size={16} className="text-accent" />
                      Clinical Guarantees:
                    </span>
                    <span className="flex items-center gap-1.5 text-text-muted">
                      <CheckCircle2 size={14} className="text-emerald-700" />
                      100% Computerized Painless Numbing
                    </span>
                    <span className="flex items-center gap-1.5 text-text-muted">
                      <CheckCircle2 size={14} className="text-emerald-700" />
                      Class-B Hospital Autoclave
                    </span>
                    <span className="flex items-center gap-1.5 text-text-muted">
                      <CheckCircle2 size={14} className="text-emerald-700" />
                      Zero Hidden Fees
                    </span>
                  </div>
                </div>

              </div>

              {/* Right Column: Architectural Photography & Credentials */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  
                  {/* Clinic Operatory Photograph */}
                  <div className="aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden shadow-card border-2 border-primary/10 bg-white relative">
                    <img 
                      src={CLINIC_PHOTOS.hero} 
                      alt="Bright Smiles Modern Operatory Suite in Bandra West" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Bottom overlay caption */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="font-heading font-bold text-base">Bandra West Dental Suite</p>
                      <p className="text-xs text-white/80">Memory-foam lounger • 4K intraoral camera • Low-noise ultrasonic scaling</p>
                    </div>
                  </div>

                  {/* Doctor Credential Capsule */}
                  <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-card border border-primary/15 flex items-center gap-3 animate-float">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-accent font-bold text-sm shadow-xs">
                      <DentalToothIcon size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary">{CLINIC.doctor.name}</p>
                      <p className="text-[10px] text-text-muted">{CLINIC.doctor.qualification}</p>
                      <p className="text-[10px] text-accent font-semibold">{CLINIC.doctor.council} ({CLINIC.doctor.registration})</p>
                    </div>
                  </div>

                  {/* Rating Capsule */}
                  <div className="absolute -bottom-4 -left-2 sm:-left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-card border border-primary/15 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} fill="currentColor" />
                        ))}
                        <span className="text-xs font-bold text-primary ml-1 font-mono">4.9 / 5.0</span>
                      </div>
                      <p className="text-[11px] text-text-muted">Over 8,500+ happy visits in Mumbai</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. REFINED CLINICAL TRUST STRIP */}
      <section className="bg-primary text-white py-8 px-5 border-y border-primary-light">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="font-heading text-2xl sm:text-3xl font-bold text-accent">12+ Years</p>
            <p className="text-xs text-white/75 mt-0.5 font-medium">Orthodontic & Clinical Practice</p>
          </div>
          <div>
            <p className="font-heading text-2xl sm:text-3xl font-bold text-accent">MSDC-42891</p>
            <p className="text-xs text-white/75 mt-0.5 font-medium">Maharashtra Dental Council</p>
          </div>
          <div>
            <p className="font-heading text-2xl sm:text-3xl font-bold text-accent">100% Pain-Free</p>
            <p className="text-xs text-white/75 mt-0.5 font-medium">Computerized Topical Anesthesia</p>
          </div>
          <div>
            <p className="font-heading text-2xl sm:text-3xl font-bold text-accent">Class-B 134°C</p>
            <p className="text-xs text-white/75 mt-0.5 font-medium">Hospital-Grade Autoclave Sterility</p>
          </div>
        </div>
      </section>

      {/* 3. CORE PHILOSOPHY: ANXIETY-FREE, TRANSPARENT CLINICAL CARE */}
      <section className="section-padding bg-white border-b border-primary/10">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Manifesto */}
              <div className="lg:col-span-5 space-y-5">
                <span className="text-xs font-bold text-accent uppercase tracking-wider">
                  Our Clinical Promise
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl text-primary font-bold leading-tight">
                  Dentistry without fear, needles, or surprises.
                </h2>
                <p className="text-sm text-text-muted leading-relaxed">
                  Many patients delay dental visits due to fear of pain, cold clinical atmospheres, or unpredictable billing. Dr. Satyam Sharma established our Bandra West studio to provide the exact opposite: empathetic listening, gentle hands, and total clinical transparency.
                </p>

                <div className="p-5 rounded-2xl bg-bg border border-primary/10 italic text-xs text-primary leading-relaxed">
                  "{CLINIC.doctor.philosophy}"
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <Link to="/about" className="btn-secondary text-xs py-3 px-6 shadow-sm">
                    About Dr. Sharma's Background
                  </Link>
                  <a
                    href={`https://wa.me/${CLINIC.whatsapp}?text=Hi%20Dr.%20Satyam%2C%20I%20have%20a%20question%20regarding%20dental%20treatment%20at%20Bright%20Smiles.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-xs py-3 px-5 inline-flex items-center gap-2"
                  >
                    <MessageSquare size={14} className="text-emerald-600" />
                    <span>Ask on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Right Column: 3 Architectural Reassurance Cards */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Pillar 1 */}
                <div className="p-6 rounded-2xl bg-bg border border-primary/10 hover:border-primary/30 transition-all hover:shadow-card flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary text-accent flex items-center justify-center shrink-0 shadow-xs">
                    <HeartPulse size={22} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-heading text-base font-bold text-primary">
                      Profound Computerized Topical Numbing
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed">
                      We never touch un-numbed tissue with needles. A gentle buffer topical gel completely desensitizes the gum beforehand, ensuring virtually zero sensation throughout the procedure.
                    </p>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="p-6 rounded-2xl bg-bg border border-primary/10 hover:border-primary/30 transition-all hover:shadow-card flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary text-accent flex items-center justify-center shrink-0 shadow-xs">
                    <Eye size={22} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-heading text-base font-bold text-primary">
                      High-Definition 4K Intraoral Camera
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed">
                      You see your teeth in real time on our overhead monitor. Dr. Satyam explains what is happening so you never have to accept a diagnosis on blind faith.
                    </p>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="p-6 rounded-2xl bg-bg border border-primary/10 hover:border-primary/30 transition-all hover:shadow-card flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary text-accent flex items-center justify-center shrink-0 shadow-xs">
                    <FileCheck size={22} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-heading text-base font-bold text-primary">
                      Itemized Written Estimates Before Starting
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed">
                      You receive a clear, printed estimate detailing exact costs, material options, and session counts before treatment commences. Zero unexpected billing at reception.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </FadeIn>
        </div>
      </section>

      {/* 4. TREATMENTS & CLEAR UPFRONT PRICING */}
      <section className="section-padding bg-bg">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-bold text-accent uppercase tracking-wider">
                  Transparent Clinical Procedures
                </span>
                <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold mt-1">
                  Our Dental Treatments & Fees
                </h2>
                <p className="text-text-muted text-sm mt-1 max-w-xl leading-relaxed">
                  Clear fee ranges with exact treatment times. All procedures performed under strict Class-B sterilization protocols.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Procedures' },
                  { id: 'ortho', label: 'Orthodontics & Aligners' },
                  { id: 'pain', label: 'Pain Relief & Root Canal' },
                  { id: 'preventive', label: 'Hygiene & Cleaning' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      activeCategory === cat.id
                        ? 'bg-primary text-white shadow-xs'
                        : 'bg-white border border-primary/15 text-text-muted hover:border-primary/30 hover:text-primary'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Services Grid with Editorial Numbering */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {filteredServices.slice(0, 6).map((service, index) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl border border-primary/10 p-7 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-accent tracking-wider">
                        0{index + 1}
                      </span>
                      <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-primary-50 text-primary border border-primary/15">
                        ⏱ {service.durationMins} mins
                      </span>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-primary group-hover:text-accent transition-colors">
                      {service.name}
                    </h3>

                    <p className="text-xs text-text-muted leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-primary/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-text-muted block font-medium uppercase tracking-wider">Fee Range</span>
                      <span className="text-sm font-bold text-primary font-mono">
                        {service.priceRange}
                      </span>
                    </div>

                    <Link
                      to={`/booking?service=${service.slug}`}
                      className="btn-primary text-xs py-2 px-4 shadow-2xs group-hover:shadow-md"
                    >
                      <span>Book Slot</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                to="/services"
                className="btn-outline text-xs py-3 px-8 inline-flex items-center gap-2 shadow-2xs"
              >
                <span>View All 8 Treatments & Detailed Procedure FAQs</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 5. CLINIC TOUR & HOSPITAL-GRADE HYGIENE */}
      <section className="section-padding bg-white border-y border-primary/10">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">
                Inside Our Bandra Studio
              </span>
              <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold mt-1">
                A Calming, Hospital-Grade Environment
              </h2>
              <p className="text-text-muted text-sm mt-2 leading-relaxed">
                Step inside our Waterfield Road facility. Designed to feel like a tranquil sanctuary while adhering to international sterilization protocols.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Photo 1: Operatory */}
              <div className="rounded-2xl overflow-hidden border border-primary/10 shadow-soft bg-bg flex flex-col group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={CLINIC_PHOTOS.operatory}
                    alt="Ergonomic Dental Operatory in Bandra West"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-1">
                  <h4 className="font-heading text-base font-bold text-primary">Ergonomic Operatory Suite</h4>
                  <p className="text-xs text-text-muted leading-relaxed">Memory foam chair, intraoral 4K camera screen, and gentle ultrasonic scaling.</p>
                </div>
              </div>

              {/* Photo 2: Sterilization */}
              <div className="rounded-2xl overflow-hidden border border-primary/10 shadow-soft bg-bg flex flex-col group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={CLINIC_PHOTOS.sterilization}
                    alt="Class-B Autoclave Sterilization Suite"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-1">
                  <h4 className="font-heading text-base font-bold text-primary">Class-B Sterilization Lab</h4>
                  <p className="text-xs text-text-muted leading-relaxed">High-vacuum autoclaving at 134°C with individually pouch-sealed instruments.</p>
                </div>
              </div>

              {/* Photo 3: Reception */}
              <div className="rounded-2xl overflow-hidden border border-primary/10 shadow-soft bg-bg flex flex-col group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={CLINIC_PHOTOS.reception}
                    alt="Patient Welcome Lounge in Bandra"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-1">
                  <h4 className="font-heading text-base font-bold text-primary">Patient Welcome Lounge</h4>
                  <p className="text-xs text-text-muted leading-relaxed">Air-conditioned lounge, soothing acoustics, and zero clinical odor.</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6. DOCTOR PROFILE SPOTLIGHT */}
      <section className="section-padding bg-bg">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn>
            <div className="bg-white rounded-3xl border border-primary/10 shadow-card overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                
                <div className="lg:col-span-5 h-full min-h-[400px] relative">
                  <img
                    src={CLINIC_PHOTOS.doctor}
                    alt={CLINIC.doctor.name}
                    className="w-full h-full object-cover min-h-[400px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent lg:hidden" />
                  <div className="absolute bottom-4 left-4 text-white lg:hidden">
                    <p className="font-heading font-bold text-lg">{CLINIC.doctor.name}</p>
                    <p className="text-xs text-white/80">{CLINIC.doctor.qualification}</p>
                  </div>
                </div>

                <div className="lg:col-span-7 p-8 lg:p-12 space-y-6">
                  <div>
                    <span className="text-xs font-bold text-accent uppercase tracking-wider">
                      Chief Dentist & Orthodontist
                    </span>
                    <h2 className="font-heading text-3xl font-bold text-primary mt-1">
                      {CLINIC.doctor.name}
                    </h2>
                    <p className="text-sm font-semibold text-accent mt-0.5">
                      {CLINIC.doctor.qualification} • {CLINIC.doctor.council} Reg: #{CLINIC.doctor.registration}
                    </p>
                  </div>

                  <p className="text-sm text-text-muted leading-relaxed">
                    {CLINIC.doctor.bio}
                  </p>

                  {/* Credentials Grid */}
                  <div className="bg-bg p-5 rounded-2xl border border-primary/10 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                    <div className="flex items-center gap-2.5 text-text font-medium">
                      <GraduationCap size={18} className="text-primary shrink-0" />
                      <span>BDS — Nair Hospital Dental College</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-text font-medium">
                      <Award size={18} className="text-accent shrink-0" />
                      <span>MDS — Orthodontics (Govt. Ranked)</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-text font-medium">
                      <CheckCircle2 size={18} className="text-emerald-700 shrink-0" />
                      <span>Certified Invisible Aligners Specialist</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-text font-medium">
                      <CheckCircle2 size={18} className="text-emerald-700 shrink-0" />
                      <span>Indian Dental Association (IDA) Member</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Link to="/booking" className="btn-primary text-xs py-3 px-6 shadow-sm">
                      <Calendar size={15} />
                      <span>Book Consultation with Dr. Satyam</span>
                    </Link>
                    <Link to="/about" className="btn-outline text-xs py-3 px-5">
                      <span>Full Bio & Clinical Philosophy</span>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 7. VERIFIED PATIENT REVIEWS */}
      <section className="section-padding bg-white border-y border-primary/10">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">
                Patient Feedback
              </span>
              <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold mt-1">
                Real Stories From Mumbai Families
              </h2>
              <p className="text-text-muted text-sm mt-2">
                Honest feedback from patients who experienced gentle, anxiety-free dental care.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PATIENT_REVIEWS.map((review, idx) => (
                <div
                  key={idx}
                  className="bg-bg rounded-2xl border border-primary/10 p-7 flex flex-col justify-between shadow-soft hover:shadow-card transition-shadow"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" />
                        ))}
                      </div>
                      <span className="text-[10px] text-text-muted font-mono">{review.date}</span>
                    </div>

                    <p className="text-xs text-text-muted italic leading-relaxed">
                      "{review.comment}"
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-primary/10">
                    <p className="text-xs font-bold text-primary">{review.name}</p>
                    <p className="text-[10px] text-accent font-medium mt-0.5">
                      Treated for: {review.treatment}
                    </p>
                    <p className="text-[10px] text-text-muted">{review.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 8. SAME-DAY EMERGENCY DENTAL PAIN BANNER */}
      <section className="bg-primary text-white py-12 px-5 border-y border-primary-light">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold">
              <Zap size={14} />
              <span>Same-Day Emergency Dental Protocol</span>
            </div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-white">
              Severe Toothache, Broken Restoration, or Trauma?
            </h3>
            <p className="text-xs md:text-sm text-white/75 max-w-xl leading-relaxed">
              Don’t endure painful nights. We keep dedicated emergency relief slots open every working day for acute dental distress in Bandra West.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${CLINIC.emergencyPhone}`}
              className="btn-primary text-sm py-3.5 px-6 shadow-md"
            >
              <Phone size={16} />
              <span>Emergency Desk: {CLINIC.emergencyPhoneDisplay}</span>
            </a>
            <Link
              to="/contact"
              className="px-5 py-3.5 rounded-xl border border-white/20 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Clinic Directions
            </Link>
          </div>
        </div>
      </section>

      {/* 9. CLINIC VISIT & TRANSIT GUIDE */}
      <section className="section-padding bg-bg">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn>
            <div className="bg-white rounded-3xl border border-primary/10 shadow-card p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    <Navigation size={13} className="text-accent" />
                    <span>How to Reach Us in Bandra West</span>
                  </div>

                  <h3 className="font-heading text-2xl md:text-3xl text-primary font-bold">
                    Visiting {CLINIC.name}
                  </h3>

                  <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                    Our clinic is centrally situated on Waterfield Road in Bandra West with dedicated valet parking and easy railway connectivity.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-primary-50/60 p-4 rounded-xl border border-primary/10 space-y-1">
                      <div className="flex items-center gap-2 text-primary font-bold text-xs">
                        <MapPin size={15} className="text-accent" />
                        <span>Address</span>
                      </div>
                      <p className="text-xs text-text-muted leading-relaxed">
                        {CLINIC.address.full}
                      </p>
                      <p className="text-[11px] text-accent font-medium">
                        {CLINIC.landmark}
                      </p>
                    </div>

                    <div className="bg-primary-50/60 p-4 rounded-xl border border-primary/10 space-y-1">
                      <div className="flex items-center gap-2 text-primary font-bold text-xs">
                        <Car size={15} className="text-accent" />
                        <span>Parking & Transit</span>
                      </div>
                      <p className="text-xs text-text-muted leading-relaxed">
                        {CLINIC.parking}
                      </p>
                      <p className="text-[11px] text-primary font-medium">
                        {CLINIC.transit}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-4">
                    <Link to="/booking" className="btn-primary text-xs py-3 px-6 shadow-sm">
                      Reserve Appointment Online
                    </Link>
                    <Link to="/contact" className="btn-outline text-xs py-3 px-5">
                      Detailed Hours & Map
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden border border-primary/15 shadow-sm bg-neutral-100">
                  <img
                    src={CLINIC_PHOTOS.reception}
                    alt="Clinic Reception Waiting Lounge in Bandra West"
                    className="w-full h-full object-cover"
                  />
                </div>

              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
