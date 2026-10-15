import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CLINIC } from '@/data/clinicInfo';

export default function StickyMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden bg-[#F9F6F0]/95 backdrop-blur-md border-t border-[#E5DFD3] px-4 py-2.5 shadow-2xl safe-area-pb">
      <div className="grid grid-cols-3 gap-2 items-center">
        <a
          href={`tel:${CLINIC.phone}`}
          className="flex items-center justify-center gap-1.5 h-11 rounded-lg bg-white border border-[#E5DFD3] text-[#121619] text-xs font-mono font-bold active:bg-slate-100 transition-colors shadow-subtle"
        >
          <Phone size={14} className="text-[#A37E52]" />
          <span>Call Desk</span>
        </a>

        <a
          href={`https://wa.me/${CLINIC.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 h-11 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold active:bg-emerald-100 transition-colors shadow-subtle"
        >
          <MessageSquare size={14} />
          <span>WhatsApp</span>
        </a>

        <Link
          to="/book"
          className="flex items-center justify-center gap-1.5 h-11 rounded-lg bg-[#0B231E] text-white text-xs font-mono font-bold uppercase tracking-wider active:bg-[#163B33] shadow-luxury transition-colors"
        >
          <Calendar size={14} className="text-[#C5A880]" />
          <span>Book</span>
        </Link>
      </div>
    </div>
  );
}
