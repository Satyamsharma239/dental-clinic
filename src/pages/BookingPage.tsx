import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Calendar, MessageCircle, Mail, CheckCircle2, MapPin, Sparkles, ShieldCheck, User, Phone as PhoneIcon } from 'lucide-react';
import { TREATMENTS, Treatment } from '@/data/services';
import { CLINIC } from '@/data/clinicInfo';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const preselectedSlug = searchParams.get('service');

  const selectedTreatmentInitial = useMemo(() => {
    if (preselectedSlug) {
      const found = TREATMENTS.find((t) => t.slug === preselectedSlug);
      if (found) return found;
    }
    return TREATMENTS[0];
  }, [preselectedSlug]);

  const [selectedTreatment, setSelectedTreatment] = useState<Treatment>(selectedTreatmentInitial);

  const getMinDateString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getDefaultDateString = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState<string>(getDefaultDateString());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('Morning (10:00 AM – 1:30 PM)');
  const [bookingMethod, setBookingMethod] = useState<'whatsapp' | 'email'>('whatsapp');

  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [patientNotes, setPatientNotes] = useState<string>('');
  const [isAnxious, setIsAnxious] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string; email?: string; date?: string }>({});
  const [confirmedBooking, setConfirmedBooking] = useState<{
    id: string;
    name: string;
    phone: string;
    email: string;
    notes: string;
    isAnxious: boolean;
    treatment: Treatment;
    date: string;
    time: string;
  } | null>(null);

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return 'Not selected';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('en-IN', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
      }
    }
    return dateStr;
  };

  const validate = () => {
    const errs: { name?: string; phone?: string; email?: string; date?: string } = {};

    if (!patientName.trim() || patientName.trim().length < 2) {
      errs.name = 'Please enter your full name (letters only).';
    }

    const cleanDigits = patientPhone.replace(/\D/g, '');
    if (!cleanDigits || cleanDigits.length !== 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number.';
    } else if (!/^[6-9]\d{9}$/.test(cleanDigits)) {
      errs.phone = 'Mobile number must start with 6, 7, 8, or 9.';
    }

    if (patientEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientEmail.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!selectedDate) {
      errs.date = 'Please select your preferred date.';
    }

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const hex = Math.random().toString(36).substring(2, 8).toUpperCase();
    const id = `AURA-${hex}`;
    const cleanPhoneDigits = patientPhone.replace(/\D/g, '');
    const readableDate = formatDisplayDate(selectedDate);

    const record = {
      id,
      name: patientName.trim(),
      phone: cleanPhoneDigits,
      email: patientEmail.trim(),
      notes: patientNotes.trim(),
      isAnxious,
      treatment: selectedTreatment,
      date: readableDate,
      time: selectedTimeSlot,
    };

    setConfirmedBooking(record);

    if (bookingMethod === 'whatsapp') {
      const text =
        `*AURA DENTAL STUDIO — APPOINTMENT REQUEST*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `• *Booking ID:* ${record.id}\n` +
        `• *Patient Name:* ${record.name}\n` +
        `• *Mobile:* +91 ${record.phone}\n` +
        `• *Treatment:* ${record.treatment.name}\n` +
        `• *Preferred Date:* ${record.date}\n` +
        `• *Time Window:* ${record.time}\n` +
        `• *Gentle Care Buffer:* ${record.isAnxious ? 'Yes, requested' : 'Standard'}\n` +
        `• *Notes:* ${record.notes || 'None'}\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `Hello Dr. Sharma, please confirm this consultation appointment at your Bandra West studio.`;

      const url = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      const subject = `Dental Appointment ${record.id}: ${record.name} - ${record.treatment.name}`;
      const body =
        `Hello Aura Dental Studio Team,\n\n` +
        `I would like to schedule an appointment with Dr. Satyam Sharma.\n\n` +
        `Booking Reference: ${record.id}\n` +
        `Patient Name: ${record.name}\n` +
        `Phone Number: +91 ${record.phone}\n` +
        `Email Address: ${record.email || 'Not provided'}\n` +
        `Selected Treatment: ${record.treatment.name}\n` +
        `Preferred Date: ${record.date}\n` +
        `Time Window: ${record.time}\n` +
        `Gentle Care Buffer: ${record.isAnxious ? 'Yes (requested)' : 'Standard'}\n` +
        `Patient Notes: ${record.notes || 'None'}\n\n` +
        `Thank you!\n${record.name}`;

      const url = `mailto:${CLINIC.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = url;
    }
  };

  if (confirmedBooking) {
    const waText = encodeURIComponent(
      `Hello Dr. Sharma, I have scheduled an appointment at Aura Dental Studio:\n\n*Booking ID:* ${confirmedBooking.id}\n*Patient Name:* ${confirmedBooking.name}\n*Treatment:* ${confirmedBooking.treatment.name}\n*Date:* ${confirmedBooking.date}\n*Time:* ${confirmedBooking.time}\n*Phone:* +91 ${confirmedBooking.phone}\n*Gentle Care Buffer:* ${confirmedBooking.isAnxious ? 'Yes, requested' : 'Standard'}\n\nPlease confirm my slot. Thank you!`
    );

    const mailtoSubject = encodeURIComponent(`Dental Appointment ${confirmedBooking.id} - ${confirmedBooking.name}`);
    const mailtoBody = encodeURIComponent(
      `Hello Aura Dental Studio Team,\n\nI have booked an appointment on your website.\n\nBooking Reference: ${confirmedBooking.id}\nPatient Name: ${confirmedBooking.name}\nPhone: +91 ${confirmedBooking.phone}\nEmail: ${confirmedBooking.email || 'Not provided'}\nTreatment: ${confirmedBooking.treatment.name}\nDate: ${confirmedBooking.date}\nTime: ${confirmedBooking.time}\nGentle Care Buffer: ${confirmedBooking.isAnxious ? 'Yes (requested)' : 'Standard'}\nNotes: ${confirmedBooking.notes || 'None'}\n\nPlease confirm availability.\n\nBest regards,\n${confirmedBooking.name}`
    );

    return (
      <div className="bg-slate-50 py-16 sm:py-24 text-slate-800 font-sans min-h-[70vh]">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-lg space-y-6">
            
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 size={32} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block">
                Appointment Received
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Consultation Request Prepared
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Thank you, <strong>{confirmedBooking.name}</strong>. Your consultation details have been recorded.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Reference Code</span>
                <span className="font-mono font-bold text-teal-800 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                  {confirmedBooking.id}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Treatment</span>
                <span className="font-bold text-slate-900">{confirmedBooking.treatment.name}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Scheduled Date</span>
                <span className="font-bold text-slate-900">{confirmedBooking.date}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Time Window</span>
                <span className="font-bold text-teal-800">{confirmedBooking.time}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Contact Number</span>
                <span className="font-bold text-slate-900">+91 {confirmedBooking.phone}</span>
              </div>
              <div className="flex justify-between pt-2.5 border-t border-slate-200 text-xs text-slate-500">
                <span>Location</span>
                <span className="text-slate-800 font-semibold">Studio 204, Waterfield Rd, Bandra (W)</span>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={`https://wa.me/${CLINIC.whatsapp}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full text-xs h-11"
              >
                <MessageCircle size={16} />
                <span>Confirm on WhatsApp (Instant Response)</span>
              </a>

              <a
                href={`mailto:${CLINIC.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
                className="btn-secondary w-full text-xs h-11"
              >
                <Mail size={15} className="text-slate-600" />
                <span>Send Confirmation via Email</span>
              </a>
            </div>

            <div className="pt-2 text-center">
              <Link to="/" className="text-xs font-bold text-teal-700 hover:underline">
                ← Return to Homepage
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 text-slate-800 font-sans">
      
      <section className="py-14 sm:py-20 bg-gradient-to-br from-teal-50 via-slate-50 to-emerald-50/50 border-b border-slate-200">
        <div className="max-w-container mx-auto px-4 sm:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white border border-teal-200 text-teal-800 shadow-xs">
            <Sparkles size={14} className="text-teal-600" />
            <span>Direct Practice Booking · Bandra West</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Schedule Your Dental Visit with Dr. Sharma
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Choose your service, select your preferred date and time, and we will confirm your consultation slot without delay.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Select Treatment / Service *
                </label>
                <select
                  value={selectedTreatment.id}
                  onChange={(e) => {
                    const found = TREATMENTS.find((t) => t.id === e.target.value);
                    if (found) setSelectedTreatment(found);
                  }}
                  className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl text-sm text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-teal-600"
                >
                  {TREATMENTS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1 px-1">
                  <span>Consultation Fee</span>
                  <span className="text-teal-800 font-bold">{selectedTreatment.priceFormatted}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="date" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Preferred Date *
                  </label>
                  <input
                    id="date"
                    type="date"
                    min={getMinDateString()}
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      if (formErrors.date) setFormErrors({ ...formErrors, date: undefined });
                    }}
                    className={`w-full h-12 px-4 bg-white border rounded-xl text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                      formErrors.date ? 'border-red-400 ring-1 ring-red-400 bg-red-50/20' : 'border-slate-300'
                    }`}
                  />
                  {formErrors.date && (
                    <p className="text-xs text-red-600 font-medium">{formErrors.date}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Preferred Time Window *
                  </label>
                  <select
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600"
                  >
                    <option value="Morning (10:00 AM – 1:30 PM)">Morning Session (10:00 AM – 1:30 PM)</option>
                    <option value="Evening (4:30 PM – 7:30 PM)">Evening Session (4:30 PM – 7:30 PM)</option>
                    <option value="Emergency Priority / Earliest Available">Emergency Priority / Earliest Available</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-200">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Patient Contact Details
                </label>

                <div>
                  <label htmlFor="patientName" className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      id="patientName"
                      type="text"
                      value={patientName}
                      onChange={(e) => {
                        const lettersOnly = e.target.value.replace(/[^a-zA-Z\s.]/g, '');
                        setPatientName(lettersOnly);
                        if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                      }}
                      placeholder="e.g. Meera Desai (letters only)"
                      className={`w-full h-11 pl-10 pr-4 rounded-xl border bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                        formErrors.name ? 'border-red-400 ring-1 ring-red-400 bg-red-50/20' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  {formErrors.name && (
                    <p className="text-xs text-red-600 mt-1 font-medium">{formErrors.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="patientPhone" className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <PhoneIcon size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        id="patientPhone"
                        type="tel"
                        value={patientPhone}
                        onChange={(e) => {
                          const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setPatientPhone(digitsOnly);
                          if (formErrors.phone) setFormErrors({ ...formErrors, phone: undefined });
                        }}
                        placeholder="10-digit mobile"
                        className={`w-full h-11 pl-10 pr-4 rounded-xl border bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                          formErrors.phone ? 'border-red-400 ring-1 ring-red-400 bg-red-50/20' : 'border-slate-300'
                        }`}
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-xs text-red-600 mt-1 font-medium">{formErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="patientEmail" className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address (optional)
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        id="patientEmail"
                        type="email"
                        value={patientEmail}
                        onChange={(e) => {
                          setPatientEmail(e.target.value);
                          if (formErrors.email) setFormErrors({ ...formErrors, email: undefined });
                        }}
                        placeholder="your.email@example.com"
                        className={`w-full h-11 pl-10 pr-4 rounded-xl border bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                          formErrors.email ? 'border-red-400 ring-1 ring-red-400 bg-red-50/20' : 'border-slate-300'
                        }`}
                      />
                    </div>
                    {formErrors.email && (
                      <p className="text-xs text-red-600 mt-1 font-medium">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer select-none hover:border-slate-300 transition-colors">
                  <input
                    type="checkbox"
                    checked={isAnxious}
                    onChange={(e) => setIsAnxious(e.target.checked)}
                    className="rounded text-teal-600 focus:ring-teal-600 w-4 h-4 shrink-0"
                  />
                  <span className="text-xs text-slate-700">
                    First visit or feel nervous? <strong>Request gentle, unhurried care.</strong>
                  </span>
                </label>

                <div>
                  <label htmlFor="patientNotes" className="block text-xs font-bold text-slate-700 mb-1">
                    Any specific tooth concern or history? (Optional)
                  </label>
                  <textarea
                    id="patientNotes"
                    rows={2}
                    value={patientNotes}
                    onChange={(e) => setPatientNotes(e.target.value)}
                    placeholder="e.g. Sensitivity to cold drinks, broken filling, or interested in invisible braces..."
                    className="w-full p-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Confirm Appointment Via
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setBookingMethod('whatsapp')}
                      className={`h-11 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all ${
                        bookingMethod === 'whatsapp'
                          ? 'bg-emerald-50 border-[#25D366] text-emerald-800 ring-2 ring-[#25D366] shadow-xs'
                          : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <MessageCircle size={16} className="text-[#25D366]" />
                      <span>WhatsApp (Instant)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookingMethod('email')}
                      className={`h-11 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all ${
                        bookingMethod === 'email'
                          ? 'bg-teal-50 border-teal-600 text-teal-900 ring-2 ring-teal-600 shadow-xs'
                          : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Mail size={16} className="text-teal-700" />
                      <span>Email Confirmation</span>
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className={
                    bookingMethod === 'whatsapp'
                      ? 'btn-whatsapp w-full h-12 text-sm font-bold flex items-center justify-center gap-2 shadow-sm'
                      : 'btn-primary w-full h-12 text-sm font-bold flex items-center justify-center gap-2 shadow-sm'
                  }
                >
                  {bookingMethod === 'whatsapp' ? (
                    <>
                      <MessageCircle size={18} />
                      <span>Confirm Appointment on WhatsApp</span>
                    </>
                  ) : (
                    <>
                      <Calendar size={18} />
                      <span>Confirm Appointment via Email</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-slate-500 text-center font-medium">
                  No advance payment required. Free cancellation or rescheduling at any time.
                </p>
              </div>

            </div>

            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
              
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block">Summary</span>
                    <h3 className="text-lg font-extrabold text-slate-900">Your Appointment</h3>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-teal-50 text-teal-800 rounded-md border border-teal-100">
                    Bandra West
                  </span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Service</span>
                    <span className="font-bold text-slate-900 text-right">{selectedTreatment.name}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Starting Fee</span>
                    <span className="font-extrabold text-teal-800">{selectedTreatment.priceFormatted}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Selected Date</span>
                    <span className="font-bold text-slate-900">{formatDisplayDate(selectedDate)}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Time Window</span>
                    <span className="font-bold text-teal-800">{selectedTimeSlot}</span>
                  </div>

                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Dentist</span>
                    <span className="font-medium text-slate-800">Dr. Satyam Sharma, MDS</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <MapPin size={13} className="text-teal-700" />
                    <span>Studio 204, Waterfield Road</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Sagar Fortune Building, Near National College, Bandra West. Dedicated visitor parking on arrival.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-teal-900 space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <ShieldCheck size={16} className="text-teal-700" />
                  <span>Our Patient Promise</span>
                </div>
                <p className="text-teal-800 leading-relaxed text-[11px]">
                  We never start any treatment without your full understanding. You receive a printed itemized quote with material specifications beforehand.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
