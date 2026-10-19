import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '@/components/FadeIn';
import { TREATMENTS } from '@/data/services';
import { 
  Clock, 
  Calendar,
  MapPin, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown, 
  GraduationCap,
  ShieldCheck, 
  AlertCircle,
  Star,
  Sparkles,
  Heart,
  Award,
} from 'lucide-react';
import { CLINIC } from '@/data/clinicInfo';
import PatientReviewCarousel from '@/components/PatientReviewCarousel';

const FAQS_LIST = [
  {
    q: 'Is root canal treatment really pain-free at your clinic?',
    a: 'Yes, 100%. We use computer-controlled anesthesia (Milestone STA system) that delivers numbing medication slowly below the pain threshold. We thoroughly test the tooth to verify complete numbness before starting. If you feel any sensation, we pause instantly.'
  },
  {
    q: 'How does the initial consultation work?',
    a: 'Dr. Satyam Sharma (MDS) will listen to your concerns, examine your oral health, and explain suitable care options clearly before you decide on any next steps.'
  },
  {
    q: 'What if I have severe dental anxiety or past dental trauma?',
    a: 'Most of our patients carry some degree of apprehension. We never rush. We explain every instrument before using it, check in with you continuously, and follow an agreed hand-signal rule: raise your left hand anytime and Dr. Sharma stops immediately.'
  },
  {
    q: 'How do I decide which treatment is right for me?',
    a: 'Dr. Sharma will review your concerns, explain the findings, and discuss suitable options so you can decide on next steps with confidence.'
  },
  {
    q: 'Where on Waterfield Road is the clinic located, and is parking available?',
    a: 'We are located at Studio 204, 2nd Floor, Sagar Fortune Building on Waterfield Road, Bandra West (near National College junction, opposite Mini Punjab). Dedicated visitor parking is available inside the building compound.'
  },
  {
    q: 'How do I book a visit for an urgent dental concern?',
    a: 'Please call or message us about urgent dental concerns. The clinic will confirm availability and a suitable visit time before you travel.'
  }
];

const HERO_HEADLINE = 'Gentle, Honest Dental Care for Your Family';

interface CountUpProps {
  target: number;
  suffix?: string;
  decimals?: number;
  label: string;
}

function CountUp({ target, suffix = '', decimals = 0, label }: CountUpProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = countRef.current;
    if (!element) return;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      setCount(target);
      return;
    }

    let animationFrame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      const startTime = performance.now();
      const duration = 1400;
      const animate = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setCount(target * easedProgress);
        if (progress < 1) animationFrame = window.requestAnimationFrame(animate);
      };

      animationFrame = window.requestAnimationFrame(animate);
      observer.disconnect();
    }, { threshold: 0.5 });

    observer.observe(element);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, [target]);

  const formattedCount = count.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  const accessibleCount = target.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={countRef} aria-label={`${accessibleCount}${suffix} ${label}`} className="tabular-nums">
      <span aria-hidden="true">{formattedCount}{suffix}</span>
    </span>
  );
}

