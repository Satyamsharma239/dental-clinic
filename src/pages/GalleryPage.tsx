import FadeIn from '@/components/FadeIn';
import { CLINIC, CLINIC_PHOTOS } from '@/data/clinicInfo';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GalleryPage() {
  const spaces = [
    {
      title: 'Clinical Treatment Suite',
      desc: 'Ergonomic patient seating with natural daylight orientation and overhead high-definition monitors.',
      image: CLINIC_PHOTOS.operatory,
      tag: 'Operatory',
    },
    {
      title: 'Arrival & Discussion Lounge',
      desc: 'Acoustically dampened arrival area designed with warm natural textures to eliminate conventional waiting room anxiety.',
      image: CLINIC_PHOTOS.lounge,
      tag: 'Lounge',
    },
    {
      title: 'Precision Diagnostic Suite',
      desc: 'Chairside digital radiography and low-radiation 3D intraoral optical scanning for immediate visualization.',
      image: CLINIC_PHOTOS.diagnostic,
      tag: 'Diagnostics',
    },
    {
      title: 'Discreet Orthodontic Planning',
      desc: 'Dedicated digital planning station for clear aligner trajectory modeling and patient case reviews.',
      image: CLINIC_PHOTOS.aligners,
      tag: 'Orthodontics',
    },
    {
      title: 'Sterilization & Infection Control',
      desc: 'Medical-grade multi-stage ultrasonic cleansing, barrier pouch sealing, and autoclave tracking protocols.',
      image: CLINIC_PHOTOS.instruments,
      tag: 'Sterility',
    },
    {
      title: 'Unhurried Consultation Suite',
      desc: 'Private space for reviewing smile goals and discussing care options with the clinical team.',
      image: CLINIC_PHOTOS.consultation,
      tag: 'Consultation',
    },
  ];

  return (
    <div className="flex flex-col bg-bg">
      <section className="py-12 sm:py-16 border-b border-border bg-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-4">
          <FadeIn>
            <span className="editorial-badge">
              Studio Atmosphere
            </span>

            <h1 className="font-heading text-3xl sm:text-5xl text-primary font-normal tracking-tight">
              An environment designed for <br />
              <span className="italic font-light text-primary-light">clarity and calm.</span>
            </h1>

            <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Every detail of our studio — from acoustic isolation to natural lighting — is curated to replace dental apprehension with quiet confidence.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-bg">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {spaces.map((space, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-border overflow-hidden shadow-soft transition-all duration-200 hover:border-primary/30 flex flex-col"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-bg relative">
                    <img
                      src={space.image}
                      alt={space.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-sm text-primary text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md border border-border">
                      {space.tag}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-grow space-y-2">
                    <h3 className="font-heading text-xl font-semibold text-primary">
                      {space.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed flex-grow">
                      {space.desc}
                    </p>
                    <div className="pt-2 text-[11px] font-mono text-text-light">
                      Sample Studio Imagery
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 bg-white border border-border rounded-2xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4">
              <span className="mint-pill">
                <Sparkles size={13} />
                Visit In Person
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-normal text-primary">
                Experience our studio in Bandra West.
              </h3>
              <p className="text-text-muted text-sm max-w-md mx-auto leading-relaxed">
                Take an unhurried first step with a comprehensive digital examination and smile consultation.
              </p>
              <div className="pt-2">
                <Link to="/booking" className="btn-primary text-xs py-3 px-6 font-semibold">
                  <span>Schedule consultation</span>
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
