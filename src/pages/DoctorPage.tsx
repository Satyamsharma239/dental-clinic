import { Link } from 'react-router-dom';
import { CLINIC, CLINIC_PHOTOS } from '@/data/clinicInfo';
import { Calendar, MessageCircle, Phone, Award, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

const TIMELINE = [
  {
    year: '2012',
    degree: 'Bachelor of Dental Surgery (BDS)',
    institution: 'Nair Hospital Dental College, Mumbai University',
    desc: 'Undergraduate clinical training in conservative restorative dentistry, oral pathology, oral surgery, and pediatrics.',
  },
  {
    year: '2016',
    degree: 'Master of Dental Surgery (MDS) in Orthodontics',
    institution: 'Government Dental College & Hospital (GDC), Mumbai',
    desc: 'Three-year post-graduate clinical residency in dentofacial orthopedics, surgical orthodontics, and skeletal correction.',
  },
  {
    year: '2019',
    degree: 'Certified Clear Aligner Provider',
    institution: 'Indian Orthodontic Society Accredited Program',
    desc: 'Advanced digital intraoral staging and computerized clear aligner biomechanics sequencing.',
  },
  {
    year: '2022',
    degree: 'Clinical Director, Aura Dental Studio',
    institution: 'Waterfield Road, Bandra West, Mumbai',
    desc: 'Established private practice focusing on unhurried, gentle, family-centered dental care.',
  },
];

export default function DoctorPage() {
  const waDoctorUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(
    'Hello Dr. Satyam Sharma, I would like to consult with you regarding dental care at Aura Dental Studio.'
  )}`;

  return (
    <div className="bg-surface-subtle py-10 md:py-16 text-slate">
      <div className="max-w-container mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-14">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-border bg-white shadow-xs">
              <img
                src={CLINIC_PHOTOS.operatory}
                alt="Operatory Suite at Aura Dental Studio Bandra West"
                className="w-full aspect-[4/3] object-cover"
                loading="eager"
              />
              <div className="p-5 bg-white border-t border-border space-y-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                    Official Council Record
                  </span>
                  <div className="font-extrabold text-lg text-slate">{CLINIC.doctor.name}</div>
                  <div className="text-xs text-slate-muted">{CLINIC.doctor.credentials}</div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-secondary pt-2 border-t border-border/80">
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-muted">Registration</span>
                    <span className="font-mono font-bold text-slate">{CLINIC.doctor.registration}</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-muted">Council</span>
                    <span className="text-slate font-medium">Maharashtra State Dental Council</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-muted">Practice</span>
                    <span className="text-slate font-bold">12 Years in Bandra West</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-muted">Clinic Address</span>
                    <span className="text-slate font-medium text-right">Studio 204, Waterfield Road</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={waDoctorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full text-xs h-10"
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp Direct Line</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block mb-1">
                Lead Clinician Profile
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate tracking-tight">
                Dr. Satyam Sharma
              </h1>
              <p className="text-sm font-semibold text-brand-700 mt-1">
                BDS (Nair), MDS Orthodontics (GDC Mumbai) · 12 Years in Bandra West
              </p>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-slate-secondary leading-relaxed">
              <p>
                Dr. Satyam Sharma has practiced orthodontics and restorative dentistry in Bandra West for over 12 years. His approach is built around natural tooth preservation: keeping healthy tooth structure intact, taking the time to explain every scan on screen, and ensuring that no patient feels rushed.
              </p>
              <p>
                Having completed his BDS at Nair Hospital Dental College and his MDS residency at Government Dental College & Hospital, Mumbai, Dr. Sharma combines academic surgical rigor with a gentle, calming chairside manner.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-border shadow-xs border-l-4 border-l-brand-600">
              <p className="text-xs sm:text-sm text-slate italic leading-relaxed">
                "{CLINIC.doctor.philosophy}"
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs">
              <div className="p-3 rounded-lg bg-white border border-border">
                <span className="text-slate-muted block font-medium">Bandra Practice</span>
                <span className="font-bold text-slate text-sm">12 Years</span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-border">
                <span className="text-slate-muted block font-medium">Focus</span>
                <span className="font-bold text-slate text-sm">Aligners & Painless Care</span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-border col-span-2 sm:col-span-1">
                <span className="text-slate-muted block font-medium">Languages</span>
                <span className="font-bold text-slate text-sm">EN, HI, MR, GU</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/book" className="btn-primary text-xs h-11 px-5">
                <Calendar size={15} />
                <span>Book Consultation</span>
              </Link>
              <a
                href={waDoctorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-xs h-11 px-5"
              >
                <MessageCircle size={16} />
                <span>Message on WhatsApp</span>
              </a>
              <a
                href={`tel:${CLINIC.phone}`}
                className="btn-secondary text-xs h-11 px-4"
              >
                <Phone size={14} className="text-brand-600" />
                <span>Call Desk</span>
              </a>
            </div>

          </div>

        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-border shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block">
              Education & Residency
            </span>
            <h2 className="text-xl font-bold text-slate">
              Academic Background & Training
            </h2>
          </div>

          <div className="divide-y divide-border">
            {TIMELINE.map((item) => (
              <div key={item.year} className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-12 gap-3 items-baseline">
                <div className="sm:col-span-2 text-xs font-mono font-bold text-brand-700">
                  {item.year}
                </div>
                <div className="sm:col-span-5 space-y-0.5">
                  <h3 className="font-bold text-sm text-slate">{item.degree}</h3>
                  <p className="text-xs text-slate-muted">{item.institution}</p>
                </div>
                <div className="sm:col-span-5 text-xs text-slate-secondary leading-relaxed">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
