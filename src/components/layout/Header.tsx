import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { CLINIC } from '@/data/clinicInfo';
import { DentalToothIcon } from '@/components/common/DentalToothIcon';

const NAV_LINKS = [
  { to: '/services', label: 'Treatments' },
  { to: '/about', label: 'Philosophy' },
  { to: '/gallery', label: 'Studio' },
  { to: '/faq', label: 'FAQs' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
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
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-border shadow-soft'
          : 'bg-bg/90 backdrop-blur-sm border-b border-border/60'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 py-4">
        
        {/* Distinctive Architectural Dental Wordmark */}
        <Link 
          to="/" 
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          aria-label={`${CLINIC.name} — Home`}
        >
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            <DentalToothIcon size={19} className="text-accent" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-semibold text-lg tracking-tight text-primary leading-none">
              {CLINIC.name}
            </span>
            <span className="text-[11px] font-medium tracking-widest uppercase text-text-muted mt-1">
              Contemporary Practice
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors duration-150 relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded ${
                  isActive
                    ? 'text-primary font-semibold'
                    : 'text-text-muted hover:text-primary'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Primary Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/booking"
            className="btn-primary text-xs tracking-wide py-2.5 px-5 font-semibold"
          >
            <span>Book appointment</span>
            <ArrowRight size={14} className="text-accent" />
          </Link>
        </div>

        {/* Accessible Mobile Menu Trigger */}
        <button
          type="button"
          className="md:hidden p-2 text-primary hover:bg-primary-50 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-[65px] bg-bg/95 backdrop-blur-xl z-50 flex flex-col justify-between p-6 border-t border-border animate-fadeIn">
          <div className="flex flex-col gap-2 pt-2">
            <Link
              to="/"
              className={`text-lg font-heading py-3 px-3 rounded-lg transition-colors ${
                location.pathname === '/' ? 'bg-white font-bold text-primary shadow-xs' : 'text-text-muted hover:text-primary'
              }`}
            >
              Home
            </Link>
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-lg font-heading py-3 px-3 rounded-lg transition-colors ${
                    isActive ? 'bg-white font-bold text-primary shadow-xs' : 'text-text-muted hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-6 border-t border-border space-y-4">
            <Link
              to="/booking"
              className="btn-primary w-full text-sm py-4 shadow-sm"
            >
              <span>Book appointment</span>
              <ArrowRight size={16} className="text-accent" />
            </Link>
            <p className="text-center text-xs text-text-muted">
              {CLINIC.address.full}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
