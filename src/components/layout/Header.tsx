import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, Calendar, MapPin, Clock } from 'lucide-react';
import { CLINIC } from '@/data/clinicInfo';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const waUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent('Hello Dr. Sharma, I would like to inquire about appointments at Aura Dental Studio Bandra West.')}`;

  return (
    <>
      <div className="bg-sage-900 text-white text-xs py-2 px-4 sm:px-8 border-b border-sage-800 font-sans">
        <div className="max-w-container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-white/90 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="text-sand-400" />
              <span>Studio 204, Waterfield Road, Bandra West, Mumbai</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Clock size={12} className="text-sand-400" />
              <span>Mon–Sat: 9:30 AM – 7:30 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-4 font-medium">
            <a 
              href={`tel:${CLINIC.phone}`} 
              className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
            >
              <Phone size={12} className="text-sand-400" />
              <span>{CLINIC.phoneDisplay}</span>
            </a>
            <span className="text-sage-700">|</span>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#25D366] hover:text-white transition-colors"
            >
              <MessageCircle size={12} />
              <span>WhatsApp Consultation</span>
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur-md border-b border-hairline font-sans">
        <div className="max-w-container mx-auto px-4 sm:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
          
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-sm bg-sage-800 text-white flex items-center justify-center font-serif text-lg border border-sage-700 shadow-2xs group-hover:bg-sage-900 transition-colors">
              A
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-medium tracking-[0.02em] text-ink block leading-none">
                {CLINIC.name}
              </span>
              <span className="text-[11px] text-ink-muted block mt-1 tracking-wide">
                Dr. Satyam Sharma · Bandra West
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-[14px] font-medium transition-colors ${
                    isActive
                      ? 'text-sage-800 font-semibold border-b-2 border-sage-800 pb-0.5'
                      : 'text-ink-secondary hover:text-ink'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-3.5 inline-flex items-center justify-center gap-1.5 rounded-sm border border-border bg-white text-ink hover:bg-canvas-subtle text-xs font-medium transition-colors"
            >
              <MessageCircle size={14} className="text-[#1EBE5D]" />
              <span>WhatsApp</span>
            </a>

            <Link
              to="/book"
              className="btn-primary text-xs h-10 px-4"
            >
              <Calendar size={14} />
              <span>Book Appointment</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#1EBE5D]"
              aria-label="WhatsApp"
            >
              <MessageCircle size={22} />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="p-2 text-ink hover:text-sage-800"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>

        </div>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 bg-ink/40 md:hidden flex">
            <div className="relative ml-auto w-full max-w-xs bg-canvas h-full p-6 flex flex-col justify-between shadow-2xl border-l border-hairline">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-hairline">
                  <div>
                    <span className="font-serif text-lg text-ink font-medium block">{CLINIC.name}</span>
                    <span className="text-xs text-ink-muted">Bandra West, Mumbai</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="p-1.5 text-ink-muted hover:text-ink"
                    aria-label="Close menu"
                  >
                    <X size={22} />
                  </button>
                </div>

                <nav className="py-6 flex flex-col gap-1.5">
                  {NAV_LINKS.map((link) => {
                    const isActive = location.pathname === link.to;
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setMobileOpen(false)}
                        className={`px-3.5 py-2.5 rounded-sm text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-sage-100 text-sage-900 font-semibold'
                            : 'text-ink-secondary hover:bg-canvas-subtle'
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="space-y-3 pt-6 border-t border-hairline">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full text-xs h-11"
                >
                  <MessageCircle size={15} />
                  <span>Chat on WhatsApp</span>
                </a>
                <Link
                  to="/book"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full text-xs h-11"
                >
                  <Calendar size={15} />
                  <span>Book Appointment</span>
                </Link>
                <div className="text-center pt-2">
                  <a href={`tel:${CLINIC.phone}`} className="text-xs text-ink-muted hover:text-ink">
                    Call: {CLINIC.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
