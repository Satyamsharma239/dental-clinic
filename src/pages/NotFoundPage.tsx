import { Link } from 'react-router-dom';
import FadeIn from '@/components/FadeIn';
import { DentalToothIcon } from '@/components/common/DentalToothIcon';
import { Calendar, ArrowRight } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-5 sm:px-8 text-center py-24 bg-bg">
      <FadeIn>
        <div className="w-14 h-14 rounded-2xl bg-white text-primary flex items-center justify-center mx-auto mb-6 shadow-soft border border-border">
          <DentalToothIcon size={26} className="text-accent" />
        </div>
        <div className="text-7xl font-heading text-primary font-light mb-3">404</div>
        <h1 className="text-3xl sm:text-4xl font-heading text-primary font-normal mb-3">Page Not Located</h1>
        <p className="text-sm text-text-muted max-w-md mx-auto mb-8 leading-relaxed">
          The requested page could not be found. Explore our clinical disciplines or schedule a consultation below.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
          <Link 
            to="/" 
            className="btn-outline text-xs py-3 px-6"
          >
            <span>Return to Studio Home</span>
          </Link>
          <Link 
            to="/booking" 
            className="btn-primary text-xs py-3 px-6 shadow-xs"
          >
            <span>Book Consultation</span>
            <ArrowRight size={14} className="text-accent" />
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
