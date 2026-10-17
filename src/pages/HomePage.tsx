import { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '@/components/FadeIn';
import { TREATMENTS } from '@/data/services';
import { 
  Clock, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Mail, 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown, 
  Calendar, 
  ShieldCheck, 
  AlertCircle,
  Star,
  Sparkles,
  Heart,
  Award,
} from 'lucide-react';
import { CLINIC } from '@/data/clinicInfo';
import DentalVideos from '@/components/DentalVideos';
import PatientReviewCarousel from '@/components/PatientReviewCarousel';
import TimeSlotPicker from '@/components/booking/TimeSlotPicker';

const FAQS_LIST = [
  {
    q: 'Is root canal treatment really pain-free at your clinic?',
    a: 'Yes, 100%. We use computer-controlled anesthesia (Milestone STA system) that delivers numbing medication slowly below the pain threshold. We thoroughly test the tooth to verify complete numbness before starting. If you feel any sensation, we pause instantly.'
  },
  {
    q: 'How does the initial consultation work?',
    a: 'Your consultation includes an unhurried 30-minute examination with Dr. Satyam Sharma (MDS), a high-definition 3Shape 3D intraoral digital camera tour on screen, and a clear explanation of your care options before any procedure is scheduled.'
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

const getTodayDateValue = () => {
  const today = new Date();
  return new Date(today.getTime() - today.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
};

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
  const [selectedService, setSelectedService] = useState<string>('');
  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isAnxious, setIsAnxious] = useState<boolean>(false);
  const [patientNotes, setPatientNotes] = useState<string>('');
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string; service?: string; date?: string; time?: string }>({});
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

  const cleanPhone = patientPhone.replace(/\D/g, '');

  const validateBooking = () => {
    const errors: { name?: string; phone?: string; service?: string; date?: string; time?: string } = {};
    if (!patientName.trim() || patientName.trim().length < 2) {
      errors.name = 'Please enter your full name (letters only).';
    }
    if (!cleanPhone || cleanPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      errors.phone = 'Please enter a valid 10-digit mobile number.';
    }
    if (!selectedService) {
      errors.service = 'Please select a treatment or service.';
    }
    if (!selectedDate) {
      errors.date = 'Please select your preferred day.';
    }
    if (!selectedTime) {
      errors.time = 'Please select your preferred time.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const dispatchWhatsAppUrl = useMemo(() => {
    const text = 
      `*AURA DENTAL STUDIO — APPOINTMENT BOOKING*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `• *Patient Name:* ${patientName.trim() || 'Not specified'}\n` +
      `• *Mobile:* +91 ${cleanPhone || 'Not specified'}\n` +
      `• *Treatment:* ${selectedService}\n` +
      `• *Preferred Day:* ${selectedDate}\n` +
      `• *Preferred Time:* ${selectedTime || 'Not selected'} (subject to confirmation)\n` +
      `• *Dental Anxiety Note:* ${isAnxious ? 'Yes, please allow calm buffer' : 'Standard'}\n` +
      `• *Notes:* ${patientNotes.trim() || 'None'}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Hello Dr. Sharma, I would like to book a consultation at Aura Dental Studio Bandra West.`;

    return `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(text)}`;
  }, [patientName, cleanPhone, selectedService, selectedDate, selectedTime, isAnxious, patientNotes]);

  const dispatchMailtoUrl = useMemo(() => {
    const subject = `Dental Appointment Booking: ${patientName.trim() || 'New Patient'} - ${selectedService}`;
    const body = 
      `Hello Aura Dental Studio Team,\n\n` +
      `I would like to book an appointment with Dr. Satyam Sharma.\n\n` +
      `Patient Name: ${patientName.trim() || 'Not specified'}\n` +
      `Phone Number: +91 ${cleanPhone || 'Not specified'}\n` +
      `Email: ${patientEmail.trim() || 'Not provided'}\n` +
      `Selected Treatment: ${selectedService}\n` +
      `Preferred Day: ${selectedDate}\n` +
      `Preferred Time: ${selectedTime || 'Not selected'} (subject to confirmation)\n` +
      `Dental Anxiety Care: ${isAnxious ? 'Yes (needs gentle buffer)' : 'Standard'}\n` +
      `Additional Notes: ${patientNotes.trim() || 'None'}\n\n` +
      `Thank you!\n${patientName.trim() || ''}`;

    return `mailto:${CLINIC.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [patientName, cleanPhone, patientEmail, selectedService, selectedDate, selectedTime, isAnxious, patientNotes]);

  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!validateBooking()) {
      e.preventDefault();
      return;
    }
  };

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!validateBooking()) {
      e.preventDefault();
      return;
    }
  };

  const waGeneralUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent('Hello Dr. Sharma, I want to inquire about dental appointments at Aura Dental Studio Bandra West.')}`;

  return (
    <div className="bg-white text-slate-800 font-sans">
      
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-slate-50 to-emerald-50/50 border-b border-slate-200">
        <div className="max-w-container mx-auto px-4 sm:px-8 py-10 sm:py-14 lg:py-16">
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
                <a
                  href={waGeneralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-lg border border-teal-700 bg-white px-6 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 sm:w-auto"
                >
                  <MessageCircle size={17} />
                  <span>WhatsApp Dr. Sharma</span>
                </a>
                <a href="#book-section" className="btn-primary w-full sm:w-auto text-center">
                  <Calendar size={17} />
                  <span>Book Appointment</span>
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
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 bg-white border-b border-slate-200">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3.5 p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-center sm:text-left">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                <Award size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  <CountUp target={12} suffix="+" label="years of clinical practice" /> Years
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-tight">Clinical Practice</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3.5 p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-center sm:text-left">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                <Heart size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  <CountUp target={5000} suffix="+" label="smiles restored" />
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-tight">Smiles Restored</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3.5 p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-center sm:text-left">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                <Star size={20} className="fill-teal-700 text-teal-700 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  <CountUp target={4.9} decimals={1} suffix=" ★" label="Google review rating" />
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-tight">Google Reviews</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3.5 p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-center sm:text-left">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                <ShieldCheck size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-tight">Clear Plans</div>
                <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-tight">Explained Before Treatment</div>
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
                  src="/images/doctor-portrait.webp"
                  alt="Dr. Satyam Sharma in the dental clinic"
                  className="aspect-[4/3] w-full rounded-xl object-cover"
                  loading="eager"
                />
              </div>
            </div>
            <div className="space-y-5 lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">About Aura Dental Studio</span>
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Thoughtful care, built around you</h2>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                Aura Dental Studio provides orthodontic and family dental care in Bandra West. Dr. Satyam Sharma takes time to understand each patient’s needs, explain findings clearly, and discuss care options before treatment.
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 transition-colors hover:text-teal-800">
                <span>Meet Dr. Sharma and learn about our approach</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Patient feedback" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
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
                      <span className="text-xs text-slate-500">{treatment.durationLabel}</span>
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
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-base">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900">Computerized Pain-Free Numbing</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We use computer-assisted local anesthesia delivery that flows below the pain threshold. We confirm full numbness before touching your tooth.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-base">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900">3D Optical Digital Scans</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                No gag-inducing silicone impression trays. The 3Shape TRIOS optical scanner captures your teeth in high-definition 3D in just two minutes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-base">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900">Clear Treatment Plans</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We explain your options, the proposed steps, and what to expect before any treatment begins.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-base">
                04
              </div>
              <h3 className="text-lg font-bold text-slate-900">Unhurried & Calm Visits</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We strictly limit our schedule to 6 patients per day. No overcrowded waiting rooms. Dr. Sharma dedicates his full attention to you.
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
                className="btn-whatsapp text-xs h-11 px-5"
              >
                <MessageCircle size={15} />
                <span>Message the Clinic</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="book-section" className="py-16 sm:py-24 bg-white border-b border-slate-200 scroll-mt-14">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          
          <div className="max-w-2xl mx-auto text-center mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Book an Appointment
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Book Appointment with Dr. Sharma
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Choose your treatment and preferred date, then continue by WhatsApp or email. The clinic will confirm your visit date and time.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
            
            <div className="space-y-2">
              <label htmlFor="home-booking-service" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                1. Select Treatment / Service *
              </label>
              <select
                id="home-booking-service"
                value={selectedService}
                onChange={(e) => {
                  setSelectedService(e.target.value);
                  if (formErrors.service) setFormErrors({ ...formErrors, service: undefined });
                }}
                className={`w-full h-12 px-4 bg-white border rounded-xl text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 ${
                  formErrors.service ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-300'
                }`}
              >
                <option value="" disabled>Select a treatment or service</option>
                {TREATMENTS.map((treatment) => (
                  <option key={treatment.id} value={treatment.name}>{treatment.name}</option>
                ))}
              </select>
              {formErrors.service && <p className="text-xs text-red-600 font-medium">{formErrors.service}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="home-booking-date" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  2. Preferred Date *
                </label>
                <input
                  id="home-booking-date"
                  type="date"
                  min={getTodayDateValue()}
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    if (formErrors.date) setFormErrors({ ...formErrors, date: undefined });
                  }}
                  className={`w-full h-12 px-4 bg-white border rounded-xl text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 ${
                    formErrors.date ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-300'
                  }`}
                />
                {formErrors.date && <p className="text-xs text-red-600 font-medium">{formErrors.date}</p>}
              </div>

              <div className="space-y-2">
              <label htmlFor="home-preferred-time" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                3. Preferred Time *
              </label>
              <TimeSlotPicker
                id="home-preferred-time"
                selectedTime={selectedTime}
                onSelect={(time) => {
                  setSelectedTime(time);
                  if (formErrors.time) setFormErrors({ ...formErrors, time: undefined });
                }}
              />
              {formErrors.time && <p className="text-xs text-red-600 font-medium">{formErrors.time}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                3. Your Contact Details
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Full Name (letters only) *"
                    value={patientName}
                    onChange={(e) => {
                      const lettersOnly = e.target.value.replace(/[^a-zA-Z\s.]/g, '');
                      setPatientName(lettersOnly);
                      if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                    }}
                    className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
                  />
                  {formErrors.name && (
                    <p className="text-xs text-red-600 mt-1 font-medium">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <input
                    type="tel"
                    placeholder="10-digit Mobile Number *"
                    value={patientPhone}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setPatientPhone(digitsOnly);
                      if (formErrors.phone) setFormErrors({ ...formErrors, phone: undefined });
                    }}
                    className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
                  />
                  {formErrors.phone && (
                    <p className="text-xs text-red-600 mt-1 font-medium">{formErrors.phone}</p>
                  )}
                </div>
              </div>

              <input
                type="email"
                placeholder="Email Address (optional, for confirmation copy)"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 mt-2"
              />
            </div>

            <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer select-none hover:border-slate-300 transition-colors">
              <input
                type="checkbox"
                checked={isAnxious}
                onChange={(e) => setIsAnxious(e.target.checked)}
                className="rounded text-teal-600 focus:ring-teal-600 w-4 h-4 shrink-0"
              />
              <span className="text-xs text-slate-700">
                First visit or feel nervous? <strong>Request gentle, unhurried care.</strong>
              </span>
            </label>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Any specific tooth concern or history? (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Pain on upper left molar with cold drinks, or wanting clearer aligners..."
                value={patientNotes}
                onChange={(e) => setPatientNotes(e.target.value)}
                className="w-full p-3.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 resize-none"
              />
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={dispatchWhatsAppUrl}
                onClick={handleWhatsAppClick}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full sm:flex-1 h-12 text-sm"
              >
                <MessageCircle size={18} />
                <span>Continue with WhatsApp</span>
              </a>

              <a
                href={dispatchMailtoUrl}
                onClick={handleEmailClick}
                className="btn-secondary w-full sm:flex-1 h-12 text-sm"
              >
                <Mail size={18} />
                <span>Continue with Email</span>
              </a>
            </div>

            <p className="text-xs text-slate-500 text-center font-medium">
              Your visit is not booked until the clinic confirms it. You can also call us at <strong>{CLINIC.phoneDisplay}</strong>.
            </p>

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

          <DentalVideos compact embedded />
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

      <section className="py-16 sm:py-20 bg-teal-800 text-white text-center">
        <div className="max-w-container mx-auto px-4 sm:px-8 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-200 block">
            Aura Dental Studio · Bandra West
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight max-w-2xl mx-auto">
            Ready to experience gentle, unhurried dental care?
          </h2>
          <p className="text-sm sm:text-base text-teal-100 max-w-lg mx-auto leading-relaxed">
            Schedule your checkup and 3D digital scan, or send Dr. Satyam Sharma a message on WhatsApp for personal advice.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={waGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/70 bg-transparent px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <MessageCircle size={17} />
              <span>WhatsApp Dr. Sharma</span>
            </a>
            <a
              href="#book-section"
              className="btn-primary bg-white text-teal-900 hover:bg-teal-50 border-white shadow-md text-sm h-12 px-6"
            >
              <Calendar size={17} />
              <span>Book Appointment</span>
            </a>

          </div>

          <div className="pt-4 text-xs text-teal-200/80 font-medium">
            Studio 204, Sagar Fortune Building, Waterfield Road, Bandra West, Mumbai · Telephone: {CLINIC.phoneDisplay}
          </div>
        </div>
      </section>

    </div>
  );
}
