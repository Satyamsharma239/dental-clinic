import React from 'react';

interface ToothIconProps {
  className?: string;
  size?: number;
  variant?: 'solid' | 'outline' | 'sparkle';
}

export function DentalToothIcon({ className = 'text-primary', size = 24, variant = 'outline' }: ToothIconProps) {
  if (variant === 'solid') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7.5 3C4.8 3 3 5.3 3 8C3 11 4.7 13.8 6 17.2C6.8 19.3 8 22 9.7 22C11.1 22 11.6 20.3 12 18.5C12.4 20.3 12.9 22 14.3 22C16 22 17.2 19.3 18 17.2C19.3 13.8 21 11 21 8C21 5.3 19.2 3 16.5 3C14 3 12.8 4.7 12 4.7C11.2 4.7 10 3 7.5 3Z" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.5 3C4.8 3 3 5.3 3 8C3 11 4.7 13.8 6 17.2C6.8 19.3 8 22 9.7 22C11.1 22 11.6 20.3 12 18.5C12.4 20.3 12.9 22 14.3 22C16 22 17.2 19.3 18 17.2C19.3 13.8 21 11 21 8C21 5.3 19.2 3 16.5 3C14 3 12.8 4.7 12 4.7C11.2 4.7 10 3 7.5 3Z" />
      <path d="M7 7.5C7.5 6.8 8.8 6.5 10 6.8" strokeWidth="1.5" />
      {variant === 'sparkle' && (
        <circle cx="16.5" cy="7.5" r="1" fill="currentColor" />
      )}
    </svg>
  );
}

export function DentalCrossIcon({ className = 'text-primary', size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 3H15V9H21V15H15V21H9V15H3V9H9V3Z" />
    </svg>
  );
}

export function SmileCurveIcon({ className = 'text-primary', size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
    >
      <path d="M4 10C5.5 15.5 10.5 18 12 18C13.5 18 18.5 15.5 20 10" />
      <path d="M5 8.5L3.5 10" />
      <path d="M19 8.5L20.5 10" />
    </svg>
  );
}
