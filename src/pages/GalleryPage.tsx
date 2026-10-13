import FadeIn from '@/components/FadeIn';
import { CLINIC, CLINIC_PHOTOS } from '@/data/clinicInfo';
import { ShieldCheck, Sparkles, CheckCircle2, Calendar, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DentalToothIcon } from '@/components/common/DentalToothIcon';

export default function GalleryPage() {
  const galleryItems = [
    {
      title: 'Reception & Patient Lounge',
      desc: 'Air-conditioned, calming welcome lounge with herbal teas, ambient lighting, and zero waiting anxiety.',
      image: CLINIC_PHOTOS.reception,
      tag: 'Welcome Lounge',
    },
    {
      title: 'Ergonomic Treatment Suite',
      desc: 'Memory-foam patient chair equipped with gentle ultrasonic scaler, curing light, and overhead 4K monitor.',
      image: CLINIC_PHOTOS.operatory,
      tag: 'Operatory Room',
    },
    {
      title: 'Class-B Autoclave Sterilisation Lab',
      desc: 'Multi-stage ultrasonic cleansing, pouch sealing, and medical vacuum autoclaving for 100% infection control.',
      image: CLINIC_PHOTOS.sterilization,
      tag: 'Hygiene & Safety',
    },
    {
      title: 'Digital Intraoral Imaging & Radiography',
      desc: 'Ultra-low radiation digital sensor for instantaneous diagnosis of tooth roots, bone support, and decay.',
      image: CLINIC_PHOTOS.xray,
      tag: 'Digital Diagnostics',
    },
    {
      title: 'Individual Sterile Instrument Sets',
      desc: 'Medical-grade autoclavable stainless steel instruments sealed in barrier pouches, opened before each patient.',
      image: CLINIC_PHOTOS.instruments,
      tag: 'Sterility Protocol',
    },
    {
      title: 'Private Doctor Consultation Room',
      desc: 'Quiet consultation space where Dr. Satyam Sharma explains intraoral scans, treatment alternatives, and upfront estimates.',
      image: CLINIC_PHOTOS.consultation,
      tag: 'Doctor Consultation',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="section-padding bg-gradient-to-b from-primary-50/60 to-bg border-b border-primary/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-primary/20 text-xs font-semibold text-primary mb-4 shadow-sm">
              <DentalToothIcon size={14} className="text-accent" />
              <span>Hospital-Grade Clinical Environment</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary font-bold mb-4 tracking-tight">
              Clinic Tour & Hygiene Facilities
            </h1>
            <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
              Step inside {CLINIC.name}. Designed to combine strict international hospital sterilisation standards with an inviting, tranquil boutique atmosphere.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryItems.map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-bg rounded-2xl overflow-hidden border border-primary/10 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden relative group">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-primary font-bold text-[11px] px-3 py-1 rounded-full shadow-sm border border-primary/10">
                      {item.tag}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-grow space-y-2">
                    <h3 className="font-heading text-lg font-bold text-primary">
                      {item.title}
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed flex-grow">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Hygiene Assurance Callout */}
            <div className="mt-16 bg-primary-50/70 border border-primary/20 rounded-2xl p-8 max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left shadow-soft">
              <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
                <ShieldCheck size={28} className="text-accent" />
              </div>
              <div className="space-y-1">
                <h4 className="font-heading text-lg font-bold text-primary">Our 4-Step Sterilisation Assurance</h4>
                <p className="text-xs text-text-muted leading-relaxed">
                  Every surgical bur, scaler tip, and diagnostic instrument passes through ultrasonic bath decontamination, surgical pouch heat-sealing, and high-pressure vacuum autoclaving at 134°C.
                </p>
              </div>
            </div>

            {/* Bottom Booking Banner */}
            <div className="mt-14 p-8 rounded-2xl bg-primary text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-card">
              <div className="space-y-1 text-center md:text-left">
                <h3 className="font-heading text-2xl font-bold">Ready to Visit Us in Bandra West?</h3>
                <p className="text-xs md:text-sm text-white/70">
                  Experience clean, relaxed dental care with Dr. Satyam Sharma.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link to="/booking" className="btn-primary text-xs py-3 px-6 shadow-md">
                  <Calendar size={14} />
                  <span>Book Appointment</span>
                </Link>
                <a href={`tel:${CLINIC.phone}`} className="btn-outline bg-white/10 text-white border-white/20 hover:bg-white/20 text-xs py-3 px-5">
                  <Phone size={14} />
                  <span>Call Reception</span>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
