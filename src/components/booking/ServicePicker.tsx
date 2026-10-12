import React from 'react';
import { Service } from '@/data/services';
import { DentalToothIcon } from '@/components/common/DentalToothIcon';
import { Check, Clock } from 'lucide-react';

interface ServicePickerProps {
  services: Service[];
  selectedId: string | null;
  onSelect: (service: Service) => void;
}

export const ServicePicker: React.FC<ServicePickerProps> = ({ services, selectedId, onSelect }) => {
  const notSureService: Service = {
    id: 'not-sure',
    slug: 'general-consultation',
    name: 'Not sure / General Consultation',
    shortDescription: 'Let Dr. Satyam examine your teeth with a 3D scan and recommend the right treatment plan.',
    description: 'A comprehensive oral consultation to assess your dental health and address any concerns.',
    durationMins: 30,
    priceRange: '₹500',
    faqs: [],
  };

  const allServices = [...services, notSureService];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {allServices.map(service => {
        const isSelected = selectedId === service.id;
        
        return (
          <button
            key={service.id}
            type="button"
            onClick={() => onSelect(service)}
            className={`text-left p-5 rounded-xl transition-all duration-200 min-h-[44px] flex flex-col justify-between
              ${isSelected 
                ? 'border-2 border-accent bg-accent/5 shadow-soft ring-1 ring-accent/30' 
                : 'border border-primary/10 bg-white hover:border-primary/30 hover:shadow-sm'
              }`}
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isSelected ? 'bg-accent/20 text-accent' : 'bg-primary-50 text-primary'}`}>
                    <DentalToothIcon size={14} className={isSelected ? 'text-accent' : 'text-primary'} />
                  </div>
                  <h3 className="font-heading font-bold text-base text-primary">{service.name}</h3>
                </div>
                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center">
                    <Check size={12} strokeWidth={3} />
                  </span>
                )}
              </div>
              <p className="text-xs text-text-muted mb-4 line-clamp-2 leading-relaxed">{service.shortDescription}</p>
            </div>

            <div className="flex items-center gap-2.5 pt-2 border-t border-primary/10 w-full">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-bg text-text-muted text-[11px] rounded-md font-mono">
                <Clock size={11} className="text-accent" />
                {service.durationMins} mins
              </span>
              <span className="inline-flex items-center px-2.5 py-1 bg-primary-50 text-primary text-[11px] rounded-md font-bold font-mono">
                {service.priceRange}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
