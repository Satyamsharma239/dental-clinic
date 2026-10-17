import { ChevronDown, Clock } from 'lucide-react';

type TimeSlotPickerProps = {
  id: string;
  selectedTime: string;
  onSelect: (time: string) => void;
};

const TIME_SLOTS = [
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
];

export default function TimeSlotPicker({ id, selectedTime, onSelect }: TimeSlotPickerProps) {
  return (
    <div>
      <div className="relative">
        <Clock size={17} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <select
          id={id}
          value={selectedTime}
          onChange={(event) => onSelect(event.target.value)}
          className="h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white pl-10 pr-11 text-sm font-medium text-slate-800 shadow-sm transition focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20"
        >
          <option value="" disabled>Select a preferred time</option>
          {TIME_SLOTS.map((time) => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
        <ChevronDown size={17} aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
      </div>
      <p className="mt-2 text-[11px] text-slate-500">
        Preferred time only; the clinic will confirm availability.
      </p>
    </div>
  );
}
