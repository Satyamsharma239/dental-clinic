import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CLINIC } from '@/data/clinicInfo';
import { Phone, Mail, MapPin, MessageCircle, Clock, Calendar } from 'lucide-react';

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
    <footer className="bg-ink text-canvas pt-16 pb-10 border-t border-ink/40">
      <div className="max-w-container mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl text-canvas tracking-[0.04em] block">
                {CLINIC.name}
              </span>
              <span className="text-[11px] uppercase tracking-[0.16em] text-sand-500 font-sans block mt-1">
                Contemporary Dental Practice · Bandra West
              </span>
            </Link>

            <p className="text-canvas/80 text-sm leading-relaxed max-w-sm font-sans">
              Dr. Satyam Sharma (BDS Nair, MDS GDC Mumbai) leads an unhurried, conservative dental practice on Waterfield Road. We prioritize gentle pain-free anesthesia, chairside 3D optical diagnostics, and clear upfront fees.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-xs h-9 px-4 rounded-sm"
              >
                <MessageCircle size={14} />
                <span>WhatsApp Desk</span>
              </a>

              <Link
                to="/book"
                className="h-9 px-4 inline-flex items-center justify-center gap-2 rounded-sm bg-white/10 hover:bg-white/20 text-canvas text-xs font-sans font-medium transition-colors"
              >
                <Calendar size={14} />
                <span>Schedule Visit</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3 font-sans">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sand-500 font-mono">
              Practice Location
            </h4>
            <div className="text-sm text-canvas/80 space-y-2 leading-relaxed">
              <p className="flex items-start gap-2">
                <MapPin size={15} className="text-sand-500 shrink-0 mt-1" />
                <span>{CLINIC.address.full}</span>
              </p>
              <p className="text-xs text-canvas/60 pl-6">
                Landmark: {CLINIC.address.landmark}
              </p>
              <p className="text-xs text-canvas/60 pl-6">
                Transit: {CLINIC.transit}
              </p>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3 font-sans">
            <div className="flex items-center justify-between">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sand-500 font-mono">
                Consultation Hours
              </h4>
              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-xs ${
                currentStatus.isOpen 
                  ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50' 
                  : 'bg-white/5 text-canvas/60'
              }`}>
                {currentStatus.isOpen ? 'Open Now' : 'Closed'}
              </span>
            </div>

            <div className="text-xs text-canvas/70 space-y-1.5 num-tabular">
              {CLINIC.hours.map((h, i) => {
                const isToday = currentStatus.dayIndex === i;
                return (
                  <div 
                    key={h.day}
                    className={`flex justify-between py-1 border-b border-white/5 ${
                      isToday ? 'text-sand-500 font-medium' : 'text-canvas/60'
                    }`}
                  >
                    <span>{h.day}</span>
                    <span>{h.time}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-3 font-sans">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sand-500 font-mono">
              Direct Contact
            </h4>
            <div className="text-sm text-canvas/80 space-y-3">
              <div>
                <span className="text-[11px] text-canvas/50 block font-mono">Telephone</span>
                <a href={`tel:${CLINIC.phone}`} className="hover:text-canvas transition-colors font-medium text-xs">
                  {CLINIC.phoneDisplay}
                </a>
              </div>
              <div>
                <span className="text-[11px] text-canvas/50 block font-mono">Email</span>
                <a href={`mailto:${CLINIC.email}`} className="hover:text-canvas transition-colors text-xs break-all">
                  {CLINIC.email}
                </a>
              </div>
              <div>
                <span className="text-[11px] text-canvas/50 block font-mono">Dental Council Reg.</span>
                <span className="text-xs text-canvas/70 font-mono">MSDC-42891</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-canvas/60 font-sans">
          <div>
            © {new Date().getFullYear()} {CLINIC.name} · Dr. Satyam Sharma, MDS (Orthodontics). Bandra West, Mumbai.
          </div>
          <div className="flex items-center gap-5">
            <Link to="/contact" className="hover:text-canvas transition-colors">Directions & Parking</Link>
            <Link to="/pricing" className="hover:text-canvas transition-colors">Fee Schedule</Link>
            <Link to="/book" className="hover:text-canvas transition-colors">Book Online</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
