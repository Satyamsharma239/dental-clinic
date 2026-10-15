import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
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
  Award
} from 'lucide-react';
import { CLINIC, CLINIC_PHOTOS, REVIEWS } from '@/data/clinicInfo';

interface ServiceItem {
  id: string;
  title: string;
  price: string;
  time: string;
  location: string;
  desc: string;
  img: string;
  category: string;
}

const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'root-canal',
    title: 'Root Canal Treatment (Pain-Free)',
    price: 'from ₹3,500',
    time: '60 Mins · Single or 2 Visits',
    location: 'Studio 204, Waterfield Rd',
    desc: 'Computer-controlled local anesthesia ensures zero pain. We gently clean and seal the infected nerve, saving your natural tooth from extraction.',
    img: CLINIC_PHOTOS.operatory,
    category: 'Restorative'
  },
  {
    id: 'aligners',
    title: 'Clear Aligners & Invisible Braces',
    price: 'from ₹28,000',
    time: '45 Mins Initial 3D Scan',
    location: 'Studio 204, Waterfield Rd',
    desc: 'Straighten crooked or spaced teeth with discreet clear trays. Staged personally by Dr. Satyam Sharma (MDS Orthodontist) using 3Shape 3D digital scans.',
    img: CLINIC_PHOTOS.aligners,
    category: 'Orthodontics'
  },
  {
    id: 'fillings',
    title: 'Tooth-Coloured Composite Fillings',
    price: 'from ₹1,500',
    time: '30 Mins · Single Session',
    location: 'Studio 204, Waterfield Rd',
    desc: 'Seamless, natural shade-matched fillings that bond directly to your enamel. Fixes cavities, chips, and worn edges with zero noticeable lines.',
    img: CLINIC_PHOTOS.consultation,
    category: 'Cosmetic & Repair'
  },
  {
    id: 'whitening',
    title: 'In-Clinic Enamel-Safe Teeth Whitening',
    price: 'from ₹3,500',
    time: '45 Mins · Instant Results',
    location: 'Studio 204, Waterfield Rd',
    desc: 'Clinical pH-neutral whitening removes stubborn tea, coffee, and food stains safely. Includes protective gum barrier and desensitizing treatment.',
    img: CLINIC_PHOTOS.smilingPatient,
    category: 'Aesthetic'
  },
  {
    id: 'cleaning',
    title: 'Ultrasonic Teeth Cleaning & Polishing',
    price: 'from ₹800',
    time: '30 Mins · Routine Care',
    location: 'Studio 204, Waterfield Rd',
    desc: 'Gentle piezoelectric ultrasonic vibration removes hardened tartar, plaque, and surface discoloration. Restores fresh breath and healthy gums.',
    img: CLINIC_PHOTOS.tools,
    category: 'Preventative'
  },
  {
    id: 'implants',
    title: 'Single-Tooth Dental Implants',
    price: 'from ₹25,000',
    time: '45 Mins Consultation & Scan',
    location: 'Studio 204, Waterfield Rd',
    desc: 'Permanent titanium tooth replacement that looks, feels, and functions like a natural tooth. Avoids grinding down neighboring healthy teeth.',
    img: CLINIC_PHOTOS.interiorWide,
    category: 'Implantology'
  }
];

const FAQS_LIST = [
  {
    q: 'Is root canal treatment really pain-free at your clinic?',
    a: 'Yes, 100%. We use computer-controlled anesthesia (Milestone STA system) that delivers numbing medication slowly below the pain threshold. We thoroughly test the tooth to verify complete numbness before starting. If you feel any sensation, we pause instantly.'
  },
  {
    q: 'How does the initial consultation work?',
    a: 'Your consultation includes an unhurried 30-minute examination with Dr. Satyam Sharma (MDS), a high-definition 3Shape 3D intraoral digital camera tour on screen, and an itemized written quote before any procedure is scheduled.'
  },
  {
    q: 'What if I have severe dental anxiety or past dental trauma?',
    a: 'Most of our patients carry some degree of apprehension. We never rush. We explain every instrument before using it, check in with you continuously, and follow an agreed hand-signal rule: raise your left hand anytime and Dr. Sharma stops immediately.'
  },
  {
    q: 'Do you offer monthly payment (0% EMI) options?',
    a: 'Yes. For treatments like clear aligners, ceramic braces, and dental implants, we provide 0% interest monthly installment plans across 3 to 12 months with leading Indian banks.'
  },
  {
    q: 'Where on Waterfield Road is the clinic located, and is parking available?',
    a: 'We are located at Studio 204, 2nd Floor, Sagar Fortune Building on Waterfield Road, Bandra West (near National College junction, opposite Mini Punjab). Dedicated visitor parking is available inside the building compound.'
  },
  {
    q: 'Do you accept walk-ins for dental emergencies?',
    a: 'Yes. We maintain dedicated same-day emergency slots every day for severe toothaches, broken teeth, or sudden trauma. Call +91 98201 44521 or message on WhatsApp for priority triage.'
  }
];

