import { Link } from 'react-router-dom';
import { Calendar, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="bg-canvas py-16 sm:py-28 text-ink">
      <div className="max-w-md mx-auto px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-xs bg-sage-100 text-sage-900 border border-sage-200 flex items-center justify-center mx-auto font-mono text-2xl font-medium">
          404
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-ink">
            Page Not Found
          </h1>
          <p className="font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed">
            We could not find the page you were looking for. It may have been moved or the address was typed incorrectly.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-sans">
          <Link to="/" className="btn-primary text-xs h-10 px-5">
            <Home size={14} />
            <span>Return to Homepage</span>
          </Link>
          <Link to="/book" className="btn-secondary text-xs h-10 px-5">
            <Calendar size={14} />
            <span>Schedule Consultation</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
