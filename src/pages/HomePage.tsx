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
  Sparkles, 
  Star, 
  CheckCircle2, 
  Calendar, 
  Zap, 
  Navigation, 
  Car, 
  MessageSquare, 
  Mail,
  ChevronRight,
  HeartPulse,
  Activity,
  Award,
  Eye,
  FileCheck
} from 'lucide-react';

interface QuickConcern {
  id: string;
  emoji: string;
  title: string;
  tag: string;
  duration: string;
  price: string;
  doctorNote: string;
  slug: string;
}

const QUICK_DENTAL_OPTIONS: QuickConcern[] = [
  {
    id: 'clean',
    emoji: '🦷',
    title: 'Routine Cleaning & Checkup',
    tag: 'Preventive Care',
    duration: '30 mins',
    price: '₹500 – ₹1,500',
    doctorNote: 'Gentle ultrasonic scaling that removes stubborn plaque and tartar. Completely painless with zero tooth thinning.',
    slug: 'dental-cleaning',
  },
  {
    id: 'pain',
    emoji: '⚡',
    title: 'Tooth Pain Relief & Filling',
    tag: 'Same-Day Relief',
    duration: '30 – 40 mins',
    price: '₹500 – ₹2,500',
    doctorNote: 'Profound computerized numbing gel applied before treatment. Natural tooth-coloured composite resin restore.',
    slug: 'dental-filling',
  },
  {
    id: 'rct',
    emoji: '🩹',
    title: 'Painless Root Canal',
    tag: 'Single / Two Visit',
    duration: '60 mins',
    price: '₹3,000 – ₹8,000',
    doctorNote: 'Modern rotary endodontics with rotary apex locators. Treats deep infection without needle anxiety.',
    slug: 'root-canal',
  },
  {
    id: 'whitening',
    emoji: '✨',
    title: 'Teeth Whitening & Glow',
    tag: 'Instant Brightening',
    duration: '45 mins',
    price: '₹3,000 – ₹6,000',
    doctorNote: 'Dentist-grade controlled hydrogen enamel lightening. Safely removes deep coffee, tea, and tobacco shades.',
    slug: 'teeth-whitening',
  },
  {
    id: 'aligners',
    emoji: '📐',
    title: 'Clear Aligners & Braces',
    tag: 'Dr. Satyam’s MDS Specialty',
    duration: '30 mins consult',
    price: 'Consultation Included',
    doctorNote: 'Custom 3D digital bite simulation by Dr. Satyam Sharma (MDS Orthodontics). Invisible aligners or aesthetic ceramic brackets.',
    slug: 'braces-orthodontics',
  },
];

