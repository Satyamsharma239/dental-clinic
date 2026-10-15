import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Calendar, Clock, MessageCircle, Mail, CheckCircle, ArrowRight, Phone } from 'lucide-react';
import { TREATMENTS, Treatment, generateTimeSlots, getMockBookedSlots } from '@/data/services';
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

  const availableDates = useMemo(() => {
    const list: Date[] = [];
    const current = new Date();
    current.setHours(0, 0, 0, 0);

    const now = new Date();
    if (now.getHours() >= 19) {
      current.setDate(current.getDate() + 1);
    }

    let count = 0;
    while (list.length < 14 && count < 25) {
      count++;
      if (current.getDay() !== 0) {
        list.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }
    return list;
  }, []);

  const [selectedDate, setSelectedDate] = useState<Date>(availableDates[0] || new Date());
  const [slots, setSlots] = useState<{ time: string; label: string; available: boolean }[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('');

  useEffect(() => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    const booked = getMockBookedSlots(dateStr);
    const generated = generateTimeSlots(selectedDate, selectedTreatment.durationMins, booked);
    setSlots(generated);

    const firstAvailable = generated.find((s) => s.available);
    if (firstAvailable && (!selectedTime || !generated.some((s) => s.time === selectedTime && s.available))) {
      setSelectedTime(firstAvailable.time);
    } else if (!firstAvailable) {
      setSelectedTime('');
    }
  }, [selectedDate, selectedTreatment]);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = 'Please enter your full name (minimum 2 characters).';
    }

    let cleanDigits = phone.replace(/\D/g, '');
    if (cleanDigits.startsWith('91') && cleanDigits.length === 12) {
      cleanDigits = cleanDigits.substring(2);
    } else if (cleanDigits.startsWith('0') && cleanDigits.length === 11) {
      cleanDigits = cleanDigits.substring(1);
    }

    if (!cleanDigits || cleanDigits.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    } else if (!/^[6-9]\d{9}$/.test(cleanDigits)) {
      newErrors.phone = 'Mobile number must start with 6, 7, 8, or 9.';
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!selectedTime) {
      newErrors.time = 'Please select a preferred time slot.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    const bookingId = `AURA-${randomHex}`;

    const record = {
      id: bookingId,
      name: name.trim(),
      phone: cleanDigits,
      email: email.trim(),
      notes: notes.trim(),
      treatment: selectedTreatment,
      date: selectedDate.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      time: selectedTime,
    };

    setConfirmedBooking(record);
  };

  if (confirmedBooking) {
    const waText = encodeURIComponent(
      `Hello Dr. Sharma, I have scheduled an appointment at Aura Dental Studio:\n\n*Booking ID:* ${confirmedBooking.id}\n*Patient Name:* ${confirmedBooking.name}\n*Treatment:* ${confirmedBooking.treatment.name}\n*Date:* ${confirmedBooking.date}\n*Time:* ${confirmedBooking.time}\n*Phone:* +91 ${confirmedBooking.phone}\n\nPlease confirm my slot. Thank you!`
    );

    const mailtoSubject = encodeURIComponent(`Dental Appointment ${confirmedBooking.id} - ${confirmedBooking.name}`);
    const mailtoBody = encodeURIComponent(
      `Hello Aura Dental Studio Team,\n\nI have booked an appointment on your website.\n\nBooking Reference: ${confirmedBooking.id}\nPatient Name: ${confirmedBooking.name}\nPhone: +91 ${confirmedBooking.phone}\nEmail: ${confirmedBooking.email || 'Not provided'}\nTreatment: ${confirmedBooking.treatment.name}\nDate: ${confirmedBooking.date}\nTime: ${confirmedBooking.time}\nNotes: ${confirmedBooking.notes || 'None'}\n\nPlease confirm availability.\n\nBest regards,\n${confirmedBooking.name}`
    );

    const calTitle = encodeURIComponent(`Dental Visit: ${confirmedBooking.treatment.name} (Dr. Satyam Sharma)`);
    const calDetails = encodeURIComponent(`Booking ID: ${confirmedBooking.id}\nClinic: Aura Dental Studio\nPhone: +91 98201 44521`);
    const calLocation = encodeURIComponent('Studio 204, Waterfield Road, Bandra West, Mumbai 400050');
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&details=${calDetails}&location=${calLocation}`;

    return (
      <div className="bg-surface-subtle py-12 md:py-20 text-slate">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-white rounded-2xl border border-border p-6 sm:p-10 shadow-sm space-y-6">
            
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={32} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block">
                Appointment Received
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate">
                Booking Confirmed!
              </h1>
              <p className="text-sm text-slate-secondary">
                Thank you, <strong>{confirmedBooking.name}</strong>. Your consultation has been received at our Bandra West studio.
              </p>
            </div>

            <div className="bg-surface-subtle rounded-xl p-5 border border-border space-y-3 text-xs sm:text-sm num-tabular">
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="text-slate-muted font-medium">Reference ID</span>
                <span className="font-mono font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md">
                  {confirmedBooking.id}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-muted">Treatment</span>
                <span className="font-bold text-slate">{confirmedBooking.treatment.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-muted">Scheduled Date</span>
                <span className="font-semibold text-slate">{confirmedBooking.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-muted">Time Slot</span>
                <span className="font-semibold text-slate">{confirmedBooking.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-muted">Starting Fee</span>
                <span className="font-bold text-brand-700">{confirmedBooking.treatment.priceFormatted}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border text-xs text-slate-muted">
                <span>Location</span>
                <span className="text-slate">Studio 204, Waterfield Rd, Bandra (W)</span>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={`https://wa.me/${CLINIC.whatsapp}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full text-sm h-11"
              >
                <MessageCircle size={18} />
                <span>Send Confirmation via WhatsApp</span>
              </a>

              <a
                href={`mailto:${CLINIC.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
                className="btn-secondary w-full text-sm h-11"
              >
                <Mail size={16} className="text-brand-600" />
                <span>Email Booking Details to Clinic</span>
              </a>

              <a
                href={googleCalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 rounded-lg border border-border bg-surface-subtle text-slate-secondary hover:bg-slate-100 font-semibold text-xs inline-flex items-center justify-center gap-2 transition-colors"
              >
                <Calendar size={15} />
                <span>Add to Google Calendar</span>
              </a>
            </div>

            <div className="pt-2 text-center">
              <Link to="/" className="text-xs text-brand-600 hover:underline font-semibold">
                ← Return to Homepage
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-subtle py-10 md:py-16 text-slate">
      <div className="max-w-container mx-auto px-4 sm:px-8">
        
        <div className="max-w-2xl mb-8 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block">
            Appointment Booking
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate tracking-tight">
            Schedule your visit in 30 seconds.
          </h1>
          <p className="text-sm sm:text-base text-slate-secondary">
            Select your service, choose an available date and time, and enter your contact details. No advance payment required.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-border shadow-xs">
              
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate">
                  1. Choose Treatment
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {TREATMENTS.map((t) => {
                    const isSelected = selectedTreatment.id === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedTreatment(t)}
                        className={`p-3.5 rounded-xl text-left border transition-all ${
                          isSelected
                            ? 'bg-brand-50 border-brand-500 ring-2 ring-brand-500/20'
                            : 'bg-white border-border hover:bg-surface-subtle'
                        }`}
                      >
                        <div className="font-bold text-sm text-slate">{t.name}</div>
                        <div className="text-xs text-slate-muted mt-0.5">{t.shortDescription}</div>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/60 text-xs num-tabular">
                          <span className="text-slate-muted font-medium">{t.durationLabel}</span>
                          <span className="font-bold text-brand-700">{t.priceFormatted}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                <label className="block text-sm font-bold text-slate">
                  2. Select Consultation Date
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 num-tabular">
                  {availableDates.map((d) => {
                    const isSelected = selectedDate.toDateString() === d.toDateString();
                    return (
                      <button
                        key={d.toISOString()}
                        type="button"
                        onClick={() => setSelectedDate(d)}
                        className={`h-14 rounded-xl text-center border transition-all ${
                          isSelected
                            ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                            : 'bg-white border-border text-slate hover:bg-surface-subtle'
                        }`}
                      >
                        <div className="text-[11px] font-medium uppercase opacity-80 leading-tight">
                          {d.toLocaleDateString('en-IN', { weekday: 'short' })}
                        </div>
                        <div className="text-sm font-bold leading-tight mt-0.5">
                          {d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                <label className="block text-sm font-bold text-slate">
                  3. Select Time Slot
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 num-tabular">
                  {slots.map((s) => {
                    const isSelected = selectedTime === s.time;
                    return (
                      <button
                        key={s.time}
                        type="button"
                        disabled={!s.available}
                        onClick={() => setSelectedTime(s.time)}
                        className={`h-11 rounded-lg text-xs font-semibold border transition-all ${
                          !s.available
                            ? 'bg-surface-muted text-slate-muted/40 border-border line-through cursor-not-allowed'
                            : isSelected
                            ? 'bg-brand-600 text-white border-brand-600 shadow-sm font-bold'
                            : 'bg-white border-border text-slate hover:bg-surface-subtle'
                        }`}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
                {errors.time && (
                  <p className="text-xs text-rose-600 font-medium">{errors.time}</p>
                )}
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <label className="block text-sm font-bold text-slate">
                  4. Your Details
                </label>

                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-secondary mb-1">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full h-11 px-3.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-600 mt-1 font-medium">{errors.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-slate-secondary mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit Indian mobile"
                      className="w-full h-11 px-3.5 rounded-lg border border-border bg-white text-sm num-tabular focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                    {errors.phone && (
                      <p className="text-xs text-rose-600 mt-1 font-medium">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-secondary mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full h-11 px-3.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-600 mt-1 font-medium">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-xs font-semibold text-slate-secondary mb-1">
                    Any specific dental concern or pain? (Optional)
                  </label>
                  <textarea
                    id="notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Tooth sensitivity in lower left molar..."
                    className="w-full p-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                </div>
              </div>

            </div>

            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-border shadow-xs space-y-4">
                <h3 className="font-bold text-base text-slate pb-3 border-b border-border">
                  Appointment Summary
                </h3>

                <div className="space-y-3 text-xs sm:text-sm num-tabular">
                  <div>
                    <span className="text-slate-muted block text-xs">Selected Treatment</span>
                    <span className="font-bold text-slate text-sm">{selectedTreatment.name}</span>
                  </div>

                  <div className="flex justify-between py-1 border-t border-border/60">
                    <span className="text-slate-muted">Duration</span>
                    <span className="font-medium text-slate">{selectedTreatment.durationLabel}</span>
                  </div>

                  <div className="flex justify-between py-1 border-t border-border/60">
                    <span className="text-slate-muted">Date</span>
                    <span className="font-semibold text-slate">
                      {selectedDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-t border-border/60">
                    <span className="text-slate-muted">Time Slot</span>
                    <span className="font-semibold text-brand-700">{selectedTime || 'Please select a slot'}</span>
                  </div>

                  <div className="flex justify-between py-1 border-t border-border/60">
                    <span className="text-slate-muted">Estimated Starting Fee</span>
                    <span className="font-bold text-slate text-base">{selectedTreatment.priceFormatted}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-primary w-full h-12 text-sm font-bold shadow-md"
                  >
                    <span>Confirm Booking</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                <div className="text-[11px] text-slate-muted text-center pt-1">
                  🔒 No advance deposit needed. Payment is made at clinic.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1.5 text-emerald-900">
                <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                  <MessageCircle size={15} />
                  <span>Prefer booking directly on WhatsApp?</span>
                </div>
                <p className="text-emerald-700 leading-relaxed">
                  You can chat directly with Dr. Satyam Sharma's front desk on WhatsApp for immediate confirmation.
                </p>
                <a
                  href={`https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent('Hi Dr. Sharma, I want to book an appointment directly through WhatsApp.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-800 underline block pt-1"
                >
                  Click here to WhatsApp us →
                </a>
              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
}
