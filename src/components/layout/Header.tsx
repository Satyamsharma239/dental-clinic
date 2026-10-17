import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Calendar, MapPin, MessageCircle } from 'lucide-react';
import { CLINIC } from '@/data/clinicInfo';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

function isNavLinkActive(pathname: string, to: string) {
  return pathname === to || (to === '/services' && pathname.startsWith(`${to}/`));
}

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

  return (
    <>
      <div className="bg-teal-900 text-white text-xs py-2 px-4 sm:px-8 border-b border-teal-800 font-sans relative z-20">
        <div className="max-w-container mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-teal-100 truncate">
            <span className="flex items-center gap-1.5 truncate">
              <MapPin size={13} className="text-teal-300 shrink-0" />
              <span className="truncate">Waterfield Road, Bandra (W)</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Calendar size={13} className="text-teal-300 shrink-0" />
              <span>{CLINIC.appointmentPolicy}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 font-medium shrink-0">
            <a 
              href={`tel:${CLINIC.phone}`} 
              className="flex items-center gap-1.5 text-teal-100 hover:text-white transition-colors"
            >
              <Phone size={13} className="text-teal-300 shrink-0" />
              <span>{CLINIC.phoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/${CLINIC.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-teal-100 hover:text-white transition-colors"
              aria-label="WhatsApp the clinic"
            >
              <MessageCircle size={13} className="text-teal-300 shrink-0" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 font-sans shadow-xs">
        <div className="max-w-container mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-teal-800 transition-colors shrink-0">
              A
            </div>
            <div className="truncate">
              <span className="font-heading text-lg sm:text-2xl font-extrabold tracking-tight text-slate-900 block leading-tight truncate">
                {CLINIC.name}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500 block font-medium truncate">
                Dr. Satyam Sharma · Bandra West
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-4 xl:gap-6" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = isNavLinkActive(location.pathname, link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`whitespace-nowrap text-[13px] xl:text-sm font-semibold transition-colors ${
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

          <div className="hidden lg:flex items-center">
            <Link
              to="/book"
              className="btn-primary text-xs h-10 px-3 xl:px-4 whitespace-nowrap"
            >
              <Calendar size={15} />
              <span>Book Appointment</span>
            </Link>
          </div>

          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="p-2 text-slate-800 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>

        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white p-6 flex flex-col justify-between shadow-2xl border-l border-slate-200 z-[101] overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <span className="font-heading text-lg font-bold text-slate-900 block">{CLINIC.name}</span>
                  <span className="text-xs text-slate-500">Dr. Satyam Sharma · Bandra West</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 -mr-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="py-6 flex flex-col gap-2" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => {
                  const isActive = isNavLinkActive(location.pathname, link.to);
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={`px-4 py-3 rounded-xl text-base font-semibold transition-colors flex items-center justify-between ${
                        isActive
                          ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-teal-700"></span>}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-200">
              <Link
                to="/book"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full text-xs h-11"
              >
                <Calendar size={16} />
                <span>Book Appointment</span>
              </Link>
              <div className="text-center pt-2">
                <a href={`tel:${CLINIC.phone}`} className="text-xs text-slate-500 hover:text-slate-800 font-medium">
                  Direct Reception: {CLINIC.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
