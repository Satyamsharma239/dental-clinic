export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  durationMins: number;
  priceRange: string;
  faqs: ServiceFAQ[];
}

export const SERVICES: Service[] = [
  {
    id: 'svc-1',
    name: 'Dental Cleaning',
    slug: 'dental-cleaning',
    shortDescription: 'Professional cleaning to remove plaque and tartar build-up.',
    description:
      'A thorough cleaning by our hygienist removes plaque and tartar that regular brushing misses. We use ultrasonic scaling followed by polishing. Most patients say it feels like a gentle vibration — not painful at all. We recommend a cleaning every 6 months to keep your gums healthy.',
    durationMins: 30,
    priceRange: '₹500 – ₹1,500',
    faqs: [
      { q: 'Does cleaning hurt?', a: 'Most patients feel only a mild vibration. If you have sensitive teeth, we can apply a numbing gel beforehand.' },
      { q: 'How often should I get my teeth cleaned?', a: 'We recommend every 6 months, or more often if you have gum disease.' },
    ],
  },
  {
    id: 'svc-2',
    name: 'Root Canal Treatment',
    slug: 'root-canal',
    shortDescription: 'Save an infected tooth with modern, comfortable root canal therapy.',
    description:
      'A root canal removes the infected nerve inside your tooth and seals it to prevent further damage. With modern anaesthesia and techniques, the procedure is no more uncomfortable than getting a filling. Most treatments are completed in one or two visits.',
    durationMins: 60,
    priceRange: '₹3,000 – ₹8,000',
    faqs: [
      { q: 'Is root canal painful?', a: 'With modern anaesthesia, most patients feel little to no pain during the procedure. You may have mild soreness for a day or two afterwards, managed with over-the-counter painkillers.' },
      { q: 'How many visits does it take?', a: 'Usually 1–2 visits, depending on the complexity of the case.' },
    ],
  },
  {
    id: 'svc-3',
    name: 'Tooth Extraction',
    slug: 'tooth-extraction',
    shortDescription: 'Safe, gentle removal of damaged or problematic teeth.',
    description:
      'Sometimes a tooth is too damaged to save, or a wisdom tooth is causing crowding. We perform simple and surgical extractions with proper anaesthesia. We always discuss replacement options (implant, bridge) before proceeding.',
    durationMins: 30,
    priceRange: '₹500 – ₹2,000',
    faqs: [
      { q: 'Will I feel pain during extraction?', a: 'The area is completely numbed before we begin. You will feel pressure but not pain.' },
      { q: 'How long does recovery take?', a: 'Most patients feel fine within 2–3 days. We provide detailed aftercare instructions.' },
    ],
  },
  {
    id: 'svc-4',
    name: 'Dental Filling',
    slug: 'dental-filling',
    shortDescription: 'Restore cavities with tooth-coloured composite fillings.',
    description:
      'We use tooth-coloured composite resin to fill cavities, matching the shade to your natural teeth. The procedure takes about 30 minutes per tooth and is done under local anaesthesia so you stay comfortable throughout.',
    durationMins: 30,
    priceRange: '₹500 – ₹2,500',
    faqs: [
      { q: 'Do you use silver (amalgam) fillings?', a: 'We primarily use tooth-coloured composite fillings for a natural look and safe bonding.' },
      { q: 'How long do fillings last?', a: 'Composite fillings typically last 5–10 years with good oral hygiene.' },
    ],
  },
  {
    id: 'svc-5',
    name: 'Teeth Whitening',
    slug: 'teeth-whitening',
    shortDescription: 'Brighten your smile safely with professional whitening.',
    description:
      'Our in-clinic whitening uses a safe, dentist-strength bleaching gel applied under controlled conditions. Results are visible in a single 45-minute session. We also provide take-home trays for gradual whitening if you prefer.',
    durationMins: 45,
    priceRange: '₹3,000 – ₹6,000',
    faqs: [
      { q: 'Is teeth whitening safe?', a: 'Yes, when done professionally. We protect your gums during the procedure and use clinically tested products.' },
      { q: 'How long do results last?', a: 'Results can last 6–12 months depending on your diet and habits. Avoiding tea, coffee, and tobacco helps.' },
    ],
  },
  {
    id: 'svc-6',
    name: 'Braces & Orthodontics',
    slug: 'braces-orthodontics',
    shortDescription: 'Straighten your teeth with braces or clear aligners.',
    description:
      'Dr. Satyam Sharma specialises in orthodontics. We offer traditional metal braces, ceramic braces, and clear aligner options. Treatment begins with a detailed assessment including X-rays and moulds to create a personalised plan. The first consultation is short and informative — no commitment required.',
    durationMins: 30,
    priceRange: '₹25,000 – ₹80,000',
    faqs: [
      { q: 'How long do braces take?', a: 'Typical treatment duration is 12–24 months, depending on the complexity of alignment needed.' },
      { q: 'Do you offer clear aligners?', a: 'Yes, we offer clear aligner options for suitable cases. We will advise you during the consultation.' },
    ],
  },
  {
    id: 'svc-7',
    name: 'Crown & Bridge',
    slug: 'crown-bridge',
    shortDescription: 'Restore damaged or missing teeth with custom-made crowns and bridges.',
    description:
      'A crown caps a damaged tooth to restore its shape and strength. A bridge replaces one or more missing teeth by anchoring to neighbouring teeth. We use ceramic and zirconia materials that look and feel like natural teeth. Impressions are taken in one visit and the final piece is fitted in the next.',
    durationMins: 60,
    priceRange: '₹3,000 – ₹12,000',
    faqs: [
      { q: 'How long does a crown last?', a: 'A well-maintained crown can last 10–15 years or longer.' },
      { q: 'Is the process painful?', a: 'The tooth is numbed during preparation. You may feel mild sensitivity for a few days after.' },
    ],
  },
  {
    id: 'svc-8',
    name: 'Child Dental Check-up',
    slug: 'child-dental-checkup',
    shortDescription: 'Gentle dental check-ups for children aged 3 and above.',
    description:
      'We make dental visits fun and stress-free for kids. A typical check-up includes a gentle examination, cleaning if needed, fluoride application, and tips for parents on brushing habits. Our team is experienced in handling anxious young patients with patience and care.',
    durationMins: 30,
    priceRange: '₹300 – ₹800',
    faqs: [
      { q: 'At what age should my child first visit the dentist?', a: 'We recommend a first visit by age 3, or earlier if you notice any concerns.' },
      { q: 'How do you handle nervous children?', a: 'We use a gentle, step-by-step approach. We show children our tools, explain everything in simple language, and never rush.' },
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
  // Deterministic "random" based on date string to simulate bookings
  const hash = dateStr.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const possibleSlots = ['09:30', '10:00', '11:00', '14:30', '15:00', '16:00', '16:30'];
  return possibleSlots.filter((_, i) => (hash + i) % 3 === 0);
}
