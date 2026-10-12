import { Phone, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CLINIC } from '@/data/clinicInfo';

export default function StickyMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-primary/15 shadow-2xl safe-area-pb">
      <div className="grid grid-cols-2 divide-x divide-primary/10 items-center">
        
        {/* Call Clinic */}
        <a
          href={`tel:${CLINIC.phone}`}
          className="flex items-center justify-center gap-2 py-3 px-3 text-primary active:bg-primary-50 transition-colors font-medium text-xs"
          style={{ minHeight: 50 }}
        >
          <Phone size={16} className="text-primary shrink-0" />
          <span>Call Reception</span>
        </a>

        {/* Book Appointment */}
        <Link
          to="/booking"
          className="flex items-center justify-center gap-2 py-3 px-3 bg-accent text-white active:bg-accent-hover transition-colors font-semibold text-xs shadow-inner"
          style={{ minHeight: 50 }}
        >
          <Calendar size={16} className="shrink-0" />
          <span>Book Appointment</span>
        </Link>

      </div>
    </div>
  );
}