export default function HomePage() {
  const [headlineLength, setHeadlineLength] = useState(HERO_HEADLINE.length);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.visibilityState === 'hidden'
    ) {
      setHeadlineLength(HERO_HEADLINE.length);
      return;
    }

    setHeadlineLength(0);
    const startTime = performance.now();
    let animationFrame = 0;
    const animateHeadline = (now: number) => {
      let elapsed = Math.max(0, now - startTime - 180);
      let visibleLength = 0;

      while (visibleLength < HERO_HEADLINE.length) {
        const character = HERO_HEADLINE[visibleLength];
        const delay = '.!,?'.includes(character) ? 220 : character === ' ' ? 70 : 34;
        if (elapsed < delay) break;
        elapsed -= delay;
        visibleLength += 1;
      }

      setHeadlineLength(visibleLength);
      if (visibleLength < HERO_HEADLINE.length) {
        animationFrame = window.requestAnimationFrame(animateHeadline);
      }
    };

    animationFrame = window.requestAnimationFrame(animateHeadline);
    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  const waGeneralUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent('Hello Dr. Sharma, I want to inquire about dental appointments at Aura Dental Studio Bandra West.')}`;

  return (
    <div className="bg-white text-slate-800 font-sans">
      
      <section className="relative bg-gradient-to-br from-teal-50 via-slate-50 to-emerald-50/50 border-b border-slate-200">
        <div className="max-w-container mx-auto px-4 pt-10 pb-24 sm:px-8 sm:pt-14 sm:pb-28 lg:pt-16 lg:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-5 sm:space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-white border border-teal-200 text-teal-800 shadow-xs">
                <Sparkles size={14} className="text-teal-600" />
                <span>Dr. Satyam Sharma, MDS · Bandra West</span>
              </div>

              <h1
                aria-label={HERO_HEADLINE}
                className="min-h-[2.3em] text-3xl sm:text-5xl font-extrabold text-slate-900 leading-[1.15] tracking-tight"
              >
                <span aria-hidden="true">
                  {HERO_HEADLINE.slice(0, headlineLength)}
                  {headlineLength < HERO_HEADLINE.length && <span className="hero-typing-caret" />}
                </span>
              </h1>

              <p className="max-w-xl text-base sm:text-lg text-slate-600 leading-relaxed">
                Thoughtful dental care, clearly explained. We take the time to listen, show you what we find, and help you choose the next step with confidence.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 max-w-sm sm:max-w-none w-full sm:w-auto">
                <Link
                  to="/book"
                  className="btn-primary h-[46px] w-full px-6 text-sm sm:w-auto"
                >
                  <Calendar size={17} />
                  <span>Book Appointment</span>
                </Link>
                <a
                  href={waGeneralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary h-[46px] w-full px-6 text-sm sm:w-auto"
                >
                  <MessageCircle size={17} />
                  <span>Chat with Us</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 border-t border-slate-200/80 text-xs text-slate-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 size={15} className="text-teal-600 shrink-0" />
                  Maharashtra Dental Council MSDC-42891
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 size={15} className="text-teal-600 shrink-0" />
                  Clear, upfront treatment plans
                </span>
              </div>
            </div>

            <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
              <div className="overflow-hidden rounded-3xl border border-white/80 bg-white p-2 shadow-xl">
                <img
                  src="/images/clinic-interior-wide.webp"
                  alt="Bright, modern dental treatment room"
                  className="w-full aspect-[4/3] rounded-[1.35rem] object-cover"
                  loading="eager"
                  onError={(event) => {
                    event.currentTarget.src = '/images/reception.webp';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-16 bg-transparent pb-3 sm:-mt-20 sm:pb-3">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-lg shadow-slate-900/5 sm:gap-6 sm:p-7 lg:grid-cols-4 lg:gap-8">
            
            <div className="flex flex-col items-center gap-2 rounded-xl p-3 text-center sm:flex-row sm:gap-3.5 sm:text-left">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-teal-100 bg-white text-teal-700 shadow-sm sm:h-12 sm:w-12">
                <Award size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-xl font-extrabold leading-tight text-slate-900 sm:text-3xl">
                  <CountUp target={12} suffix="+" label="years of clinical practice" />
                </div>
                <div className="mt-1 text-[11px] font-medium leading-tight text-slate-500 sm:text-xs">Years of Experience</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 rounded-xl p-3 text-center sm:flex-row sm:gap-3.5 sm:text-left">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-teal-100 bg-white text-teal-700 shadow-sm sm:h-12 sm:w-12">
                <Heart size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-xl font-extrabold leading-tight text-slate-900 sm:text-3xl">
                  <CountUp target={5000} suffix="+" label="smiles restored" />
                </div>
                <div className="mt-1 text-[11px] font-medium leading-tight text-slate-500 sm:text-xs">Smiles Restored</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 rounded-xl p-3 text-center sm:flex-row sm:gap-3.5 sm:text-left">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-teal-100 bg-white text-teal-700 shadow-sm sm:h-12 sm:w-12">
                <Star size={20} className="fill-teal-700 text-teal-700 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-xl font-extrabold leading-tight text-slate-900 sm:text-3xl">
                  <CountUp target={4.9} decimals={1} suffix=" ★" label="Google review rating" />
                </div>
                <div className="mt-1 text-[11px] font-medium leading-tight text-slate-500 sm:text-xs">Google Rating</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 rounded-xl p-3 text-center sm:flex-row sm:gap-3.5 sm:text-left">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-teal-100 bg-white text-teal-700 shadow-sm sm:h-12 sm:w-12">
                <GraduationCap size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-xl font-extrabold leading-tight text-slate-900 sm:text-3xl">
                  <CountUp target={1} label="lead dentist" />
                </div>
                <div className="mt-1 text-[11px] font-medium leading-tight text-slate-500 sm:text-xs">Lead Dentist</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
                <img
                  src="/images/dr-satyam-sharma.jpg"
                  alt="Dr. Satyam Sharma in the dental clinic"
                  className="aspect-[4/3] w-full rounded-xl object-cover object-top"
                  loading="eager"
                />
              </div>
            </div>
            <div className="space-y-5 lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">About Aura Dental Studio</span>
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Thoughtful care, built around you</h2>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                Dr. Satyam Sharma completed his BDS at Nair Hospital Dental College and his MDS in Orthodontics and Dentofacial Orthopedics at Government Dental College, Mumbai. With over 12 years of clinical experience, he brings specialist orthodontic training to family and restorative dentistry.
              </p>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                At Aura Dental Studio, he takes time to understand each patient’s concerns, explain findings in clear language, and discuss conservative care options before treatment—so patients can make informed decisions without pressure.
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 transition-colors hover:text-teal-800">
                <span>More about Dr. Sharma and his approach</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Dental treatments" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          
          <div className="max-w-2xl mx-auto text-center mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Our Dental Treatments
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Dental treatments and care options
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Every procedure is explained clearly before we begin. Select a treatment to explore the details, then book an appointment with Dr. Satyam Sharma.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TREATMENTS.map((treatment, index) => (
              <FadeIn key={treatment.id} delay={index * 0.06}>
                <Link
                  to={`/services/${treatment.slug}`}
                  className="service-card group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
                  aria-label={`Learn more about ${treatment.name}`}
                >
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img
                      src={treatment.image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="eager"
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-100">
                        {treatment.category}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 leading-snug transition-colors group-hover:text-teal-800">
                        {treatment.name}
                      </h3>

                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <MapPin size={14} className="text-teal-600" />
                        <span>{CLINIC.address.full}</span>
                      </div>

                      <p className="text-sm text-slate-600 leading-relaxed">
                        {treatment.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <span className="text-sm font-bold text-teal-700 inline-flex items-center gap-1.5">
                        <span>View treatment details</span>
                        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <div className="text-center pt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800 underline"
            >
              <span>Explore all {TREATMENTS.length} services and their procedures</span>
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          
          <div className="max-w-2xl mx-auto text-center mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Why Patients Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Dentistry Designed Around Your Comfort
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              No hurried visits or pressure. Just thoughtful, high-quality care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                  <ShieldCheck size={22} />
                </div>
                <span className="text-xs font-semibold tracking-wider text-slate-300">01</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Comfort-first care</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Computer-assisted local anesthesia and a careful comfort check before treatment begins.
              </p>
            </div>

            <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                  <Sparkles size={22} />
                </div>
                <span className="text-xs font-semibold tracking-wider text-slate-300">02</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Modern diagnostics</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Digital tools help explain what we find and make treatment options easier to understand.
              </p>
            </div>

            <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                  <CheckCircle2 size={22} />
                </div>
                <span className="text-xs font-semibold tracking-wider text-slate-300">03</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Clear, considered plans</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Understand the recommended care, alternatives, and next steps before making a decision.
              </p>
            </div>

            <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                  <Heart size={22} />
                </div>
                <span className="text-xs font-semibold tracking-wider text-slate-300">04</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">A personal, unhurried visit</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Time to share your concerns, ask questions, and feel comfortable discussing your care.
              </p>
            </div>

          </div>

        </div>
      </section>

      <section className="py-8 sm:py-10 bg-amber-500/10 border-b border-amber-500/20">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                <AlertCircle size={16} className="text-amber-600" />
                <span>Urgent Dental Concerns</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Severe Toothache, Broken Tooth, or Dental Emergency?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                Call or message us to discuss your concern and book a visit. Please wait for the clinic to confirm availability before travelling.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={`tel:${CLINIC.phone}`}
                className="btn-primary bg-amber-600 hover:bg-amber-700 border-amber-600 text-xs h-11 px-5"
              >
                <Phone size={15} />
                <span>Call the Clinic: {CLINIC.phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent('Hello Dr. Sharma, I have an urgent dental concern and would like to book a visit. Please let me know availability.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs h-11 px-5"
              >
                <MessageCircle size={15} />
                <span>Message the Clinic</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          
          <div className="max-w-2xl mx-auto text-center mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Patient feedback</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">What our patients say</h2>
            <p className="text-sm sm:text-base text-slate-600">Experiences shared by patients about their care and visits.</p>
          </div>

          <PatientReviewCarousel />

          <div className="text-center pt-8">
            <Link
              to="/testimonials"
              className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800 transition-colors"
            >
              <span>Read patient reviews</span>
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          
          <div className="max-w-2xl mx-auto text-center mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Helpful answers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Common dental questions
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Straightforward answers to help you feel informed before your visit.
            </p>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-slate-200 border-y border-slate-200">
            {FAQS_LIST.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={faq.q} className="py-5">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left gap-4 group"
                  >
                    <span className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-teal-700' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="pt-3 pr-6 text-sm text-slate-600 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
