import React from 'react';
import { MessageSquare, Mail, CheckCircle } from 'lucide-react';

export interface PatientFormData {
  patientName: string;
  phone: string;
  email: string;
  notes: string;
  whatsappNotify?: boolean;
  emailNotify?: boolean;
}

interface PatientFormProps {
  formData: PatientFormData;
  onChange: (field: keyof PatientFormData, value: any) => void;
  errors: Record<string, string>;
  bookingSummary: {
    serviceName: string;
    date: string;
    time: string;
    duration: number;
    priceRange?: string;
  };
}

export const PatientForm: React.FC<PatientFormProps> = ({ formData, onChange, errors, bookingSummary }) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 10) val = val.slice(0, 10);
    
    // Auto-format: 98765 43210
    let formatted = val;
    if (val.length > 5) {
      formatted = `${val.slice(0, 5)} ${val.slice(5)}`;
    }
    onChange('phone', formatted);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-5">
        <div>
          <label htmlFor="patientName" className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
            Patient Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="patientName"
            type="text"
            value={formData.patientName}
            onChange={(e) => onChange('patientName', e.target.value)}
            className={`w-full p-3.5 border rounded-xl bg-white text-xs text-text focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow ${errors.patientName ? 'border-red-500' : 'border-primary/20'}`}
            placeholder="e.g. Satyam Sharma"
          />
          {errors.patientName && <p className="mt-1 text-xs text-red-500">{errors.patientName}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
            WhatsApp / Mobile Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted font-bold text-xs">+91</span>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handlePhoneChange}
              className={`w-full p-3.5 pl-12 border rounded-xl bg-white text-xs text-text focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow ${errors.phone ? 'border-red-500' : 'border-primary/20'}`}
              placeholder="98765 43210"
            />
          </div>
          {errors.phone ? (
            <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
          ) : (
            <p className="mt-1.5 text-[11px] text-text-muted flex items-center gap-1.5">
              <MessageSquare size={13} className="text-emerald-700 inline" />
              Appointment receipt will be sent to this WhatsApp number.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
            Email Address (optional)
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
              className="w-full p-3.5 border border-primary/20 rounded-xl bg-white text-xs text-text focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow"
              placeholder="e.g. satyam@example.com"
            />
          </div>
          <p className="mt-1.5 text-[11px] text-text-muted flex items-center gap-1.5">
            <Mail size={13} className="text-primary inline" />
            We will also email a copy of your appointment details.
          </p>
        </div>

        <div>
          <label htmlFor="notes" className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
            Any specific tooth concern or history? (Optional)
          </label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => onChange('notes', e.target.value)}
            rows={3}
            className="w-full p-3.5 border border-primary/20 rounded-xl bg-white text-xs text-text focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow resize-none"
            placeholder="e.g. Toothache in lower molar, sensitive to cold..."
          ></textarea>
        </div>
      </div>

      <div>
        <div className="bg-primary-50 rounded-2xl p-6 border border-primary/15 sticky top-4 shadow-soft">
          <h3 className="font-heading text-lg font-bold text-primary mb-4 border-b border-primary/10 pb-3 flex items-center justify-between">
            <span>Booking Summary</span>
            <span className="text-[10px] font-sans font-semibold bg-white px-2.5 py-1 rounded-full text-primary border border-primary/15">
              No Advance Payment
            </span>
          </h3>
          
          <div className="space-y-4">
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-text-muted mb-0.5 font-bold">Selected Treatment</span>
              <p className="font-heading font-bold text-primary text-base">{bookingSummary.serviceName}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-text-muted mb-0.5 font-bold">Date</span>
                <p className="font-medium text-text text-xs">{bookingSummary.date}</p>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-text-muted mb-0.5 font-bold">Time Slot</span>
                <p className="font-bold text-primary font-mono text-xs">{bookingSummary.time}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-primary/10">
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-text-muted mb-0.5 font-bold">Duration</span>
                <p className="font-medium text-text text-xs">{bookingSummary.duration} mins</p>
              </div>
              {bookingSummary.priceRange && (
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-text-muted mb-0.5 font-bold">Fee Estimate</span>
                  <p className="font-bold text-primary font-mono text-xs">{bookingSummary.priceRange}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-primary/10 text-xs text-text-muted space-y-2">
            <p className="flex items-center gap-2 text-text">
              <CheckCircle size={15} className="text-emerald-700 flex-shrink-0" />
              <span>Instant confirmation on WhatsApp & Email</span>
            </p>
            <p className="flex items-center gap-2 text-text">
              <CheckCircle size={15} className="text-emerald-700 flex-shrink-0" />
              <span>Payment settled at clinic desk (UPI, Cards, Cash)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
