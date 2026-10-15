import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  MessageCircle, 
  Phone, 
  Clock, 
  MapPin, 
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { CLINIC, CLINIC_PHOTOS, REVIEWS } from '@/data/clinicInfo';
import { TREATMENTS } from '@/data/services';

const FAQS = [
  {
    q: 'Is root canal treatment really painless at your studio?',
    a: 'Yes. We use computer-controlled local anesthesia that delivers numbing anesthetic slowly and gently, eliminating the initial stinging pressure. We test the tooth thoroughly to confirm complete numbness before touching it. If you ever feel sensation, we pause immediately.',
  },
  {
    q: 'How much does the initial consultation cost and what is included?',
    a: 'The consultation fee is ₹500. This includes an unhurried 30-minute clinical examination with Dr. Satyam Sharma, chairside intraoral digital camera review, and an itemized written treatment plan with transparent costs before any procedure is scheduled.',
  },
  {
    q: 'How do clear aligners compare to traditional ceramic braces?',
    a: 'Clear aligners are custom-molded medical polymer trays that guide teeth into position without metal brackets or wires. Because they are removable for meals and brushing, oral hygiene is simpler. Ceramic braces remain fixed to the teeth and are ideal for certain complex skeletal bite corrections.',
  },
  {
    q: 'Do you offer monthly payment options (0% EMI)?',
    a: 'Yes. For treatments like clear aligners, dental implants, and smile restorations, we offer 0% interest monthly installment plans across 3 to 12 months with leading Indian banks.',
  },
  {
    q: 'What if I suffer from severe dental anxiety or past dental trauma?',
    a: 'Most of our adult patients carry some degree of apprehension from past experiences. We never rush. We explain every instrument before using it, establish a simple hand-signal to pause at any second, and ensure you remain fully in control of your visit.',
  },
  {
    q: 'Where on Waterfield Road is the clinic and what about parking?',
    a: 'We are located at Studio 204, 2nd Floor, Sagar Fortune Building on Waterfield Road, Bandra West (near National College junction, 800 metres from Bandra Railway Station West). Building visitor parking is available on arrival.',
  },
];

const CLINICAL_STANDARDS = [
  {
    num: '01',
    title: 'Conservative Preservation',
    desc: 'We never recommend crowns or aggressive preparation when a tooth can be conserved with precision composite bonding and preventative care.',
  },
  {
    num: '02',
    title: 'Computerized Pain-Free Numbing',
    desc: 'Local anesthesia is delivered with computer-assisted slow flow to eliminate stinging pressure. Complete numbness is verified before touching your tooth.',
  },
  {
    num: '03',
    title: 'Chairside 3D Optical Staging',
    desc: 'High-definition digital scanning replaces gag-inducing impression trays. You inspect your tooth structure and bite mechanics on screen beside Dr. Sharma.',
  },
  {
    num: '04',
    title: 'Upfront Itemized Fee Schedules',
    desc: 'You receive a printed, itemized cost estimate with all clinical steps before any treatment begins. No surprise clinic overheads or unapproved additions.',
  },
];

