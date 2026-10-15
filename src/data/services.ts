export interface TreatmentFAQ {
  q: string;
  a: string;
}

export interface Treatment {
  id: string;
  number?: string;
  name: string;
  slug: string;
  benefit?: string;
  shortDescription: string;
  description: string;
  durationMins: number;
  durationLabel?: string;
  startingPrice?: number;
  priceFormatted?: string;
  priceRange?: string;
  category?: string;
  steps: string[];
  aftercare: string;
  faqs: TreatmentFAQ[];
  image?: string;
}

export type Service = Treatment;

export const TREATMENTS: Treatment[] = [
  {
    id: 't-1',
    number: '01',
    name: 'Braces & Aligners',
    slug: 'braces-and-aligners',
    category: 'Orthodontics',
    benefit: 'Straighten crowded or spaced teeth with digital 3D precision.',
    shortDescription: 'Custom clear aligners and ceramic bracket systems planned via chairside 3D optical scanning.',
    description: 'Orthodontic therapy realigns teeth for balanced bite mechanics and long-term periodontal health. We use digital intraoral scans to build a step-by-step movement trajectory before treatment begins.',
    durationMins: 45,
    durationLabel: '45 mins',
    startingPrice: 28000,
    priceFormatted: 'from ₹28,000',
    priceRange: 'from ₹28,000',
    steps: [
      'Digital 3D intraoral optical scanning and bite analysis.',
      'Custom orthodontic roadmap with simulated movement milestones.',
      'Fitting of aligner trays or ceramic brackets with care instructions.',
      'Scheduled review appointments every 4 to 6 weeks to verify alignment.',
    ],
    aftercare: 'Wear aligners 20–22 hours daily. Clean with cold water and soft bristle brush. Store in protective case when eating.',
    faqs: [
      { q: 'How long does clear aligner treatment take?', a: 'Mild to moderate alignment cases typically resolve in 6 to 14 months, depending on wear consistency.' },
      { q: 'Are aligners noticeable during conversation?', a: 'Aligners are fabricated from clear medical-grade polymer, making them virtually imperceptible at normal speaking distance.' },
      { q: 'How often do I switch to a new tray set?', a: 'Trays are typically transitioned every 10 to 14 days as guided by Dr. Sharma.' },
    ],
    image: '/images/aligners.webp',
  },
  {
    id: 't-2',
    number: '02',
    name: 'Teeth Whitening',
    slug: 'teeth-whitening',
    category: 'Cosmetic',
    benefit: 'Brighten natural enamel shade safely under clinical supervision.',
    shortDescription: 'In-chair pH-balanced whitening with gum barrier protection for predictable shade enhancement.',
    description: 'Professional dental whitening uses controlled concentrations of peroxide compounds to break down deep organic stains from coffee, tea, and natural aging without eroding enamel structure.',
    durationMins: 45,
    durationLabel: '45 mins',
    startingPrice: 3500,
    priceFormatted: 'from ₹3,500',
    priceRange: 'from ₹3,500',
    steps: [
      'Pre-treatment polish and baseline tooth shade measurement.',
      'Application of light-cured protective barrier over gum tissue.',
      'Supervised application of dental-grade whitening gel.',
      'Final fluoride wash to desensitize and strengthen enamel.',
    ],
    aftercare: 'Avoid intensely colored liquids (tea, coffee, red wine, turmeric) for 48 hours post-treatment. Use desensitizing toothpaste if sensitive.',
    faqs: [
      { q: 'Will whitening damage my enamel?', a: 'No. Clinical whitening formulations are pH-neutral and act on chromogen molecules within dentin pores without thinning enamel.' },
      { q: 'How many shades brighter can I expect?', a: 'Most patients achieve 3 to 6 shades of improvement in a single 45-minute appointment.' },
      { q: 'How long do results persist?', a: 'Results generally last 9 to 18 months, reinforced by routine oral hygiene.' },
    ],
    image: '/images/smiling-patient.webp',
  },
  {
    id: 't-3',
    number: '03',
    name: 'Root Canal Treatment',
    slug: 'root-canal',
    category: 'Restorative',
    benefit: 'Relieve tooth pain and save your natural tooth root from extraction.',
    shortDescription: 'Micro-endodontic therapy using computerized local numbing and sterile rotary disinfection.',
    description: 'When deep decay reaches the inner nerve chamber, root canal treatment cleanses the infected pulp canals and seals them hermetically, avoiding extraction and preserving bone density.',
    durationMins: 60,
    durationLabel: '60 mins',
    startingPrice: 3500,
    priceFormatted: 'from ₹3,500',
    priceRange: 'from ₹3,500',
    steps: [
      'Profound computerized local anesthesia to ensure zero procedural pain.',
      'Isolation of tooth with rubber dam and access to infected canals.',
      'Rotary instrument cleansing, shaping, and ultrasonic irrigation.',
      'Biocompatible gutta-percha canal sealing followed by restorative build-up.',
    ],
    aftercare: 'Avoid chewing hard foods on the treated side until the permanent ceramic crown is placed. Mild soreness settles within 24–48 hours.',
    faqs: [
      { q: 'Is root canal treatment painful?', a: 'No. Modern anesthesia renders the tooth completely numb. The procedure relieves toothache rather than creating pain.' },
      { q: 'Can a root canal be completed in one visit?', a: 'Yes. Most uncomplicated cases are completed in a single 60-minute visit.' },
      { q: 'Why is a crown necessary after root canal?', a: 'Endodontically treated teeth become brittle over time; a crown provides structural reinforcement against fracture.' },
    ],
    image: '/images/treatment-chair.webp',
  },
  {
    id: 't-4',
    number: '04',
    name: 'Dental Implants',
    slug: 'dental-implants',
    category: 'Restorative',
    benefit: 'Replace missing teeth with titanium roots that look and chew like natural teeth.',
    shortDescription: 'Biocompatible titanium implants and ceramic crowns engineered for lifelong stability.',
    description: 'Dental implants provide a permanent replacement for lost teeth without shaving adjacent healthy teeth for a bridge. The titanium post integrates directly into the jawbone, preserving facial contours.',
    durationMins: 60,
    durationLabel: '60 mins',
    startingPrice: 25000,
    priceFormatted: 'from ₹25,000',
    priceRange: 'from ₹25,000',
    steps: [
      'High-resolution digital radiography and 3D bone assessment.',
      'Gentle surgical placement of the biocompatible titanium post.',
      'Osseointegration healing phase over 8 to 12 weeks.',
      'Custom abutment placement and precision ceramic crown fitting.',
    ],
    aftercare: 'Maintain gentle warm saltwater rinses for 5 days. Follow soft diet protocol during initial healing. Clean with interdental brushes once restored.',
    faqs: [
      { q: 'How long do dental implants last?', a: 'With standard oral hygiene and regular dental check-ups, dental implants have a documented lifespan exceeding 20 years.' },
      { q: 'What is the success rate?', a: 'Modern dental implants demonstrate clinical success rates exceeding 95% in non-smoking patients with adequate bone support.' },
      { q: 'Can I eat normally after getting an implant?', a: 'Once fully integrated and crowned, you can chew all standard foods with the same force as natural teeth.' },
    ],
    image: '/images/dental-tools.webp',
  },
  {
    id: 't-5',
    number: '05',
    name: 'Smile Makeover',
    slug: 'smile-makeover',
    category: 'Cosmetic',
    benefit: 'Correct chipped, discolored, or uneven teeth with customized ceramic veneers.',
    shortDescription: 'Minimally invasive ceramic veneers and composite edge bonding designed for facial harmony.',
    description: 'A comprehensive aesthetic restoration that addresses tooth proportions, shape irregularities, and deep tetracycline discoloration using ultra-thin custom ceramic facings.',
    durationMins: 60,
    durationLabel: '60 mins',
    startingPrice: 12000,
    priceFormatted: 'from ₹12,000',
    priceRange: 'from ₹12,000',
    steps: [
      'Facial proportion analysis and digital intraoral smile mockup.',
      'Conservative enamel preparation preserving natural tooth substrate.',
      'Custom laboratory fabrication of ultra-thin ceramic veneers.',
      'Adhesive resin bonding under high-isolation clinical conditions.',
    ],
    aftercare: 'Avoid using front teeth to bite into rigid items (ice, packaging, shells). Wear a protective nightguard if you clench or grind teeth during sleep.',
    faqs: [
      { q: 'How much tooth structure is reduced for veneers?', a: 'We employ ultra-thin ceramic veneers requiring minimal enamel reduction (0.3mm to 0.5mm), keeping the underlying tooth intact.' },
      { q: 'Will ceramic veneers stain over time?', a: 'High-density glazed ceramic is non-porous and highly resistant to staining from coffee, tea, and food pigments.' },
      { q: 'Can I preview my new smile before proceeding?', a: 'Yes. We build a temporary intraoral mock-up so you can evaluate the proposed shape, length, and shade in your mouth.' },
    ],
    image: '/images/consultation.webp',
  },
  {
    id: 't-6',
    number: '06',
    name: 'Kids Dentistry',
    slug: 'kids-dentistry',
    category: 'General',
    benefit: 'Gentle, fear-free dental visits and cavity prevention for children.',
    shortDescription: 'Preventative fluoride varnish, fissure sealants, and positive habit conditioning.',
    description: 'Paediatric appointments focus on establishing trust through calm demonstrations, preventative sealant application on developing molars, and patient guidance for parents.',
    durationMins: 30,
    durationLabel: '30 mins',
    startingPrice: 800,
    priceFormatted: 'from ₹800',
    priceRange: 'from ₹800',
    steps: [
      'Friendly welcome and playful demonstration of dental examination tools.',
      'Gentle counting and examination of primary and developing permanent teeth.',
      'Ultrasonic plaque polish and protective fluoride mineral application.',
      'Practical brushing coaching tailored to the child and parent.',
    ],
    aftercare: 'Child should refrain from eating or drinking warm liquids for 30 minutes following topical fluoride application.',
    faqs: [
      { q: 'At what age should my child have their first dental visit?', a: 'We recommend introducing children to the dental clinic around their first birthday or when their first tooth appears.' },
      { q: 'What are dental fissure sealants?', a: 'Sealants are thin, painless protective coatings applied into the deep grooves of permanent molars to block food and cavity-causing bacteria.' },
      { q: 'How do you assist children who feel anxious?', a: 'We never rush or force a child. We use a Tell-Show-Do approach, allowing children to see and touch instruments before examination.' },
    ],
    image: '/images/reception.webp',
  },
];

