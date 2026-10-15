import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CLINIC } from '@/data/clinicInfo';
import { Phone, Mail, MapPin, MessageCircle, Clock, Calendar, ArrowRight } from 'lucide-react';

export default function Footer() {
  const currentStatus = useMemo(() => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours() + now.getMinutes() / 60;
    const isWorkingDay = day >= 1 && day <= 6;
    const isOpen = isWorkingDay && hour >= 9.5 && hour <= 19.5;
    return {
      isOpen,
      dayIndex: day === 0 ? 6 : day - 1,
    };
  }, []);

  const waUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent('Hello Dr. Sharma, I want to inquire about dental appointments at Aura Dental Studio.')}`;

  return (
    <footer className="bg-slate-900 text-white pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-container mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                {CLINIC.name}
              </span>
            </Link>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Dr. Satyam Sharma (BDS, MDS) provides gentle, honest, and pain-free dental care in Bandra West, Mumbai. 3D digital clear aligners, pain-free root canals, and family dentistry.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-xs h-9 px-3.5"
              >
                <MessageCircle size={14} />
                <span>WhatsApp Desk</span>
              </a>

              <Link
                to="/book"
                className="btn-primary text-xs h-9 px-3.5"
              >
                <Calendar size={14} />
                <span>Book Online</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Clinic Location
            </h4>
            <div className="text-sm text-slate-300 space-y-2 leading-relaxed">
              <p className="flex items-start gap-2">
                <MapPin size={16} className="text-brand-400 shrink-0 mt-0.5" />
                <span>{CLINIC.address.full}</span>
              </p>
              <p className="text-xs text-slate-400 pl-6">
                Landmark: {CLINIC.address.landmark}
              </p>
              <p className="text-xs text-slate-400 pl-6">
                {CLINIC.transit}
              </p>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Clinic Timings
              </h4>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                currentStatus.isOpen 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                  : 'bg-slate-800 text-slate-400'
              }`}>
                {currentStatus.isOpen ? '● Open now' : '○ Closed now'}
              </span>
            </div>

            <div className="text-xs text-slate-300 space-y-1.5 num-tabular">
              {CLINIC.hours.map((h, i) => {
                const isToday = currentStatus.dayIndex === i;
                return (
                  <div 
                    key={h.day}
                    className={`flex justify-between py-1 border-b border-slate-800/80 ${
                      isToday ? 'text-brand-300 font-bold' : 'text-slate-400'
                    }`}
                  >
                    <span>{h.day}</span>
                    <span>{h.time}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Direct Contact
            </h4>
            <div className="text-sm text-slate-300 space-y-2.5">
              <div>
                <span className="text-xs text-slate-400 block">Phone</span>
                <a href={`tel:${CLINIC.phone}`} className="hover:text-white transition-colors font-medium">
                  {CLINIC.phoneDisplay}
                </a>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Email</span>
                <a href={`mailto:${CLINIC.email}`} className="hover:text-white transition-colors text-xs break-all">
                  {CLINIC.email}
                </a>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Dr. Registration</span>
                <span className="text-xs text-slate-400 font-mono">MSDC-42891</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {CLINIC.name} · Dr. Satyam Sharma (MDS Orthodontics).
          </div>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-white">Get Directions</Link>
            <Link to="/pricing" className="hover:text-white">Pricing Guide</Link>
            <Link to="/book" className="hover:text-white">Book Appointment</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
