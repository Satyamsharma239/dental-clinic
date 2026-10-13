/**
 * AURA DENTAL STUDIO — SAMPLE CLINICAL DATA & BRAND SYSTEM
 * 
 * Note: This application is a design & engineering demonstration project
 * for portfolio purposes. The details below are illustrative sample content.
 */

export const CLINIC = {
  name: 'Aura Dental Studio',
  shortName: 'Aura',
  tagline: 'Dentistry, designed around you.',
  subtitle: 'Contemporary Practice & Aesthetic Orthodontics',
  concept: 'A patient-first dental studio pairing modern diagnostics with a calm, deliberate environment.',
  city: 'Mumbai',
  area: 'Bandra West',
  isDemo: true,
  doctor: {
    name: 'Dr. Satyam Sharma',
    title: 'Clinical Director & Orthodontic Lead',
    credentials: 'BDS, MDS (Sample Specialty: Orthodontics)',
    bio: 'Leading clinical care at Aura Dental Studio, Dr. Sharma focuses on preventative dental health, clear aligner mechanics, and conservative restorative techniques. His approach emphasizes active listening, digital 3D scans over conventional impressions, and transparent, step-by-step treatment roadmaps before any procedure begins.',
    philosophy: 'Great dentistry is calm, unhurried, and deeply transparent. We prioritize natural tooth structure above all else, ensuring you understand every recommendation before making a decision.',
    isSample: true,
  },
  address: {
    line1: 'Studio 204, Waterfield Road',
    line2: 'Off Linking Road, Bandra West',
    city: 'Mumbai',
    pincode: '400050',
    full: 'Studio 204, Waterfield Road, Bandra West, Mumbai 400050',
  },
  phone: '+919820144521',
  phoneDisplay: '+91 98201 44521',
  email: 'hello@auradentalstudio.demo',
  whatsapp: '919820144521',
  hours: {
    weekdays: 'Monday – Saturday: 9:30 AM – 7:00 PM',
    lunch: '1:30 PM – 2:30 PM (Midday break)',
    closed: 'Sundays (Consultations by prior reservation)',
  },
  transitGuide: 'Walking distance from National College & Linking Road junction. 800m from Bandra Station (West).',
  disclaimer: 'Demonstration portfolio project. All appointments generated are sample enquiries.',
} as const;

export const CLINIC_PHOTOS = {
  hero: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80',
  doctor: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1000&q=80',
  operatory: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
  lounge: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  instruments: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80',
  aligners: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=80',
  consultation: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  diagnostic: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
};

export const PATIENT_EXPERIENCES = [
  {
    id: 'exp-1',
    author: 'A. Merchant',
    context: 'Clear Aligners Planning',
    quote:
      'The 3D intraoral simulation made all the difference. Seeing the expected movement trajectory before committing gave me complete confidence in the timeline.',
    note: 'Illustrative patient vignette',
  },
  {
    id: 'exp-2',
    author: 'P. Kapoor',
    context: 'Restorative & Deep Cleaning',
    quote:
      'What stood out was the pacing. Nothing felt rushed, every instrument was explained beforehand, and there were no surprise add-ons on the final estimate.',
    note: 'Illustrative patient vignette',
  },
  {
    id: 'exp-3',
    author: 'R. Sen',
    context: 'Root Canal & Ceramic Crown',
    quote:
      'I was dreading the root canal for weeks. The computerized numbing was entirely painless, and the post-op care guidance was clear and reassuring.',
    note: 'Illustrative patient vignette',
  },
];
