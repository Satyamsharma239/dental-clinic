import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, Calendar, MapPin, Clock } from 'lucide-react';
import { CLINIC } from '@/data/clinicInfo';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/treatments', label: 'Treatments' },
  { to: '/doctor', label: 'Doctor' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/reviews', label: 'Reviews' },
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

  const waUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent('Hello Dr. Sharma, I would like to inquire about dental appointments at Aura Dental Studio.')}`;

  return (
    <>
      <div className="bg-brand-900 text-white text-xs py-2 px-4 sm:px-8">
        <div className="max-w-container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-brand-100 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-brand-200" />
              <span>Studio 204, Waterfield Road, Bandra West, Mumbai</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Clock size={13} className="text-brand-200" />
              <span>Mon–Sat: 9:30 AM – 7:30 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-4 font-medium">
            <a 
              href={`tel:${CLINIC.phone}`} 
              className="flex items-center gap-1.5 hover:text-brand-200 transition-colors"
            >
              <Phone size={13} />
              <span>{CLINIC.phoneDisplay}</span>
            </a>
            <span className="text-brand-700">|</span>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#25D366] hover:text-white transition-colors"
            >
              <MessageCircle size={13} />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-border shadow-xs">
        <div className="max-w-container mx-auto px-4 sm:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
          
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600 font-bold text-lg group-hover:bg-brand-600 group-hover:text-white transition-all">
              A
            </div>
            <div>
              <span className="font-bold text-lg sm:text-xl text-slate block leading-tight tracking-tight">
                {CLINIC.name}
              </span>
              <span className="text-xs text-slate-muted block font-medium">
                Dr. Satyam Sharma (MDS) · Bandra West
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 font-bold'
                      : 'text-slate-secondary hover:text-brand-600 hover:bg-surface-subtle'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-3.5 inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#25D366] text-[#1EBE5D] hover:bg-[#25D366] hover:text-white text-xs font-bold transition-all"
            >
              <MessageCircle size={15} />
              <span>WhatsApp</span>
            </a>

            <Link
              to="/book"
              className="h-10 px-4 inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-all"
            >
              <Calendar size={15} />
              <span>Book Appointment</span>
            </Link>
          </div>

          <div className="flex items-center gap-1 sm:hidden">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#25D366]"
              aria-label="WhatsApp"
            >
              <MessageCircle size={22} />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="p-2 text-slate hover:text-brand-600"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>

        </div>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 lg:hidden flex">
            <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <span className="font-bold text-base text-slate block">{CLINIC.name}</span>
                    <span className="text-xs text-slate-muted">Dr. Satyam Sharma</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="p-1.5 text-slate-muted hover:text-slate"
                    aria-label="Close menu"
                  >
                    <X size={22} />
                  </button>
                </div>

                <nav className="py-6 flex flex-col gap-1">
                  {NAV_LINKS.map((link) => {
                    const isActive = location.pathname === link.to;
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setMobileOpen(false)}
                        className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                          isActive
                            ? 'bg-brand-50 text-brand-700 font-bold'
                            : 'text-slate-secondary hover:bg-surface-subtle'
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="space-y-3 pt-6 border-t border-border">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full text-sm"
                >
                  <MessageCircle size={16} />
                  <span>Chat on WhatsApp</span>
                </a>
                <Link
                  to="/book"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full text-sm"
                >
                  <Calendar size={16} />
                  <span>Book Appointment</span>
                </Link>
                <div className="text-center pt-2">
                  <a href={`tel:${CLINIC.phone}`} className="text-xs text-slate-muted font-medium hover:text-slate">
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
