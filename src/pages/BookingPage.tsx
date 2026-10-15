import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Calendar, Clock, MessageCircle, Mail, CheckCircle2, ArrowRight, Phone } from 'lucide-react';
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
      <div className="bg-canvas py-12 sm:py-20 text-ink">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-sm border border-hairline p-6 sm:p-10 shadow-2xs space-y-6 font-sans">
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xs bg-sage-100 text-sage-900 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 size={28} />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-sand-700 block">
                Appointment Scheduled
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-medium text-ink">
                Consultation Confirmed
              </h1>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                Thank you, <strong>{confirmedBooking.name}</strong>. Your consultation has been received at our Bandra West studio.
              </p>
            </div>

            <div className="bg-canvas-subtle rounded-xs p-5 border border-hairline space-y-3 text-xs num-tabular">
              <div className="flex justify-between items-center pb-2 border-b border-hairline">
                <span className="text-ink-muted">Reference ID</span>
                <span className="font-mono font-medium text-sage-800 bg-white px-2.5 py-0.5 rounded-xs border border-border">
                  {confirmedBooking.id}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">Treatment</span>
                <span className="font-medium text-ink">{confirmedBooking.treatment.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">Scheduled Date</span>
                <span className="font-medium text-ink">{confirmedBooking.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">Time Slot</span>
                <span className="font-medium text-sage-800">{confirmedBooking.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">Estimated Starting Fee</span>
                <span className="font-mono font-medium text-ink">{confirmedBooking.treatment.priceFormatted}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-hairline text-xs text-ink-muted">
                <span>Location</span>
                <span className="text-ink">Studio 204, Waterfield Rd, Bandra (W)</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <a
                href={`https://wa.me/${CLINIC.whatsapp}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full text-xs h-11"
              >
                <MessageCircle size={16} />
                <span>Confirm on WhatsApp (Instant)</span>
              </a>

              <a
                href={`mailto:${CLINIC.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
                className="btn-secondary w-full text-xs h-11"
              >
                <Mail size={14} className="text-ink-muted" />
                <span>Email Booking Details to Clinic</span>
              </a>

              <a
                href={googleCalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 rounded-xs border border-border bg-canvas-subtle text-ink-secondary hover:bg-canvas-muted text-xs font-medium inline-flex items-center justify-center gap-2 transition-colors"
              >
                <Calendar size={14} />
                <span>Add to Google Calendar</span>
              </a>
            </div>

            <div className="pt-2 text-center">
              <Link to="/" className="text-xs text-sage-800 hover:underline">
                ← Return to Homepage
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-canvas py-12 sm:py-20 text-ink">
      <div className="max-w-container mx-auto px-4 sm:px-8">
        
        <div className="max-w-2xl mb-10 space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.14em] text-sand-700 block">
            Appointment Booking
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-ink tracking-tight leading-tight">
            Schedule your visit in Bandra West.
          </h1>
          <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
            Select your service, choose an available date and time, and enter your contact details. No advance deposit required.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-sans">
            
            <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-sm border border-hairline shadow-2xs">
              
              <div className="space-y-3">
                <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted">
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
                        className={`p-3.5 rounded-xs text-left border transition-all ${
                          isSelected
                            ? 'bg-sage-50 border-sage-700 ring-1 ring-sage-700'
                            : 'bg-white border-border hover:bg-canvas-subtle'
                        }`}
                      >
                        <div className="font-serif text-base font-medium text-ink">{t.name}</div>
                        <div className="text-xs text-ink-muted mt-0.5 line-clamp-1">{t.shortDescription}</div>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-hairline text-xs num-tabular">
                          <span className="text-ink-muted">{t.durationLabel}</span>
                          <span className="font-mono font-medium text-sage-800">{t.priceFormatted}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-hairline">
                <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted">
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
                        className={`h-14 rounded-xs text-center border transition-all ${
                          isSelected
                            ? 'bg-sage-800 text-canvas border-sage-800 shadow-2xs'
                            : 'bg-white border-border text-ink hover:bg-canvas-subtle'
                        }`}
                      >
                        <div className="text-[10px] font-mono uppercase opacity-70 leading-tight">
                          {d.toLocaleDateString('en-IN', { weekday: 'short' })}
                        </div>
                        <div className="text-xs font-medium leading-tight mt-0.5 font-mono">
                          {d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-hairline">
                <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted">
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
                        className={`h-10 rounded-xs text-xs font-mono border transition-all ${
                          !s.available
                            ? 'bg-canvas-muted text-ink-muted/40 border-hairline line-through cursor-not-allowed'
                            : isSelected
                            ? 'bg-sage-800 text-canvas border-sage-800 font-medium'
                            : 'bg-white border-border text-ink hover:bg-canvas-subtle'
                        }`}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
                {errors.time && (
                  <p className="text-xs text-rose-600 mt-1">{errors.time}</p>
                )}
              </div>

              <div className="space-y-4 pt-6 border-t border-hairline">
                <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted">
                  4. Patient Contact Details
                </label>

                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-ink mb-1">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="e.g. Meera Desai"
                    className="w-full h-11 px-3.5 rounded-xs border border-border bg-canvas-subtle text-sm text-ink focus:bg-white focus:outline-none focus:ring-1 focus:ring-sage-700"
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-600 mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-ink mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      placeholder="e.g. 98201 44521"
                      className="w-full h-11 px-3.5 rounded-xs border border-border bg-canvas-subtle text-sm text-ink num-tabular focus:bg-white focus:outline-none focus:ring-1 focus:ring-sage-700"
                    />
                    {errors.phone && (
                      <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-ink mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder="e.g. meera@gmail.com"
                      className="w-full h-11 px-3.5 rounded-xs border border-border bg-canvas-subtle text-sm text-ink focus:bg-white focus:outline-none focus:ring-1 focus:ring-sage-700"
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-600 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-xs font-medium text-ink mb-1">
                    Specific tooth concerns or dental history (Optional)
                  </label>
                  <textarea
                    id="notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Tooth sensitivity in upper right molar..."
                    className="w-full p-3 rounded-xs border border-border bg-canvas-subtle text-sm text-ink focus:bg-white focus:outline-none focus:ring-1 focus:ring-sage-700"
                  />
                </div>
              </div>

            </div>

            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
              <div className="bg-white p-6 rounded-sm border border-hairline shadow-2xs space-y-4">
                <h3 className="font-serif text-lg font-medium text-ink pb-3 border-b border-hairline">
                  Appointment Summary
                </h3>

                <div className="space-y-3 text-xs num-tabular">
                  <div>
                    <span className="text-ink-muted block text-[11px]">Selected Procedure</span>
                    <span className="font-serif text-base font-medium text-ink">{selectedTreatment.name}</span>
                  </div>

                  <div className="flex justify-between py-1 border-t border-hairline">
                    <span className="text-ink-muted">Duration</span>
                    <span className="font-medium text-ink">{selectedTreatment.durationLabel}</span>
                  </div>

                  <div className="flex justify-between py-1 border-t border-hairline">
                    <span className="text-ink-muted">Date</span>
                    <span className="font-medium text-ink">
                      {selectedDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-t border-hairline">
                    <span className="text-ink-muted">Time Slot</span>
                    <span className="font-mono font-medium text-sage-800">{selectedTime || 'Please select a slot'}</span>
                  </div>

                  <div className="flex justify-between py-1 border-t border-hairline">
                    <span className="text-ink-muted">Starting Fee</span>
                    <span className="font-mono font-semibold text-ink text-sm">{selectedTreatment.priceFormatted}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-primary w-full h-11 text-xs"
                  >
                    <span>Confirm Consultation</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="text-[11px] text-ink-muted text-center pt-1 font-sans">
                  No advance deposit required. Pay at clinic after consultation.
                </div>
              </div>

              <div className="p-4 rounded-sm bg-sand-50/70 border border-sand-200 text-xs space-y-1.5 text-sand-800">
                <div className="font-medium flex items-center gap-1.5 text-sand-800">
                  <MessageCircle size={14} className="text-[#1EBE5D]" />
                  <span>Prefer booking directly on WhatsApp?</span>
                </div>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  You can chat directly with Dr. Satyam Sharma's front desk on WhatsApp for instant slot confirmation.
                </p>
                <a
                  href={`https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent('Hi Dr. Sharma, I want to book an appointment directly through WhatsApp.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-sage-800 hover:underline block pt-1"
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
