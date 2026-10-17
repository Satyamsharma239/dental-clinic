type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="flex min-h-[360px] items-center border-b border-slate-200 bg-gradient-to-br from-teal-50 via-slate-50 to-emerald-50/50 sm:h-[340px] sm:min-h-0">
      <div className="mx-auto w-full max-w-container px-4 py-10 text-center sm:px-8 sm:py-12">
        <div className="mx-auto max-w-4xl space-y-4">
        <div className="inline-flex items-center rounded-full border border-teal-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-800 shadow-xs">
          <span>{eyebrow}</span>
          </div>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
