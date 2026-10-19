import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MessageCircle, Mail, CheckCircle2, MapPin, ShieldCheck, User, Phone as PhoneIcon, ChevronDown } from 'lucide-react';
import { TREATMENTS, Treatment } from '@/data/services';
import { CLINIC } from '@/data/clinicInfo';
import PageHero from '@/components/PageHero';
import TimeSlotPicker from '@/components/booking/TimeSlotPicker';

export default function BookingPage() {
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

  const getMinDateString = () => {
    const today = new Date();
    return new Date(today.getTime() - today.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
  };

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [patientNotes, setPatientNotes] = useState<string>('');
  const [isAnxious, setIsAnxious] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string; email?: string; treatment?: string; date?: string; time?: string }>({});
  const [appointmentRequest, setAppointmentRequest] = useState<{
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
    const errs: { name?: string; phone?: string; email?: string; treatment?: string; date?: string; time?: string } = {};

    if (!patientName.trim() || patientName.trim().length < 2) {
      errs.name = 'Please enter your full name (letters only).';
    }

    const cleanDigits = patientPhone.replace(/\D/g, '');
    if (!cleanDigits || cleanDigits.length !== 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number.';
    } else if (!/^[6-9]\d{9}$/.test(cleanDigits)) {
      errs.phone = 'Mobile number must start with 6, 7, 8, or 9.';
    }

    if (!patientEmail.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientEmail.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!selectedTreatment) {
      errs.treatment = 'Please select a treatment.';
    }

    if (!selectedDate) {
      errs.date = 'Please select your preferred date.';
    }

    if (!selectedTime) {
      errs.time = 'Please select your preferred time.';
    }

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePrepareRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const cleanPhoneDigits = patientPhone.replace(/\D/g, '');
    const readableDate = formatDisplayDate(selectedDate);

    if (!selectedTreatment) return;

    const record = {
      name: patientName.trim(),
      phone: cleanPhoneDigits,
      email: patientEmail.trim(),
      notes: patientNotes.trim(),
      isAnxious,
      treatment: selectedTreatment,
      date: readableDate,
      time: selectedTime,
    };

    setAppointmentRequest(record);
  };

  if (appointmentRequest) {
    const waText = encodeURIComponent(
      `Hello Dr. Sharma, I would like to book an appointment at Aura Dental Studio:\n\n*Patient Name:* ${appointmentRequest.name}\n*Treatment:* ${appointmentRequest.treatment.name}\n*Preferred Date:* ${appointmentRequest.date}\n*Preferred Time:* ${appointmentRequest.time}\n*Phone:* +91 ${appointmentRequest.phone}\n*Email:* ${appointmentRequest.email}\n*Gentle Care Buffer:* ${appointmentRequest.isAnxious ? 'Yes, requested' : 'Standard'}\n\nPlease confirm availability and my visit time. Thank you!`
    );

    const mailtoSubject = encodeURIComponent(`Appointment Request - ${appointmentRequest.name}`);
    const mailtoBody = encodeURIComponent(
      `Hello Aura Dental Studio Team,\n\nI would like to request an appointment with Dr. Satyam Sharma.\n\nPatient Name: ${appointmentRequest.name}\nPhone: +91 ${appointmentRequest.phone}\nEmail: ${appointmentRequest.email || 'Not provided'}\nTreatment: ${appointmentRequest.treatment.name}\nPreferred Date: ${appointmentRequest.date}\nPreferred Time: ${appointmentRequest.time}\nGentle Care Buffer: ${appointmentRequest.isAnxious ? 'Yes (requested)' : 'Standard'}\nNotes: ${appointmentRequest.notes || 'None'}\n\nPlease confirm availability and my visit time.\n\nBest regards,\n${appointmentRequest.name}`
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
                Appointment Request
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Your Booking Details
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Thanks, <strong>{appointmentRequest.name}</strong>. Choose a contact option to send your request. Your visit is not booked until the clinic confirms the date and time.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Treatment</span>
                <span className="font-bold text-slate-900">{appointmentRequest.treatment.name}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Preferred Date</span>
                <span className="font-bold text-slate-900">{appointmentRequest.date}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Preferred Time</span>
                <span className="font-bold text-slate-900">{appointmentRequest.time}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Contact Number</span>
                <span className="font-bold text-slate-900">+91 {appointmentRequest.phone}</span>
              </div>
              <div className="flex justify-between pt-2.5 border-t border-slate-200 text-xs text-slate-500">
                <span>Location</span>
                <span className="text-slate-800 font-semibold">Studio 204, Waterfield Rd, Bandra (W)</span>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={`mailto:${CLINIC.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
                className="btn-primary w-full text-xs h-11"
              >
                <Mail size={15} />
                <span>Continue with Email</span>
              </a>

              <a
                href={`https://wa.me/${CLINIC.whatsapp}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full text-xs h-11"
              >
                <MessageCircle size={16} />
                <span>Continue with WhatsApp</span>
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
      
      <PageHero
        eyebrow="Book Your Visit · Bandra West"
        title="Book an Appointment with Dr. Sharma"
        description="Choose your service and preferred date. The clinic will confirm a suitable visit time after receiving your booking details."
      />

      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Select Treatment / Service *
                </label>
                <div className="relative">
                  <select
                  value={selectedTreatment?.id ?? ''}
                  onChange={(e) => {
                    const found = TREATMENTS.find((t) => t.id === e.target.value);
                    setSelectedTreatment(found ?? null);
                    if (formErrors.treatment) setFormErrors({ ...formErrors, treatment: undefined });
                  }}
                  className={`h-14 w-full appearance-none rounded-xl border bg-white py-3 pl-4 pr-12 text-sm font-semibold text-slate-800 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 ${
                    formErrors.treatment ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-200 hover:border-teal-300'
                  }`}
                >
                  <option value="" disabled>Select a treatment or consultation</option>
                  {TREATMENTS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.category ? `${t.category} · ${t.name}` : t.name}
                    </option>
                  ))}
                  </select>
                  <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" />
                </div>
                {formErrors.treatment && (
                  <p className="text-xs text-red-600 font-medium">{formErrors.treatment}</p>
                )}
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
                  <label htmlFor="preferred-time" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Preferred Time *
                  </label>
                  <TimeSlotPicker
                    id="preferred-time"
                    selectedTime={selectedTime}
                    onSelect={(time) => {
                      setSelectedTime(time);
                      if (formErrors.time) setFormErrors({ ...formErrors, time: undefined });
                    }}
                  />
                  {formErrors.time && (
                    <p className="text-xs text-red-600 font-medium">{formErrors.time}</p>
                  )}
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
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        id="patientEmail"
                        type="email"
                        required
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
                <p className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Booking Details
                </p>

                <button
                  type="button"
                  onClick={handlePrepareRequest}
                  className="btn-primary w-full h-12 text-sm font-bold flex items-center justify-center gap-2 shadow-sm"
                >
                  <Calendar size={18} />
                  <span>Review Booking Details</span>
                </button>

                <p className="text-xs text-slate-500 text-center font-medium">
                  No payment is collected online. Your appointment is confirmed when the clinic contacts you.
                </p>
              </div>

            </div>

            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
              
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block">Summary</span>
                    <h3 className="text-lg font-extrabold text-slate-900">Booking Summary</h3>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-teal-50 text-teal-800 rounded-md border border-teal-100">
                    Bandra West
                  </span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Service</span>
                    <span className="font-bold text-slate-900 text-right">{selectedTreatment?.name ?? 'Not selected'}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Preferred Date</span>
                    <span className="font-bold text-slate-900">{formatDisplayDate(selectedDate)}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Preferred Time</span>
                    <span className="font-bold text-slate-900">{selectedTime || 'Not selected'}</span>
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
                    Sagar Fortune Building, Near National College, Bandra West.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-teal-900 space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <ShieldCheck size={16} className="text-teal-700" />
                  <span>Our Patient Promise</span>
                </div>
                <p className="text-teal-800 leading-relaxed text-[11px]">
                  We never start treatment without your full understanding. We explain the recommended steps and materials beforehand.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
