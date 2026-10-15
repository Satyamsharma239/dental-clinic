import { useState } from 'react';
import { CLINIC } from '@/data/clinicInfo';
import { MapPin, Clock, Phone, Mail, MessageCircle, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
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

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 4) {
      newErrors.message = 'Please enter your message or dental question.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitted(true);
  };

  const waFormUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(
    `Hello Dr. Sharma, my name is ${formData.name}. Phone: ${formData.phone}. My inquiry: ${formData.message}`
  )}`;

  const mailtoUrl = `mailto:${CLINIC.email}?subject=${encodeURIComponent(
    `Clinic Inquiry from ${formData.name}`
  )}&body=${encodeURIComponent(
    `Patient Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || 'Not provided'}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <div className="bg-surface-subtle py-10 md:py-16 text-slate">
      <div className="max-w-container mx-auto px-4 sm:px-8">
        
        <div className="max-w-2xl mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block">
            Visit & Contact
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate tracking-tight">
            We are here in Bandra West.
          </h1>
          <p className="text-sm sm:text-base text-slate-secondary">
            Reach out by WhatsApp, telephone, email, or visit our studio on Waterfield Road. We respond quickly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          <div className="lg:col-span-5 space-y-5">
            
            <div className="p-6 rounded-2xl bg-white border border-border shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-brand-700 font-bold text-base">
                <MapPin size={18} />
                <span>Studio Location</span>
              </div>
              <p className="text-sm font-semibold text-slate leading-snug">
                {CLINIC.address.full}
              </p>
              <div className="space-y-1 text-xs text-slate-muted pt-1 border-t border-border/60">
                <p>Landmark: {CLINIC.address.landmark}</p>
                <p>{CLINIC.transit}</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-border shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-brand-700 font-bold text-base">
                <Clock size={18} />
                <span>Clinic Timings</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-secondary">
                <div className="flex justify-between py-1 border-b border-border/60">
                  <span className="font-semibold text-slate">Monday – Saturday</span>
                  <span className="font-medium text-slate">9:30 AM – 7:30 PM</span>
                </div>
                <div className="flex justify-between py-1 text-slate-muted">
                  <span>Sunday</span>
                  <span className="text-rose-600 font-medium">Closed (Emergencies on call)</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-border shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-brand-700 font-bold text-base">
                <MessageCircle size={18} />
                <span>Direct Contact Lines</span>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-xs text-slate-muted font-medium">WhatsApp (Instant)</div>
                  <a
                    href={`https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent('Hi Dr. Sharma, I want to inquire about a dental visit at Aura Dental Studio.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1EBE5D] font-bold hover:underline inline-flex items-center gap-1.5 mt-0.5"
                  >
                    <MessageCircle size={15} />
                    <span>Chat on WhatsApp (+91 98201 44521)</span>
                  </a>
                </div>

                <div>
                  <div className="text-xs text-slate-muted font-medium">Front Desk Telephone</div>
                  <a
                    href={`tel:${CLINIC.phone}`}
                    className="text-slate font-bold hover:text-brand-600 inline-flex items-center gap-1.5 mt-0.5"
                  >
                    <Phone size={15} className="text-brand-600" />
                    <span>{CLINIC.phoneDisplay}</span>
                  </a>
                </div>

                <div>
                  <div className="text-xs text-slate-muted font-medium">Email</div>
                  <a
                    href={`mailto:${CLINIC.email}`}
                    className="text-slate font-medium hover:text-brand-600 inline-flex items-center gap-1.5 mt-0.5 text-xs"
                  >
                    <Mail size={15} className="text-brand-600" />
                    <span>{CLINIC.email}</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-border shadow-xs">
              <h2 className="text-xl font-bold text-slate mb-1">
                Send a Message or Question
              </h2>
              <p className="text-xs sm:text-sm text-slate-secondary mb-6">
                Dr. Satyam Sharma and our reception team review messages daily.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-brand-50 border border-brand-200 space-y-4">
                  <div className="flex items-center gap-2 text-brand-800 font-bold text-base">
                    <CheckCircle size={20} className="text-brand-600" />
                    <span>Message Ready!</span>
                  </div>
                  <p className="text-sm text-slate-secondary leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Choose your preferred way to send this message to our clinic:
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <a
                      href={waFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp text-xs h-10 px-4"
                    >
                      <MessageCircle size={15} />
                      <span>Send via WhatsApp</span>
                    </a>
                    <a
                      href={mailtoUrl}
                      className="btn-primary text-xs h-10 px-4"
                    >
                      <Mail size={15} />
                      <span>Send via Email Client</span>
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', message: '' });
                    }}
                    className="text-xs text-brand-700 font-semibold hover:underline block pt-2"
                  >
                    Write another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-secondary mb-1">
                      Your Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ananya Patel"
                      className="w-full h-11 px-3.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-600 mt-1 font-medium">{errors.name}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-slate-secondary mb-1">
                        Mobile Number *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10-digit mobile"
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
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full h-11 px-3.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-600 mt-1 font-medium">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-slate-secondary mb-1">
                      Your Message or Dental Concern *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about what you need or ask any questions..."
                      className="w-full p-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                    {errors.message && (
                      <p className="text-xs text-rose-600 mt-1 font-medium">{errors.message}</p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button type="submit" className="btn-primary">
                      <span>Send Message</span>
                      <Send size={15} />
                    </button>
                    <a
                      href={`https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent('Hi Dr. Sharma, I want to message your clinic directly.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp"
                    >
                      <MessageCircle size={16} />
                      <span>Direct WhatsApp</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-border shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-slate">
                Location Map · Bandra West
              </h2>
              <p className="text-xs text-slate-muted">
                Studio 204, Sagar Fortune Building, Waterfield Road, Bandra West, Mumbai 400050
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Waterfield+Road+Bandra+West+Mumbai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-brand-700 hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Open in Google Maps App →</span>
            </a>
          </div>

          <div className="aspect-[16/9] sm:aspect-[21/9] w-full rounded-xl overflow-hidden border border-border bg-slate-100">
            <iframe
              title="Aura Dental Studio Bandra West Map"
              src="https://maps.google.com/maps?q=Waterfield+Road+Bandra+West+Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
