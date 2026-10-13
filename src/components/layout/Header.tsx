import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Calendar, Clock } from 'lucide-react';
import { CLINIC } from '@/data/clinicInfo';
import { DentalToothIcon } from '@/components/common/DentalToothIcon';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Treatments & Fees' },
  { to: '/about', label: 'About Dr. Sharma' },
  { to: '/gallery', label: 'Clinic Tour' },
  { to: '/faq', label: 'Patient FAQs' },
  { to: '/contact', label: 'Location & Hours' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Top Clinical Utility Bar */}
      <div className="bg-[#081D1A] text-white/80 text-[11px] py-2 px-4 border-b border-primary/20 hidden sm:block">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-white/95 font-medium">Bandra West, Mumbai</span>
              <span className="text-white/40">•</span>
              <span className="text-white/80">Mon – Sat: 9:30 AM – 7:30 PM</span>
            </span>
            <span className="text-white/60 hidden lg:inline">
              📍 Near National College, Waterfield Road
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/70 hidden md:inline">Emergency Helpline:</span>
            <a 
              href={`tel:${CLINIC.emergencyPhone}`} 
              className="text-accent font-semibold hover:underline flex items-center gap-1.5 transition-colors"
            >
              <Phone size={12} className="text-accent" />
              <span>{CLINIC.emergencyPhoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-bg/95 backdrop-blur-md border-b border-primary/10 shadow-soft">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3.5">
          {/* Dental Clinic Brand / Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group" 
            onClick={() => setMobileOpen(false)}
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm group-hover:bg-primary-light transition-all">
              <DentalToothIcon size={22} className="text-accent group-hover:scale-105 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg text-primary tracking-tight leading-none">
                {CLINIC.name}
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-accent mt-0.5">
                Dental Clinic & Orthodontics
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-all relative py-1 ${
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-text-muted hover:text-primary'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full animate-fadeIn" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a 
              href={`tel:${CLINIC.phone}`} 
              className="btn-outline text-xs py-2 px-3.5"
              title="Call Reception"
            >
              <Phone size={14} className="text-primary" />
              <span>{CLINIC.phoneDisplay}</span>
            </a>
            <Link 
              to="/booking" 
              className="btn-primary text-xs py-2 px-4 shadow-sm"
            >
              <Calendar size={14} />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <button
            className="lg:hidden p-2 text-primary hover:bg-primary-50 rounded-lg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile slide-in menu with backdrop overlay */}
        {mobileOpen && (
          <>
            <div 
              className="fixed inset-0 top-[65px] bg-black/30 z-30 lg:hidden backdrop-blur-xs"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative z-40 lg:hidden border-t border-primary/10 bg-bg px-5 py-5 shadow-2xl transition-all animate-fadeIn">
              <div className="mb-4 pb-3 border-b border-primary/10 flex items-center justify-between text-xs text-text-muted">
              <span className="flex items-center gap-1.5">
                <Clock size={13} className="text-accent" />
                <span>Open 9:30 AM – 7:30 PM</span>
              </span>
              <a href={`tel:${CLINIC.emergencyPhone}`} className="text-accent font-semibold">
                Emergency: {CLINIC.emergencyPhoneDisplay}
              </a>
            </div>

            <nav className="flex flex-col gap-1.5" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`py-3 px-3.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary text-white font-semibold'
                        : 'text-text hover:bg-primary-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              
              <div className="pt-3 mt-2 border-t border-primary/10 flex flex-col gap-2.5">
                <Link
                  to="/booking"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full text-center"
                >
                  <Calendar size={16} />
                  Book Clinical Appointment
                </Link>
                <a
                  href={`tel:${CLINIC.phone}`}
                  className="btn-outline w-full text-center justify-center text-sm"
                >
                  <Phone size={16} />
                  Call Reception ({CLINIC.phoneDisplay})
                </a>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  </>
  );
}
