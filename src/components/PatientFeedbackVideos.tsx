import { useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: '3WAsIWIKZoY',
    title: 'Patient testimonial',
    clinic: "Dr. Kalyani's Family Dental Clinic · Sangli",
  },
  {
    id: '6Lnq7_e55AI',
    title: 'Patient feedback',
    clinic: 'Microdent Dentistry · Pune',
  },
  {
    id: '6u25QmziN_g',
    title: 'Patient testimonial',
    clinic: 'Shaad Aesthetics Dental Clinic · Coimbatore',
  },
  {
    id: 'G_wLP4i4QqA',
    title: 'Root canal treatment testimonial',
    clinic: 'Clove Dental',
  },
];

export default function PatientFeedbackVideos() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  return (
    <section className="space-y-6" aria-labelledby="feedback-video-heading">
      <header className="mx-auto max-w-2xl space-y-3 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Patient feedback videos</span>
        <h2 id="feedback-video-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Patient stories from dental clinics
        </h2>
        <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-600">
          Public patient testimonials from the clinics named below. These are not reviews of Aura Dental Studio.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TESTIMONIALS.map((testimonial) => {
          const isPlaying = playingVideo === testimonial.id;
          const videoUrl = `https://www.youtube.com/embed/${testimonial.id}?start=0&end=10&autoplay=1&playsinline=1&rel=0`;
          const sourceUrl = `https://www.youtube.com/watch?v=${testimonial.id}`;

          return (
            <article key={testimonial.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                {isPlaying ? (
                  <iframe
                    className="h-full w-full"
                    src={videoUrl}
                    title={`${testimonial.title} from ${testimonial.clinic}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img
                      src={`https://i.ytimg.com/vi/${testimonial.id}/hqdefault.jpg`}
                      alt={`Video thumbnail for ${testimonial.title} from ${testimonial.clinic}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-950/25" />
                    <button
                      type="button"
                      onClick={() => setPlayingVideo(testimonial.id)}
                      aria-label={`Play ${testimonial.title} from ${testimonial.clinic}`}
                      className="absolute inset-0 flex items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
                    >
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-700 shadow-xl transition-transform hover:scale-110">
                        <Play size={21} className="ml-1" />
                      </span>
                    </button>
                    <span className="absolute bottom-3 right-3 rounded bg-slate-950/80 px-2 py-1 text-[10px] font-semibold text-white">
                      00:10 preview
                    </span>
                  </>
                )}
              </div>
              <div className="space-y-2 p-4">
                <h3 className="font-bold text-slate-900">{testimonial.title}</h3>
                <p className="text-xs leading-relaxed text-slate-600">{testimonial.clinic}</p>
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                >
                  View original on YouTube <ExternalLink size={13} />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
