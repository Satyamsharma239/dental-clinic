import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SERVICES, generateTimeSlots, getMockBookedSlots, Service } from '@/data/services';
import { CLINIC } from '@/data/clinicInfo';
import { DentalToothIcon } from '@/components/common/DentalToothIcon';
import { 
  Check, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Info,
  Sun,
  Sunset
} from 'lucide-react';

export default function BookingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedSlug = searchParams.get('service');

  // 1. All clinical services with General Consultation as default
  const allServices = useMemo(() => {
    const consultation: Service = {
      id: 'svc-general',
      slug: 'general-consultation',
      category: 'preventive',
      name: 'Comprehensive Digital Consultation',
      shortDescription: 'Unhurried examination with 3D intraoral scan and conservative treatment roadmap.',
      description: 'Comprehensive digital examination with 3D intraoral scan and conservative roadmap.',
      durationMins: 30,
      priceRange: '₹500 (Sample Guide)',
      faqs: [],
    };
    return [consultation, ...SERVICES];
  }, []);

  // Initial service selection
  const initialService = useMemo(() => {
    if (preselectedSlug) {
      const found = allServices.find((s) => s.slug === preselectedSlug || s.id === preselectedSlug);
      if (found) return found;
    }
    return allServices[0];
  }, [preselectedSlug, allServices]);

  const [selectedService, setSelectedService] = useState<Service>(initialService);

  // 2. Upcoming available dates (Next 7 working days, excluding Sundays)
  const upcomingDays = useMemo(() => {
    const days: Date[] = [];
    const curr = new Date();
    curr.setHours(0, 0, 0, 0);

    let safety = 0;
    while (days.length < 7 && safety < 15) {
      safety++;
      if (curr.getDay() !== 0) { // 0 is Sunday
        days.push(new Date(curr));
      }
      curr.setDate(curr.getDate() + 1);
    }
    return days;
  }, []);

  const [selectedDate, setSelectedDate] = useState<Date>(upcomingDays[0] || new Date());

  // 3. Time slots (Morning & Afternoon)
  const [availableSlots, setAvailableSlots] = useState<{ time: string; label: string; available: boolean }[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    if (selectedDate && selectedService) {
      setLoadingSlots(true);
      const dateStr = selectedDate.toISOString().split('T')[0];
      const booked = getMockBookedSlots(dateStr);
      const slots = generateTimeSlots(selectedDate, selectedService.durationMins || 30, booked);
      
      setAvailableSlots(slots);
      const firstAvailable = slots.find((s) => s.available);
      if (firstAvailable && (!selectedTime || !slots.some((s) => s.time === selectedTime && s.available))) {
        setSelectedTime(firstAvailable.time);
      }
      setLoadingSlots(false);
    }
  }, [selectedDate, selectedService]);

  // Group slots into Morning and Afternoon
  const morningSlots = useMemo(() => {
    return availableSlots.filter((slot) => {
      const hour = parseInt(slot.time.split(':')[0], 10);
      return hour < 13;
    });
  }, [availableSlots]);

  const afternoonSlots = useMemo(() => {
    return availableSlots.filter((slot) => {
      const hour = parseInt(slot.time.split(':')[0], 10);
      return hour >= 13;
    });
  }, [availableSlots]);

  // 4. Guest / Patient Information
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 10) val = val.slice(0, 10);
    setPhone(val);
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!patientName.trim() || patientName.trim().length < 2) {
      newErrors.patientName = 'Please enter patient full name (at least 2 characters)';
    }
    if (!phone || phone.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!selectedTime) {
      newErrors.time = 'Please select an available time slot';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    const bookingId = 'AURA-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const newBooking = {
      id: bookingId,
      service: selectedService,
      date: selectedDate.toISOString(),
      time: selectedTime,
      patientName: patientName.trim(),
      phone: phone,
      email: email.trim(),
      notes: notes.trim(),
      isDemo: true,
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem('bookings') || '[]');
    localStorage.setItem('bookings', JSON.stringify([newBooking, ...existing]));

    setTimeout(() => {
      navigate(`/booking/confirmation/${bookingId}`);
    }, 400);
  };

  const formatDayLabel = (date: Date, idx: number) => {
    if (idx === 0) return 'Today';
    if (idx === 1) return 'Tomorrow';
    return date.toLocaleDateString('en-IN', { weekday: 'short' });
  };

  const formattedDateString = selectedDate.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-bg py-10 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Title & Demonstration Notice */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border text-xs text-text mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span>Interactive Portfolio Experience • Demonstration Booking Wizard</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-normal text-primary tracking-tight">
            Schedule a Studio Consultation
          </h1>
          <p className="text-sm text-text-muted mt-2 max-w-lg mx-auto leading-relaxed">
            Select your discipline and preferred slot. Submitting this demonstration form generates a live summary slip and calendar sync.
          </p>
        </div>

        {/* 2-Column Responsive Form Layout */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (7 cols): Step-by-Step Selection */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step 1: Discipline Selection */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-border shadow-soft space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center font-mono">1</span>
                    <h2 className="font-heading text-lg font-semibold text-primary">Select Clinical Discipline</h2>
                  </div>
                  <span className="text-xs font-mono text-text-muted">
                    {selectedService.durationMins}m session
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Select clinical discipline">
                  {allServices.map((service) => {
                    const isSelected = selectedService.id === service.id;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setSelectedService(service)}
                        className={`text-left p-3.5 rounded-xl border transition-all text-xs flex items-center justify-between min-h-[56px] ${
                          isSelected
                            ? 'border-primary bg-primary-50 ring-2 ring-primary text-primary font-semibold shadow-xs'
                            : 'border-border bg-white text-text hover:border-border-dark'
                        }`}
                      >
                        <div className="pr-2 space-y-0.5">
                          <p className="leading-snug">{service.name}</p>
                          <p className="text-[11px] text-text-muted font-normal">
                            {service.durationMins}m • {service.priceRange}
                          </p>
                        </div>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-primary text-accent flex items-center justify-center shrink-0">
                            <Check size={12} strokeWidth={3} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Date & Time Slot Selection */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-border shadow-soft space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center font-mono">2</span>
                    <h2 className="font-heading text-lg font-semibold text-primary">Select Date & Time Slot</h2>
                  </div>
                  <span className="text-xs font-mono text-text-muted">
                    {formattedDateString}
                  </span>
                </div>

                {/* Day Selector */}
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-text-light block mb-2.5">
                    Consultation Calendar
                  </span>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {upcomingDays.map((d, idx) => {
                      const isSelected =
                        selectedDate.getDate() === d.getDate() &&
                        selectedDate.getMonth() === d.getMonth();

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedDate(d)}
                          className={`py-2 px-1 rounded-xl text-center border transition-all min-h-[54px] flex flex-col items-center justify-center ${
                            isSelected
                              ? 'bg-primary text-white border-primary shadow-xs ring-2 ring-primary/20'
                              : 'bg-white text-text border-border hover:border-border-dark'
                          }`}
                        >
                          <span className="text-[10px] uppercase font-mono tracking-wider opacity-70">
                            {formatDayLabel(d, idx)}
                          </span>
                          <span className="text-sm font-bold font-mono">
                            {d.getDate()}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Slots: Morning & Afternoon */}
                {loadingSlots ? (
                  <div className="py-8 text-center text-xs text-text-muted">
                    Loading studio schedule...
                  </div>
                ) : (
                  <div className="space-y-4 pt-2">
                    {errors.time && (
                      <p className="text-xs text-red-600 font-medium">
                        {errors.time}
                      </p>
                    )}

                    {/* Morning */}
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-text-muted mb-2">
                        <Sun size={13} className="text-accent" />
                        <span>Morning Consultation Slots</span>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {morningSlots.map((slot) => {
                          const isSelected = selectedTime === slot.time;
                          return (
                            <button
                              key={slot.time}
                              type="button"
                              disabled={!slot.available}
                              onClick={() => {
                                setSelectedTime(slot.time);
                                if (errors.time) setErrors((prev) => ({ ...prev, time: '' }));
                              }}
                              className={`py-2 px-2 text-xs rounded-lg border font-mono transition-all min-h-[44px] ${
                                !slot.available
                                  ? 'bg-bg text-border-dark border-border/60 cursor-not-allowed line-through'
                                  : isSelected
                                  ? 'bg-primary text-white border-primary shadow-xs font-bold'
                                  : 'bg-white text-text border-border hover:border-primary'
                              }`}
                            >
                              {slot.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Afternoon */}
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-text-muted mb-2">
                        <Sunset size={13} className="text-accent" />
                        <span>Afternoon Consultation Slots</span>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {afternoonSlots.map((slot) => {
                          const isSelected = selectedTime === slot.time;
                          return (
                            <button
                              key={slot.time}
                              type="button"
                              disabled={!slot.available}
                              onClick={() => {
                                setSelectedTime(slot.time);
                                if (errors.time) setErrors((prev) => ({ ...prev, time: '' }));
                              }}
                              className={`py-2 px-2 text-xs rounded-lg border font-mono transition-all min-h-[44px] ${
                                !slot.available
                                  ? 'bg-bg text-border-dark border-border/60 cursor-not-allowed line-through'
                                  : isSelected
                                  ? 'bg-primary text-white border-primary shadow-xs font-bold'
                                  : 'bg-white text-text border-border hover:border-primary'
                              }`}
                            >
                              {slot.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 3: Contact Details */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-border shadow-soft space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center font-mono">3</span>
                    <h2 className="font-heading text-lg font-semibold text-primary">Guest Contact Details</h2>
                  </div>
                  <span className="text-xs text-text-muted">Step 3 of 3</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="patientName" className="block text-xs font-semibold text-text mb-1">
                      Full Name *
                    </label>
                    <input
                      id="patientName"
                      type="text"
                      value={patientName}
                      onChange={(e) => {
                        setPatientName(e.target.value);
                        if (errors.patientName) setErrors((prev) => ({ ...prev, patientName: '' }));
                      }}
                      placeholder="e.g. Rohini Mehta"
                      className={`w-full px-3.5 py-3 rounded-lg border text-sm text-text transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.patientName ? 'border-red-500 bg-red-50/20' : 'border-border bg-white'
                      }`}
                    />
                    {errors.patientName && (
                      <p className="text-xs text-red-600 mt-1">{errors.patientName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-text mb-1">
                        Mobile Number * (10 digits)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-3 text-xs text-text-muted font-mono">+91</span>
                        <input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={handlePhoneChange}
                          placeholder="98201 00000"
                          maxLength={10}
                          className={`w-full pl-12 pr-3.5 py-3 rounded-lg border text-sm text-text transition-colors focus:outline-none focus:ring-2 focus:ring-primary font-mono ${
                            errors.phone ? 'border-red-500 bg-red-50/20' : 'border-border bg-white'
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-text mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="rohini@example.com"
                        className="w-full px-3.5 py-3 rounded-lg border border-border bg-white text-sm text-text transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-xs font-semibold text-text mb-1">
                      Consultation Goals or Concerns
                    </label>
                    <textarea
                      id="notes"
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Inquiring about clear aligner duration or sensitivity..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-white text-sm text-text transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column (5 cols): Demonstration Summary Card */}
            <div className="lg:col-span-5 sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-border shadow-soft space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <h3 className="font-heading text-lg font-semibold text-primary">
                    Consultation Summary
                  </h3>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-text-light bg-bg px-2 py-0.5 rounded border border-border">
                    Sample Slip
                  </span>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-border/60">
                    <span className="text-text-muted">Studio Practice:</span>
                    <span className="font-medium text-primary text-right">{CLINIC.name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/60">
                    <span className="text-text-muted">Selected Discipline:</span>
                    <span className="font-medium text-primary text-right max-w-[200px] truncate">{selectedService.name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/60">
                    <span className="text-text-muted">Session Duration:</span>
                    <span className="font-mono text-primary">{selectedService.durationMins} minutes</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/60">
                    <span className="text-text-muted">Date & Time:</span>
                    <span className="font-medium text-primary font-mono text-right">
                      {formattedDateString} at {selectedTime || 'Pending selection'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/60">
                    <span className="text-text-muted">Sample Fee Guide:</span>
                    <span className="font-semibold text-primary">{selectedService.priceRange}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-text-muted">Consultation Desk:</span>
                    <span className="text-primary">{CLINIC.area}, {CLINIC.city}</span>
                  </div>
                </div>

                {/* Honest Portfolio Note */}
                <div className="p-3.5 rounded-xl bg-bg border border-border text-xs text-text-muted space-y-1">
                  <p className="flex items-center gap-1.5 font-semibold text-primary">
                    <Info size={13} className="text-accent" />
                    Demonstration Flow
                  </p>
                  <p className="text-[11px] leading-relaxed">
                    Submitting this form stores a demonstration record locally in your browser, routes to a formatted printable confirmation slip, and provides 1-click Google Calendar sync.
                  </p>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full text-xs font-semibold py-4 shadow-sm"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generating Confirmation Slip...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span>Generate Confirmation Slip</span>
                      <ArrowRight size={15} className="text-accent" />
                    </span>
                  )}
                </button>
              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
}
