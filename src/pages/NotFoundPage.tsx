import { Link } from 'react-router-dom';
import { Calendar, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="bg-slate-50 py-20 sm:py-32 text-slate-800 font-sans">
      <div className="max-w-md mx-auto px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-teal-100 text-teal-800 border border-teal-200 flex items-center justify-center mx-auto font-bold text-2xl">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We could not find the page you were looking for. It may have been moved or the URL was typed incorrectly.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link to="/" className="btn-primary text-xs h-11 px-5">
            <Home size={15} />
            <span>Return to Homepage</span>
          </Link>
          <Link to="/book" className="btn-secondary text-xs h-11 px-5">
            <Calendar size={15} />
            <span>Book Appointment</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
