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
      <div className="bg-teal-900 text-white text-xs py-2 px-4 sm:px-8 border-b border-teal-800 font-sans">
        <div className="max-w-container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-teal-100 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-teal-300" />
              <span>Studio 204, Waterfield Road, Bandra West, Mumbai</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Clock size={13} className="text-teal-300" />
              <span>Mon–Sat: 9:30 AM – 7:30 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-4 font-medium">
            <a 
              href={`tel:${CLINIC.phone}`} 
              className="flex items-center gap-1.5 text-teal-100 hover:text-white transition-colors"
            >
              <Phone size={13} className="text-teal-300" />
              <span>{CLINIC.phoneDisplay}</span>
            </a>
            <span className="text-teal-700">|</span>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-teal-200 hover:text-white transition-colors"
            >
              <MessageCircle size={13} className="text-teal-300" />
              <span>WhatsApp Consultation</span>
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 font-sans shadow-xs">
        <div className="max-w-container mx-auto px-4 sm:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
          
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-teal-800 transition-colors">
              A
            </div>
            <div>
              <span className="font-heading text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 block leading-tight">
                {CLINIC.name}
              </span>
              <span className="text-xs text-slate-500 block font-medium">
                Dr. Satyam Sharma · Bandra West
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-teal-700 font-bold border-b-2 border-teal-700 pb-0.5'
                      : 'text-slate-600 hover:text-teal-700'
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
              className="h-10 px-3.5 inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors shadow-xs"
            >
              <MessageCircle size={15} className="text-teal-700" />
              <span>WhatsApp</span>
            </a>

            <Link
              to="/book"
              className="btn-primary text-xs h-10 px-4"
            >
              <Calendar size={15} />
              <span>Book Appointment</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-teal-700"
              aria-label="WhatsApp"
            >
              <MessageCircle size={22} />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="p-2 text-slate-800 hover:text-teal-700"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>

        </div>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 md:hidden flex">
            <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 flex flex-col justify-between shadow-2xl border-l border-slate-200">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div>
                    <span className="font-heading text-lg font-bold text-slate-900 block">{CLINIC.name}</span>
                    <span className="text-xs text-slate-500">Bandra West, Mumbai</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="p-1.5 text-slate-500 hover:text-slate-900"
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
                        className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                          isActive
                            ? 'bg-teal-50 text-teal-800'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-200">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full text-xs h-11"
                >
                  <MessageCircle size={16} />
                  <span>Chat on WhatsApp</span>
                </a>
                <Link
                  to="/book"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full text-xs h-11"
                >
                  <Calendar size={16} />
                  <span>Book Appointment</span>
                </Link>
                <div className="text-center pt-2">
                  <a href={`tel:${CLINIC.phone}`} className="text-xs text-slate-500 hover:text-slate-800">
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
