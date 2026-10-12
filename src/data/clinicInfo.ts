export const CLINIC = {
  name: 'Bright Smiles Dental Clinic',
  tagline: 'Gentle, honest dental care for your family',
  city: 'Metropolis',
  doctor: {
    name: 'Dr. Satyam Sharma',
    qualification: 'BDS, MDS – Orthodontics',
    registration: 'DCH-123456',
    experience: '12+ years',
    bio: 'Dr. Satyam Sharma has been practising dentistry in Metropolis for over 12 years. He completed his BDS from Government Dental College and his MDS in Orthodontics from the National Institute of Dental Sciences. He is known for his patient, gentle approach — especially with children and anxious patients.',
    philosophy: 'We believe dental care should be honest, transparent, and comfortable. We take the time to explain every step so you always know what is happening and why.',
  },
  address: {
    line1: '123 Main Street, 2nd Floor',
    line2: 'Above Sharma Medical Store',
    city: 'Metropolis',
    pincode: '560001',
    full: '123 Main Street, 2nd Floor, Metropolis – 560001',
  },
  phone: '+919876543210',
  phoneDisplay: '+91 98765 43210',
  email: 'info@brightsmiles.com',
  whatsapp: '919876543210',
  hours: {
    weekdays: '9:00 AM – 6:00 PM (Mon – Sat)',
    lunch: '1:00 PM – 2:00 PM (closed for lunch)',
    closed: 'Sundays & Public Holidays',
  },
  parking: 'Reserved visitor parking in building basement; additional street parking available.',
  transit: '200 metres from Central Metro Station (Gate 3). Bus Stop: City Library Stop.',
  landmark: 'Opposite Metropolis Central Library, Above Sharma Medical Store',
  languages: ['English', 'Hindi', 'Marathi'],
  payments: ['Cash', 'UPI (GPay, PhonePe, Paytm)', 'Credit & Debit Cards'],
  emergencyPhone: '+919876543211',
  emergencyPhoneDisplay: '+91 98765 43211',
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
    location: 'Metropolis Central',
    treatment: 'Root Canal Treatment',
    rating: 5,
    date: 'August 2026',
    comment:
      'I had severe throbbing pain in my lower molar and was terrified of root canal. Dr. Satyam Sharma explained each step calmly, numbed the tooth completely, and the entire procedure was genuinely painless. Truly grateful for his gentle hands!',
  },
  {
    name: 'Sunita Nair',
    location: 'Green Glen Layout',
    treatment: 'Dental Cleaning & Polishing',
    rating: 5,
    date: 'September 2026',
    comment:
      'Very clean and modern clinic. The cleaning took about 30 minutes and the doctor didn’t push any unnecessary procedures or expensive products. Transparent billing and very polite front desk.',
  },
  {
    name: 'Kavita Deshmukh',
    location: 'Adarsh Nagar',
    treatment: 'Child Dental Checkup (7 yr old)',
    rating: 5,
    date: 'October 2026',
    comment:
      'Took my 7-year-old son for his first checkup. He is usually very scared of doctors, but Dr. Satyam made him feel so safe and playful that he didn’t complain once. Best family dentist in town!',
  },
];
