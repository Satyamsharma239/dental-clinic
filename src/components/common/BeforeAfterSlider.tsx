import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  timeframe: string;
  category: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  tags: string[];
}

const CASES: CaseStudy[] = [
  {
    id: 'whitening',
    title: 'Laser Enamel Whitening',
    subtitle: 'Removal of deep tea & coffee stains',
    timeframe: 'Single 45-min session',
    category: 'Cosmetic Hygiene',
    description: 'Dr. Satyam used gentle hydrogen-carbamide activation with zero enamel damage and minimal sensitivity.',
    beforeImg: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
    tags: ['4 Shades Lighter', '100% Painless', 'Natural Enamel Glaze'],
  },
  {
    id: 'ortho',
    title: 'Orthodontic Alignment',
    subtitle: 'Correction of anterior crowding & bite',
    timeframe: '8 Months Clear Aligners',
    category: 'Orthodontics',
    description: 'Custom 3D-scanned invisible aligners gently guided teeth into symmetrical arch harmony without metal wires.',
    beforeImg: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    tags: ['Digital 3D Planned', 'Discreet Clear Trays', 'Zero Food Restrictions'],
  },
  {
    id: 'restoration',
    title: 'Seamless Composite Restoration',
    subtitle: 'Chipped front incisor restored',
    timeframe: 'Single 30-min visit',
    category: 'Restorative Dentistry',
    description: 'Micro-hybrid composite shade-matched precisely to patient enamel with high-gloss anatomical polishing.',
    beforeImg: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    tags: ['Tooth-Colored', 'Bonded in 1 Visit', 'High Polish Durability'],
  },
];

export default function BeforeAfterSlider() {
  const [activeTab, setActiveTab] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100

  const activeCase = CASES[activeTab];

  return (
    <div className="bg-white rounded-2xl border border-primary/10 shadow-card overflow-hidden">
      {/* Header bar */}
      <div className="p-6 md:p-8 border-b border-primary/10 bg-primary-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
            <Sparkles size={13} className="text-accent" />
            <span>Documented Smile Outcomes</span>
          </div>
          <h3 className="font-heading text-2xl md:text-3xl text-primary font-bold">
            Real Transformations, Honest Care
          </h3>
          <p className="text-text-muted text-sm mt-1">
            Drag the slider to compare before clinical intervention and post-procedure results.
          </p>
        </div>

        {/* Case selector tabs */}
        <div className="flex flex-wrap gap-2">
          {CASES.map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(index);
                setSliderPos(50);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === index
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white border border-primary/15 text-text-muted hover:border-primary/40 hover:text-primary'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main interactive area */}
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Interactive Comparison Slider */}
        <div className="lg:col-span-7 select-none">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-primary/15 shadow-sm bg-neutral-900 group">
            {/* After Image (Full background) */}
            <img
              src={activeCase.afterImg}
              alt="Post-treatment clinical result"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full z-10">
              After: Restored
            </div>

            {/* Before Image (Clipped by sliderPos) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white shadow-2xl"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={activeCase.beforeImg}
                alt="Pre-treatment condition"
                className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
                style={{ width: '100%', minWidth: '100%' }}
              />
              <div className="absolute top-4 left-4 bg-neutral-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full z-10">
                Before: Initial State
              </div>
            </div>

            {/* Slider Handle Divider */}
            <div
              className="absolute inset-y-0 -ml-4 flex items-center justify-center pointer-events-none z-20"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-accent text-white shadow-lg flex items-center justify-center text-xs font-bold ring-4 ring-white/80">
                ↔
              </div>
            </div>

            {/* Native range input overlay for intuitive dragging */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              aria-label="Drag to compare before and after dental treatment"
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-text-muted mt-3 px-1">
            <span>← Drag left to see After</span>
            <span className="font-mono text-[11px] text-accent font-semibold">{sliderPos}% Comparison</span>
            <span>Drag right to see Before →</span>
          </div>
        </div>

        {/* Case Study Details */}
        <div className="lg:col-span-5 space-y-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCase.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div>
                <span className="text-xs font-bold text-accent uppercase tracking-wider">
                  {activeCase.category}
                </span>
                <h4 className="font-heading text-2xl text-primary font-bold mt-1">
                  {activeCase.title}
                </h4>
                <p className="text-sm text-text-muted mt-0.5">
                  {activeCase.subtitle}
                </p>
              </div>

              <div className="bg-primary-50 p-4 rounded-xl border border-primary/10">
                <p className="text-xs font-semibold text-primary mb-1">
                  Clinical Protocol:
                </p>
                <p className="text-xs text-text-muted leading-relaxed">
                  {activeCase.description}
                </p>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-primary">Procedure Highlights:</p>
                <div className="space-y-1.5">
                  {activeCase.tags.map((tag, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-text">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Check size={11} />
                      </span>
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Link
                  to="/booking"
                  className="btn-primary text-xs py-2.5 px-5 flex items-center gap-2"
                >
                  <span>Book Consultation</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to="/services"
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  View Treatment Details
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
