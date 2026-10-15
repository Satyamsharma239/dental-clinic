import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { CLINIC } from '@/data/clinicInfo';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  const waUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent('Hi Dr. Sharma, I want to inquire about a dental appointment at Aura Dental Studio.')}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-end gap-2 font-sans">
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-ink text-xs font-medium py-1.5 px-3 rounded-xs shadow-md border border-hairline">
          <span>Quick WhatsApp Consultation</span>
          <button 
            type="button" 
            onClick={() => setShowTooltip(false)}
            className="text-ink-muted hover:text-ink"
            aria-label="Close tooltip"
          >
            <X size={13} />
          </button>
        </div>
      )}

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-[#128C7E] text-white flex items-center justify-center shadow-md hover:bg-[#0f766e] transition-all"
        aria-label="Chat on WhatsApp with Aura Dental Studio"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
