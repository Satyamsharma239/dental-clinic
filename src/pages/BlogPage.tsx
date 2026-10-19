import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '@/components/PageHero';
import { BLOG_ARTICLES } from '@/data/blogArticles';

export default function BlogPage() {
  return (
    <div className="bg-slate-50 font-sans text-slate-800">
      <PageHero
        eyebrow="Dental Notes"
        title="Clear answers for more confident dental care."
        description="Practical reading to help you prepare for a visit, understand your options, and have a more informed conversation with your dentist."
      />

      <main className="max-w-container mx-auto space-y-8 px-4 py-10 sm:px-8 sm:py-14">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_ARTICLES.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
            >
              <img
                src={article.image}
                alt={article.imageAlt}
                className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="eager"
                onError={(event) => {
                  event.currentTarget.src = '/images/reception.webp';
                }}
              />
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                  {article.category}
                </span>
                <h2 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-teal-800">
                  {article.title}
                </h2>
                <p className="flex-1 text-sm leading-relaxed text-slate-600">{article.summary}</p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700">
                    Read article <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-slate-500">
          These articles provide general information only and are not a diagnosis or a substitute for advice from a qualified dental professional.
        </p>
      </main>
    </div>
  );
}
