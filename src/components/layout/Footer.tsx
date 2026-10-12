import { Link } from 'react-router-dom';
import { CLINIC } from '@/data/clinicInfo';
import { SERVICES } from '@/data/services';
import { MapPin, Phone as PhoneIcon, Mail, Clock, ShieldCheck, HeartPulse, Sparkles } from 'lucide-react';
import { DentalToothIcon } from '@/components/common/DentalToothIcon';

export default function Footer() {
  return (
    <footer className="bg-primary text-white/90 pb-16 md:pb-0 border-t border-primary-light">
      {/* Top Clinical Assurance Bar */}
      <div className="border-b border-white/10 bg-primary-900/60 py-6 px-5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-accent">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="font-semibold text-white">Class-B Autoclave Sterilisation</p>
              <p className="text-xs text-white/60">Hospital-standard 100% sterile instruments</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-accent">
              <HeartPulse size={20} />
            </div>
            <div>
              <p className="font-semibold text-white">Computerized Painless Care</p>
              <p className="text-xs text-white/60">Topical anesthesia for gentle treatments</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-accent">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="font-semibold text-white">Specialist Orthodontics On-Site</p>
              <p className="text-xs text-white/60">MDS-certified care by Dr. Satyam Sharma</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-6xl mx-auto px-5 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1: Clinic Identity */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-accent">
              <DentalToothIcon size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white leading-tight">
                {CLINIC.name}
              </h3>
              <p className="text-[11px] text-accent tracking-wider uppercase font-semibold">
                Dental Clinic & Orthodontics
              </p>
            </div>
          </div>

          <p className="text-xs text-white/70 leading-relaxed">
            Personalised, gentle dental care in Metropolis. We listen, explain every step, and guarantee honest, pressure-free treatment plans.
          </p>

          <div className="pt-2 text-xs text-white/60 space-y-1.5">
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
              <span><strong>Chief Doctor:</strong> {CLINIC.doctor.name} ({CLINIC.doctor.qualification})</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
              <span><strong>Medical Reg:</strong> {CLINIC.doctor.registration}</span>
            </p>
          </div>
        </div>

        {/* Column 2: Key Dental Treatments */}
        <div>
          <h4 className="font-heading text-base font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-1.5 h-4 bg-accent rounded-full inline-block"></span>
            Specialised Treatments
          </h4>
          <nav className="flex flex-col gap-2.5 text-xs" aria-label="Dental services navigation">
            {SERVICES.slice(0, 5).map((service) => (
              <Link
                key={service.id}
                to="/services"
                className="text-white/70 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between group"
              >
                <span>{service.name}</span>
                <span className="text-[10px] text-white/40 group-hover:text-accent font-mono">
                  {service.durationMins}m
                </span>
              </Link>
            ))}
            <Link 
              to="/services" 
              className="text-accent text-xs font-semibold hover:underline pt-1 inline-flex items-center gap-1"
            >
              View all treatments & fees →
            </Link>
          </nav>
        </div>

        {/* Column 3: Patient Information & Navigation */}
        <div>
          <h4 className="font-heading text-base font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-1.5 h-4 bg-accent rounded-full inline-block"></span>
            Patient Resources
          </h4>
          <nav className="flex flex-col gap-2.5 text-xs text-white/70" aria-label="Patient navigation">
            <Link to="/about" className="hover:text-white transition-colors">About Dr. Sharma & Practice</Link>
            <Link to="/gallery" className="hover:text-white transition-colors">Hygiene & Operatory Tour</Link>
            <Link to="/faq" className="hover:text-white transition-colors">Patient FAQs & Costs</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Transit, Parking & Directions</Link>
            <Link to="/booking" className="hover:text-accent text-white font-semibold transition-colors">Book Consultation Online</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Patient Privacy Policy</Link>
          </nav>
        </div>

        {/* Column 4: Contact & Clinical Hours */}
        <div className="space-y-4">
          <h4 className="font-heading text-base font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-1.5 h-4 bg-accent rounded-full inline-block"></span>
            Clinic Hours & Visits
          </h4>

          <div className="space-y-3 text-xs text-white/80">
            <div className="flex items-start gap-2.5">
              <MapPin size={15} className="mt-0.5 shrink-0 text-accent" />
              <span>{CLINIC.address.full}</span>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock size={15} className="mt-0.5 shrink-0 text-accent" />
              <div>
                <p className="font-medium text-white">{CLINIC.hours.weekdays}</p>
                <p className="text-white/60">{CLINIC.hours.lunch}</p>
                <p className="text-accent/90 mt-0.5">{CLINIC.hours.closed}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 space-y-2">
              <a 
                href={`tel:${CLINIC.phone}`} 
                className="flex items-center gap-2 text-white hover:text-accent transition-colors font-medium"
              >
                <PhoneIcon size={14} className="text-accent" />
                <span>Appointments: {CLINIC.phoneDisplay}</span>
              </a>
              <a 
                href={`mailto:${CLINIC.email}`} 
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <Mail size={14} className="text-accent" />
                <span>{CLINIC.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-5 px-5 bg-primary-900/80">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/50">
          <div className="flex items-center gap-3">
            <span>&copy; {new Date().getFullYear()} {CLINIC.name}.</span>
            <span>•</span>
            <span>Licensed Dental Healthcare Provider</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
            <span>•</span>
            <span className="text-accent">Metropolis Medical Council Reg. #{CLINIC.doctor.registration}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
