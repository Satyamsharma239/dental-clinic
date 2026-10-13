export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  category?: 'preventive' | 'orthodontics' | 'restorative' | 'cosmetic';
  featured?: boolean;
  shortDescription: string;
  description: string;
  durationMins: number;
  priceRange: string;
  faqs: ServiceFAQ[];
}

export const SERVICES: Service[] = [
  {
    id: 'svc-6',
    name: 'Clear Aligners & Orthodontics',
    slug: 'braces-orthodontics',
    category: 'orthodontics',
    featured: true,
    shortDescription: 'Digital 3D trajectory planning, transparent aligners, and aesthetic orthodontics.',
    description:
      'We utilize high-resolution digital scanning to model your alignment progress from day one. Treatment roadmaps include predictable tooth movement milestones with discreet, comfortable aligners that fit your daily lifestyle. Every case begins with a comprehensive consultation and digital assessment.',
    durationMins: 45,
    priceRange: '₹28,000 – ₹85,000 (Sample Guide)',
    faqs: [
      { q: 'How do clear aligners compare to fixed braces?', a: 'Clear aligners are virtually invisible, removable for eating and hygiene, and customized using precision 3D modeling.' },
      { q: 'How long is the typical alignment duration?', a: 'Most aesthetic cases average between 6 to 14 months, depending on complex crowding or rotation requirements.' },
    ],
  },
  {
    id: 'svc-1',
    name: 'Preventive Hygiene & Airflow',
    slug: 'dental-cleaning',
    category: 'preventive',
    shortDescription: 'Gentle ultrasonic scaling and biofilm removal for lasting gum health.',
    description:
      'Our preventative hygiene appointments focus on gentle calculus removal, gum pocket measurement, and enamel polishing without uncomfortable scraping. We take intraoral photos before and after so you can clearly see the clinical results.',
    durationMins: 30,
    priceRange: '₹800 – ₹1,800 (Sample Guide)',
    faqs: [
      { q: 'Does preventive cleaning cause tooth sensitivity?', a: 'We calibrate ultrasonic vibrations carefully and apply desensitizing mineral treatments when needed.' },
      { q: 'Recommended frequency?', a: 'Every 6 months for optimal gum health and early caries prevention.' },
    ],
  },
  {
    id: 'svc-2',
    name: 'Modern Root Canal Therapy',
    slug: 'root-canal',
    category: 'restorative',
    shortDescription: 'Micro-endodontic care to relieve discomfort and preserve your natural tooth.',
    description:
      'Root canal therapy removes diseased pulp tissue while conserving as much natural tooth structure as possible. Computerized local numbing ensures comfort throughout the procedure, typically completed in one or two quiet sessions.',
    durationMins: 60,
    priceRange: '₹3,500 – ₹8,500 (Sample Guide)',
    faqs: [
      { q: 'Is root canal treatment painful?', a: 'Modern single-tooth anesthesia renders the procedure virtually pain-free. Most patients experience relief from pre-existing toothache immediately.' },
      { q: 'Why save the tooth instead of extracting?', a: 'Preserving your natural root structure maintains jawbone density and avoids shifting of adjacent teeth.' },
    ],
  },
  {
    id: 'svc-4',
    name: 'Biomimetic Ceramic Fillings',
    slug: 'dental-filling',
    category: 'restorative',
    shortDescription: 'Tooth-shaded composite and ceramic inlays bonded to restore natural strength.',
    description:
      'We use high-grade nano-hybrid composite resins layered to mimic the natural translucency, shade, and anatomy of your tooth. The restoration bonds securely with minimal removal of healthy enamel.',
    durationMins: 30,
    priceRange: '₹900 – ₹2,800 (Sample Guide)',
    faqs: [
      { q: 'Do composite fillings match my tooth color?', a: 'Yes, we select custom shade gradients under high-CRI daylight lighting for a seamless natural finish.' },
      { q: 'How long do modern composites last?', a: 'Typically 7 to 12 years with standard hygiene and routine check-ups.' },
    ],
  },
  {
    id: 'svc-5',
    name: 'Controlled In-Clinic Whitening',
    slug: 'teeth-whitening',
    category: 'cosmetic',
    shortDescription: 'Safe, dentist-supervised light-activated enamel brightening.',
    description:
      'Supervised clinical whitening protects your gums with a protective barrier while gentle peroxide compounds break down deep enamel stains. Results are noticeable within a single 45-minute appointment, supplemented with customized home maintenance guides.',
    durationMins: 45,
    priceRange: '₹3,500 – ₹7,000 (Sample Guide)',
    faqs: [
      { q: 'Will whitening weaken my enamel?', a: 'No, professional whitening does not strip or abrade enamel when performed with pH-neutral clinical formulations.' },
      { q: 'How long do results persist?', a: 'Usually 9 to 18 months, depending on tea, coffee, or staining food intake.' },
    ],
  },
  {
    id: 'svc-7',
    name: 'Zirconia & Ceramic Crowns',
    slug: 'crown-bridge',
    category: 'restorative',
    shortDescription: 'Precision-milled crowns and bridges for structural reinforcement.',
    description:
      'When a tooth is weakened by deep restorations or fracture, our ceramic and monolithic zirconia crowns provide full functional reinforcement with natural aesthetic vitality. Precision digital margins prevent gum irritation.',
    durationMins: 60,
    priceRange: '₹4,500 – ₹14,000 (Sample Guide)',
    faqs: [
      { q: 'What material is best for crowns?', a: 'We evaluate biting forces and visibility. Monolithic zirconia offers maximum strength for molars, while layered ceramics excel for front teeth.' },
      { q: 'How many appointments are required?', a: 'Typically two appointments: preparation & digital scanning, followed by bonding.' },
    ],
  },
  {
    id: 'svc-3',
    name: 'Atraumatic Tooth Extractions',
    slug: 'tooth-extraction',
    category: 'restorative',
    shortDescription: 'Careful removal of impacted wisdom teeth or non-restorable roots.',
    description:
      'When a tooth cannot be saved predictably or is severely impacted, we perform sectioned atraumatic extractions to preserve the surrounding bone architecture for future restorative options.',
    durationMins: 30,
    priceRange: '₹800 – ₹2,500 (Sample Guide)',
    faqs: [
      { q: 'What is the recovery period?', a: 'Initial tissue recovery takes 48 to 72 hours. We provide clear postoperative packs and direct follow-up support.' },
    ],
  },
  {
    id: 'svc-8',
    name: 'Paediatric & Family Consultations',
    slug: 'child-dental-checkup',
    category: 'preventive',
    shortDescription: 'Patient, positive introductory visits and preventive sealants for children.',
    description:
      'We cultivate trust with young patients through calm demonstrations, fissure sealants, and positive reinforcement. We show children how dental tools work before any check-up begins.',
    durationMins: 30,
    priceRange: '₹400 – ₹900 (Sample Guide)',
    faqs: [
      { q: 'When should a child first see a dentist?', a: 'We recommend introducing children by their first birthday or when primary teeth emerge.' },
    ],
  },
];

