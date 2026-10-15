import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  MessageCircle, 
  Phone, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  ChevronDown,
  ShieldCheck,
  Sparkles,
  FileText
} from 'lucide-react';
import { CLINIC, CLINIC_PHOTOS, REVIEWS } from '@/data/clinicInfo';
import { TREATMENTS } from '@/data/services';

const FAQS = [
  {
    q: 'Is root canal treatment painful?',
    a: 'No. We use computerized local anesthesia and topical numbing gels. The tooth is completely anesthetized before any work starts. Treatment is done to relieve pain, not cause it.',
  },
  {
    q: 'How much does the first consultation cost and what is included?',
    a: 'The consultation fee is ₹500. This includes a comprehensive examination by Dr. Satyam Sharma, an intraoral digital camera review, and a written itemized treatment plan with transparent costs.',
  },
  {
    q: 'How do clear aligners compare to metal braces?',
    a: 'Clear aligners are custom-molded transparent trays that gently shift your teeth into proper alignment without metal brackets or wires. They are removable for eating and brushing, making oral hygiene simple and comfortable.',
  },
  {
    q: 'Do you offer monthly payment options (EMI)?',
    a: 'Yes. For treatments like clear aligners, dental implants, and smile makeovers, we provide 0% interest monthly installment plans across 3 to 12 months with leading banks.',
  },
  {
    q: 'What if I feel anxious about dental appointments?',
    a: 'Dental apprehension is very common. We never rush. We explain every step before touching your teeth, agree on a hand signal so you can pause anytime, and prioritize your comfort throughout.',
  },
  {
    q: 'Where is the clinic located and is parking available?',
    a: 'We are located at Studio 204, Sagar Fortune Building on Waterfield Road, Bandra West (near National College junction, 800m from Bandra Station West). Building visitor parking is available.',
  },
];

