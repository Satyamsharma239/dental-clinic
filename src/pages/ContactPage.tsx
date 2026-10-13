import { useState } from 'react';
import FadeIn from '@/components/FadeIn';
import { CLINIC } from '@/data/clinicInfo';
import { 
  MapPin, 
  Mail, 
  Clock, 
  Phone, 
  Send, 
  CheckCircle2, 
  Calendar, 
  Info,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  const [inquiry, setInquiry] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inquiry.name.trim() && (inquiry.phone.trim() || inquiry.email.trim())) {
      setSubmitted(true);
      setTimeout(() => {
        setInquiry({ name: '', phone: '', email: '', message: '' });
        setSubmitted(false);
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col bg-bg">
      {/* 1. Header */}
      <section className="pt-16 pb-20 lg:pt-24 lg:pb-28 border-b border-border bg-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-6">
          <FadeIn>
            <span className="editorial-badge">
              Studio Location & Inquiries
            </span>

            <h1 className="font-heading text-4xl sm:text-6xl text-primary font-normal tracking-tight">
              Connect with <br />
              <span className="italic font-light text-primary-light">our clinical team.</span>
            </h1>

            <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Located on Waterfield Road in Bandra West, Mumbai. Reach out with clinical inquiries or book your introductory consultation online.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 2. Main Content */}
      <section className="section-padding bg-bg">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column (5 cols): Studio Information */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-2xl border border-border p-7 sm:p-8 shadow-soft space-y-6">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-text-light block">
                      Sample Studio Location
                    </span>
                    <h2 className="font-heading text-2xl font-semibold text-primary mt-1">
                      {CLINIC.name}
                    </h2>
                    <p className="text-sm text-text-muted mt-2 leading-relaxed">
                      {CLINIC.address.full}
                    </p>
                    <p className="text-xs text-text-light mt-1 font-mono">
                      {CLINIC.transitGuide}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border space-y-4 text-xs">
                    <div>
                      <span className="font-semibold text-primary block">Consultation Hours</span>
                      <p className="text-text-muted mt-0.5">{CLINIC.hours.weekdays}</p>
                      <p className="text-text-light">{CLINIC.hours.lunch}</p>
                    </div>

                    <div>
                      <span className="font-semibold text-primary block">Digital Contact</span>
                      <p className="text-text-muted mt-0.5">{CLINIC.email}</p>
                      <p className="text-text-muted font-mono">{CLINIC.phoneDisplay}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <Link
                      to="/booking"
                      className="btn-primary w-full text-xs font-semibold py-3.5 shadow-xs"
                    >
                      <Calendar size={14} className="text-accent" />
                      <span>Book consultation online</span>
                    </Link>
                  </div>
                </div>

                {/* Demonstration Notice */}
                <div className="p-4 rounded-xl bg-white border border-border text-xs text-text-muted space-y-1">
                  <p className="font-semibold text-primary flex items-center gap-1.5">
                    <Info size={14} className="text-accent" />
                    Portfolio Demonstration Note
                  </p>
                  <p className="text-[11px] leading-relaxed">
                    This location and contact details serve as illustrative mock data for portfolio design review. Inquiries submitted on this form simulate client-side validation.
                  </p>
                </div>
              </div>

              {/* Right Column (7 cols): Inquiries Form */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-border p-7 sm:p-9 shadow-soft space-y-6">
                <div>
                  <span className="editorial-badge mb-2">
                    Direct Inquiry
                  </span>
                  <h3 className="font-heading text-2xl font-semibold text-primary">
                    Send a Message to the Clinic
                  </h3>
                  <p className="text-text-muted text-sm mt-1">
                    Have questions about clear aligners, restorative timelines, or sample pricing? Send us a note below.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-6 rounded-xl bg-primary-50 border border-primary/20 text-center space-y-3 animate-fadeIn">
                    <CheckCircle2 size={36} className="text-primary mx-auto" />
                    <h4 className="font-heading text-lg font-semibold text-primary">
                      Demonstration Message Received
                    </h4>
                    <p className="text-xs text-text-muted max-w-sm mx-auto leading-relaxed">
                      Thank you for testing the contact form. In a production environment, this triggers an authenticated API handoff to our clinic CRM.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div>
                      <label htmlFor="inquiry-name" className="block text-xs font-semibold text-text mb-1">
                        Your Full Name *
                      </label>
                      <input
                        id="inquiry-name"
                        type="text"
                        required
                        value={inquiry.name}
                        onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                        placeholder="e.g. Siddharth Verma"
                        className="w-full px-3.5 py-3 rounded-lg border border-border bg-white text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="inquiry-phone" className="block text-xs font-semibold text-text mb-1">
                          Phone Number
                        </label>
                        <input
                          id="inquiry-phone"
                          type="tel"
                          value={inquiry.phone}
                          onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })}
                          placeholder="+91 98201 00000"
                          className="w-full px-3.5 py-3 rounded-lg border border-border bg-white text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                        />
                      </div>

                      <div>
                        <label htmlFor="inquiry-email" className="block text-xs font-semibold text-text mb-1">
                          Email Address
                        </label>
                        <input
                          id="inquiry-email"
                          type="email"
                          value={inquiry.email}
                          onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
                          placeholder="siddharth@example.com"
                          className="w-full px-3.5 py-3 rounded-lg border border-border bg-white text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="inquiry-message" className="block text-xs font-semibold text-text mb-1">
                        Your Inquiry or Clinical Question
                      </label>
                      <textarea
                        id="inquiry-message"
                        rows={4}
                        value={inquiry.message}
                        onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                        placeholder="Share any questions about treatment duration, appointment slots, or care preferences..."
                        className="w-full px-3.5 py-3 rounded-lg border border-border bg-white text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary text-xs font-semibold py-3.5 px-6 shadow-xs"
                    >
                      <span>Send inquiry</span>
                      <Send size={13} className="text-accent" />
                    </button>
                  </form>
                )}

              </div>

            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
