import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import DentalVideos from '@/components/DentalVideos';

const ARTICLES = [
  {
    id: 'first-visit',
    category: 'Your first visit',
    title: 'What to expect at a dental consultation',
    summary: 'A first visit is a chance to discuss your concerns, understand your options, and make a plan together.',
    image: '/images/dental-tools.webp',
    imageAlt: 'Dentist examining a patient in a dental clinic',
    paragraphs: [
      'A useful consultation starts with your concerns. Share what has been bothering you, any relevant dental or medical history, and what you hope to achieve. It is completely fine to bring questions or ask the clinician to explain something again.',
      'Your dentist will assess your oral health and explain any findings in plain language. If treatment is recommended, ask about the available options, expected steps, and aftercare before deciding how you would like to proceed.',
      'You should leave with a clearer understanding of the next steps—not pressure to begin treatment before you are ready.',
    ],
  },
  {
    id: 'aligner-questions',
    category: 'Orthodontics',
    title: 'Considering clear aligners? Questions worth asking',
    summary: 'Suitability, follow-up, daily wear, and retention are all useful parts of an aligner conversation.',
    image: '/images/aligners.webp',
    imageAlt: 'Clear aligners being fitted over teeth',
    paragraphs: [
      'Clear aligners are one option for moving teeth, but the right approach depends on an individual assessment. Ask your orthodontist to explain whether aligners are appropriate for your bite and goals, and what alternatives may be worth considering.',
      'Before starting, discuss the proposed treatment stages, how progress will be reviewed, what daily wear involves, and what happens if a tray does not fit as expected.',
      'It is also helpful to ask about retention after active treatment. Your clinician can explain the follow-up plan for your specific case.',
    ],
  },
  {
    id: 'calmer-care',
    category: 'Comfort & care',
    title: 'How to make a dental visit feel more manageable',
    summary: 'A few small steps can help you feel more informed and in control during an appointment.',
    image: '/images/hero-patient.webp',
    imageAlt: 'Dentist showing a patient their dental scans',
    paragraphs: [
      'If dental visits make you nervous, let the clinic know when booking. That gives the team a chance to understand your concerns and talk through what would help you feel comfortable.',
      'You can ask the clinician to explain each step before it begins, agree on a signal for taking a pause, and discuss any questions you have about comfort or pain management.',
      'Care should be a conversation. If you feel uncertain, ask for time to consider the information before making a decision.',
    ],
  },
];

export default function BlogPage() {
  return (
    <div className="bg-slate-50 text-slate-800 font-sans">
      <PageHero
        eyebrow="Dental Notes"
        title="Clear answers for more confident dental care."
        description="Practical reading to help you prepare for a visit, understand your options, and have a more informed conversation with your dentist."
      />

      <main className="max-w-container mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-10">
        <nav aria-label="Dental articles">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ARTICLES.map((article) => (
              <a
                key={article.id}
                href={`#${article.id}`}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-teal-300 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
              >
                <img src={article.image} alt={article.imageAlt} className="w-full aspect-[16/9] object-cover" loading="eager" />
                <div className="p-5 space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">{article.category}</span>
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-teal-800 transition-colors">{article.title}</h2>
                  <p className="text-sm text-slate-600 leading-relaxed">{article.summary}</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700">
                    Read article <ArrowRight size={14} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </nav>

        <DentalVideos compact />

        <div className="space-y-6">
          {ARTICLES.map((article) => (
            <article
              key={article.id}
              id={article.id}
              className="scroll-mt-28 grid grid-cols-1 items-center gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:grid-cols-5 lg:gap-10"
            >
              <div className="space-y-4 lg:col-span-3">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-700">{article.category}</span>
                  <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">{article.title}</h2>
                  <p className="text-base leading-relaxed text-slate-600">{article.summary}</p>
                </div>
                <div className="space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {article.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </div>
              <img
                src={article.image}
                alt={article.imageAlt}
                className="aspect-[4/3] w-full rounded-xl object-cover lg:col-span-2"
                loading="lazy"
              />
            </article>
          ))}
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          These articles provide general information only and are not a diagnosis or a substitute for advice from a qualified dental professional.
        </p>
      </main>
    </div>
  );
}
