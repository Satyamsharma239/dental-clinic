import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CLINIC } from '@/data/clinicInfo';
import { 
  CheckCircle2, 
  MessageSquare, 
  Mail, 
  Copy,
  Check,
  Printer, 
  Clock,
  AlertCircle,
  MapPin,
  Calendar
} from 'lucide-react';

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
        <div className="w-8 h-8 border-3 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-[70vh] bg-bg flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-card max-w-md w-full text-center border border-primary/10">
          <AlertCircle className="w-16 h-16 text-amber-600 mx-auto mb-4" />
          <h1 className="font-heading text-2xl font-bold text-primary mb-2">Booking Not Found</h1>
          <p className="text-text-muted mb-6 text-xs leading-relaxed">
            We couldn't locate a booking with Reference #{bookingId}.
          </p>
          <Link to="/booking" className="btn-primary w-full text-xs">
            Book an Appointment
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

  // Formatted WhatsApp Receipt
  const whatsappMessage = `🦷 *APPOINTMENT CONFIRMED* - ${CLINIC.name}
━━━━━━━━━━━━━━━━━━━━
• *Booking ID*: ${booking.id}
• *Patient*: ${booking.patientName}
• *Treatment*: ${booking.service?.name}
• *Date & Time*: ${dateFormatted} at ${booking.time}
• *Doctor*: ${CLINIC.doctor.name} (${CLINIC.doctor.qualification})
• *Address*: ${CLINIC.address.full}
• *Landmark*: ${CLINIC.landmark}
━━━━━━━━━━━━━━━━━━━━
📌 *Note*: No advance payment required. Please arrive 10 minutes prior to your slot.
Need help? Call: ${CLINIC.phoneDisplay}`;

  const whatsappUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  // Formatted Email
  const emailSubject = `Dental Appointment Confirmed [${booking.id}] - ${CLINIC.name}`;
  const emailBody = `Dear ${booking.patientName},

Your dental appointment at ${CLINIC.name} is confirmed.

DETAILS:
- Booking Reference ID: ${booking.id}
- Treatment: ${booking.service?.name}
- Scheduled Slot: ${dateFormatted} at ${booking.time}
- Consulting Doctor: ${CLINIC.doctor.name} (${CLINIC.doctor.qualification})
- Clinic Address: ${CLINIC.address.full}
- Landmark: ${CLINIC.landmark}

PRE-VISIT INSTRUCTIONS:
1. Please arrive 10 minutes before your slot.
2. Payment is settled at the clinic desk (Cash, UPI, Cards accepted).
3. For rescheduling or emergencies, call ${CLINIC.phoneDisplay}.

Kind regards,
${CLINIC.name}`;

  const emailUrl = `mailto:${booking.email || CLINIC.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(whatsappMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-bg py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        
        {/* Simple & Clean Confirmation Card */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-card border border-primary/10 text-center">
          
          {/* Green Check Icon */}
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={36} />
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-primary mb-1">
            Appointment Confirmed!
          </h1>
          <p className="text-text-muted text-xs sm:text-sm">
            Thank you, <strong className="text-primary">{booking.patientName}</strong>. Your appointment has been scheduled with <strong className="text-primary">{CLINIC.doctor.name}</strong>.
          </p>

          {/* Reference ID Pill */}
          <div className="mt-5 inline-block bg-primary-50 px-5 py-2.5 rounded-xl border border-primary/15">
            <span className="text-xs text-text-muted font-medium">Booking ID: </span>
            <span className="font-mono text-base font-bold text-primary">{booking.id}</span>
          </div>

          {/* Clean Receipt Box */}
          <div className="mt-6 bg-bg rounded-xl p-5 border border-primary/10 text-left space-y-3 text-xs">
            <div className="flex justify-between items-center pb-2.5 border-b border-primary/10">
              <span className="text-text-muted">Treatment:</span>
              <span className="font-bold text-primary text-sm">{booking.service?.name}</span>
            </div>

            <div className="flex justify-between items-center pb-2.5 border-b border-primary/10">
              <span className="text-text-muted">Date & Time:</span>
              <span className="font-bold text-primary">{dateFormatted} at {booking.time}</span>
            </div>

            <div className="flex justify-between items-center pb-2.5 border-b border-primary/10">
              <span className="text-text-muted">Doctor:</span>
              <span className="font-medium text-text">{CLINIC.doctor.name} ({CLINIC.doctor.qualification})</span>
            </div>

            <div className="flex justify-between items-center pb-2.5 border-b border-primary/10">
              <span className="text-text-muted">Duration:</span>
              <span className="font-mono text-text">{duration} minutes</span>
            </div>

            <div className="flex justify-between items-start pt-1">
              <span className="text-text-muted">Clinic Address:</span>
              <span className="text-right text-text max-w-[240px] font-medium leading-relaxed">
                {CLINIC.address.full}
              </span>
            </div>
          </div>

          {/* Notification Info */}
          <p className="mt-4 text-xs text-text-muted">
            Confirmation message is ready for your WhatsApp (<strong>+91 {booking.phone}</strong>)
            {booking.email ? <> and Email (<strong>{booking.email}</strong>)</> : ''}.
          </p>

          {/* Action Buttons: WhatsApp & Email Integrated */}
          <div className="mt-6 space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <MessageSquare size={16} />
                <span>Open on WhatsApp</span>
              </a>

              <a
                href={emailUrl}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-primary hover:bg-primary-light text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <Mail size={16} />
                <span>Open Email Receipt</span>
              </a>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="w-full py-2.5 px-4 bg-bg border border-primary/15 hover:bg-neutral-100 text-text rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-colors"
            >
              {copied ? <Check size={14} className="text-emerald-700" /> : <Copy size={14} />}
              <span>{copied ? 'Receipt Copied to Clipboard!' : 'Copy WhatsApp Receipt Text'}</span>
            </button>
          </div>

          {/* Secondary Actions */}
          <div className="mt-6 pt-4 border-t border-primary/10 flex items-center justify-between text-xs">
            <button
              onClick={() => window.print()}
              className="text-text-muted hover:text-primary flex items-center gap-1.5 transition-colors"
            >
              <Printer size={14} />
              <span>Print Appointment Slip</span>
            </button>

            <Link to="/" className="text-accent font-semibold hover:underline">
              ← Back to Homepage
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
