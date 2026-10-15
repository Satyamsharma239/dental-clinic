import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CLINIC } from '@/data/clinicInfo';
import { 
  CheckCircle2, 
  MessageSquare, 
  Copy, 
  Check, 
  Printer, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  ArrowRight,
  Info,
  AlertCircle
} from 'lucide-react';
import { DentalToothIcon } from '@/components/common/DentalToothIcon';

export default function BookingConfirmationPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBooking = () => {
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const found = bookings.find((b: any) => b.id === bookingId);
      setBooking(found);
      setLoading(false);
    };
    
    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-[70vh] bg-bg flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-card max-w-md w-full text-center border border-border">
          <AlertCircle className="w-12 h-12 text-primary mx-auto mb-3" />
          <h1 className="font-heading text-2xl font-semibold text-primary mb-2">Slip Not Found</h1>
          <p className="text-text-muted mb-6 text-xs leading-relaxed">
            We couldn't locate a demonstration booking with Reference #{bookingId}.
          </p>
          <Link to="/booking" className="btn-primary w-full text-xs">
            Start a New Demo Booking
          </Link>
        </div>
      </div>
    );
  }

  const bookingDate = new Date(booking.date);
  const dateFormatted = bookingDate.toLocaleDateString('en-IN', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  
  const duration = booking.service?.durationMins || 30;

  const startDateTime = new Date(booking.date);
  if (booking.time) {
    const [h, m] = booking.time.split(':').map(Number);
    startDateTime.setHours(h, m, 0, 0);
  }
  const endDateTime = new Date(startDateTime.getTime() + duration * 60 * 1000);

  const formatCalTime = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `Consultation: ${booking.service?.name} — ${CLINIC.name}`
  )}&dates=${formatCalTime(startDateTime)}/${formatCalTime(endDateTime)}&details=${encodeURIComponent(
    `Demonstration booking reference: ${booking.id}\nPatient: ${booking.patientName}\nDuration: ${duration} minutes\nNote: ${booking.notes || 'None'}`
  )}&location=${encodeURIComponent(CLINIC.address.full)}`;

  const whatsappMessage = `🦷 *CONSULTATION SLIP* — ${CLINIC.name}
━━━━━━━━━━━━━━━━━━━━
• Reference: ${booking.id}
• Patient: ${booking.patientName}
• Discipline: ${booking.service?.name}
• Date & Time: ${dateFormatted} at ${booking.time}
• Studio: ${CLINIC.address.full}
━━━━━━━━━━━━━━━━━━━━
📌 Demo portfolio booking showcase.`;

  const whatsappUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleCopyId = () => {
    navigator.clipboard.writeText(booking.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        
        <div className="bg-white rounded-2xl border border-border p-7 sm:p-10 shadow-soft print-clean space-y-6">
          
          <div className="flex items-start justify-between pb-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-accent shadow-xs">
                <DentalToothIcon size={20} className="text-accent" />
              </div>
              <div>
                <h1 className="font-heading text-xl sm:text-2xl font-semibold text-primary">
                  {CLINIC.name}
                </h1>
                <p className="text-xs text-text-muted">
                  Demonstration Consultation Slip
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-accent/20 text-primary border border-accent/40">
              <CheckCircle2 size={13} />
              Prepared
            </span>
          </div>

          <div className="bg-bg p-4 rounded-xl border border-border flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-text-light block">
                Slip Reference
              </span>
              <span className="font-mono text-base font-bold text-primary">
                {booking.id}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyId}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-white text-xs font-medium text-text hover:border-primary transition-colors"
            >
              {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-bg border border-border/80">
              <span className="text-text-muted block text-[11px]">Patient Name</span>
              <span className="font-semibold text-primary text-sm mt-0.5 block">{booking.patientName}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-bg border border-border/80">
              <span className="text-text-muted block text-[11px]">Mobile Number</span>
              <span className="font-semibold text-primary text-sm mt-0.5 font-mono block">+91 {booking.phone}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-bg border border-border/80">
              <span className="text-text-muted block text-[11px]">Discipline</span>
              <span className="font-semibold text-primary text-sm mt-0.5 block">{booking.service?.name}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-bg border border-border/80">
              <span className="text-text-muted block text-[11px]">Scheduled Slot</span>
              <span className="font-semibold text-primary text-sm mt-0.5 font-mono block">
                {dateFormatted} at {booking.time}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-bg border border-border text-xs space-y-1">
            <span className="font-mono uppercase tracking-wider text-text-light text-[10px] block">
              Studio Address
            </span>
            <p className="font-medium text-primary">
              {CLINIC.address.full}
            </p>
            <p className="text-text-muted text-[11px]">
              {CLINIC.transitGuide}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-primary-50/50 border border-primary/10 text-xs text-text-muted space-y-1">
            <p className="font-semibold text-primary flex items-center gap-1.5">
              <Info size={14} className="text-accent" />
              Portfolio Demonstration Note
            </p>
            <p className="text-[11px] leading-relaxed">
              This slip confirms successful execution of the React form validation, client-side persistence, and receipt generation flow.
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 print:hidden">
          <a
            href={googleCalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs py-3 px-4 font-semibold"
          >
            <CalendarIcon size={14} className="text-accent" />
            <span>Add to Google Calendar</span>
          </a>

          <button
            type="button"
            onClick={handlePrint}
            className="btn-outline text-xs py-3 px-4 font-semibold"
          >
            <Printer size={14} />
            <span>Print Consultation Slip</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-border bg-white text-text hover:border-primary text-xs font-medium transition-colors"
          >
            <MessageSquare size={14} className="text-emerald-600" />
            <span>Test WhatsApp Handoff</span>
          </a>

          <Link
            to="/booking"
            className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-border bg-white text-text hover:border-primary text-xs font-medium transition-colors"
          >
            <span>Book Another Demo</span>
            <ArrowRight size={13} />
          </Link>
        </div>

      </div>
    </div>
  );
}
