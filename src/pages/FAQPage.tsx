import React, { useState } from 'react';
import { ChevronDown, Search, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import FadeIn from '@/components/FadeIn';
import { Link } from 'react-router-dom';
import { CLINIC } from '@/data/clinicInfo';

const FAQS = [
  {
    category: 'comfort',
    question: "Is modern root canal treatment uncomfortable?",
    answer: "No. Modern endodontics focuses on prompt pain relief rather than causing discomfort. With profound computerized local anesthesia and topical numbing gels, the procedure feels similar to a routine restorative filling."
  },
  {
    category: 'aligners',
    question: "How do clear aligners compare to fixed bracket braces?",
    answer: "Clear aligners are discreet, transparent, and removable for dining and oral hygiene. Using high-resolution digital scanning, we map out exact tooth movement trajectories from consultation through final retention."
  },
  {
    category: 'pricing',
    question: "How are treatment costs determined?",
    answer: "Following your initial visual assessment and 3D intraoral scan, we provide a transparent, itemized treatment estimate. Every line item is clearly defined with no unexpected charges."
  },
  {
    category: 'comfort',
    question: "What if I experience severe dental apprehension or anxiety?",
    answer: "Dental anxiety is very common. We work at your comfort level, take deliberate pauses, explain every step beforehand, and eliminate clinical rushedness with dedicated appointment blocks."
  },
  {
    category: 'hygiene',
    question: "How frequently should I schedule preventive hygiene appointments?",
    answer: "We recommend scheduling a comprehensive examination and gentle ultrasonic cleaning every six months to monitor gum health and prevent decay early."
  },
  {
    category: 'first-visit',
    question: "What should I expect during my first studio visit?",
    answer: "Your initial visit is a relaxed consultation. We review your dental history, perform high-definition intraoral scans, discuss aesthetic or functional goals, and provide tailored treatment choices."
  },
  {
    category: 'pricing',
    question: "Do you offer sample consultation estimates prior to starting?",
    answer: "Yes. We believe informed patients make the best healthcare decisions. We never initiate clinical treatment without your explicit, unpressured consent."
  },
  {
    category: 'first-visit',
    question: "Do I need to bring anything to my initial consultation?",
    answer: "Simply bring any previous dental records, X-rays, or relevant medical details if available. Everything else is handled digitally during your appointment."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<'all' | 'comfort' | 'aligners' | 'pricing' | 'first-visit'>('all');
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
    <div className="flex flex-col bg-bg">
      <section className="pt-16 pb-20 lg:pt-24 lg:pb-28 border-b border-border bg-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-6">
          <FadeIn>
            <span className="editorial-badge">
              Patient Guidance & FAQs
            </span>

            <h1 className="font-heading text-4xl sm:text-6xl text-primary font-normal tracking-tight">
              Honest answers to <br />
              <span className="italic font-light text-primary-light">common questions.</span>
            </h1>

            <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              We believe great dental experiences begin with clear communication. Here are candid answers to our most frequent patient inquiries.
            </p>

            <div className="max-w-md mx-auto relative pt-2">
              <Search size={16} className="absolute left-4 top-5 text-text-light" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g. root canal, aligners, fees)..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-bg text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {[
                { id: 'all', label: 'All Questions' },
                { id: 'comfort', label: 'Comfort & Anxiety' },
                { id: 'aligners', label: 'Orthodontics & Aligners' },
                { id: 'pricing', label: 'Pricing & Estimates' },
                { id: 'first-visit', label: 'First Visit' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeCategory === cat.id
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-bg border border-border text-text-muted hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-bg">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <FadeIn>
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-border overflow-hidden shadow-soft transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(index)}
                      className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      aria-expanded={isOpen}
                    >
                      <span className="font-heading text-lg sm:text-xl font-semibold text-primary">
                        {faq.question}
                      </span>
                      <span className="w-8 h-8 rounded-full bg-bg border border-border flex items-center justify-center text-primary shrink-0 transition-transform duration-200">
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-1 text-sm sm:text-base text-text-muted leading-relaxed border-t border-border/60 animate-fadeIn">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredFaqs.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-border p-8">
                  <p className="text-sm text-text-muted">No questions found matching your search.</p>
                </div>
              )}
            </div>

            <div className="mt-14 bg-white border border-border rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-4">
              <h3 className="font-heading text-2xl font-semibold text-primary">
                Still have a question?
              </h3>
              <p className="text-text-muted text-sm leading-relaxed max-w-md mx-auto">
                Schedule a consultation to speak directly with our clinical team.
              </p>
              <div className="pt-2">
                <Link to="/booking" className="btn-primary text-xs py-3 px-6 font-semibold">
                  <span>Book consultation</span>
                  <ArrowRight size={14} className="text-accent" />
                </Link>
              </div>
            </div>

          </FadeIn>
        </div>
      </section>
    </div>
  );
}
