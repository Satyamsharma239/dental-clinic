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
  MapPin,
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
      name: 'General Oral Examination',
      shortDescription: 'Comprehensive examination by Dr. Satyam Sharma to diagnose tooth pain, cavities, or bite alignment.',
      description: 'Comprehensive dental consultation with 3D intraoral digital inspection.',
      durationMins: 30,
      priceRange: '₹500',
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

  // 4. Patient Information
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
      newErrors.patientName = 'Please enter patient full name';
    }
    if (!phone || phone.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!selectedTime) {
      newErrors.time = 'Please select a convenient time slot';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    const bookingId = 'BS-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const newBooking = {
      id: bookingId,
      service: selectedService,
      date: selectedDate.toISOString(),
      time: selectedTime,
      patientName: patientName.trim(),
      phone: phone,
      email: email.trim(),
      notes: notes.trim(),
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem('bookings') || '[]');
    localStorage.setItem('bookings', JSON.stringify([newBooking, ...existing]));

    setTimeout(() => {
      navigate(`/booking/confirmation/${bookingId}`);
    }, 300);
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
    <div className="min-h-screen bg-bg py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Title */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-primary/15 text-xs font-semibold text-primary mb-3 shadow-xs">
            <DentalToothIcon size={14} className="text-accent" />
            <span>Consultation with Dr. Satyam Sharma (MDS Orthodontics)</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-primary tracking-tight">
            Schedule Your Dental Appointment
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1 max-w-lg mx-auto">
            Select your preferred treatment and time slot. No advance payment required — settlement is completed at the clinic desk.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (7 cols): Step-by-Step Form Inputs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step 1: Treatment Selection */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-primary/10 shadow-soft space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-primary/10">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">1</span>
                    <h2 className="font-heading text-base font-bold text-primary">Select Treatment</h2>
                  </div>
                  <span className="text-xs font-semibold text-accent">
                    {selectedService.priceRange} • {selectedService.durationMins}m
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {allServices.map((service) => {
                    const isSelected = selectedService.id === service.id;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setSelectedService(service)}
                        className={`text-left p-3.5 rounded-2xl border transition-all text-xs flex items-center justify-between min-h-[50px] active:scale-[0.99] ${
                          isSelected
                            ? 'border-accent bg-accent/5 ring-2 ring-accent shadow-xs text-primary font-bold'
                            : 'border-primary/15 bg-white text-text hover:border-primary/40'
                        }`}
                      >
                        <div className="pr-2 space-y-0.5">
                          <p className="leading-snug">{service.name}</p>
                          <p className="text-[10px] text-text-muted font-normal">
                            ⏱ {service.durationMins} mins • {service.priceRange}
                          </p>
                        </div>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center shrink-0 shadow-xs">
                            <Check size={12} strokeWidth={3} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Date & Time Slot Selection */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-primary/10 shadow-soft space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-primary/10">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">2</span>
                    <h2 className="font-heading text-base font-bold text-primary">Select Date & Time</h2>
                  </div>
                  <span className="text-xs text-text-muted font-medium">
                    {formattedDateString}
                  </span>
                </div>

                {/* Day Chips */}
                <div>
                  <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">
                    Available Days
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                    {upcomingDays.map((d, idx) => {
                      const isSelected =
                        selectedDate.getDate() === d.getDate() &&
                        selectedDate.getMonth() === d.getMonth();

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedDate(d)}
                          className={`py-2 px-1 rounded-xl text-center border transition-all min-h-[52px] flex flex-col items-center justify-center active:scale-[0.98] ${
                            isSelected
                              ? 'bg-primary text-white border-primary shadow-sm ring-2 ring-primary/20'
                              : 'bg-white text-text border-primary/15 hover:border-primary/40'
                          }`}
                        >
                          <span className="text-[10px] uppercase font-bold tracking-tight block">
                            {formatDayLabel(d, idx)}
                          </span>
                          <span className="text-xs font-bold font-mono mt-0.5 block">
                            {d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slot Groups */}
                <div className="pt-2">
                  <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">
                    Available Time Slots
                  </span>

                  {loadingSlots ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-10 bg-primary-50 animate-pulse rounded-xl" />
                      ))}
                    </div>
                  ) : availableSlots.length === 0 ? (
                    <p className="text-xs text-text-muted p-4 bg-bg rounded-xl text-center border border-primary/10">
                      Clinic is closed or fully booked on this date. Please pick another day.
                    </p>
                  ) : (
                    <div className="space-y-3.5">
                      {/* Morning Slots */}
                      {morningSlots.length > 0 && (
                        <div>
                          <div className="flex items-center gap-1.5 text-xs text-text-muted font-medium mb-1.5">
                            <Sun size={13} className="text-amber-500" />
                            <span>Morning (9:00 AM – 1:00 PM)</span>
                          </div>
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {morningSlots.map((slot) => {
                              const isSelected = selectedTime === slot.time;
                              return (
                                <button
                                  key={slot.time}
                                  type="button"
                                  disabled={!slot.available}
                                  onClick={() => setSelectedTime(slot.time)}
                                  className={`h-10 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center border active:scale-[0.98] ${
                                    !slot.available
                                      ? 'bg-neutral-100 text-text-light cursor-not-allowed border-transparent opacity-40 line-through'
                                      : isSelected
                                      ? 'bg-accent text-white border-accent shadow-sm ring-2 ring-accent/30'
                                      : 'bg-white text-primary border-primary/15 hover:border-primary/40'
                                  }`}
                                >
                                  {slot.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Afternoon Slots */}
                      {afternoonSlots.length > 0 && (
                        <div>
                          <div className="flex items-center gap-1.5 text-xs text-text-muted font-medium mb-1.5">
                            <Sunset size={13} className="text-accent" />
                            <span>Afternoon (2:00 PM – 6:00 PM)</span>
                          </div>
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {afternoonSlots.map((slot) => {
                              const isSelected = selectedTime === slot.time;
                              return (
                                <button
                                  key={slot.time}
                                  type="button"
                                  disabled={!slot.available}
                                  onClick={() => setSelectedTime(slot.time)}
                                  className={`h-10 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center border active:scale-[0.98] ${
                                    !slot.available
                                      ? 'bg-neutral-100 text-text-light cursor-not-allowed border-transparent opacity-40 line-through'
                                      : isSelected
                                      ? 'bg-accent text-white border-accent shadow-sm ring-2 ring-accent/30'
                                      : 'bg-white text-primary border-primary/15 hover:border-primary/40'
                                  }`}
                                >
                                  {slot.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {errors.time && <p className="text-xs text-red-500 mt-2">{errors.time}</p>}
                </div>
              </div>

              {/* Step 3: Patient Information */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-primary/10 shadow-soft space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-primary/10">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">3</span>
                  <h2 className="font-heading text-base font-bold text-primary">Patient Details</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-text mb-1">
                      Patient Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => {
                        setPatientName(e.target.value);
                        if (errors.patientName) setErrors((prev) => ({ ...prev, patientName: '' }));
                      }}
                      placeholder="e.g. Satyam Sharma"
                      className={`w-full p-3.5 border rounded-xl bg-white text-xs text-text focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow ${
                        errors.patientName ? 'border-red-500' : 'border-primary/20'
                      }`}
                    />
                    {errors.patientName && <p className="text-xs text-red-500 mt-1">{errors.patientName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text mb-1">
                      Mobile Number (WhatsApp) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted font-bold text-xs">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="98201 44521"
                        className={`w-full p-3.5 pl-12 border rounded-xl bg-white text-xs text-text focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow ${
                          errors.phone ? 'border-red-500' : 'border-primary/20'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                    <p className="text-[11px] text-text-muted mt-1">
                      Appointment confirmation slip will be sent to this mobile number.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. satyam@example.com"
                      className="w-full p-3.5 border border-primary/20 rounded-xl bg-white text-xs text-text focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text mb-1">
                      Tooth Concern or Medical Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Pain in lower left molar, mild sensitivity to cold water..."
                      className="w-full p-3.5 border border-primary/20 rounded-xl bg-white text-xs text-text focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow resize-none"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column (5 cols): Sticky Appointment Summary Ticket */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
              
              <div className="bg-white rounded-3xl border border-primary/10 p-6 sm:p-7 shadow-card space-y-6">
                
                {/* Header of summary */}
                <div className="flex items-center justify-between pb-4 border-b border-primary/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-primary text-accent flex items-center justify-center shadow-xs">
                      <DentalToothIcon size={18} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold text-primary">Appointment Slip</h3>
                      <p className="text-[11px] text-text-muted">{CLINIC.name}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Live Booking
                  </span>
                </div>

                {/* Selected Details */}
                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between items-start">
                    <span className="text-text-muted">Doctor</span>
                    <span className="font-bold text-primary text-right">{CLINIC.doctor.name} ({CLINIC.doctor.qualification})</span>
                  </div>

                  <div className="flex justify-between items-start">
                    <span className="text-text-muted">Procedure</span>
                    <span className="font-bold text-primary text-right">{selectedService.name}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-text-muted">Scheduled Slot</span>
                    <span className="font-bold text-accent font-mono text-right">
                      {selectedTime ? `${selectedTime} • ${formattedDateString}` : 'Select a time slot'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-text-muted">Expected Duration</span>
                    <span className="font-bold text-primary font-mono">{selectedService.durationMins} minutes</span>
                  </div>

                  <div className="pt-2 border-t border-primary/10 flex justify-between items-center">
                    <div>
                      <span className="text-text-muted block text-[11px]">Estimated Fee</span>
                      <span className="text-[10px] text-text-muted">Pay at clinic desk</span>
                    </div>
                    <span className="font-heading text-lg font-bold text-primary font-mono">
                      {selectedService.priceRange}
                    </span>
                  </div>
                </div>

                {/* Submit CTA */}
                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-4 text-sm font-bold justify-center shadow-md active:scale-[0.99] disabled:opacity-50"
                  >
                    <span>Confirm & Schedule</span>
                    <ArrowRight size={16} />
                  </button>

                  <div className="space-y-1.5 pt-1 text-[11px] text-text-muted">
                    <p className="flex items-center gap-1.5 text-emerald-800 font-medium">
                      <CheckCircle2 size={13} className="text-emerald-700 shrink-0" />
                      <span>Zero Advance Required • Pay After Consultation</span>
                    </p>
                    <p className="flex items-center gap-1.5 text-emerald-800 font-medium">
                      <CheckCircle2 size={13} className="text-emerald-700 shrink-0" />
                      <span>Instant Slip Dispatched to Mobile & Email</span>
                    </p>
                  </div>
                </div>

              </div>

              {/* Clinic Assistance Capsule */}
              <div className="bg-primary-50/70 rounded-2xl border border-primary/10 p-4 text-xs text-text-muted flex items-center justify-between">
                <div>
                  <p className="font-bold text-primary">Need Help Scheduling?</p>
                  <p className="text-[11px]">Call our reception directly</p>
                </div>
                <a
                  href={`tel:${CLINIC.phone}`}
                  className="px-3 py-1.5 rounded-lg bg-white border border-primary/15 text-primary font-bold text-xs hover:bg-primary-50 transition-colors shadow-2xs"
                >
                  {CLINIC.phoneDisplay}
                </a>
              </div>

            </div>

          </div>
        </form>

      </div>
    </div>
  );
}
