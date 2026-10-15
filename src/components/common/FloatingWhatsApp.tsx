import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { CLINIC } from '@/data/clinicInfo';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  const waUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent('Hi Dr. Sharma, I want to inquire about a dental appointment at Aura Dental Studio.')}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-end gap-2">
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs font-semibold py-2 px-3.5 rounded-xl shadow-lg border border-border">
          <span>Chat on WhatsApp</span>
          <button 
            type="button" 
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600"
            aria-label="Close tooltip"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:bg-[#1EBE5D] hover:scale-105 active:scale-95 transition-all"
        aria-label="Chat on WhatsApp with Aura Dental Studio"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}
