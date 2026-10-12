import { Link } from 'react-router-dom';
import FadeIn from '@/components/FadeIn';
import { DentalToothIcon } from '@/components/common/DentalToothIcon';
import { Calendar, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center py-20">
      <FadeIn>
        <div className="w-16 h-16 rounded-2xl bg-primary-50 text-primary flex items-center justify-center mx-auto mb-6 shadow-sm border border-primary/20">
          <DentalToothIcon size={32} className="text-accent" />
        </div>
        <div className="text-7xl font-heading text-primary font-bold mb-4">404</div>
        <h1 className="text-3xl sm:text-4xl font-heading text-primary font-bold mb-3">Page Not Found</h1>
        <p className="text-sm text-text-muted max-w-md mx-auto mb-8 leading-relaxed">
          You might have followed an outdated link or typed the address incorrectly. Let us help you get back to our clinic schedule.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
          <Link 
            to="/" 
            className="btn-outline text-xs py-3 px-6"
          >
            <Home size={15} />
            <span>Return to Homepage</span>
          </Link>
          <Link 
            to="/booking" 
            className="btn-primary text-xs py-3 px-6 shadow-md"
          >
            <Calendar size={15} />
            <span>Book Appointment</span>
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