export default function HomePage() {
  const [activeConcern, setActiveConcern] = useState<QuickConcern>(QUICK_DENTAL_OPTIONS[0]);
  const [activeTreatmentCategory, setActiveTreatmentCategory] = useState<'all' | 'routine' | 'pain' | 'smile'>('all');

  const filteredServices = SERVICES.filter((service) => {
    if (activeTreatmentCategory === 'all') return true;
    if (activeTreatmentCategory === 'routine') return service.id === 'svc-1' || service.id === 'svc-7';
    if (activeTreatmentCategory === 'pain') return service.id === 'svc-2' || service.id === 'svc-3' || service.id === 'svc-4';
    if (activeTreatmentCategory === 'smile') return service.id === 'svc-5' || service.id === 'svc-6';
    return true;
  });

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION — EDITORIAL BOUTIQUE DENTAL STUDIO */}
      <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-primary-50/80 via-bg to-bg border-b border-primary/10 overflow-hidden">
        <div className="max-w-6xl mx-auto px-5">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Headlines & Interactive Dental Concierge */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Live Clinic Availability Badge */}
                <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-primary/15 text-xs text-primary shadow-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold">Clinic Open Today: 9 AM – 6 PM</span>
                  <span className="text-text-muted hidden sm:inline">•</span>
                  <span className="text-accent font-semibold hidden sm:inline">Dr. Satyam Sharma Available</span>
                </div>
                
                {/* Grand Editorial Headline */}
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-primary font-bold leading-[1.12] tracking-tight">
                  Gentle, Precision Dentistry That Never Feels Rushed.
                </h1>
                
                <p className="text-base sm:text-lg text-text-muted max-w-prose leading-relaxed">
                  Experience comfortable dental care in Metropolis. 100% computerized topical numbing, honest itemized estimates before treatment, and zero pressure.
                </p>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 pt-1">
                  <Link 
                    to="/booking" 
                    className="btn-primary text-sm shadow-md px-7 py-4"
                  >
                    <Calendar size={16} />
                    <span>Book Appointment</span>
                  </Link>

                  <a 
                    href={`tel:${CLINIC.phone}`} 
                    className="btn-outline text-sm inline-flex items-center gap-2 px-6 py-4"
                  >
                    <Phone size={15} className="text-primary" />
                    <span>Call Reception ({CLINIC.phoneDisplay})</span>
                  </a>
                </div>

                {/* Clinical Standards */}
                <div className="p-3.5 rounded-2xl bg-white border border-primary/10 shadow-2xs flex flex-wrap items-center gap-4 text-xs text-text">
                  <span className="font-bold text-primary flex items-center gap-1.5">
                    <ShieldCheck size={16} className="text-accent" />
                    Clinical Standards:
                  </span>
                  <span className="flex items-center gap-1.5 text-text-muted">
                    <CheckCircle2 size={14} className="text-emerald-700" />
                    100% Painless Computerized Numbing
                  </span>
                  <span className="flex items-center gap-1.5 text-text-muted">
                    <CheckCircle2 size={14} className="text-emerald-700" />
                    Class-B Autoclave Sterilisation
                  </span>
                  <span className="flex items-center gap-1.5 text-text-muted">
                    <CheckCircle2 size={14} className="text-emerald-700" />
                    Upfront Itemized Estimates
                  </span>
                </div>

                {/* INTERACTIVE DENTAL CONCIERGE: "What brings you in today?" */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                      <DentalToothIcon size={14} className="text-accent" />
                      Quick Treatment Selector:
                    </span>
                    <span className="text-[11px] text-accent font-semibold">Tap procedure to view clinical details</span>
                  </div>

                  {/* Horizontal Scrollable Chips */}
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {QUICK_DENTAL_OPTIONS.map((opt) => {
                      const isSelected = activeConcern.id === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => setActiveConcern(opt)}
                          className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                            isSelected
                              ? 'bg-primary text-white border-primary shadow-sm scale-[1.02]'
                              : 'bg-white text-text-muted border-primary/15 hover:border-primary/40 hover:text-primary'
                          }`}
                        >
                          <span>{opt.emoji}</span>
                          <span>{opt.title.split('&')[0]}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Interactive Selected Concern Card */}
                  <div className="mt-2.5 p-4 rounded-2xl bg-white border border-primary/15 shadow-soft transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-primary/10">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{activeConcern.emoji}</span>
                          <h4 className="font-heading font-bold text-base text-primary">
                            {activeConcern.title}
                          </h4>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-accent/15 text-accent">
                            {activeConcern.tag}
                          </span>
                        </div>
                        <p className="text-xs text-text-muted mt-1 leading-relaxed">
                          {activeConcern.doctorNote}
                        </p>
                      </div>

                      <div className="shrink-0 text-left sm:text-right">
                        <span className="text-[10px] text-text-muted uppercase block">Estimated Fee</span>
                        <span className="text-sm font-bold text-primary font-mono">{activeConcern.price}</span>
                        <span className="text-[11px] text-accent block font-medium">⏱ {activeConcern.duration}</span>
                      </div>
                    </div>

                    <div className="pt-3 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs text-emerald-800 font-medium">
                        <CheckCircle2 size={15} className="text-emerald-700" />
                        <span>100% Computerized Painless Protocol</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/${CLINIC.whatsapp}?text=Hi%20Dr.%20Satyam%2C%20I%20have%20a%20question%20about%20${encodeURIComponent(activeConcern.title)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-primary hover:text-accent flex items-center gap-1 px-2.5 py-1.5"
                        >
                          <MessageSquare size={13} className="text-emerald-600" />
                          <span>Ask on WhatsApp</span>
                        </a>

                        <Link
                          to={`/booking?service=${activeConcern.slug}`}
                          className="btn-primary text-xs py-2 px-4 shadow-2xs inline-flex items-center gap-1.5"
                        >
                          <span>Book Appointment</span>
                          <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: High-End Visual Studio Composition */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  
                  {/* Main Studio Operatory Photo */}
                  <div className="aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden shadow-card border-2 border-primary/10 bg-white relative">
                    <img 
                      src={CLINIC_PHOTOS.hero} 
                      alt="Bright Smiles Modern Dental Suite" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Bottom overlay caption */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="font-heading font-bold text-base">Metropolis Dental Suite</p>
                      <p className="text-xs text-white/80">Memory foam dental lounger • 4K intraoral camera screen</p>
                    </div>
                  </div>

                  {/* Doctor Trust Capsule */}
                  <div className="absolute -top-4 -right-3 sm:-right-5 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-card border border-primary/15 flex items-center gap-3 animate-float">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-accent font-bold text-sm shadow-xs">
                      <DentalToothIcon size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary">{CLINIC.doctor.name}</p>
                      <p className="text-[10px] text-text-muted">{CLINIC.doctor.qualification}</p>
                      <p className="text-[10px] text-accent font-semibold">12+ Years Orthodontic Specialist</p>
                    </div>
                  </div>

                  {/* Rating Capsule */}
                  <div className="absolute -bottom-5 -left-3 sm:-left-5 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-card border border-primary/15 flex items-center gap-3">
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
                      <p className="text-[11px] text-text-muted">Over 8,500+ comfortable visits</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. STATS & CLINICAL TRUST STRIP */}
      <section className="bg-primary text-white py-6 px-5 border-y border-primary-light">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="font-heading text-2xl sm:text-3xl font-bold text-accent">12+ Years</p>
            <p className="text-xs text-white/70 mt-0.5">Specialist Clinical Care</p>
          </div>
          <div>
            <p className="font-heading text-2xl sm:text-3xl font-bold text-accent">8,500+</p>
            <p className="text-xs text-white/70 mt-0.5">Happy Smiles Treated</p>
          </div>
          <div>
            <p className="font-heading text-2xl sm:text-3xl font-bold text-accent">100%</p>
            <p className="text-xs text-white/70 mt-0.5">Painless Topical Numbing</p>
          </div>
          <div>
            <p className="font-heading text-2xl sm:text-3xl font-bold text-accent">Class-B</p>
            <p className="text-xs text-white/70 mt-0.5">Hospital 134°C Autoclave</p>
          </div>
        </div>
      </section>

      {/* 3. THE 4 PAIN-FREE SENSORY PROMISES */}
      <section className="section-padding bg-white border-b border-primary/10">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">
                Why Patients Feel Safe Here
              </span>
              <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold mt-1">
                Dentistry Without Anxiety, Needles or Guesswork
              </h2>
              <p className="text-text-muted text-sm mt-2 leading-relaxed">
                Most people avoid the dentist out of fear of pain, cold clinical environments, or unexpected bills. We designed our practice to solve all three.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Pillar 1 */}
              <div className="p-6 rounded-2xl bg-bg border border-primary/10 space-y-3.5 hover:shadow-card hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary text-accent flex items-center justify-center shadow-xs">
                  <HeartPulse size={22} />
                </div>
                <h3 className="font-heading text-lg font-bold text-primary">
                  Profound Topical Numbing
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  We never inject into sensitive, un-numbed tissue. A computerized gentle topical gel numbs the area completely beforehand.
                </p>
                <div className="pt-2 text-[11px] font-semibold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  <span>Zero needle pinch</span>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-6 rounded-2xl bg-bg border border-primary/10 space-y-3.5 hover:shadow-card hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary text-accent flex items-center justify-center shadow-xs">
                  <Eye size={22} />
                </div>
                <h3 className="font-heading text-lg font-bold text-primary">
                  See Your Teeth in 4K First
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Our high-definition intraoral camera projects your teeth directly onto your private screen. You see exactly what the doctor sees.
                </p>
                <div className="pt-2 text-[11px] font-semibold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  <span>Total transparency</span>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="p-6 rounded-2xl bg-bg border border-primary/10 space-y-3.5 hover:shadow-card hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary text-accent flex items-center justify-center shadow-xs">
                  <FileCheck size={22} />
                </div>
                <h3 className="font-heading text-lg font-bold text-primary">
                  Itemized Upfront Estimates
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Before we begin any procedure, you receive a transparent printed estimate. No hidden fees or unexpected billings at the desk.
                </p>
                <div className="pt-2 text-[11px] font-semibold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  <span>Clear pricing guaranteed</span>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="p-6 rounded-2xl bg-bg border border-primary/10 space-y-3.5 hover:shadow-card hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary text-accent flex items-center justify-center shadow-xs">
                  <ShieldCheck size={22} />
                </div>
                <h3 className="font-heading text-lg font-bold text-primary">
                  Class-B Hospital Autoclave
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  All instruments undergo multi-stage ultrasonic cleansing, pouch sealing, and medical vacuum autoclaving at 134°C.
                </p>
                <div className="pt-2 text-[11px] font-semibold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  <span>Opened fresh in front of you</span>
                </div>
              </div>

            </div>
          </FadeIn>
        </div>
      </section>

      {/* 4. TREATMENTS & CLEAR UPFRONT PRICING */}
      <section className="section-padding bg-bg">
        <div className="max-w-6xl mx-auto">
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
                  Honest fee ranges with exact treatment times. Tap any procedure to book your preferred slot.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Treatments' },
                  { id: 'routine', label: 'Hygiene & Cleaning' },
                  { id: 'pain', label: 'Pain Relief & Fillings' },
                  { id: 'smile', label: 'Braces & Whitening' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTreatmentCategory(cat.id as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      activeTreatmentCategory === cat.id
                        ? 'bg-primary text-white shadow-xs'
                        : 'bg-white border border-primary/15 text-text-muted hover:border-primary/30'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Services Grid with Editorial Numbering */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.slice(0, 6).map((service, index) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl border border-primary/10 p-7 shadow-soft hover:shadow-card hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
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
                      <span>Book Appointment</span>
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
                <span>View Full Procedure Guides & FAQs</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 5. CLINIC TOUR & HOSPITAL-GRADE HYGIENE SPOTLIGHT */}
      <section className="section-padding bg-white border-y border-primary/10">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">
                Inside Metropolis Studio
              </span>
              <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold mt-1">
                A Calming, Hospital-Grade Environment
              </h2>
              <p className="text-text-muted text-sm mt-2 leading-relaxed">
                We designed our dental clinic to look and feel like a boutique sanctuary while adhering to international sterilization standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Photo 1: Operatory */}
              <div className="rounded-2xl overflow-hidden border border-primary/10 shadow-soft bg-bg flex flex-col group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={CLINIC_PHOTOS.operatory}
                    alt="Ergonomic Dental Operatory"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-1">
                  <h4 className="font-heading text-base font-bold text-primary">Ergonomic Operatory Suite</h4>
                  <p className="text-xs text-text-muted leading-relaxed">Memory foam chair, intraoral 4K camera, and quiet ultrasonic scaling.</p>
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
                    alt="Patient Welcome Lounge"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-1">
                  <h4 className="font-heading text-base font-bold text-primary">Patient Welcome Lounge</h4>
                  <p className="text-xs text-text-muted leading-relaxed">Herbal refreshments, tranquil music, and zero clinical smell or anxiety.</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6. 60-SECOND ONLINE BOOKING CALLOUT */}
      <section className="section-padding bg-primary text-white border-y border-primary-light">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="text-xs font-bold text-accent uppercase tracking-wider">
                  Personalised Clinical Care
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Schedule Your Consultation with Dr. Satyam Sharma
                </h2>
                <p className="text-xs md:text-sm text-white/80 max-w-2xl leading-relaxed">
                  Receive comprehensive, gentle oral examination with transparent treatment planning from a specialist with 12+ years of clinical excellence. No advance payment required.
                </p>

                <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-white/90">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-accent" />
                    Gentle, Unhurried Consultation
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-accent" />
                    Transparent Itemized Estimates
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-accent" />
                    Zero Cancellation Fee
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  to="/booking"
                  className="btn-primary w-full text-center text-xs py-3.5 justify-center shadow-lg"
                >
                  <Calendar size={16} />
                  <span>Schedule Consultation</span>
                </Link>
                <a
                  href={`tel:${CLINIC.phone}`}
                  className="btn-outline bg-white/10 text-white border-white/20 hover:bg-white/20 w-full text-center text-xs py-3.5 justify-center"
                >
                  <Phone size={15} />
                  <span>Call Reception ({CLINIC.phoneDisplay})</span>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 7. HOW IT WORKS / 4 REASSURING STEPS */}
      <section className="section-padding bg-white border-b border-primary/10">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">
                Clear & Pressure-Free
              </span>
              <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold mt-1">
                Your First Visit in 4 Reassuring Steps
              </h2>
              <p className="text-text-muted text-sm mt-2">
                We never rush your appointment. Here is how your visit unfolds from booking to treatment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary border border-primary/20 flex items-center justify-center font-heading font-bold text-xl">
                  01
                </div>
                <h3 className="font-heading text-base font-bold text-primary">
                  Select Your Preferred Slot
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Choose your treatment and a convenient time slot that fits your day.
                </p>
              </div>

              {/* Step 2 */}
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary border border-primary/20 flex items-center justify-center font-heading font-bold text-xl">
                  02
                </div>
                <h3 className="font-heading text-base font-bold text-primary">
                  Gentle Consultation
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Dr. Satyam inspects your oral health using digital imaging and intraoral cameras with zero pain.
                </p>
              </div>

              {/* Step 3 */}
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary border border-primary/20 flex items-center justify-center font-heading font-bold text-xl">
                  03
                </div>
                <h3 className="font-heading text-base font-bold text-primary">
                  Clear Upfront Plan
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  We show you images, explain all treatment options, and provide a printed estimate with no surprises.
                </p>
              </div>

              {/* Step 4 */}
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-heading font-bold text-xl shadow-sm">
                  04
                </div>
                <h3 className="font-heading text-base font-bold text-primary">
                  Treatment at Your Pace
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  We proceed with profound topical numbing. Completely relaxed and pain-free.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 8. DOCTOR PROFILE SPOTLIGHT */}
      <section className="section-padding bg-bg">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="bg-white rounded-2xl border border-primary/10 shadow-card overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                <div className="lg:col-span-5 h-full min-h-[380px] relative">
                  <img
                    src={CLINIC_PHOTOS.doctor}
                    alt={CLINIC.doctor.name}
                    className="w-full h-full object-cover min-h-[380px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent lg:hidden" />
                  <div className="absolute bottom-4 left-4 text-white lg:hidden">
                    <p className="font-heading font-bold text-lg">{CLINIC.doctor.name}</p>
                    <p className="text-xs text-white/80">{CLINIC.doctor.qualification}</p>
                  </div>
                </div>

                <div className="lg:col-span-7 p-8 lg:p-12 space-y-6">
                  <div>
                    <span className="text-xs font-bold text-accent uppercase tracking-wider">
                      Meet Your Dentist & Orthodontist
                    </span>
                    <h2 className="font-heading text-3xl font-bold text-primary mt-1">
                      {CLINIC.doctor.name}
                    </h2>
                    <p className="text-sm font-semibold text-accent mt-0.5">
                      {CLINIC.doctor.qualification} • Reg #{CLINIC.doctor.registration}
                    </p>
                  </div>

                  <p className="text-sm text-text-muted leading-relaxed">
                    {CLINIC.doctor.bio}
                  </p>

                  <div className="bg-primary-50 p-5 rounded-xl border border-primary/10 italic text-xs text-primary leading-relaxed">
                    "{CLINIC.doctor.philosophy}"
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Link to="/about" className="btn-secondary text-xs py-2.5 px-5">
                      Read Dr. Sharma's Full Qualifications
                    </Link>
                    <Link to="/booking" className="btn-primary text-xs py-2.5 px-5">
                      Schedule with Dr. Satyam
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 9. VERIFIED PATIENT REVIEWS */}
      <section className="section-padding bg-white border-y border-primary/10">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">
                Patient Feedback
              </span>
              <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold mt-1">
                Real Stories From Metropolis Families
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

      {/* 10. ACUTE DENTAL PAIN / EMERGENCY BANNER */}
      <section className="bg-primary text-white py-12 px-5 border-y border-primary-light">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold">
              <Zap size={14} />
              <span>Same-Day Emergency Protocol</span>
            </div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-white">
              Severe Toothache, Broken Tooth, or Dental Trauma?
            </h3>
            <p className="text-xs md:text-sm text-white/70 max-w-xl">
              Don’t endure painful nights. We keep dedicated emergency relief slots open every working day for acute dental distress.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${CLINIC.emergencyPhone}`}
              className="btn-primary text-sm py-3.5 px-6 shadow-md"
            >
              <Phone size={16} />
              <span>Call Emergency: {CLINIC.emergencyPhoneDisplay}</span>
            </a>
            <Link
              to="/contact"
              className="px-5 py-3.5 rounded-xl border border-white/20 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Directions to Clinic
            </Link>
          </div>
        </div>
      </section>

      {/* 11. CLINIC VISIT & TRANSIT GUIDE */}
      <section className="section-padding bg-bg">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="bg-white rounded-2xl border border-primary/10 shadow-card p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    <Navigation size={13} className="text-accent" />
                    <span>How to Reach Us</span>
                  </div>

                  <h3 className="font-heading text-2xl md:text-3xl text-primary font-bold">
                    Visiting Bright Smiles Dental Clinic
                  </h3>

                  <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                    Our clinic is centrally situated in Metropolis with effortless accessibility via metro, private vehicles, and local bus transit.
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
                    <Link to="/booking" className="btn-primary text-xs py-2.5 px-5">
                      Reserve Appointment Online
                    </Link>
                    <Link to="/contact" className="btn-outline text-xs py-2.5 px-5">
                      Detailed Contact & Hours
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden border border-primary/15 shadow-sm bg-neutral-100">
                  <img
                    src={CLINIC_PHOTOS.reception}
                    alt="Clinic Reception Waiting Lounge"
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