export default function HomePage() {
  const [selectedService, setSelectedService] = useState<string>('General Consultation & 3D Scan');
  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('Morning (10:00 AM – 1:30 PM)');
  const [isAnxious, setIsAnxious] = useState<boolean>(false);
  const [patientNotes, setPatientNotes] = useState<string>('');
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string }>({});
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const cleanPhone = patientPhone.replace(/\D/g, '');

  const validateBooking = () => {
    const errors: { name?: string; phone?: string } = {};
    if (!patientName.trim() || patientName.trim().length < 2) {
      errors.name = 'Please enter your full name (letters only).';
    }
    if (!cleanPhone || cleanPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      errors.phone = 'Please enter a valid 10-digit mobile number.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSelectTreatment = (treatmentTitle: string) => {
    setSelectedService(treatmentTitle);
    const bookingSection = document.getElementById('book-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const dispatchWhatsAppUrl = useMemo(() => {
    const text = 
      `*AURA DENTAL STUDIO — APPOINTMENT REQUEST*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `• *Patient Name:* ${patientName.trim() || 'Not specified'}\n` +
      `• *Mobile:* +91 ${cleanPhone || 'Not specified'}\n` +
      `• *Treatment:* ${selectedService}\n` +
      `• *Preferred Day:* ${selectedDate}\n` +
      `• *Preferred Time:* ${selectedTimeSlot}\n` +
      `• *Dental Anxiety Note:* ${isAnxious ? 'Yes, please allow calm buffer' : 'Standard'}\n` +
      `• *Notes:* ${patientNotes.trim() || 'None'}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Hello Dr. Sharma, I would like to book a consultation at Aura Dental Studio Bandra West.`;

    return `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(text)}`;
  }, [patientName, cleanPhone, selectedService, selectedDate, selectedTimeSlot, isAnxious, patientNotes]);

  const dispatchMailtoUrl = useMemo(() => {
    const subject = `Dental Appointment Request: ${patientName.trim() || 'New Patient'} - ${selectedService}`;
    const body = 
      `Hello Aura Dental Studio Team,\n\n` +
      `I would like to schedule an appointment with Dr. Satyam Sharma.\n\n` +
      `Patient Name: ${patientName.trim() || 'Not specified'}\n` +
      `Phone Number: +91 ${cleanPhone || 'Not specified'}\n` +
      `Email: ${patientEmail.trim() || 'Not provided'}\n` +
      `Selected Treatment: ${selectedService}\n` +
      `Preferred Day: ${selectedDate}\n` +
      `Preferred Time: ${selectedTimeSlot}\n` +
      `Dental Anxiety Care: ${isAnxious ? 'Yes (needs gentle buffer)' : 'Standard'}\n` +
      `Additional Notes: ${patientNotes.trim() || 'None'}\n\n` +
      `Thank you!\n${patientName.trim() || ''}`;

    return `mailto:${CLINIC.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [patientName, cleanPhone, patientEmail, selectedService, selectedDate, selectedTimeSlot, isAnxious, patientNotes]);

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
      
      <section className="relative py-16 sm:py-24 bg-gradient-to-br from-teal-50 via-slate-50 to-emerald-50/50 border-b border-slate-200">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-white border border-teal-200 text-teal-800 shadow-xs">
              <Sparkles size={14} className="text-teal-600" />
              <span>Dr. Satyam Sharma, MDS · Waterfield Road, Bandra West</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
              Gentle, Honest Dental Care for Your Family
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              We take the time to listen, explain every finding with chairside 3D optical scans, and ensure your treatment is completely comfortable and pain-free.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <a
                href="#book-section"
                className="btn-primary"
              >
                <Calendar size={17} />
                <span>Book Appointment</span>
              </a>

              <a
                href={waGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <MessageCircle size={17} className="text-teal-700" />
                <span>WhatsApp Dr. Sharma</span>
              </a>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs text-slate-600 border-t border-slate-200/80">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 size={16} className="text-teal-600" />
                <span>Maharashtra Dental Council MSDC-42891</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 size={16} className="text-teal-600" />
                <span>Computerized Pain-Free Numbing</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 size={16} className="text-teal-600" />
                <span>100% Upfront Written Pricing</span>
              </span>
            </div>

          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                <Award size={24} />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900 leading-none">12+ Years</div>
                <div className="text-xs text-slate-500 mt-1">Clinical Practice in Bandra</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                <Heart size={24} />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900 leading-none">5,000+</div>
                <div className="text-xs text-slate-500 mt-1">Happy Smiles Restored</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                <Star size={24} className="fill-teal-700 text-teal-700" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900 leading-none">4.9 ★</div>
                <div className="text-xs text-slate-500 mt-1">Google Patient Reviews</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900 leading-none">100%</div>
                <div className="text-xs text-slate-500 mt-1">Pain-Free STA Anesthesia</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          
          <div className="max-w-2xl mx-auto text-center mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Our Dental Treatments
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Popular Treatments & Honest Pricing
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Every procedure is explained clearly before we begin. Click any treatment below to book a consultation with Dr. Satyam Sharma.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_LIST.map((service) => (
              <div
                key={service.id}
                className="service-card"
              >
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3.5 right-3.5 bg-teal-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md">
                    {service.price}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-100">
                      {service.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 leading-snug">
                      {service.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <MapPin size={14} className="text-teal-600" />
                      <span>{service.location}</span>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => handleSelectTreatment(service.title)}
                      className="text-sm font-bold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1 transition-all"
                    >
                      <span>Book Treatment</span>
                      <ArrowRight size={15} />
                    </button>

                    <a
                      href={`https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(`Hello Dr. Sharma, I want to inquire about ${service.title} at Aura Dental Studio.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
                    >
                      <MessageCircle size={14} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800 underline"
            >
              <span>View all 8 services and detailed procedural steps</span>
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          
          <div className="max-w-2xl mx-auto text-center mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Why Patients Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Dentistry Designed Around Your Comfort
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              No hurried visits, no pressure, and no hidden charges. Just thoughtful, high-quality care.
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
              <h3 className="text-lg font-bold text-slate-900">100% Upfront Written Quotes</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                You receive a printed, itemized estimate with material choices and exact costs before any treatment begins. Never any surprise clinic fees.
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

      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white p-2">
                <img
                  src={CLINIC_PHOTOS.hero}
                  alt="Aura Dental Studio operatory and clinical suite Bandra West"
                  className="w-full aspect-[4/3] object-cover rounded-xl"
                  loading="lazy"
                />
                <div className="p-4 bg-white rounded-lg mt-2 border border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>Operatory Suite 01 · Bandra West</span>
                  <span className="text-teal-700 font-mono">MSDC-42891</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block">
                  Lead Clinician & Founder
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                  Dr. Satyam Sharma, MDS
                </h2>
                <div className="text-sm font-semibold text-slate-600">
                  BDS (Nair Hospital Dental College) · MDS Orthodontics (Govt Dental College Mumbai)
                </div>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                <p>
                  Dr. Satyam Sharma has practiced orthodontics and family dentistry in Bandra West for over 12 years. Having trained in Mumbai's highest-volume government hospitals, he founded Aura Dental Studio to give patients a calm, unhurried alternative to commercial clinic chains.
                </p>
                <p>
                  His clinical philosophy centers on conservative preservation: saving natural enamel, using microscopic magnification, and making sure patients are fully informed and comfortable at every stage.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-medium text-slate-700">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="block text-teal-700 font-bold mb-1">Undergraduate</span>
                  <span>BDS — Nair Hospital Dental College, Mumbai</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="block text-teal-700 font-bold mb-1">Postgraduate</span>
                  <span>MDS Orthodontics — Govt Dental College Mumbai</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="block text-teal-700 font-bold mb-1">Council Reg.</span>
                  <span>Maharashtra Dental Council (MSDC-42891)</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={waGeneralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-xs h-10 px-4"
                >
                  <MessageCircle size={15} />
                  <span>Chat with Dr. Sharma</span>
                </a>

                <Link
                  to="/about"
                  className="btn-secondary text-xs h-10 px-4"
                >
                  <span>Learn more about our practice</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      <section className="py-12 bg-amber-500/10 border-b border-amber-500/20">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                <AlertCircle size={16} className="text-amber-600" />
                <span>Dental Emergency Desk · Same-Day Walk-ins</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Severe Toothache, Broken Tooth, or Dental Emergency?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                We hold emergency triage slots daily. Don't endure pain through the night — contact our direct emergency desk for priority relief.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={`tel:${CLINIC.phone}`}
                className="btn-primary bg-amber-600 hover:bg-amber-700 border-amber-600 text-xs h-11 px-5"
              >
                <Phone size={15} />
                <span>Call Emergency: {CLINIC.phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent('EMERGENCY: Hello Dr. Sharma, I have severe tooth pain and need an urgent appointment today.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-xs h-11 px-5"
              >
                <MessageCircle size={15} />
                <span>Emergency WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="book-section" className="py-16 sm:py-24 bg-white border-b border-slate-200 scroll-mt-14">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          
          <div className="max-w-2xl mx-auto text-center mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Easy Appointment Booking
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Book Your Visit with Dr. Sharma
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Fill in your details below. Your request will be sent directly to Dr. Sharma's clinic desk via WhatsApp or Email.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
            
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                1. Select Treatment / Service
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
              >
                <option value="General Consultation & 3D Scan">General Consultation & 3D Scan</option>
                <option value="Root Canal Treatment (Pain-Free)">Root Canal Treatment (Pain-Free)</option>
                <option value="Clear Aligners & Invisible Braces">Clear Aligners & Invisible Braces</option>
                <option value="Tooth-Coloured Composite Fillings">Tooth-Coloured Composite Fillings</option>
                <option value="In-Clinic Enamel-Safe Teeth Whitening">In-Clinic Enamel-Safe Teeth Whitening</option>
                <option value="Ultrasonic Teeth Cleaning & Polishing">Ultrasonic Teeth Cleaning & Polishing</option>
                <option value="Single-Tooth Dental Implants">Single-Tooth Dental Implants</option>
                <option value="Emergency Toothache Relief">Emergency Toothache Relief</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  2. Preferred Day
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
                >
                  <option value="Today (Same-Day Emergency)">Today (Emergency Availability)</option>
                  <option value="Tomorrow">Tomorrow</option>
                  <option value="Within Next 48 Hours">Within Next 48 Hours</option>
                  <option value="This Saturday">This Saturday</option>
                  <option value="Next Week">Next Week</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Time Window
                </label>
                <select
                  value={selectedTimeSlot}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
                >
                  <option value="Morning (10:00 AM – 1:30 PM)">Morning (10:00 AM – 1:30 PM)</option>
                  <option value="Evening (4:30 PM – 7:30 PM)">Evening (4:30 PM – 7:30 PM)</option>
                  <option value="Flexible / Any Available Slot">Flexible / Any Available Slot</option>
                </select>
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

            <div className="p-3.5 bg-white rounded-xl border border-slate-200">
              <label className="flex items-start gap-3 cursor-pointer text-xs sm:text-sm text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={isAnxious}
                  onChange={(e) => setIsAnxious(e.target.checked)}
                  className="mt-1 rounded text-teal-600 focus:ring-teal-600 w-4 h-4"
                />
                <div>
                  <span className="font-bold text-slate-900 block">
                    I feel nervous / anxious about dental visits
                  </span>
                  <span className="text-xs text-slate-500 block mt-0.5 leading-relaxed">
                    We will set aside an extra 15-minute acclimatization window so Dr. Sharma can demonstrate instruments and confirm complete comfort beforehand.
                  </span>
                </div>
              </label>
            </div>

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
                <span>Book via WhatsApp (+91 98201 44521)</span>
              </a>

              <a
                href={dispatchMailtoUrl}
                onClick={handleEmailClick}
                className="btn-secondary w-full sm:flex-1 h-12 text-sm"
              >
                <Mail size={18} />
                <span>Send via Email</span>
              </a>
            </div>

            <p className="text-xs text-slate-500 text-center font-medium">
              We respond promptly within clinical hours. You can also call us directly at <strong>{CLINIC.phoneDisplay}</strong>.
            </p>

          </div>

        </div>
      </section>

      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          
          <div className="max-w-2xl mx-auto text-center mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Patient Experiences
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Trusted by Families Across Bandra
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Read real feedback from patients who have visited Aura Dental Studio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 italic leading-relaxed">
                    "{review.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{review.patient}</span>
                    <span className="text-slate-500">{review.location}</span>
                  </div>
                  <span className="px-2.5 py-1 bg-teal-50 text-teal-800 rounded-md font-semibold border border-teal-100">
                    {review.treatment}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          
          <div className="max-w-2xl mx-auto text-center mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Questions & Answers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Clear, transparent answers to questions we receive every day.
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
              href="#book-section"
              className="btn-primary bg-white text-teal-900 hover:bg-teal-50 border-white shadow-md text-sm h-12 px-6"
            >
              <Calendar size={17} />
              <span>Book Appointment</span>
            </a>

            <a
              href={waGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp h-12 px-6 text-sm"
            >
              <MessageCircle size={17} />
              <span>WhatsApp Dr. Sharma</span>
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
