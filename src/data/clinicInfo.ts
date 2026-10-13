export const CLINIC = {
  name: 'Bright Smiles Dental Clinic',
  tagline: 'Gentle, honest dental care for your family',
  city: 'Mumbai',
  area: 'Bandra West',
  doctor: {
    name: 'Dr. Satyam Sharma',
    qualification: 'BDS, MDS – Orthodontics & Dentofacial Orthopedics',
    registration: 'MSDC-42891',
    council: 'Maharashtra State Dental Council',
    experience: '12+ years',
    bio: 'Dr. Satyam Sharma has been practicing dentistry in Bandra West, Mumbai for over 12 years. He completed his BDS from Nair Hospital Dental College, Mumbai and his MDS in Orthodontics from Government Dental College & Hospital, Mumbai. He is widely recognized for his patient-first, gentle approach — particularly with anxious patients and children.',
    philosophy: 'We believe dental care should be honest, transparent, and comfortable. We take the time to explain every step with intraoral imaging so you always know what is happening, why it is needed, and what it costs upfront.',
  },
  address: {
    line1: '201, 2nd Floor, Sagar Fortune Building',
    line2: 'Waterfield Road, Off Linking Road, Bandra West',
    city: 'Mumbai',
    pincode: '400050',
    full: '201, Sagar Fortune Building, Waterfield Road, Bandra West, Mumbai – 400050',
  },
  phone: '+919820144521',
  phoneDisplay: '+91 98201 44521',
  email: 'care@brightsmilesmumbai.com',
  whatsapp: '919820144521',
  hours: {
    weekdays: '9:30 AM – 7:30 PM (Mon – Sat)',
    lunch: '1:30 PM – 2:30 PM (closed for lunch)',
    closed: 'Sundays (Emergency appointments available on call)',
  },
  parking: 'Valet and dedicated basement visitor parking inside Sagar Fortune premises.',
  transit: '750 metres from Bandra Railway Station (West). 3 mins from Linking Road. Bus Stop: National College / Waterfield Junction.',
  landmark: 'Near National College, Above Nature\'s Basket, Waterfield Road, Bandra West',
  languages: ['English', 'Hindi', 'Marathi', 'Gujarati'],
  payments: ['Cash', 'UPI (GPay, PhonePe, Paytm)', 'Credit & Debit Cards', 'No-Cost EMI (for Aligners & Implants)'],
  emergencyPhone: '+919820144522',
  emergencyPhoneDisplay: '+91 98201 44522',
} as const;

export const CLINIC_PHOTOS = {
  hero: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
  doctor: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80',
  operatory: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
  instruments: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80',
  sterilization: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
  reception: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  consultation: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  xray: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
};

export const PATIENT_REVIEWS = [
  {
    name: 'Rohit Malhotra',
    location: 'Pali Hill, Bandra West',
    treatment: 'Root Canal Treatment',
    rating: 5,
    date: 'August 2026',
    comment:
      'I had severe throbbing pain in my lower molar and was terrified of root canal. Dr. Satyam Sharma explained each step calmly, numbed the tooth completely, and the entire procedure was genuinely painless. Truly grateful for his gentle hands!',
  },
  {
    name: 'Sunita Nair',
    location: 'Khar West, Mumbai',
    treatment: 'Dental Cleaning & Polishing',
    rating: 5,
    date: 'September 2026',
    comment:
      'Very clean and modern clinic. The cleaning took about 30 minutes and the doctor didn’t push any unnecessary procedures or expensive products. Transparent billing and very polite front desk.',
  },
  {
    name: 'Kavita Deshmukh',
    location: 'BKC, Mumbai',
    treatment: 'Clear Aligners Consultation',
    rating: 5,
    date: 'October 2026',
    comment:
      'Consulted Dr. Satyam for invisible aligners. As an MDS Orthodontist, his 3D scan explanation was crystal clear with zero false promises. Best dental clinic experience in Bandra!',
  },
];
