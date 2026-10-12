import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  steps: { number: number; label: string }[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps }) => {
  return (
    <div className="w-full max-w-xl mx-auto mb-10 px-4">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-primary/10 z-0"></div>
        {steps.map((step) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          
          return (
            <div key={step.number} className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs transition-all duration-300 shadow-sm
                  ${isCompleted ? 'bg-primary text-white ring-2 ring-primary/20' : 
                    isCurrent ? 'bg-accent text-white ring-4 ring-accent/20 scale-105' : 
                    'bg-white border border-primary/20 text-text-muted'}`}
              >
                {isCompleted ? (
                  <Check size={16} strokeWidth={2.5} />
                ) : (
                  step.number
                )}
              </div>
              <span className={`mt-2.5 text-xs font-semibold whitespace-nowrap
                ${isCurrent ? 'text-primary' : 'text-text-muted'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
