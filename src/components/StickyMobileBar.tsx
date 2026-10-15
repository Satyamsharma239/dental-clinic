import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CLINIC } from '@/data/clinicInfo';

export default function StickyMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 shadow-xl safe-area-pb font-sans">
      <div className="grid grid-cols-3 gap-2 items-center">
        <a
          href={`tel:${CLINIC.phone}`}
          className="flex items-center justify-center gap-1.5 h-11 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-bold active:bg-slate-100 transition-colors shadow-xs"
        >
          <Phone size={14} className="text-teal-700" />
          <span>Call Desk</span>
        </a>

        <a
          href={`https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent('Hello Dr. Sharma, I want to inquire about appointments at Aura Dental Studio.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 h-11 rounded-xl bg-emerald-50 border border-emerald-200 text-[#1ea952] text-xs font-bold active:bg-emerald-100 transition-colors shadow-xs"
        >
          <MessageCircle size={15} />
          <span>WhatsApp</span>
        </a>

        <Link
          to="/book"
          className="flex items-center justify-center gap-1.5 h-11 rounded-xl bg-teal-700 text-white text-xs font-bold active:bg-teal-800 shadow-sm transition-colors"
        >
          <Calendar size={14} />
          <span>Book Visit</span>
        </Link>
      </div>
    </div>
  );
}
