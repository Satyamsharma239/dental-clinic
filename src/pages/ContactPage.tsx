import { useState } from 'react';
import FadeIn from '@/components/FadeIn';
import { CLINIC } from '@/data/clinicInfo';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Car, 
  Globe, 
  CreditCard, 
  Navigation, 
  CheckCircle2, 
  Send, 
  AlertCircle,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DentalToothIcon } from '@/components/common/DentalToothIcon';

export default function ContactPage() {
  const [inquiry, setInquiry] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inquiry.name.trim() && inquiry.phone.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setInquiry({ name: '', phone: '', email: '', message: '' });
        setSubmitted(false);
      }, 6000);
    }
  };

  return (
    <div className="flex flex-col bg-bg">
      {/* 1. Page Header */}
      <section className="pt-12 pb-14 bg-gradient-to-b from-primary-50/70 to-bg border-b border-primary/10">
        <div className="max-w-5xl mx-auto px-5 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-primary/15 text-xs font-semibold text-primary mb-3 shadow-xs">
              <DentalToothIcon size={14} className="text-accent" />
              <span>Waterfield Road, Bandra West, Mumbai • Dr. Satyam Sharma</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-primary font-bold tracking-tight">
              Contact & Clinic Visit Guide
            </h1>
            <p className="text-sm sm:text-base text-text-muted max-w-xl mx-auto mt-2 leading-relaxed">
              Centrally located on Waterfield Road in Bandra West, Mumbai with dedicated valet parking and easy railway connectivity.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 2. Main Content: Clean 2-Column Professional Layout */}
      <section className="py-12 lg:py-16 px-5">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Comprehensive Clinic Details */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-primary/10 p-7 sm:p-9 shadow-soft space-y-7">
                
                {/* Clinic Location */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-primary-50 text-primary flex items-center justify-center shrink-0 border border-primary/15">
                    <MapPin size={20} className="text-accent" />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-bold text-primary">Clinic Location</h2>
                    <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
                      {CLINIC.address.full}
                    </p>
                    <p className="text-xs text-accent font-semibold mt-1">
                      Landmark: {CLINIC.landmark}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-primary/10" />

                {/* Direct Telephones */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                      <Phone size={18} />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">Appointments</h3>
                      <a href={`tel:${CLINIC.phone}`} className="text-sm font-bold text-primary hover:text-accent transition-colors block mt-0.5">
                        {CLINIC.phoneDisplay}
                      </a>
                      <span className="text-[11px] text-text-muted">Mon – Sat, 9:30 AM – 7:30 PM</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-700 flex items-center justify-center shrink-0">
                      <AlertCircle size={18} />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-red-700 uppercase tracking-wider">Acute Emergency</h3>
                      <a href={`tel:${CLINIC.emergencyPhone}`} className="text-sm font-bold text-red-700 hover:underline block mt-0.5">
                        {CLINIC.emergencyPhoneDisplay}
                      </a>
                      <span className="text-[11px] text-text-muted">Severe toothache & trauma</span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-primary/10" />

                {/* Consulting Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-primary-50 text-primary flex items-center justify-center shrink-0 border border-primary/15">
                    <Clock size={20} className="text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-heading text-base font-bold text-primary">Consultation Timings</h3>
                    <div className="text-xs text-text-muted space-y-0.5 pt-0.5">
                      <p><strong className="text-primary">Monday – Saturday:</strong> 9:30 AM – 7:30 PM</p>
                      <p><strong className="text-primary">Lunch Recess:</strong> 1:30 PM – 2:30 PM</p>
                      <p className="text-accent font-semibold">{CLINIC.hours.closed}</p>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-primary/10" />

                {/* Transit & Accessibility */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                      <Navigation size={18} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-primary">Railway & Transit Connectivity</h4>
                      <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                        {CLINIC.transit}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                      <Car size={18} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-primary">Parking Facility</h4>
                      <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                        {CLINIC.parking}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-text-muted border-t border-primary/10">
                  <span className="flex items-center gap-1.5">
                    <Globe size={14} className="text-primary" />
                    Languages: {CLINIC.languages.join(', ')}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CreditCard size={14} className="text-primary" />
                    UPI, Cards & Cash Accepted
                  </span>
                </div>

              </div>

              {/* Right Column: Callback Request & Direct Appointment */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Message / Callback Card */}
                <div className="bg-white rounded-3xl border border-primary/10 p-7 sm:p-8 shadow-soft">
                  <div className="mb-5">
                    <h3 className="font-heading text-xl font-bold text-primary">
                      Send a Message to Reception
                    </h3>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">
                      Have a query regarding treatments, fees, or timing? Leave your details and our team will get back to you promptly.
                    </p>
                  </div>

                  {submitted ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2">
                      <CheckCircle2 size={36} className="text-emerald-700 mx-auto" />
                      <h4 className="font-heading text-base font-bold text-emerald-950">Message Sent Successfully</h4>
                      <p className="text-xs text-emerald-800 leading-relaxed">
                        Thank you, {inquiry.name}. We will contact you shortly at <strong>{inquiry.phone}</strong>.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-text mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={inquiry.name}
                          onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                          placeholder="e.g. Satyam Sharma"
                          className="w-full px-3.5 py-3 rounded-xl border border-primary/20 bg-white text-xs text-text focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-text mb-1">
                          Mobile Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={inquiry.phone}
                          onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })}
                          placeholder="+91 98201 44521"
                          className="w-full px-3.5 py-3 rounded-xl border border-primary/20 bg-white text-xs text-text focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-text mb-1">
                          How can we help? (Optional)
                        </label>
                        <textarea
                          rows={3}
                          value={inquiry.message}
                          onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                          placeholder="Brief description of toothache, consultation question, etc."
                          className="w-full px-3.5 py-3 rounded-xl border border-primary/20 bg-white text-xs text-text focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn-primary w-full text-xs py-3.5 justify-center shadow-sm"
                      >
                        <Send size={14} />
                        <span>Send Message</span>
                      </button>
                    </form>
                  )}
                </div>

                {/* Direct Appointment CTA */}
                <div className="bg-primary text-white rounded-3xl p-7 space-y-4 shadow-card">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-accent">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <h4 className="font-heading text-lg font-bold">Online Appointment</h4>
                      <p className="text-xs text-white/70">Pick doctor time slot directly</p>
                    </div>
                  </div>

                  <p className="text-xs text-white/80 leading-relaxed">
                    View Dr. Satyam Sharma's live schedule and book your consultation with no advance payment.
                  </p>

                  <Link
                    to="/booking"
                    className="btn-primary w-full text-center text-xs justify-center block"
                  >
                    Open Appointment Schedule
                  </Link>
                </div>

              </div>

            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
