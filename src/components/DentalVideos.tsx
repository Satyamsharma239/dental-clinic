const VIDEOS = [
  {
    title: 'A look inside a dental clinic',
    description: 'A short tour of a modern dental treatment room.',
    poster: 'https://cdn.pixabay.com/video/2019/03/11/21936-322869299_tiny.jpg',
    src: 'https://cdn.pixabay.com/video/2019/03/11/21936-322869299_large.mp4',
  },
  {
    title: 'Understanding root canal treatment',
    description: 'An animated view of the inside of a tooth.',
    poster: 'https://cdn.pixabay.com/video/2016/07/26/4015-176369904_tiny.jpg',
    src: 'https://cdn.pixabay.com/video/2016/07/26/4015-176369904_large.mp4',
  },
  {
    title: 'Dental check-up',
    description: 'A short clip showing a patient visit to a dental clinic.',
    poster: 'https://cdn.pixabay.com/video/2025/06/13/285771_tiny.jpg',
    src: 'https://cdn.pixabay.com/video/2025/06/13/285771_large.mp4',
  },
  {
    title: 'Inside a tooth',
    description: 'An animated view of tooth structure and dental treatment.',
    poster: 'https://cdn.pixabay.com/video/2016/07/26/4017-176369907_tiny.jpg',
    src: 'https://cdn.pixabay.com/video/2016/07/26/4017-176369907_large.mp4',
  },
];

type DentalVideosProps = {
  compact?: boolean;
  embedded?: boolean;
};

export default function DentalVideos({ compact = false, embedded = false }: DentalVideosProps) {
  return (
    <section className={embedded ? 'pt-8' : `border-b border-slate-200 bg-white ${compact ? 'py-10 sm:py-14' : 'py-16 sm:py-24'}`}>
      <div className={embedded ? '' : 'max-w-container mx-auto px-4 sm:px-8'}>
        <header className={`mx-auto mb-8 max-w-2xl space-y-3 text-center sm:mb-10 ${embedded ? 'border-t border-slate-200 pt-8' : ''}`}>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Dental care videos</span>
          <h2 className={`${embedded ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'} font-extrabold text-slate-900`}>
            A closer look at dental care
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            General clips of the clinic and common dental treatments.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VIDEOS.map((video) => (
            <article key={video.src} className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="relative aspect-video bg-slate-100">
                <video
                  className="h-full w-full object-cover"
                  controls
                  playsInline
                  preload="none"
                  poster={video.poster}
                  aria-label={video.title}
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support embedded video.
                </video>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="font-bold text-slate-900">{video.title}</h3>
                <p className="text-xs leading-relaxed text-slate-600">{video.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
