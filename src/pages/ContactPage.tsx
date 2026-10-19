import { useState } from 'react';
import { CLINIC } from '@/data/clinicInfo';
import { MapPin, Calendar, Phone, Mail, MessageCircle, Send, Navigation, AlertCircle } from 'lucide-react';
import PageHero from '@/components/PageHero';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const mailtoUrl = `mailto:${CLINIC.email}?subject=${encodeURIComponent(
    `Clinic Inquiry from ${formData.name}`
  )}&body=${encodeURIComponent(
    `Patient Name: ${formData.name.trim()}\nPhone: ${formData.phone}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`
  )}`;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please provide your full name.';
    }

    let cleanDigits = formData.phone.replace(/\D/g, '');
    if (cleanDigits.startsWith('91') && cleanDigits.length === 12) {
      cleanDigits = cleanDigits.substring(2);
    } else if (cleanDigits.startsWith('0') && cleanDigits.length === 11) {
      cleanDigits = cleanDigits.substring(1);
    }

    if (!cleanDigits || cleanDigits.length !== 10) {
      newErrors.phone = 'Please provide a valid 10-digit mobile number.';
    } else if (!/^[6-9]\d{9}$/.test(cleanDigits)) {
      newErrors.phone = 'Mobile number must start with 6, 7, 8, or 9.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 4) {
      newErrors.message = 'Please enter your message or dental inquiry.';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    window.location.href = mailtoUrl;
  };

  return (
    <div className="bg-slate-50 text-slate-800 font-sans">
      
      <PageHero
        eyebrow="Studio Location & Direct Inquiries"
        title="Find Us in Bandra West"
        description="Book your visit by phone, WhatsApp, or email. Please wait for the clinic to confirm the date and time before travelling."
      />

      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
            
            <div className="lg:col-span-5 space-y-6">
              
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2.5 text-teal-800 font-bold text-base">
                  <MapPin size={20} className="text-teal-600" />
                  <span>Studio Location</span>
                </div>
                
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <p className="font-bold text-slate-900 text-sm sm:text-base">
                    {CLINIC.address.line1}
                  </p>
                  <p>{CLINIC.address.line2}</p>
                  <p>{CLINIC.address.city} — {CLINIC.address.pincode}</p>
                  <p className="text-slate-500 pt-1">
                    <strong>Landmark:</strong> {CLINIC.address.landmark}
                  </p>
                  <p className="text-slate-500">
                    <strong>Transit:</strong> {CLINIC.transit}
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href="https://maps.google.com/?q=Waterfield+Road+Bandra+West+Mumbai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full text-xs h-10"
                  >
                    <Navigation size={14} className="text-teal-700" />
                    <span>Open in Google Maps</span>
                  </a>
                </div>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2.5 text-teal-800 font-bold text-base">
                  <Phone size={20} className="text-teal-600" />
                  <span>Telephone & WhatsApp</span>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-400 block text-xs font-semibold">Clinic Reception Direct</span>
                    <a href={`tel:${CLINIC.phone}`} className="text-base font-extrabold text-slate-900 hover:text-teal-700 transition-colors">
                      {CLINIC.phoneDisplay}
                    </a>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-xs font-semibold">WhatsApp Consultation Desk</span>
                    <a
                      href={`https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent('Hello Dr. Sharma, I want to inquire about dental appointments.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp mt-2 h-11 w-full justify-center px-4 text-xs sm:w-auto"
                    >
                      <MessageCircle size={15} />
                      <span>Chat with Us</span>
                    </a>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-xs font-semibold">Email Inquiries</span>
                    <a href={`mailto:${CLINIC.email}`} className="text-xs text-slate-700 hover:text-teal-700 font-medium">
                      {CLINIC.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3.5">
                <div className="flex items-center gap-2.5 text-teal-800 font-bold text-base">
                  <Calendar size={20} className="text-teal-600" />
                  <span>Appointments</span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                  <p className="font-bold text-teal-800">{CLINIC.appointmentPolicy}</p>
                  <p className="text-xs text-slate-500">{CLINIC.appointmentNotice}</p>
                </div>
              </div>

            </div>

            <div className="lg:col-span-7 space-y-6">
              
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-5">
                <div className="space-y-1">
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Send Dr. Sharma a Message
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Have a question about symptoms, clear aligners, or root canals? Send your query directly:
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => {
                            const lettersOnly = e.target.value.replace(/[^a-zA-Z\s.]/g, '');
                            setFormData({ ...formData, name: lettersOnly });
                            if (errors.name) setErrors({ ...errors, name: '' });
                          }}
                          placeholder="Your name (letters only)"
                          className={`w-full h-11 px-3.5 bg-white border rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                            errors.name ? 'border-red-400 ring-1 ring-red-400 bg-red-50/20' : 'border-slate-300'
                          }`}
                        />
                        {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => {
                            const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setFormData({ ...formData, phone: digitsOnly });
                            if (errors.phone) setErrors({ ...errors, phone: '' });
                          }}
                          placeholder="10-digit mobile"
                          className={`w-full h-11 px-3.5 bg-white border rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                            errors.phone ? 'border-red-400 ring-1 ring-red-400 bg-red-50/20' : 'border-slate-300'
                          }`}
                        />
                        {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        placeholder="your.email@example.com"
                        className={`w-full h-11 px-3.5 bg-white border rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                          errors.email ? 'border-red-400 ring-1 ring-red-400 bg-red-50/20' : 'border-slate-300'
                        }`}
                      />
                      {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                      <p className="mt-1 text-xs text-slate-500">Submitting opens your email app with this inquiry ready to send.</p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Your Question or Dental Concern *
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (errors.message) setErrors({ ...errors, message: '' });
                        }}
                        placeholder="Tell us what you're experiencing or ask about any treatment..."
                        className={`w-full p-3.5 bg-white border rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none ${
                          errors.message ? 'border-red-400 ring-1 ring-red-400 bg-red-50/20' : 'border-slate-300'
                        }`}
                      />
                      {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="btn-primary w-full h-11 text-xs"
                      >
                        <Send size={15} />
                        <span>Submit Inquiry</span>
                      </button>
                    </div>
                </form>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white p-2">
                <iframe
                  title="Aura Dental Studio Map Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.3789498114674!2d72.83398917596048!3d19.060786952865985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c91206f671f5%3A0x6b7c5b61395ce675!2sWaterfield%20Rd%2C%20Bandra%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                  className="w-full h-64 rounded-xl border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

            </div>

          </div>

        </div>
      </section>

      <section className="py-12 bg-amber-500/10 border-b border-amber-500/20">
        <div className="max-w-container mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                <AlertCircle size={16} className="text-amber-600" />
                <span>Dental Emergency Line · Bandra West</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                In acute tooth pain or need same-day care?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Call our direct emergency line at {CLINIC.phoneDisplay} or WhatsApp us immediately for priority chairside triage.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={`tel:${CLINIC.phone}`}
                className="btn-primary bg-amber-600 hover:bg-amber-700 border-amber-600 text-xs h-11 px-5"
              >
                <Phone size={15} />
                <span>Call: {CLINIC.phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent('EMERGENCY: Hello Dr. Sharma, I have urgent tooth pain and need an emergency appointment.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs h-11 px-5"
              >
                <MessageCircle size={15} />
                <span>Emergency WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
