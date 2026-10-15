import { Link } from 'react-router-dom';
import { Calendar, Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="bg-surface-subtle py-16 md:py-28 text-slate">
      <div className="max-w-md mx-auto px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center mx-auto font-extrabold text-2xl">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-secondary leading-relaxed">
            We couldn't find the page you were looking for. It may have been moved or the link was typed incorrectly.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link to="/" className="btn-primary text-xs h-10 px-5">
            <Home size={14} />
            <span>Go to Homepage</span>
          </Link>
          <Link to="/book" className="btn-secondary text-xs h-10 px-5">
            <Calendar size={14} />
            <span>Book Appointment</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
