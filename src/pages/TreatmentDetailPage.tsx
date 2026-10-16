import { useState } from 'react';
import { useParams, Link, Navigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Calendar, MessageCircle, Phone, ChevronDown, ShieldCheck } from 'lucide-react';
import { TREATMENTS } from '@/data/services';
import { CLINIC } from '@/data/clinicInfo';

export default function TreatmentDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const treatment = TREATMENTS.find((t) => t.slug === slug);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!treatment) {
    return <Navigate to="/services" replace />;
  }

  const waTreatmentUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(
    `Hello Dr. Sharma, I want to book an appointment for ${treatment.name} at Aura Dental Studio.`
  )}`;

  const category = treatment.category;
  const backToServices = category && searchParams.get('category') === category
    ? `/services?category=${encodeURIComponent(category)}`
    : '/services';

  return (
    <div className="bg-slate-50 text-slate-800 font-sans py-10 sm:py-16">
      <div className="max-w-container mx-auto px-4 sm:px-8">
        
        <div className="mb-8">
          <Link
            to={backToServices}
            className="inline-flex items-center gap-2 text-xs font-bold text-teal-700 hover:text-teal-800 transition-colors bg-white px-3.5 py-2 rounded-lg border border-slate-200 shadow-xs"
          >
            <ArrowLeft size={14} />
            <span>{category && searchParams.get('category') === category ? `Back to ${category} Services` : 'Back to All Dental Services'}</span>
          </Link>
        </div>

        <div className="space-y-8 sm:space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            <section className="order-2 lg:order-1 lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm flex flex-col gap-6">
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md inline-block border border-teal-100">
                  {treatment.category} · Aura Dental Studio
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {treatment.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  {treatment.benefit}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Starting Fee</span>
                  <span className="text-xl font-extrabold text-teal-800">{treatment.priceFormatted}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Link to="/book" className="btn-primary w-full text-xs h-11">
                  <Calendar size={15} />
                  <span>Book Appointment</span>
                </Link>
                <a
                  href={waTreatmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full text-xs h-11"
                >
                  <MessageCircle size={15} />
                  <span>Ask Dr. Sharma on WhatsApp</span>
                </a>
                <a href={`tel:${CLINIC.phone}`} className="btn-secondary w-full text-xs h-11">
                  <Phone size={14} className="text-teal-700" />
                  <span>Call Clinic: {CLINIC.phoneDisplay}</span>
                </a>
              </div>

              <div className="mt-auto pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-teal-600 shrink-0" />
                  <span>Computerized slow-delivery anesthesia (Painless)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-teal-600 shrink-0" />
                  <span>0% Interest monthly installments (EMI) available</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-teal-600 shrink-0" />
                  <span>100% Itemized written quote before we start</span>
                </div>
              </div>
            </section>

            {treatment.image && (
              <div className="order-1 lg:order-2 lg:col-span-7 aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm p-2">
                <img
                  src={treatment.image}
                  alt={treatment.name}
                  className="w-full h-full object-cover rounded-xl"
                  loading="eager"
                />
              </div>
            )}
          </div>

          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Clinical Overview</h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{treatment.description}</p>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Step-by-Step Procedure</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Here is what happens during your visit with Dr. Satyam Sharma:
            </p>
            <div className="space-y-3 pt-2">
              {treatment.steps.map((step, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            <section className="bg-teal-50 border border-teal-200 rounded-2xl p-6 sm:p-8 space-y-2">
              <h2 className="text-base font-bold text-teal-900">Post-Treatment Aftercare & Recovery</h2>
              <p className="text-xs sm:text-sm text-teal-800 leading-relaxed">{treatment.aftercare}</p>
            </section>

            {treatment.faqs.length > 0 && (
              <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
                <div className="divide-y divide-slate-200 border-y border-slate-200">
                  {treatment.faqs.map((faq, index) => {
                    const isOpen = openFaq === index;
                    return (
                      <div key={faq.q} className="py-4">
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : index)}
                          className="w-full flex items-center justify-between text-left gap-4 group"
                        >
                          <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                            {faq.q}
                          </span>
                          <ChevronDown
                            size={18}
                            className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                              isOpen ? 'rotate-180 text-teal-700' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="pt-2.5 pr-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
