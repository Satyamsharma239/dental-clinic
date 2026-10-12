import React, { useState } from 'react';
import { ChevronDown, Sparkles, Search, Calendar, Phone, HelpCircle } from 'lucide-react';
import FadeIn from '@/components/FadeIn';
import { Link } from 'react-router-dom';
import { CLINIC } from '@/data/clinicInfo';
import { DentalToothIcon } from '@/components/common/DentalToothIcon';

const FAQS = [
  {
    category: 'pain',
    question: "Is root canal treatment painful?",
    answer: "No, modern root canal treatment is designed to relieve pain, not cause it. We use profound local anaesthesia and topical numbing cream so the tooth and surrounding gums are completely numb throughout. Most patients report feeling only mild vibration or pressure, virtually identical to getting a standard dental filling."
  },
  {
    category: 'cost',
    question: "How much does professional teeth cleaning cost?",
    answer: "Our ultrasonic cleaning and air polishing ranges between ₹500 to ₹1,500 depending on the extent of plaque and tartar accumulation. The exact fee is verified prior to starting treatment with zero unexpected surcharges."
  },
  {
    category: 'care',
    question: "Do you treat young children and pediatric cases?",
    answer: "Yes! Dr. Satyam Sharma has extensive experience with pediatric patients. We focus on a gentle, playful introduction to dental instruments to build lifelong dental confidence without fear."
  },
  {
    category: 'visit',
    question: "Do I need to bring anything for my first appointment?",
    answer: "Just bring a valid photo ID, along with any previous dental X-rays or prescriptions if available. If you have relevant medical conditions (e.g. hypertension, diabetes, or blood thinners), please inform Dr. Satyam Sharma."
  },
  {
    category: 'care',
    question: "How long does a composite tooth-coloured filling take?",
    answer: "A single tooth filling typically takes 30 to 40 minutes from start to finish. We use tooth-shaded composite resin that cures immediately under blue light, meaning you can resume eating normal foods shortly afterwards."
  },
  {
    category: 'care',
    question: "Is in-clinic teeth whitening safe for my enamel?",
    answer: "Yes, when performed professionally under dental supervision. We apply gum barrier protection and use clinically tested whitening gels that brighten tooth shade without weakening enamel integrity."
  },
  {
    category: 'cost',
    question: "What payment modes are accepted at the clinic?",
    answer: "We accept Cash, UPI (Google Pay, PhonePe, Paytm, BHIM), and all major Credit and Debit Cards. You can settle payment at the reception desk after your procedure."
  },
  {
    category: 'visit',
    question: "Can I book a same-day emergency appointment?",
    answer: "Yes. We maintain emergency slots every day for severe toothaches, broken teeth, or lost restorations. You can call our emergency helpline (+91 98765 43211) or book the next available slot online."
  },
  {
    category: 'care',
    question: "How often should I visit the dentist?",
    answer: "We recommend a routine dental examination and cleaning every 6 months. Regular checkups catch minor cavities before they turn into complex root canals or extractions."
  },
  {
    category: 'cost',
    question: "Do you provide a written cost estimate before treatment?",
    answer: "Always. Dr. Satyam Sharma conducts a clinical evaluation first, explains your options, and gives you a clear printed estimate before starting any work."
  },
  {
    category: 'pain',
    question: "What if I experience severe dental anxiety?",
    answer: "Please let us know! We take frequent pauses, explain every instrument before touching your tooth, use numbing gels, and work completely at your personal comfort pace."
  },
  {
    category: 'visit',
    question: "Do I need an appointment or are walk-ins accepted?",
    answer: "While we accept walk-in patients, booking online guarantees you a designated 30-minute slot with minimal or zero waiting time in the reception lounge."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<'all' | 'pain' | 'cost' | 'care' | 'visit'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="section-padding bg-gradient-to-b from-primary-50/60 to-bg border-b border-primary/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-primary/20 text-xs font-semibold text-primary mb-4 shadow-sm">
              <DentalToothIcon size={14} className="text-accent" />
              <span>Transparent Patient Answers</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary font-bold mb-4 tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-base md:text-lg text-text-muted max-w-xl mx-auto leading-relaxed">
              Honest clinical answers regarding procedure comfort, treatment times, anesthesia, and upfront pricing.
            </p>

            {/* Search Input */}
            <div className="max-w-md mx-auto mt-6 relative">
              <input
                type="text"
                placeholder="Search dental questions (e.g. root canal, cost, pain)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-primary/20 bg-white text-xs text-text shadow-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
              <Search size={16} className="absolute left-3.5 top-3.5 text-text-muted" />
            </div>

            {/* Filter categories */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              {[
                { id: 'all', label: 'All Questions' },
                { id: 'pain', label: 'Pain & Comfort' },
                { id: 'cost', label: 'Fees & Insurance' },
                { id: 'care', label: 'Procedures' },
                { id: 'visit', label: 'First Visit & Hours' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeCategory === tab.id
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-white border border-primary/15 text-text-muted hover:border-primary/40'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Accordion Content */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12 text-text-muted text-xs">
                No matching questions found. Feel free to call us directly at {CLINIC.phoneDisplay}.
              </div>
            ) : (
              filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <FadeIn key={index} delay={index * 0.03}>
                    <div className="bg-bg rounded-xl border border-primary/10 overflow-hidden shadow-soft transition-all">
                      <button
                        className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer hover:bg-primary-50/50 transition-colors"
                        onClick={() => toggleAccordion(index)}
                        aria-expanded={isOpen}
                      >
                        <span className="font-heading text-base font-bold text-primary pr-4">
                          {faq.question}
                        </span>
                        <ChevronDown 
                          size={18}
                          className={`text-accent shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-5 pt-1 text-xs text-text-muted leading-relaxed border-t border-primary/10 bg-white/70">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  </FadeIn>
                );
              })
            )}
          </div>

          {/* Bottom Consultation Banner */}
          <FadeIn delay={0.2}>
            <div className="mt-14 p-8 rounded-2xl bg-primary text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-card">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="font-heading text-xl font-bold">Have a question not listed here?</h3>
                <p className="text-xs text-white/70">
                  Speak directly with Dr. Satyam Sharma or our reception team.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a href={`tel:${CLINIC.phone}`} className="btn-outline bg-white/10 text-white border-white/20 hover:bg-white/20 text-xs py-2.5 px-4">
                  <Phone size={13} />
                  Call Reception
                </a>
                <Link to="/booking" className="btn-primary text-xs py-2.5 px-4 shadow-md">
                  <Calendar size={13} />
                  Book Visit
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
