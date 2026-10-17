import { Link } from 'react-router-dom';
import { CLINIC, CLINIC_PHOTOS, REVIEWS } from '@/data/clinicInfo';
import { Calendar, MessageCircle, Phone, Award, CheckCircle2, ShieldCheck, MapPin, Clock, Star } from 'lucide-react';
import PageHero from '@/components/PageHero';

const TIMELINE = [
  {
    year: '2012',
    degree: 'Bachelor of Dental Surgery (BDS)',
    institution: 'Nair Hospital Dental College, Mumbai University',
    desc: 'Intensive undergraduate clinical rotations in restorative dentistry, oral surgery, pediatric care, and periodontics.',
  },
  {
    year: '2016',
    degree: 'Master of Dental Surgery (MDS) in Orthodontics',
    institution: 'Government Dental College & Hospital (GDC), Mumbai',
    desc: 'Three-year post-graduate residency focusing on dentofacial orthopedics, surgical orthodontics, and complex biomechanics.',
  },
  {
    year: '2019',
    degree: 'Certified Clear Aligner Specialist',
    institution: 'Indian Orthodontic Society Accredited Program',
    desc: 'Advanced digital 3D optical staging, tooth vector sequencing, and non-extraction clear aligner therapy.',
  },
  {
    year: '2022',
    degree: 'Founder & Director, Aura Dental Studio',
    institution: 'Waterfield Road, Bandra West, Mumbai',
    desc: 'Established private practice focusing on unhurried, gentle, family-centered dental care with a 6-patient daily limit.',
  },
];

export default function AboutPage() {
  const waDoctorUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(
    'Hello Dr. Satyam Sharma, I would like to consult with you regarding dental care at Aura Dental Studio.'
  )}`;

  return (
    <div className="bg-slate-50 text-slate-800 font-sans">
      
      <PageHero
        eyebrow="Clinical Director & Practice Philosophy"
        title="About Dr. Satyam Sharma & Aura Dental Studio"
        description="Over 12 years of gentle, conservative dentistry on Waterfield Road, Bandra West. Dedicated to saving your natural teeth without the rush."
      />

      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-20">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md p-2">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={CLINIC_PHOTOS.operatory}
                    alt="Operatory Suite at Aura Dental Studio Bandra West"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute top-3 left-3 bg-teal-900/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-lg">
                    Operatory Suite 01 · Bandra West
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md inline-block mb-1.5 border border-teal-100">
                      Official Council Record
                    </span>
                    <div className="text-xl font-extrabold text-slate-900">{CLINIC.doctor.name}</div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">{CLINIC.doctor.credentials}</div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Registration</span>
                      <span className="font-mono font-bold text-teal-800">{CLINIC.doctor.registration}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Dental Council</span>
                      <span className="text-slate-800 font-medium">Maharashtra State Dental Council</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Clinical Experience</span>
                      <span className="text-slate-800 font-medium">12+ Years in Bandra West</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Studio Location</span>
                      <span className="text-slate-800 font-medium text-right">Studio 204, Waterfield Road</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={waDoctorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-teal-700 bg-transparent text-xs font-semibold text-teal-700 transition-colors hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
                    >
                      <MessageCircle size={16} />
                      <span>WhatsApp Dr. Sharma</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block">
                  Clinical Director Profile
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Trained in Mumbai's Premier Hospitals, Built for Gentle Private Care
                </h2>
                <p className="text-sm font-semibold text-slate-600">
                  BDS (Nair), MDS Orthodontics (GDC Mumbai) · Reg. No: MSDC-42891
                </p>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                <p>
                  Dr. Satyam Sharma has practiced orthodontics and restorative dentistry in Bandra West for over 12 years. He completed his undergraduate dental training at Nair Hospital Dental College, followed by a rigorous 3-year Master's residency in Orthodontics and Dentofacial Orthopedics at Government Dental College & Hospital (GDC), Mumbai.
                </p>
                <p>
                  Having managed thousands of complex trauma, skeletal, and orthodontic cases in high-load government institutions, Dr. Sharma founded Aura Dental Studio to give patients an unhurried, comfortable, and honest alternative to high-pressure commercial clinic chains.
                </p>
                <p>
                  Here, natural teeth are treated as living, biological organs to be preserved for life — not commodities to be drilled down for unnecessary crowns.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 className="text-lg font-bold text-slate-900">
                  Our Four Clinical Commitments
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Conservation First:</strong> Never crown a tooth that can be safely preserved with bonding.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Pain-Free Anesthesia:</strong> Computerized delivery eliminates needle pinch and sting.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Clear Treatment Plans:</strong> Practical recommendations explained before any treatment begins.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Patient In Control:</strong> Raise your left hand anytime to pause treatment immediately.</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          <div className="mb-20">
            <div className="max-w-2xl mx-auto text-center mb-12 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Education & Accreditations
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Academic Background & Clinical Milestones
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TIMELINE.map((item) => (
                <div
                  key={item.year}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3"
                >
                  <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md inline-block border border-teal-100">
                    {item.year}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.degree}
                  </h3>
                  <div className="text-xs font-semibold text-slate-500">
                    {item.institution}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="max-w-2xl mx-auto text-center mb-12 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                The Clinical Studio
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Inside Aura Dental Studio, Bandra West
              </h2>
              <p className="text-sm text-slate-600">
                A clean, calm, and fully sanitized space equipped with modern optical technology.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm space-y-3 p-3">
                <img
                  src={CLINIC_PHOTOS.hero}
                  alt="Operatory Suite"
                  className="w-full aspect-[4/3] object-cover rounded-xl"
                  loading="lazy"
                />
                <div className="p-2 text-xs font-bold text-slate-800">
                  Digital Operatory Suite & 3Shape Scanner
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm space-y-3 p-3">
                <img
                  src={CLINIC_PHOTOS.reception}
                  alt="Reception Lounge"
                  className="w-full aspect-[4/3] object-cover rounded-xl"
                  loading="lazy"
                />
                <div className="p-2 text-xs font-bold text-slate-800">
                  Quiet Patient Reception Lounge
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm space-y-3 p-3">
                <img
                  src={CLINIC_PHOTOS.interiorWide}
                  alt="Sterilization Room"
                  className="w-full aspect-[4/3] object-cover rounded-xl"
                  loading="lazy"
                />
                <div className="p-2 text-xs font-bold text-slate-800">
                  Class-B Vacuum Hospital Sterilization
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
