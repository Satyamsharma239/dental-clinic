import { Link } from 'react-router-dom';
import { CLINIC, CLINIC_PHOTOS, REVIEWS } from '@/data/clinicInfo';
import { Calendar, MessageCircle, Phone, Award, CheckCircle2, ShieldCheck, MapPin, Clock } from 'lucide-react';

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

export default function AboutPage() {
  const waDoctorUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(
    'Hello Dr. Satyam Sharma, I would like to consult with you regarding dental care at Aura Dental Studio.'
  )}`;

  return (
    <div className="bg-canvas py-12 sm:py-20 text-ink">
      <div className="max-w-container mx-auto px-4 sm:px-8">
        
        <div className="max-w-2xl mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.14em] text-sand-700 block">
            About Our Practice
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-ink tracking-tight leading-tight">
            Unhurried dental care on Waterfield Road.
          </h1>
          <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
            Aura Dental Studio was founded on a simple principle: dentistry should feel calm, transparent, and completely respectful of your natural teeth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-16">
          
          <div className="lg:col-span-5 space-y-4 font-sans">
            <div className="rounded-sm overflow-hidden border border-hairline bg-white shadow-2xs">
              <div className="relative aspect-[4/3] bg-canvas-subtle overflow-hidden">
                <img
                  src={CLINIC_PHOTOS.operatory}
                  alt="Operatory Suite at Aura Dental Studio Bandra West"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute top-3 left-3 bg-ink/80 text-white text-[10px] font-mono uppercase px-2.5 py-1 rounded-xs">
                  Clinical Operatory Suite
                </div>
              </div>

              <div className="p-6 bg-white border-t border-hairline space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sand-700 bg-sand-50 px-2.5 py-0.5 rounded-xs inline-block mb-2 border border-sand-200">
                    Official Council Record
                  </span>
                  <div className="font-serif text-xl font-medium text-ink">{CLINIC.doctor.name}</div>
                  <div className="text-xs text-ink-muted mt-0.5">{CLINIC.doctor.credentials}</div>
                </div>

                <div className="space-y-2 text-xs text-ink-secondary pt-3 border-t border-hairline num-tabular">
                  <div className="flex justify-between py-0.5">
                    <span className="text-ink-muted">Registration</span>
                    <span className="font-mono font-medium text-ink">{CLINIC.doctor.registration}</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-ink-muted">Dental Council</span>
                    <span className="text-ink font-medium">Maharashtra State Dental Council</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-ink-muted">Practice History</span>
                    <span className="text-ink font-medium">12 Years in Bandra West</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-ink-muted">Studio Address</span>
                    <span className="text-ink font-medium text-right">Studio 204, Waterfield Road</span>
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
                    <span>WhatsApp Dr. Sharma</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.14em] text-sand-700 block mb-2">
                Clinical Director
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-ink tracking-tight">
                Dr. Satyam Sharma
              </h2>
              <p className="font-sans text-xs sm:text-sm text-ink-muted mt-1">
                BDS (Nair), MDS Orthodontics (GDC Mumbai) · Reg. No: MSDC-42891
              </p>
            </div>

            <div className="space-y-4 font-sans text-sm text-ink-secondary leading-relaxed">
              <p>
                Dr. Satyam Sharma has practiced orthodontics and family dentistry in Bandra West for over 12 years. He completed his Bachelor of Dental Surgery at Nair Hospital Dental College, followed by his three-year Master of Dental Surgery in Orthodontics and Dentofacial Orthopedics at Government Dental College & Hospital, Mumbai.
              </p>
              <p>
                His clinical work centers on conservative dentistry: saving natural tooth structure, minimizing unnecessary invasive procedures, and taking time to explain every anatomical finding with chairside digital scans.
              </p>
            </div>

            <div className="p-6 rounded-sm bg-white border border-hairline shadow-2xs space-y-3 font-sans">
              <h3 className="font-serif text-lg font-medium text-ink">
                How We Practice Differently
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-ink-secondary pt-1">
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-sage-700 shrink-0 mt-0.5" />
                  <span>Always explain options with chairside 3D optical scans.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-sage-700 shrink-0 mt-0.5" />
                  <span>Computerized slow-delivery anesthesia for zero stinging.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-sage-700 shrink-0 mt-0.5" />
                  <span>Full written itemized cost breakdown before treatment starts.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-sage-700 shrink-0 mt-0.5" />
                  <span>Buffer time between visits so you are never rushed.</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3 font-sans">
              <Link
                to="/book"
                className="btn-primary text-xs h-11 px-5"
              >
                <Calendar size={15} />
                <span>Schedule Consultation (₹500)</span>
              </Link>

              <a
                href={`tel:${CLINIC.phone}`}
                className="btn-secondary text-xs h-11 px-5"
              >
                <Phone size={14} className="text-ink-muted" />
                <span>Call Clinic: {CLINIC.phoneDisplay}</span>
              </a>
            </div>

          </div>

        </div>

        <div className="pt-12 border-t border-hairline font-sans mb-16">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono uppercase tracking-[0.14em] text-sand-700 block mb-2">
              Academic Background
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal">
              Education & Clinical Milestones
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TIMELINE.map((item) => (
              <div
                key={item.year}
                className="p-6 bg-white border border-hairline rounded-sm space-y-2 shadow-2xs"
              >
                <span className="font-mono text-xs text-sand-700 font-bold block">
                  {item.year}
                </span>
                <h3 className="font-serif text-lg font-medium text-ink">
                  {item.degree}
                </h3>
                <div className="text-xs font-medium text-ink-muted">
                  {item.institution}
                </div>
                <p className="text-xs text-ink-secondary leading-relaxed pt-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-12 border-t border-hairline font-sans">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono uppercase tracking-[0.14em] text-sand-700 block mb-2">
              Sterilization & Technology
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal">
              Clinical Safety Protocols
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-hairline rounded-sm space-y-3 shadow-2xs">
              <ShieldCheck size={20} className="text-sage-700" />
              <h3 className="font-serif text-lg font-medium text-ink">Class-B Vacuum Autoclave</h3>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Hospital-grade fractional vacuum sterilization cycle. All handpieces and instruments are individually sealed in indicator barrier pouches and opened in front of you.
              </p>
            </div>

            <div className="p-6 bg-white border border-hairline rounded-sm space-y-3 shadow-2xs">
              <Award size={20} className="text-sage-700" />
              <h3 className="font-serif text-lg font-medium text-ink">3D Intraoral Optical Scans</h3>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Digital scanners capture high-resolution three-dimensional models of your dental arches without uncomfortable silicone impression putty.
              </p>
            </div>

            <div className="p-6 bg-white border border-hairline rounded-sm space-y-3 shadow-2xs">
              <Clock size={20} className="text-sage-700" />
              <h3 className="font-serif text-lg font-medium text-ink">Computerized Anesthesia</h3>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Controlled local anesthetic delivery eliminates the initial stinging pressure of traditional injections. Numbness is verified thoroughly before procedure begins.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
