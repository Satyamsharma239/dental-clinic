import { Calendar, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StickyMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-border shadow-card safe-area-pb">
      <div className="grid grid-cols-2 divide-x divide-border items-center">
        
        {/* Explore Treatments */}
        <Link
          to="/services"
          className="flex items-center justify-center gap-2 py-3 px-3 text-primary active:bg-primary-50 transition-colors font-medium text-xs"
          style={{ minHeight: 48 }}
        >
          <Compass size={15} className="text-text-muted shrink-0" />
          <span>Treatments</span>
        </Link>

        {/* Book Appointment */}
        <Link
          to="/booking"
          className="flex items-center justify-center gap-2 py-3 px-3 bg-primary text-white active:bg-primary-light transition-colors font-semibold text-xs"
          style={{ minHeight: 48 }}
        >
          <Calendar size={15} className="text-accent shrink-0" />
          <span>Book Consult</span>
        </Link>

      </div>
    </div>
  );
}