export const SERVICES = TREATMENTS;

export function generateTimeSlots(
  date: Date,
  serviceDurationMins: number,
  bookedSlots: string[] = []
): { time: string; label: string; available: boolean }[] {
  const day = date.getDay();
  if (day === 0) return [];

  const slots: { time: string; label: string; available: boolean }[] = [];
  const morningStart = 10;
  const lunchStart = 13.5;
  const lunchEnd = 14.5;
  const eveningEnd = 19.5;

  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const currentHour = now.getHours() + now.getMinutes() / 60;

  for (let hour = morningStart; hour < eveningEnd; hour += 0.5) {
    if (hour >= lunchStart && hour < lunchEnd) continue;

    const h = Math.floor(hour);
    const m = hour % 1 === 0 ? 0 : 30;
    const timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    
    const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const label = `${h12}:${String(m).padStart(2, '0')} ${ampm}`;

    const isBooked = bookedSlots.includes(timeStr);
    const isPastToday = isToday && hour <= (currentHour + 0.5);

    slots.push({ time: timeStr, label, available: !isBooked && !isPastToday });
  }

  return slots;
}

export function getMockBookedSlots(dateStr: string): string[] {
  const hash = dateStr.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const possibleSlots = ['10:30', '11:30', '15:00', '17:30', '18:00'];
  return possibleSlots.filter((_, i) => (hash + i) % 3 === 0);
}
