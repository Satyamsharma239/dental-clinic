import { Link } from 'react-router-dom';
import { CLINIC } from '@/data/clinicInfo';
import { SERVICES } from '@/data/services';
import { ArrowUpRight } from 'lucide-react';
import { DentalToothIcon } from '@/components/common/DentalToothIcon';

export default function Footer() {
  return (
    <footer className="bg-primary text-white/90 border-t border-primary-light">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-14 border-b border-white/10">
          
          {/* Column 1: Studio Identity & Brand Concept */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3 inline-flex group">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-accent">
                <DentalToothIcon size={18} className="text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-semibold text-lg text-white leading-none">
                  {CLINIC.name}
                </span>
                <span className="text-[10px] font-medium tracking-widest uppercase text-white/50 mt-1">
                  Contemporary Practice
                </span>
              </div>
            </Link>

            <p className="text-sm text-white/70 max-w-sm leading-relaxed">
              {CLINIC.concept} Built with deliberate focus on patient autonomy, digital precision, and clear treatment roadmaps.
            </p>

            <div className="pt-2 text-xs text-white/50 space-y-1">
              <p>Sample Location: {CLINIC.address.full}</p>
              <p>Email: {CLINIC.email}</p>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
              Studio Navigation
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Treatments & Fee Guide
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Philosophy & Care Standards
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white transition-colors">
                  Studio Atmosphere
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Studio Inquiries & Visit
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Featured Disciplines */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
              Core Disciplines
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              {SERVICES.slice(0, 4).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/booking?service=${service.slug}`}
                    className="hover:text-white transition-colors flex items-center justify-between group"
                  >
                    <span>{service.name}</span>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 text-accent transition-opacity" />
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-1.5 text-xs text-accent font-semibold hover:underline"
                >
                  <span>Book general consultation →</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-white/50">
          <p className="max-w-2xl leading-relaxed">
            <strong>Demonstration Project:</strong> {CLINIC.disclaimer} All clinical content, pricing estimates, and practitioner biographies are designed for digital product portfolio review.
          </p>

          <div className="flex items-center gap-6 shrink-0">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <span>© {new Date().getFullYear()} {CLINIC.name}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
