import React from 'react';
import { Clock } from 'lucide-react';

interface TimeSlot {
  time: string;
  label: string;
  available: boolean;
}

interface TimeSlotGridProps {
  slots: TimeSlot[];
  selectedTime: string | null;
  onSelect: (time: string) => void;
  isLoading: boolean;
}

export const TimeSlotGrid: React.FC<TimeSlotGridProps> = ({ slots, selectedTime, onSelect, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-2">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="h-11 bg-primary-50/60 animate-pulse rounded-xl border border-primary/10"></div>
        ))}
      </div>
    );
  }

  if (!slots || slots.length === 0) {
    return (
      <div className="text-center p-8 bg-bg rounded-xl border border-dashed border-primary/20 mt-2">
        <Clock size={24} className="text-text-muted mx-auto mb-2 opacity-50" />
        <p className="text-text-muted text-xs">No clinical slots open on this date. Please select another day.</p>
      </div>
    );
  }

  const parseTime = (timeStr: string) => {
    const [hours] = timeStr.split(':').map(Number);
    return hours;
  };

  const morningSlots = slots.filter(s => parseTime(s.time) < 12);
  const afternoonSlots = slots.filter(s => parseTime(s.time) >= 12);

  const renderSlots = (slotGroup: TimeSlot[]) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
      {slotGroup.map(slot => {
        const isSelected = selectedTime === slot.time;
        
        let classes = "flex items-center justify-center p-2.5 h-11 rounded-xl text-xs font-semibold font-mono transition-all duration-150 border ";
        
        if (!slot.available) {
          classes += "bg-neutral-100 text-text-light cursor-not-allowed line-through border-transparent opacity-50 ";
        } else if (isSelected) {
          classes += "bg-accent text-white border-accent shadow-md scale-[1.02] ";
        } else {
          classes += "bg-white text-primary hover:border-primary hover:bg-primary-50/50 border-primary/15 cursor-pointer shadow-2xs ";
        }

        return (
          <button
            key={slot.time}
            type="button"
            disabled={!slot.available}
            onClick={() => slot.available && onSelect(slot.time)}
            className={classes}
          >
            {slot.label}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-5">
      {morningSlots.length > 0 && (
        <div>
          <h4 className="text-[11px] font-bold text-text-muted mb-2.5 uppercase tracking-wider flex items-center gap-1.5">
            <span>Morning</span>
          </h4>
          {renderSlots(morningSlots)}
        </div>
      )}
      
      {afternoonSlots.length > 0 && (
        <div>
          <h4 className="text-[11px] font-bold text-text-muted mb-2.5 uppercase tracking-wider flex items-center gap-1.5">
            <span>Afternoon & Evening</span>
          </h4>
          {renderSlots(afternoonSlots)}
        </div>
      )}
    </div>
  );
};