const CLINICAL_PILLARS = [
  {
    title: 'Computerized Painless Anesthesia',
    desc: 'Gentle local numbing delivered slowly with computer-assisted flow. Zero stinging sensation.',
  },
  {
    title: '3D Intraoral Optical Scanning',
    desc: 'High-definition digital scans replace messy impression goop. View your tooth structure chairside.',
  },
  {
    title: 'Hospital-Grade Sterilization',
    desc: 'Class-B fractional vacuum autoclave. Individual sealed barrier pouches opened in front of you.',
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const waGeneralUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent('Hello Dr. Sharma, I would like to schedule a dental consultation at Aura Dental Studio.')}`;
  const waEmergencyUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent('EMERGENCY: Hello, I have an urgent dental problem/pain and need a same-day appointment.')}`;

  return (
    <div className="bg-surface text-slate">
      
      <section className="py-12 md:py-20 bg-surface-subtle border-b border-border">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold">
                <MapPin size={13} />
                <span>Bandra West, Mumbai · Waterfield Road</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate leading-[1.15] tracking-tight">
                A calmer, honest approach to dental care in Bandra West.
              </h1>

              <p className="text-base sm:text-lg text-slate-secondary leading-relaxed max-w-xl">
                Dr. Satyam Sharma (MDS) provides pain-free dental checkups, clear aligners, and family dentistry in an unhurried, comfortable clinical setting. Every fee is explained upfront before any work starts.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/book"
                  className="btn-primary"
                >
                  <Calendar size={17} />
                  <span>Book Appointment</span>
                </Link>

                <a
                  href={waGeneralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <MessageCircle size={17} />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href={`tel:${CLINIC.phone}`}
                  className="btn-secondary"
                >
                  <Phone size={15} className="text-brand-600" />
                  <span>{CLINIC.phoneDisplay}</span>
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-slate-secondary font-medium">
                  <CheckCircle2 size={15} className="text-brand-600 shrink-0" />
                  <span>Painless Anesthesia</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-secondary font-medium">
                  <CheckCircle2 size={15} className="text-brand-600 shrink-0" />
                  <span>Transparent Pricing</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-secondary font-medium">
                  <CheckCircle2 size={15} className="text-brand-600 shrink-0" />
                  <span>Class-B Sterilization</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-md border border-border bg-white">
                <img
                  src={CLINIC_PHOTOS.operatory}
                  alt="Modern Dental Operatory Suite at Aura Dental Studio Bandra West"
                  className="w-full aspect-[4/3] object-cover"
                  loading="eager"
                />
                <div className="p-4 bg-white border-t border-border space-y-1">
                  <div className="font-bold text-sm text-slate">Operatory Suite 204 · Waterfield Road</div>
                  <div className="text-xs text-slate-muted">Digital 3D Intraoral Scanning & Painless Dental Suite</div>
                  <div className="text-xs font-semibold text-brand-700 pt-0.5">Dr. Satyam Sharma, BDS, MDS · MSDC-42891</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="bg-brand-50 border-b border-brand-200 py-3.5 px-4 sm:px-8">
        <div className="max-w-container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-brand-900 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span><strong>Toothache or broken filling?</strong> Emergency appointments reserved daily for immediate relief.</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={waEmergencyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-1"
            >
              <MessageCircle size={14} />
              <span>WhatsApp Emergency</span>
            </a>
            <span className="text-brand-300">·</span>
            <a
              href={`tel:${CLINIC.phone}`}
              className="text-brand-700 font-bold hover:underline"
            >
              Call Desk
            </a>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-surface">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block mb-1">
                Clinical Treatments
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate">
                How we can help you smile comfortably.
              </h2>
              <p className="text-sm sm:text-base text-slate-secondary mt-1 max-w-xl">
                Clear descriptions, appointment durations, and transparent fees before any treatment starts.
              </p>
            </div>

            <Link
              to="/treatments"
              className="btn-secondary text-xs h-10 px-4 self-start sm:self-auto"
            >
              <span>View All Treatments</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TREATMENTS.map((treatment) => {
              const waTreatmentUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(`Hi Dr. Sharma, I want to inquire about booking ${treatment.name} at Aura Dental Studio.`)}`;
              return (
                <div
                  key={treatment.id}
                  className="bg-white rounded-xl border border-border p-6 flex flex-col justify-between hover:border-brand-300 hover:shadow-sm transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700">
                        {treatment.category}
                      </span>
                      <span className="text-xs text-slate-muted font-medium flex items-center gap-1">
                        <Clock size={12} />
                        <span>{treatment.durationLabel}</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate">
                      <Link to={`/treatments/${treatment.slug}`} className="hover:text-brand-600 transition-colors">
                        {treatment.name}
                      </Link>
                    </h3>

                    <p className="text-sm text-slate-secondary leading-relaxed">
                      {treatment.shortDescription}
                    </p>

                    <div className="pt-2 text-xs text-slate-muted">
                      {treatment.benefit}
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-border flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-muted block font-medium">Starting Fee</span>
                      <span className="text-base font-bold text-slate num-tabular">{treatment.priceFormatted}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={waTreatmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#1EBE5D] font-bold p-2 hover:bg-[#25D366]/10 rounded-lg transition-colors"
                        title="Book via WhatsApp"
                      >
                        <MessageCircle size={16} />
                      </a>
                      <Link
                        to={`/book?service=${treatment.slug}`}
                        className="btn-primary text-xs h-8 px-3"
                      >
                        <span>Book</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-surface-subtle border-y border-border">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-white border border-border shadow-xs space-y-4">
                <div className="space-y-1 pb-3 border-b border-border">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block">
                    Clinical Director Dossier
                  </span>
                  <h3 className="font-extrabold text-xl text-slate">
                    Dr. Satyam Sharma
                  </h3>
                  <p className="text-xs font-semibold text-brand-700">
                    BDS (Nair), MDS Orthodontics (GDC Mumbai)
                  </p>
                </div>

                <div className="space-y-2 text-xs text-slate-secondary">
                  <div className="flex justify-between py-1 border-b border-border/60">
                    <span className="text-slate-muted">Council Reg.</span>
                    <span className="font-mono font-bold text-slate">MSDC-42891</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/60">
                    <span className="text-slate-muted">Undergraduate</span>
                    <span className="text-slate font-medium text-right">Nair Hospital Dental College</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/60">
                    <span className="text-slate-muted">Residency</span>
                    <span className="text-slate font-medium text-right">Govt Dental College Mumbai</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/60">
                    <span className="text-slate-muted">Bandra Practice</span>
                    <span className="text-slate font-bold">12 Years</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-muted">Specialty</span>
                    <span className="text-brand-700 font-bold">Orthodontics & Aligners</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={waGeneralUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full text-xs h-10"
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp Dr. Sharma's Desk</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block mb-1">
                  Our Philosophy
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate">
                  Dentistry shouldn't be stressful or rushed.
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-secondary leading-relaxed">
                <p>
                  Dr. Satyam Sharma has cared for patients in Bandra West for over 12 years. His clinical philosophy centers on biological tooth conservation: preserving natural tooth enamel, explaining every diagnosis chairside with high-definition digital scans, and never rushing appointments.
                </p>
                <p>
                  Every patient receives a written, itemized treatment estimate before any work begins. There are no surprise laboratory surcharges or unexpected add-ons.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-border text-sm text-slate italic leading-relaxed">
                "{CLINIC.doctor.philosophy}"
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs">
                <div className="p-3 rounded-lg bg-white border border-border">
                  <div className="text-slate-muted font-medium">Appointment Slots</div>
                  <div className="font-bold text-slate text-sm mt-0.5">30–45 Mins Unhurried</div>
                </div>
                <div className="p-3 rounded-lg bg-white border border-border">
                  <div className="text-slate-muted font-medium">Digital Scans</div>
                  <div className="font-bold text-slate text-sm mt-0.5">Optical 3D Camera</div>
                </div>
                <div className="p-3 rounded-lg bg-white border border-border col-span-2 sm:col-span-1">
                  <div className="text-slate-muted font-medium">Languages</div>
                  <div className="font-bold text-slate text-sm mt-0.5">EN, HI, MR, GU</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link to="/doctor" className="btn-secondary text-xs h-10 px-4">
                  <span>View Full Credentials</span>
                  <ArrowRight size={14} />
                </Link>
                <Link to="/book" className="btn-primary text-xs h-10 px-4">
                  <span>Schedule Consultation</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-surface">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block mb-1">
              Clinical Quality Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate">
              How we ensure patient safety & comfort.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLINICAL_PILLARS.map((pillar, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-surface-subtle border border-border space-y-2">
                <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-700 font-bold flex items-center justify-center text-sm mb-3">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-base text-slate">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-slate-secondary leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-surface-subtle border-t border-border">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block mb-1">
              Transparent Fees
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate">
              Honest prices with no hidden surprises.
            </h2>
            <p className="text-sm sm:text-base text-slate-secondary mt-1">
              We believe patients deserve to know treatment costs before sitting in the chair.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-border overflow-hidden shadow-xs mb-6">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-surface-subtle border-b border-border text-slate-muted font-semibold">
                  <th className="py-3.5 px-4 sm:px-6">Treatment</th>
                  <th className="py-3.5 px-4 sm:px-6">Duration</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Starting Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border num-tabular">
                <tr className="bg-brand-50/40">
                  <td className="py-4 px-4 sm:px-6 font-bold text-brand-800">
                    Comprehensive Checkup & Digital Scan
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-slate-secondary font-medium">30 mins</td>
                  <td className="py-4 px-4 sm:px-6 text-right font-bold text-brand-700">₹500</td>
                </tr>
                {TREATMENTS.map((t) => (
                  <tr key={t.id} className="hover:bg-surface-subtle transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-medium text-slate">
                      <Link to={`/treatments/${t.slug}`} className="hover:text-brand-600">
                        {t.name}
                      </Link>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-secondary">{t.durationLabel}</td>
                    <td className="py-4 px-4 sm:px-6 text-right font-bold text-slate">{t.priceFormatted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-slate-secondary">
            <span>Payment modes accepted: UPI (GPay, PhonePe), Credit/Debit Cards, Cash, and 0% interest EMI options.</span>
            <Link to="/pricing" className="text-brand-600 font-bold hover:underline shrink-0">
              View full financial terms →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-surface border-t border-border">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block mb-1">
              Patient Experiences
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate">
              What our patients say.
            </h2>
            <p className="text-sm sm:text-base text-slate-secondary mt-1">
              Real feedback from local patients who visit us from Bandra, Khar, and BKC.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.slice(0, 3).map((review) => (
              <div 
                key={review.id}
                className="p-6 rounded-xl bg-surface-subtle border border-border flex flex-col justify-between space-y-4"
              >
                <p className="text-sm text-slate leading-relaxed">
                  "{review.quote}"
                </p>

                <div className="pt-3 border-t border-border">
                  <div className="font-bold text-sm text-slate">{review.patient}</div>
                  <div className="text-xs text-slate-muted">{review.location} · <span className="text-brand-700 font-medium">{review.treatment}</span></div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 text-center sm:text-left">
            <Link to="/reviews" className="btn-secondary text-xs h-10 px-4">
              <span>Read More Patient Feedback</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-surface-subtle border-t border-border">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            <div className="lg:col-span-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block mb-1">
                Help & Answers
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate mb-3">
                Frequently asked questions.
              </h2>
              <p className="text-sm text-slate-secondary leading-relaxed">
                Have a question before booking? We have answered the most common concerns here.
              </p>
              <div className="pt-4">
                <a
                  href={waGeneralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-xs h-10 px-4"
                >
                  <MessageCircle size={15} />
                  <span>Ask us on WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div 
                    key={idx}
                    className="border border-border rounded-xl bg-white overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate hover:text-brand-600 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={18}
                        className={`text-slate-muted shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-brand-600' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-secondary leading-relaxed border-t border-border bg-white">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-brand-600 text-white">
        <div className="max-w-container mx-auto px-4 sm:px-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Ready for a comfortable, stress-free dental visit?
              </h2>
              <p className="text-sm sm:text-base text-brand-100">
                Book online in 30 seconds or chat with our desk on WhatsApp. We look forward to welcoming you at Studio 204, Bandra West.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 shrink-0">
              <Link
                to="/book"
                className="h-11 px-6 rounded-lg bg-white text-brand-700 hover:bg-brand-50 font-bold text-sm shadow-sm transition-all inline-flex items-center gap-2"
              >
                <Calendar size={16} />
                <span>Book Appointment</span>
              </Link>
              <a
                href={waGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 px-5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm shadow-sm transition-all inline-flex items-center gap-2"
              >
                <MessageCircle size={16} />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
