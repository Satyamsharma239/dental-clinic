import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { DentalToothIcon } from './DentalToothIcon';

interface SymptomOption {
  id: string;
  label: string;
  icon: any;
  urgency: 'Immediate' | 'Recommended' | 'Routine';
  diagnosis: string;
  recommendedService: string;
  serviceId: string;
  duration: string;
  priceEstimate: string;
  whatToExpect: string;
}

const SYMPTOMS: SymptomOption[] = [
  {
    id: 'pain',
    label: 'Acute Toothache or Pain',
    icon: Zap,
    urgency: 'Immediate',
    diagnosis: 'Possible deep decay reaching the pulp or acute infection requiring immediate relief.',
    recommendedService: 'Root Canal Treatment & Pain Management',
    serviceId: 'svc-2',
    duration: '60 minutes',
    priceEstimate: '₹3,000 – ₹8,000',
    whatToExpect: '100% profound local anesthesia applied. Pain is alleviated on the very first appointment.',
  },
  {
    id: 'stains',
    label: 'Yellow Teeth or Surface Stains',
    icon: Sparkles,
    urgency: 'Routine',
    diagnosis: 'Surface enamel discoloration from tea, coffee, food pigments or natural aging.',
    recommendedService: 'In-Clinic Laser Teeth Whitening',
    serviceId: 'svc-5',
    duration: '45 minutes',
    priceEstimate: '₹3,000 – ₹6,000',
    whatToExpect: 'Protective gum barrier applied followed by clinically tested enamel-safe whitening gel.',
  },
  {
    id: 'crooked',
    label: 'Crooked or Misaligned Teeth',
    icon: Activity,
    urgency: 'Recommended',
    diagnosis: 'Malocclusion, spacing, or dental crowding affecting smile aesthetics and bite function.',
    recommendedService: 'Orthodontics & Clear Aligners',
    serviceId: 'svc-6',
    duration: '30 min initial scan',
    priceEstimate: '₹25,000 – ₹80,000',
    whatToExpect: 'Comprehensive 3D intraoral scan and clinical review with Dr. Satyam Sharma (MDS Orthodontist).',
  },
  {
    id: 'cavity',
    label: 'Cavity Hole or Food Getting Stuck',
    icon: DentalToothIcon,
    urgency: 'Recommended',
    diagnosis: 'Early or moderate tooth decay causing enamel breakdown without nerve involvement yet.',
    recommendedService: 'Tooth-Coloured Composite Filling',
    serviceId: 'svc-4',
    duration: '30 minutes',
    priceEstimate: '₹500 – ₹2,500',
    whatToExpect: 'Gentle decay removal, followed by natural shade-matched composite bonding that cures instantly.',
  },
  {
    id: 'cleaning',
    label: 'Routine Checkup & Tartar Cleaning',
    icon: ShieldCheck,
    urgency: 'Routine',
    diagnosis: 'Hardened calculus build-up along gum margins that daily brushing cannot eliminate.',
    recommendedService: 'Ultrasonic Dental Cleaning & Polishing',
    serviceId: 'svc-1',
    duration: '30 minutes',
    priceEstimate: '₹500 – ₹1,500',
    whatToExpect: 'Ultrasonic vibration breaks down plaque with water mist. Leaves gums healthy and breath fresh.',
  },
];

export default function SymptomChecker() {
  const [selectedId, setSelectedId] = useState(SYMPTOMS[0].id);

  const selectedSymptom = SYMPTOMS.find((s) => s.id === selectedId) || SYMPTOMS[0];

  return (
    <div className="bg-white rounded-2xl border border-primary/10 shadow-card overflow-hidden">
      <div className="p-6 md:p-8 border-b border-primary/10 bg-primary-50/40">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
            <HelpCircle size={13} className="text-accent" />
            <span>Interactive Dental Guidance</span>
          </div>
          <h3 className="font-heading text-2xl md:text-3xl text-primary font-bold">
            What brings you to our clinic today?
          </h3>
          <p className="text-text-muted text-sm mt-1">
            Select what you are experiencing to view recommended care, procedure timeline, and upfront fees.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 mt-6">
          {SYMPTOMS.map((symptom) => {
            const Icon = symptom.icon;
            const isSelected = symptom.id === selectedId;
            return (
              <button
                key={symptom.id}
                onClick={() => setSelectedId(symptom.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-primary text-white shadow-sm ring-2 ring-primary/20 scale-[1.02]'
                    : 'bg-white border border-primary/15 text-text hover:border-primary/40 hover:bg-primary-50/50'
                }`}
              >
                <Icon size={14} className={isSelected ? 'text-accent' : 'text-primary'} />
                <span>{symptom.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedSymptom.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                  selectedSymptom.urgency === 'Immediate'
                    ? 'bg-red-100 text-red-700'
                    : selectedSymptom.urgency === 'Recommended'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  Priority: {selectedSymptom.urgency}
                </span>
                <span className="text-xs text-text-muted">Clinical Evaluation</span>
              </div>

              <div>
                <h4 className="font-heading text-xl md:text-2xl font-bold text-primary">
                  {selectedSymptom.recommendedService}
                </h4>
                <p className="text-sm text-text-muted mt-1 leading-relaxed">
                  {selectedSymptom.diagnosis}
                </p>
              </div>

              <div className="bg-primary-50/70 p-4 rounded-xl border border-primary/10 space-y-2">
                <p className="text-xs font-semibold text-primary">What happens during this appointment?</p>
                <p className="text-xs text-text-muted leading-relaxed">
                  {selectedSymptom.whatToExpect}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 bg-bg p-6 rounded-xl border border-primary/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-primary/10">
                <span className="text-xs text-text-muted flex items-center gap-1.5">
                  <Clock size={14} className="text-accent" />
                  Estimated Time
                </span>
                <span className="text-sm font-semibold text-primary font-mono">
                  {selectedSymptom.duration}
                </span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-primary/10">
                <span className="text-xs text-text-muted">Transparent Fee</span>
                <span className="text-sm font-bold text-primary font-mono">
                  {selectedSymptom.priceEstimate}
                </span>
              </div>

              <div className="pt-2 space-y-2.5">
                <Link
                  to="/booking"
                  className="btn-primary w-full text-center text-xs justify-center"
                >
                  <span>Book Appointment for This</span>
                  <ArrowRight size={14} />
                </Link>

                <p className="text-[11px] text-center text-text-muted">
                  No payment needed today. Full consultation before any procedure.
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
