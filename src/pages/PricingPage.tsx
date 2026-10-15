import { Link } from 'react-router-dom';
import { TREATMENTS } from '@/data/services';
import { CLINIC } from '@/data/clinicInfo';
import { Calendar, MessageCircle, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';

export default function PricingPage() {
  const waPricingUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(
    'Hi Dr. Sharma, I want to inquire about treatment fees and estimates at Aura Dental Studio.'
  )}`;

  return (
    <div className="bg-surface-subtle py-10 md:py-16 text-slate">
      <div className="max-w-container mx-auto px-4 sm:px-8">
        
        <div className="max-w-2xl mb-8 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block">
            Transparent Pricing
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate tracking-tight">
            Fair fees. No surprises.
          </h1>
          <p className="text-sm sm:text-base text-slate-secondary">
            You will always receive an itemized, written quote with all clinical steps before any treatment begins. Here is our baseline fee guide in Bandra West.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-border mb-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700">
              First Visit Checkup
            </span>
            <h2 className="text-xl font-bold text-slate">
              Comprehensive Consultation & 3D Optical Scan — ₹500
            </h2>
            <p className="text-xs sm:text-sm text-slate-secondary">
              Includes full examination by Dr. Satyam Sharma, intraoral camera checkup, and a printed treatment roadmap with zero pressure.
            </p>
          </div>

          <Link to="/book" className="btn-primary text-xs h-11 px-5 shrink-0">
            <Calendar size={15} />
            <span>Book Checkup</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-xs mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-surface-subtle border-b border-border text-slate-muted font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-4 px-4 sm:px-6">Treatment</th>
                  <th className="py-4 px-4 sm:px-6">Category</th>
                  <th className="py-4 px-4 sm:px-6">Duration</th>
                  <th className="py-4 px-4 sm:px-6 text-right">Starting Fee</th>
                  <th className="py-4 px-4 sm:px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border num-tabular">
                <tr className="bg-brand-50/30">
                  <td className="py-4 px-4 sm:px-6 font-bold text-slate">
                    Comprehensive Diagnostic Checkup & 3D Scan
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-slate-secondary">General</td>
                  <td className="py-4 px-4 sm:px-6 text-slate-secondary">30 mins</td>
                  <td className="py-4 px-4 sm:px-6 text-right font-bold text-brand-700">₹500</td>
                  <td className="py-4 px-4 sm:px-6 text-right">
                    <Link to="/book" className="btn-primary text-xs h-8 px-3">
                      <span>Book</span>
                    </Link>
                  </td>
                </tr>

                {TREATMENTS.map((t) => {
                  const waRowUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(
                    `Hi Dr. Sharma, I want to ask about pricing for ${t.name} at Aura Dental Studio.`
                  )}`;

                  return (
                    <tr key={t.id} className="hover:bg-surface-subtle transition-colors">
                      <td className="py-4 px-4 sm:px-6">
                        <Link to={`/treatments/${t.slug}`} className="font-bold text-slate hover:text-brand-600 block">
                          {t.name}
                        </Link>
                        <span className="text-[11px] text-slate-muted">{t.benefit}</span>
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-slate-secondary">{t.category}</td>
                      <td className="py-4 px-4 sm:px-6 text-slate-secondary">{t.durationLabel}</td>
                      <td className="py-4 px-4 sm:px-6 text-right font-bold text-slate">{t.priceFormatted}</td>
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={waRowUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-[#1EBE5D] hover:bg-[#25D366]/10 rounded-md"
                            title="Inquire on WhatsApp"
                          >
                            <MessageCircle size={15} />
                          </a>
                          <Link
                            to={`/book?service=${t.slug}`}
                            className="btn-primary text-xs h-7 px-2.5"
                          >
                            <span>Book</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-surface-subtle border-t border-border text-xs text-slate-muted flex flex-col sm:flex-row justify-between gap-2">
            <span>* Final cost depends on clinical complexity and initial digital examination.</span>
            <span>All fees include hospital-grade sterilization & single-use consumables.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-border space-y-2">
            <div className="font-bold text-sm text-slate flex items-center gap-2">
              <ShieldCheck size={16} className="text-brand-600" />
              <span>Written Estimate First</span>
            </div>
            <p className="text-xs text-slate-secondary leading-relaxed">
              Before starting any treatment, you receive an itemized cost estimate. No unexpected add-ons or hidden fees.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-border space-y-2">
            <div className="font-bold text-sm text-slate flex items-center gap-2">
              <CreditCard size={16} className="text-brand-600" />
              <span>All Payment Modes</span>
            </div>
            <p className="text-xs text-slate-secondary leading-relaxed">
              We accept UPI (GPay, PhonePe, Paytm), Credit and Debit Cards, Net Banking, and cash. Instant digital receipts provided.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-border space-y-2">
            <div className="font-bold text-sm text-slate flex items-center gap-2">
              <MessageCircle size={16} className="text-[#1EBE5D]" />
              <span>0% EMI on Aligners</span>
            </div>
            <p className="text-xs text-slate-secondary leading-relaxed">
              Spread the cost of clear aligners and dental implants across 3 to 12 monthly installments with 0% interest through major banks.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href={waPricingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-xs h-11 px-6 inline-flex"
          >
            <MessageCircle size={16} />
            <span>Chat on WhatsApp for a Fee Estimate</span>
          </a>
        </div>

      </div>
    </div>
  );
}
