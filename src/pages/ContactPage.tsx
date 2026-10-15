import { useState } from 'react';
import { CLINIC } from '@/data/clinicInfo';
import { MapPin, Clock, Phone, Mail, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

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
    <div className="bg-canvas py-12 sm:py-20 text-ink">
      <div className="max-w-container mx-auto px-4 sm:px-8">
        
        <div className="max-w-2xl mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.14em] text-sand-700 block">
            Visit & Contact
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-ink tracking-tight leading-tight">
            We are here on Waterfield Road.
          </h1>
          <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
            Reach out by WhatsApp, telephone, email, or visit our studio in Bandra West. We respond quickly during practice hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 font-sans">
          
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-sm bg-white border border-hairline shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-sage-800 font-medium text-base">
                <MapPin size={16} className="text-sand-700" />
                <span>Studio Location</span>
              </div>
              
              <div className="space-y-1.5 text-xs text-ink-secondary leading-relaxed">
                <p className="font-medium text-ink text-sm">
                  {CLINIC.address.line1}
                </p>
                <p>{CLINIC.address.line2}</p>
                <p>{CLINIC.address.city} — {CLINIC.address.pincode}</p>
                <p className="text-ink-muted pt-1">
                  Landmark: {CLINIC.address.landmark}
                </p>
                <p className="text-ink-muted">
                  Transit: {CLINIC.transit}
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Waterfield+Road+Bandra+West+Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full text-xs h-9"
                >
                  <MapPin size={13} />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

            <div className="p-6 rounded-sm bg-white border border-hairline shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-sage-800 font-medium text-base">
                <Phone size={16} className="text-sand-700" />
                <span>Telephone & WhatsApp</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-ink-muted block text-[11px] font-mono">Clinic Reception Direct</span>
                  <a href={`tel:${CLINIC.phone}`} className="text-sm font-semibold text-ink hover:text-sage-800 transition-colors">
                    {CLINIC.phoneDisplay}
                  </a>
                </div>

                <div>
                  <span className="text-ink-muted block text-[11px] font-mono">WhatsApp Consultation Desk</span>
                  <a
                    href={`https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent('Hello Dr. Sharma, I want to inquire about appointments.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[#1EBE5D] hover:underline"
                  >
                    +91 98201 44521 (Quick Chat)
                  </a>
                </div>

                <div>
                  <span className="text-ink-muted block text-[11px] font-mono">Email Inquiries</span>
                  <a href={`mailto:${CLINIC.email}`} className="text-xs text-ink hover:underline">
                    {CLINIC.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-sm bg-white border border-hairline shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-sage-800 font-medium text-base">
                <Clock size={16} className="text-sand-700" />
                <span>Consultation Timings</span>
              </div>

              <div className="space-y-1.5 text-xs text-ink-secondary num-tabular">
                <div className="flex justify-between py-1 border-b border-hairline">
                  <span>Monday – Saturday</span>
                  <span className="font-medium text-ink">9:30 AM – 7:30 PM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-hairline">
                  <span>Sunday</span>
                  <span className="text-ink-muted">Emergency triage on call</span>
                </div>
                <p className="text-[11px] text-ink-muted pt-1">
                  Lunch interval: 1:30 PM – 3:30 PM
                </p>
              </div>
            </div>

          </div>

          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-sm bg-white border border-hairline shadow-2xs">
              
              <div className="mb-6 space-y-1">
                <h2 className="font-serif text-2xl font-medium text-ink">
                  Send a Direct Message
                </h2>
                <p className="font-sans text-xs sm:text-sm text-ink-secondary">
                  Dr. Satyam Sharma and our desk respond to all inquiries within 2 hours during clinic timings.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 bg-sage-50 border border-sage-200 rounded-sm space-y-4 text-center">
                  <CheckCircle2 size={36} className="text-sage-700 mx-auto" />
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl font-medium text-ink">
                      Inquiry Received
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-ink-secondary">
                      Thank you, {formData.name}. We will contact you at {formData.phone} shortly.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={waFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp text-xs h-9 px-4"
                    >
                      <MessageCircle size={14} />
                      <span>Forward to WhatsApp</span>
                    </a>
                    <a
                      href={mailtoUrl}
                      className="btn-secondary text-xs h-9 px-4"
                    >
                      <Mail size={14} />
                      <span>Send via Email Client</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      className="w-full h-11 px-3.5 bg-canvas-subtle border border-border rounded-xs text-sm text-ink focus:bg-white focus:outline-none focus:ring-1 focus:ring-sage-700"
                      placeholder="e.g. Anand Mehra"
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-600 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                        Mobile Number *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                        className="w-full h-11 px-3.5 bg-canvas-subtle border border-border rounded-xs text-sm text-ink focus:bg-white focus:outline-none focus:ring-1 focus:ring-sage-700"
                        placeholder="e.g. 98201 44521"
                      />
                      {errors.phone && (
                        <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        className="w-full h-11 px-3.5 bg-canvas-subtle border border-border rounded-xs text-sm text-ink focus:bg-white focus:outline-none focus:ring-1 focus:ring-sage-700"
                        placeholder="e.g. anand@gmail.com"
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-600 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                      Your Message or Concern *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      className="w-full p-3.5 bg-canvas-subtle border border-border rounded-xs text-sm text-ink focus:bg-white focus:outline-none focus:ring-1 focus:ring-sage-700"
                      placeholder="Describe what you would like to discuss (e.g. tooth sensitivity, clear aligner consultation, general checkup)..."
                    />
                    {errors.message && (
                      <p className="text-xs text-rose-600 mt-1">{errors.message}</p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="btn-primary w-full text-xs h-11"
                    >
                      <Send size={14} />
                      <span>Submit Inquiry</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
