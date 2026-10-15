import { Link } from 'react-router-dom';
import { TREATMENTS } from '@/data/services';
import { CLINIC } from '@/data/clinicInfo';
import { Calendar, MessageCircle, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';

export default function PricingPage() {
  const waPricingUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(
    'Hi Dr. Sharma, I want to inquire about treatment fees and estimates at Aura Dental Studio.'
  )}`;

  return (
    <div className="bg-canvas py-12 sm:py-20 text-ink">
      <div className="max-w-container mx-auto px-4 sm:px-8">
        
        <div className="max-w-2xl mb-10 space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.14em] text-sand-700 block">
            Transparent Pricing
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-ink tracking-tight leading-tight">
            Fair fees. No surprises.
          </h1>
          <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
            You will always receive an itemized, written quote with all clinical steps before any treatment begins. Here is our baseline fee guide in Bandra West.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-sm bg-white border border-hairline mb-10 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-6 font-sans">
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-xs bg-sand-50 text-sand-700 border border-sand-200 inline-block">
              First Visit Checkup
            </span>
            <h2 className="font-serif text-2xl font-medium text-ink">
              Comprehensive Consultation & 3D Optical Scan — ₹500
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary max-w-xl">
              Includes full examination by Dr. Satyam Sharma, intraoral camera checkup, and a printed treatment roadmap with zero pressure.
            </p>
          </div>

          <Link to="/book" className="btn-primary text-xs h-11 px-5 shrink-0">
            <Calendar size={15} />
            <span>Schedule Checkup</span>
          </Link>
        </div>

        <div className="bg-white rounded-sm border border-hairline overflow-hidden shadow-2xs mb-10 font-sans">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-canvas-subtle border-b border-hairline text-ink-muted font-mono uppercase tracking-wider text-[11px]">
                  <th className="py-4 px-4 sm:px-6">Treatment</th>
                  <th className="py-4 px-4 sm:px-6">Category</th>
                  <th className="py-4 px-4 sm:px-6">Duration</th>
                  <th className="py-4 px-4 sm:px-6 text-right">Starting Fee</th>
                  <th className="py-4 px-4 sm:px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline num-tabular">
                <tr className="bg-sand-50/50">
                  <td className="py-4 px-4 sm:px-6 font-medium text-ink">
                    Comprehensive Diagnostic Checkup & 3D Scan
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-ink-muted">General</td>
                  <td className="py-4 px-4 sm:px-6 text-ink-muted">30 mins</td>
                  <td className="py-4 px-4 sm:px-6 text-right font-mono font-bold text-sage-800">₹500</td>
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
                    <tr key={t.id} className="hover:bg-canvas-subtle transition-colors">
                      <td className="py-4 px-4 sm:px-6">
                        <Link to={`/treatments/${t.slug}`} className="font-medium text-ink hover:text-sage-800 transition-colors">
                          {t.name}
                        </Link>
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-ink-muted">{t.category}</td>
                      <td className="py-4 px-4 sm:px-6 text-ink-muted">{t.durationLabel || `${t.durationMins} mins`}</td>
                      <td className="py-4 px-4 sm:px-6 text-right font-mono font-medium text-ink">{t.priceFormatted}</td>
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          <a
                            href={waRowUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-[#1EBE5D] hover:bg-emerald-50 rounded-xs border border-border"
                            title="Ask on WhatsApp"
                            aria-label="WhatsApp Inquiry"
                          >
                            <MessageCircle size={14} />
                          </a>
                          <Link
                            to={`/book?service=${t.slug}`}
                            className="text-xs font-medium bg-canvas-subtle hover:bg-canvas-muted text-ink px-2.5 py-1.5 rounded-xs border border-border/80 transition-colors"
                          >
                            Book
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          <div className="p-6 bg-white border border-hairline rounded-sm space-y-2.5 shadow-2xs">
            <CreditCard size={18} className="text-sage-700" />
            <h3 className="font-serif text-lg font-medium text-ink">0% Interest EMI Plans</h3>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Available across 3, 6, 9, or 12 months for clear aligners, dental implants, and smile makeovers with major Indian credit cards.
            </p>
          </div>

          <div className="p-6 bg-white border border-hairline rounded-sm space-y-2.5 shadow-2xs">
            <ShieldCheck size={18} className="text-sage-700" />
            <h3 className="font-serif text-lg font-medium text-ink">Insurance Reimbursement</h3>
            <p className="text-xs text-ink-secondary leading-relaxed">
              We provide itemized clinical diagnostic bills and diagnostic certificates for reimbursement with corporate and private health policies.
            </p>
          </div>

          <div className="p-6 bg-white border border-hairline rounded-sm space-y-2.5 shadow-2xs">
            <Calendar size={18} className="text-sage-700" />
            <h3 className="font-serif text-lg font-medium text-ink">Zero Pressure Policy</h3>
            <p className="text-xs text-ink-secondary leading-relaxed">
              We discuss all clinical options and fees openly. You take the written estimate home and decide at your own pace.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center font-sans">
          <a
            href={waPricingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-xs h-11 px-6 inline-flex"
          >
            <MessageCircle size={15} />
            <span>Ask Dr. Sharma for a Fee Estimate on WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
}