/* Helper: generate available time slots for a given date and service */
export function generateTimeSlots(
  date: Date,
  serviceDurationMins: number,
  bookedSlots: string[] = []
): { time: string; label: string; available: boolean }[] {
  const day = date.getDay();
  // Sunday = closed
  if (day === 0) return [];

  const slots: { time: string; label: string; available: boolean }[] = [];
  const morningStart = 9; // 9 AM
  const lunchStart = 13; // 1 PM
  const lunchEnd = 14;   // 2 PM
  const eveningEnd = 18;  // 6 PM
  const slotInterval = 30; // minutes

  const now = new Date();
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  for (let hour = morningStart; hour < eveningEnd; hour++) {
    for (let min = 0; min < 60; min += slotInterval) {
      const slotStart = hour * 60 + min;
      const slotEnd = slotStart + serviceDurationMins;

      // Skip lunch overlap
      const lunchStartMin = lunchStart * 60;
      const lunchEndMin = lunchEnd * 60;
      if (slotStart < lunchEndMin && slotEnd > lunchStartMin) continue;

      // Don't go past closing
      if (slotEnd > eveningEnd * 60) continue;

      const timeStr = `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;

      // If today, skip slots less than 2 hours from now
      if (isToday) {
        const slotDate = new Date(date);
        slotDate.setHours(hour, min, 0, 0);
        const diffMs = slotDate.getTime() - now.getTime();
        if (diffMs < 2 * 60 * 60 * 1000) continue;
      }

      const isBooked = bookedSlots.includes(timeStr);

      const h12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const label = `${h12}:${String(min).padStart(2, '0')} ${ampm}`;

      slots.push({ time: timeStr, label, available: !isBooked });
    }
  }

  return slots;
}

/* Mock booked slots — simulates some slots being taken */
export function getMockBookedSlots(dateStr: string): string[] {
  const hash = dateStr.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const possibleSlots = ['09:30', '10:00', '11:00', '14:30', '15:00', '16:00', '16:30'];
  return possibleSlots.filter((_, i) => (hash + i) % 3 === 0);
}