const PATIENT_STEPS = [
  {
    step: '1',
    title: 'Arrival & Unhurried Consultation',
    desc: 'No crowded waiting rooms or 5-minute doctor rushed visits. Dr. Sharma sits with you to understand your dental history, aesthetic goals, or specific tooth concerns.',
  },
  {
    step: '2',
    title: 'Digital Diagnostics & Screen Review',
    desc: 'We take high-definition intraoral optical scans. You look at your teeth together with Dr. Sharma on the chairside monitor as he explains the anatomy.',
  },
  {
    step: '3',
    title: 'Transparent Treatment Roadmap',
    desc: 'You receive an itemized written quote detailing procedure durations, alternative options, and exact fees. Zero pressure to decide on the spot.',
  },
  {
    step: '4',
    title: 'Treatment at Your Own Pace',
    desc: 'Gentle, pain-free clinical delivery with continuous comfort check-ins. An agreed hand-signal lets you pause the procedure anytime you wish.',
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const waGeneralUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(
    'Hello Dr. Sharma, I would like to schedule a dental consultation at Aura Dental Studio Bandra West.'
  )}`;
  const waEmergencyUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(
    'EMERGENCY: Hello, I have an urgent dental problem or tooth pain and need a same-day appointment.'
  )}`;

  return (
    <div className="bg-canvas text-ink">
      
      <section className="py-12 sm:py-20 lg:py-24 border-b border-hairline">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            <div className="lg:col-span-7 space-y-7 text-left font-sans">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-border text-ink-muted text-xs font-mono tracking-wide rounded-xs">
                <MapPin size={12} className="text-sand-700" />
                <span>Waterfield Road, Bandra West · Opposite Mini Punjab</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-normal leading-[1.12] text-ink tracking-tight">
                A calm, conservative approach to dental care in Bandra West.
              </h1>

              <p className="text-base sm:text-lg text-ink-secondary leading-relaxed max-w-xl">
                Dr. Satyam Sharma (MDS Orthodontics) provides unhurried checkups, clear aligners, pain-free root canals, and family dentistry. Every treatment is explained with chairside 3D optical scans before any work begins.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/book"
                  className="btn-primary"
                >
                  <Calendar size={16} />
                  <span>Book Appointment</span>
                </Link>

                <a
                  href={waGeneralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Dr. Sharma</span>
                </a>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-ink-muted border-t border-hairline/80">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-sage-700" />
                  <span>Maharashtra State Dental Council (MSDC-42891)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-sage-700" />
                  <span>Mon–Sat: 9:30 AM – 7:30 PM</span>
                </span>
                <a href={`tel:${CLINIC.phone}`} className="hover:text-ink font-medium">
                  Direct Line: {CLINIC.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 font-sans">
              <div className="p-3 bg-white border border-hairline rounded-sm shadow-xs space-y-3">
                <div className="relative aspect-[4/3] rounded-xs overflow-hidden bg-canvas-subtle">
                  <img
                    src={CLINIC_PHOTOS.operatory}
                    alt="Digital dental operatory suite at Aura Dental Studio Bandra West"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute top-3 left-3 bg-ink/80 text-white text-[10px] font-mono uppercase px-2.5 py-1 rounded-xs">
                    Suite 01 · Diagnostic Operatory
                  </div>
                </div>

                <div className="p-3 bg-canvas-subtle rounded-xs border border-border/60 text-xs text-ink-secondary leading-relaxed space-y-1.5">
                  <div className="flex items-center justify-between text-ink font-medium">
                    <span>Clinical Director</span>
                    <span className="font-mono text-xs text-ink-muted">BDS, MDS Orthodontics</span>
                  </div>
                  <p className="text-ink-muted text-[11px]">
                    Nair Hospital Dental College & Government Dental College Mumbai alumni. Over 12 years of restorative & orthodontic practice in Bandra West.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 border-b border-hairline bg-canvas-subtle">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.14em] text-sand-700 block mb-2">
              Practice Tenets
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-ink font-normal leading-tight">
              Clinical principles that guide every patient appointment.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
            {CLINICAL_STANDARDS.map((standard) => (
              <div
                key={standard.num}
                className="bg-white p-6 rounded-sm border border-hairline shadow-2xs space-y-3"
              >
                <span className="font-mono text-xs font-bold text-sage-700 block">
                  {standard.num}
                </span>
                <h3 className="font-serif text-lg font-medium text-ink leading-snug">
                  {standard.title}
                </h3>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  {standard.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="py-16 sm:py-24 border-b border-hairline">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-hairline font-sans">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.14em] text-sand-700 block mb-2">
                Our Services
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-ink font-normal">
                Care planned for long-term health and comfort.
              </h2>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-sage-800 hover:text-sage-900 transition-colors"
            >
              <span>View all services & fee guide</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-sans">
            
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-sage-900 text-white p-6 rounded-sm space-y-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-sand-300 block">
                  First Step
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-normal leading-snug text-white">
                  Comprehensive Diagnostic Checkup & 3D Scan
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  A thorough 30-minute clinical examination with intraoral optical camera review and a transparent, itemized written treatment plan.
                </p>
                <div className="pt-2 flex items-baseline justify-between border-t border-white/10">
                  <span className="text-xs text-white/70">Consultation Fee</span>
                  <span className="text-xl font-mono font-medium text-sand-300">₹500</span>
                </div>
                <Link
                  to="/book"
                  className="btn-primary w-full text-xs h-10 bg-sand-600 hover:bg-sand-700 text-white border-sand-600"
                >
                  <Calendar size={14} />
                  <span>Book Checkup (₹500)</span>
                </Link>
              </div>

              <div className="p-5 bg-canvas-subtle border border-hairline rounded-sm space-y-2">
                <h4 className="font-serif text-base font-medium text-ink">Have a quick dental question?</h4>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Send a photo or inquiry directly to Dr. Satyam Sharma on WhatsApp for initial guidance.
                </p>
                <a
                  href={waGeneralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full text-xs h-9 mt-2"
                >
                  <MessageCircle size={14} />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-3">
              {TREATMENTS.slice(0, 6).map((treatment) => {
                const treatmentWaUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(
                  `Hi Dr. Sharma, I want to inquire about ${treatment.name} at Aura Dental Studio.`
                )}`;

                return (
                  <div
                    key={treatment.id}
                    className="p-5 bg-white border border-hairline hover:border-border-strong transition-all rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-canvas-subtle text-ink-muted rounded-xs border border-border/60">
                          {treatment.category}
                        </span>
                        <span className="text-xs text-ink-muted">
                          {treatment.durationLabel || `${treatment.durationMins} mins`}
                        </span>
                      </div>
                      <h4 className="font-serif text-lg font-medium text-ink">
                        {treatment.name}
                      </h4>
                      <p className="text-xs text-ink-secondary max-w-lg">
                        {treatment.shortDescription}
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-hairline">
                      <div className="text-right">
                        <span className="text-[11px] text-ink-muted block">Starting fee</span>
                        <span className="font-mono text-sm font-semibold text-ink">
                          {treatment.priceFormatted}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={treatmentWaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-8 px-2.5 inline-flex items-center justify-center rounded-sm border border-border text-xs text-ink hover:bg-canvas-subtle transition-colors"
                          aria-label={`Ask about ${treatment.name} on WhatsApp`}
                        >
                          <MessageCircle size={13} className="text-[#1EBE5D]" />
                        </a>
                        <Link
                          to={`/services/${treatment.slug}`}
                          className="h-8 px-3.5 inline-flex items-center justify-center rounded-sm bg-sage-800 hover:bg-sage-900 text-white text-xs font-medium transition-colors"
                        >
                          <span>Details</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      <section className="py-16 sm:py-24 border-b border-hairline bg-canvas-subtle">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            <div className="lg:col-span-5 space-y-4 font-sans">
              <div className="p-3 bg-white border border-hairline rounded-sm space-y-3">
                <img
                  src={CLINIC_PHOTOS.interiorWide}
                  alt="Aura Dental Studio operatory and clinical facility, Bandra West"
                  className="w-full aspect-[4/3] object-cover rounded-xs"
                  loading="lazy"
                />
                <div className="p-3 bg-canvas-subtle rounded-xs border border-border/60 text-xs space-y-1">
                  <div className="font-mono text-ink font-medium">Maharashtra State Dental Council</div>
                  <div className="text-ink-muted text-[11px]">
                    Registration No: <span className="font-mono font-bold text-ink">MSDC-42891</span> · Dr. Satyam Sharma
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 text-left font-sans">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.14em] text-sand-700 block mb-2">
                  Clinical Director Dossier
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal leading-tight">
                  Dr. Satyam Sharma
                </h2>
                <div className="text-xs sm:text-sm text-ink-muted mt-1">
                  BDS (Nair Hospital Dental College) · MDS Orthodontics (Govt Dental College Mumbai)
                </div>
              </div>

              <div className="space-y-4 text-sm text-ink-secondary leading-relaxed">
                <p>
                  Dr. Satyam Sharma has practiced orthodontics, micro-endodontics, and conservative restorative dentistry in Bandra West for over 12 years. His clinical philosophy centers on listening carefully to patients, explaining anatomical findings clearly, and conserving natural tooth structure wherever possible.
                </p>
                <p>
                  Every consultation is scheduled with deliberate buffer time so you are never rushed through questions or pressured into treatment.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-white border border-hairline rounded-sm">
                  <span className="font-mono text-sand-700 block mb-0.5">Undergraduate Training</span>
                  <span className="font-medium text-ink">BDS — Nair Hospital Dental College</span>
                  <span className="text-ink-muted block text-[11px] mt-0.5">Mumbai University (2012)</span>
                </div>
                <div className="p-3 bg-white border border-hairline rounded-sm">
                  <span className="font-mono text-sand-700 block mb-0.5">Postgraduate Residency</span>
                  <span className="font-medium text-ink">MDS (Orthodontics) — Govt Dental College</span>
                  <span className="text-ink-muted block text-[11px] mt-0.5">GDC & Hospital, Mumbai (2016)</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to="/about"
                  className="btn-secondary text-xs h-10 px-4"
                >
                  <span>Read complete background & credentials</span>
                  <ArrowRight size={14} />
                </Link>

                <a
                  href={waGeneralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-xs h-10 px-4"
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp Dr. Sharma</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 border-b border-hairline">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.14em] text-sand-700 block mb-2">
              Patient Pathway
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-ink font-normal leading-tight">
              What to expect when you visit our studio.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
            {PATIENT_STEPS.map((item) => (
              <div
                key={item.step}
                className="p-6 bg-canvas-subtle border border-hairline rounded-sm space-y-3"
              >
                <div className="w-8 h-8 rounded-xs bg-sage-800 text-white font-mono text-xs flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <h3 className="font-serif text-lg font-medium text-ink">
                  {item.title}
                </h3>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="py-12 bg-amber-50/50 border-b border-amber-200/60 font-sans">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-900 font-mono text-xs font-bold uppercase tracking-wider">
                <AlertCircle size={15} className="text-amber-700" />
                <span>Dental Emergency Desk · Bandra West</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-ink font-medium">
                Severe toothache, broken restoration, or sudden dental trauma?
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary max-w-xl">
                We maintain dedicated daily emergency slots for immediate pain relief. Contact our emergency line for priority same-day scheduling.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={waEmergencyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-xs h-10 px-4"
              >
                <MessageCircle size={15} />
                <span>Emergency WhatsApp</span>
              </a>

              <a
                href={`tel:${CLINIC.phone}`}
                className="btn-secondary text-xs h-10 px-4"
              >
                <Phone size={15} />
                <span>Call: {CLINIC.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 border-b border-hairline bg-canvas-subtle">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 font-sans">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.14em] text-sand-700 block mb-2">
                Patient Experiences
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-ink font-normal">
                Notes from patients across Bandra West.
              </h2>
            </div>

            <Link
              to="/about"
              className="text-xs font-medium text-sage-800 hover:text-sage-900 flex items-center gap-1"
            >
              <span>Learn more about our practice</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            {REVIEWS.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="p-6 bg-white border border-hairline rounded-sm space-y-4 shadow-2xs flex flex-col justify-between"
              >
                <p className="font-serif text-sm sm:text-base text-ink-secondary italic leading-relaxed">
                  "{review.quote}"
                </p>

                <div className="pt-3 border-t border-hairline flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-ink block">{review.patient}</span>
                    <span className="text-[11px] text-ink-muted">{review.location}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-canvas-subtle text-sage-800 rounded-xs border border-border/60">
                    {review.treatment}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="py-16 sm:py-24 border-b border-hairline font-sans">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.14em] text-sand-700 block mb-2">
              Common Questions
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-ink font-normal">
              Clear answers before you visit.
            </h2>
          </div>

          <div className="max-w-3xl divide-y divide-hairline border-y border-hairline">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.q} className="py-5">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left gap-4 group"
                  >
                    <span className="font-serif text-base sm:text-lg font-medium text-ink group-hover:text-sage-800 transition-colors">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-ink-muted shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-sage-800' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="pt-3 pr-8 text-xs sm:text-sm text-ink-secondary leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white border-b border-hairline font-sans">
        <div className="max-w-container mx-auto px-4 sm:px-8 text-center space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.16em] text-sand-700 block">
            Aura Dental Studio · Bandra West
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-ink leading-tight max-w-2xl mx-auto">
            Experience unhurried, gentle dental care.
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary max-w-lg mx-auto leading-relaxed">
            Schedule your comprehensive checkup and 3D optical scan (₹500), or reach out on WhatsApp to speak with Dr. Satyam Sharma directly.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link
              to="/book"
              className="btn-primary h-11 px-6 shadow-xs"
            >
              <Calendar size={16} />
              <span>Book Appointment (₹500)</span>
            </Link>

            <a
              href={waGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp h-11 px-6 shadow-xs"
            >
              <MessageCircle size={16} />
              <span>WhatsApp Consultation</span>
            </a>
          </div>

          <div className="pt-6 text-xs text-ink-muted">
            Studio 204, Sagar Fortune Building, Waterfield Road, Bandra West, Mumbai · Telephone: {CLINIC.phoneDisplay}
          </div>
        </div>
      </section>

    </div>
  );
}
