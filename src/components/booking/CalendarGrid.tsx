import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarGridProps {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
  minDate?: Date;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ selectedDate, onSelect, minDate }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const actualMinDate = minDate ? new Date(minDate) : today;
  actualMinDate.setHours(0, 0, 0, 0);

  const [currentMonth, setCurrentMonth] = useState(
    selectedDate ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1) 
                 : new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    if (prev.getTime() >= new Date(today.getFullYear(), today.getMonth(), 1).getTime()) {
      setCurrentMonth(prev);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getDate() === d2.getDate() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getFullYear() === d2.getFullYear();
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="p-2"></div>);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
    date.setHours(0, 0, 0, 0);
    
    const isPast = date.getTime() < actualMinDate.getTime();
    const isSunday = date.getDay() === 0;
    const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
    const isToday = isSameDay(date, today);
    const isDisabled = isPast || isSunday;

    let classes = "flex items-center justify-center h-10 w-10 rounded-xl text-xs transition-all duration-150 ";
    
    if (isDisabled) {
      classes += "text-text-light cursor-not-allowed opacity-40 ";
      if (isSunday) classes += "line-through ";
    } else if (isSelected) {
      classes += "bg-accent text-white shadow-md font-bold scale-105 ";
    } else {
      classes += "hover:bg-primary-50 cursor-pointer font-medium text-text ";
      if (isToday) classes += "ring-1.5 ring-primary font-bold text-primary ";
    }

    days.push(
      <button
        key={d}
        disabled={isDisabled}
        onClick={() => !isDisabled && onSelect(date)}
        className={classes}
        aria-label={`Select ${date.toDateString()}`}
        type="button"
      >
        {d}
      </button>
    );
  }

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-white p-5 rounded-2xl shadow-soft border border-primary/10 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={handlePrevMonth}
          disabled={currentMonth.getTime() <= new Date(today.getFullYear(), today.getMonth(), 1).getTime()}
          className="p-2 disabled:opacity-30 hover:bg-bg rounded-lg min-h-[40px] min-w-[40px] flex items-center justify-center text-primary"
          type="button"
          aria-label="Previous month"
        >
          <ChevronLeft size={18} />
        </button>
        <h3 className="font-heading font-bold text-base text-primary">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button 
          onClick={handleNextMonth}
          className="p-2 hover:bg-bg rounded-lg min-h-[40px] min-w-[40px] flex items-center justify-center text-primary"
          type="button"
          aria-label="Next month"
        >
          <ChevronRight size={18} />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2 text-center">
        {dayNames.map(day => (
          <div key={day} className="text-[11px] font-bold text-text-muted py-1">{day}</div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1 place-items-center">
        {days}
      </div>

      <div className="mt-4 pt-3 border-t border-primary/10 flex items-center justify-between text-[11px] text-text-muted">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-accent inline-block"></span>
          <span>Selected</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full ring-1 ring-primary inline-block"></span>
          <span>Today</span>
        </span>
        <span>Sundays Closed</span>
      </div>
    </div>
  );
};
