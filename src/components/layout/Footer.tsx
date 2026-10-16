import { Link } from 'react-router-dom';
import { CLINIC } from '@/data/clinicInfo';
import { Phone, Mail, MapPin, MessageCircle, Calendar } from 'lucide-react';

export default function Footer() {
  const waUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent('Hello Dr. Sharma, I want to inquire about dental appointments at Aura Dental Studio.')}`;

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 font-sans">
      <div className="max-w-container mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-slate-800">
          
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-heading text-2xl font-extrabold text-white tracking-tight block">
                {CLINIC.name}
              </span>
              <span className="text-xs font-semibold text-teal-400 block mt-1">
                Dr. Satyam Sharma (MDS) · Bandra West
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Gentle, conservative family dentistry on Waterfield Road. We prioritize pain-free anesthesia, 3D optical scanning, and transparent upfront pricing for every patient.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-xs h-10 px-4 rounded-lg"
              >
                <MessageCircle size={15} />
                <span>WhatsApp Inquiry</span>
              </a>

              <Link
                to="/book"
                className="h-10 px-4 inline-flex items-center justify-center gap-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors border border-slate-700"
              >
                <Calendar size={15} />
                <span>Book Appointment</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Studio Location
            </h4>
            <div className="text-sm text-slate-400 space-y-2.5 leading-relaxed">
              <p className="flex items-start gap-2.5">
                <MapPin size={16} className="text-teal-400 shrink-0 mt-1" />
                <span className="text-slate-300">{CLINIC.address.full}</span>
              </p>
              <p className="text-xs text-slate-400 pl-6">
                Landmark: {CLINIC.address.landmark}
              </p>
              <p className="text-xs text-slate-400 pl-6">
                Transit: {CLINIC.transit}
              </p>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Appointments
            </h4>
            <div className="text-sm space-y-2">
              <p className="text-teal-300 font-semibold">{CLINIC.appointmentPolicy}</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                {CLINIC.appointmentNotice}
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Direct Contact
            </h4>
            <div className="text-sm space-y-3">
              <div>
                <span className="text-xs text-slate-500 block">Phone Desk</span>
                <a href={`tel:${CLINIC.phone}`} className="text-white hover:text-teal-400 transition-colors font-semibold text-xs">
                  {CLINIC.phoneDisplay}
                </a>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Email Inquiries</span>
                <a href={`mailto:${CLINIC.email}`} className="text-slate-300 hover:text-white transition-colors text-xs break-all">
                  {CLINIC.email}
                </a>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Dental Council Reg.</span>
                <span className="text-xs text-teal-400 font-semibold font-mono">MSDC-42891</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {CLINIC.name} · Dr. Satyam Sharma, MDS (BDS Nair, MDS GDC Mumbai). Bandra West, Mumbai.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link to="/book" className="hover:text-white transition-colors">Book Appointment</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
