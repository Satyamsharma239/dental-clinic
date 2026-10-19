import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import FadeIn from '@/components/FadeIn';
import PageHero from '@/components/PageHero';
import { BLOG_ARTICLES } from '@/data/blogArticles';
import NotFoundPage from '@/pages/NotFoundPage';

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = BLOG_ARTICLES.find((item) => item.slug === slug);

  if (!article) return <NotFoundPage />;

  const relatedArticles = [
    ...BLOG_ARTICLES.filter((item) => item.slug !== article.slug && item.category === article.category),
    ...BLOG_ARTICLES.filter((item) => item.slug !== article.slug && item.category !== article.category),
  ].slice(0, 3);

  return (
    <div className="bg-slate-50 font-sans text-slate-800">
      <PageHero
        eyebrow={article.category}
        title={article.title}
        description={article.summary}
      />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-8 sm:py-12">
        <Link
          to="/blog"
          className="mb-6 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-teal-800 transition-colors hover:text-teal-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
        >
          <ArrowLeft size={16} /> All dental articles
        </Link>

        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <img
            src={article.image}
            alt={article.imageAlt}
            className="aspect-[16/8] w-full object-cover"
            onError={(event) => {
              event.currentTarget.src = '/images/reception.webp';
            }}
          />
          <div className="space-y-8 p-5 sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                {article.category}
              </span>
            </div>

            <p className="text-base leading-8 text-slate-700 sm:text-lg">{article.introduction}</p>

            <aside className="rounded-xl border border-teal-100 bg-teal-50/70 p-5 sm:p-6">
              <h2 className="text-base font-bold text-slate-900">Key points to remember</h2>
              <ul className="mt-4 space-y-3">
                {article.keyPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-teal-700" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="space-y-7">
              {article.sections.map((section, index) => (
                <section key={section.heading} className="space-y-2">
                  <h2 className="text-xl font-bold text-slate-900">
                    {index + 1}. {section.heading}
                  </h2>
                  <p className="text-sm leading-7 text-slate-600 sm:text-base">{section.body}</p>
                </section>
              ))}
            </div>

            <p className="border-t border-slate-100 pt-5 text-xs leading-relaxed text-slate-500">
              This article provides general information only. It is not a diagnosis or a substitute for advice from a qualified dental professional who knows your circumstances.
            </p>
          </div>
        </article>

        <div className="mt-8 rounded-2xl bg-slate-900 p-6 text-white sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <h2 className="text-lg font-bold">Have a question about your dental care?</h2>
            <p className="mt-1 text-sm text-slate-300">Talk through your concerns and possible next steps with the clinic.</p>
          </div>
          <Link
            to="/book"
            className="btn-primary mt-4 inline-flex min-h-11 items-center justify-center px-5 text-sm sm:mt-0"
          >
            Book Appointment
          </Link>
        </div>

        {relatedArticles.length > 0 && (
          <section aria-labelledby="related-articles-title" className="mt-14">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Keep exploring
              </span>
              <h2 id="related-articles-title" className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                You might also find these helpful
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                A few more practical reads for your dental care journey.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((relatedArticle, index) => (
                <FadeIn key={relatedArticle.slug} delay={index * 0.08} className="h-full">
                  <Link
                    to={`/blog/${relatedArticle.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
                  >
                    <div className="overflow-hidden bg-slate-100">
                      <img
                        src={relatedArticle.image}
                        alt={relatedArticle.imageAlt}
                        className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.src = '/images/reception.webp';
                        }}
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                        {relatedArticle.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-teal-800">
                        {relatedArticle.title}
                      </h3>
                      <p className="flex-1 text-sm leading-relaxed text-slate-600">
                        {relatedArticle.summary}
                      </p>
                      <span className="inline-flex items-center gap-1.5 border-t border-slate-100 pt-3 text-xs font-bold text-teal-700">
                        Read article
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
