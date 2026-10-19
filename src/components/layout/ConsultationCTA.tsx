import { Link } from 'react-router-dom';
import { Calendar, MessageCircle } from 'lucide-react';
import { CLINIC } from '@/data/clinicInfo';

export default function ConsultationCTA() {
  const whatsappUrl = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(
    'Hello Dr. Satyam Sharma, I would like to consult with you regarding dental care at Aura Dental Studio.'
  )}`;

  return (
    <section className="bg-slate-50 px-4 py-10 sm:px-8 sm:py-14">
      <div className="max-w-container mx-auto p-8 sm:p-12 rounded-2xl bg-teal-900 text-white shadow-md">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-300">
              Personal Consultation
            </span>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Ready to consult with Dr. Satyam Sharma?
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-teal-100">
              Schedule a comprehensive checkup and discuss your dental concerns with Dr. Sharma at our Waterfield Road studio.
            </p>
          </div>

          <div className="flex w-full shrink-0 flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link
              to="/book"
              className="btn-primary h-11 justify-center border border-white bg-white px-5 text-xs text-teal-900 hover:bg-teal-50"
            >
              <Calendar size={15} />
              <span>Book Appointment</span>
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp h-11 justify-center px-5 text-xs"
            >
              <MessageCircle size={15} />
              <span>Chat with Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
