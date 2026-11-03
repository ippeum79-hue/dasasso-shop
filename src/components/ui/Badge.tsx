import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'best' | 'new' | 'vegan' | 'urgent' | 'discount' | 'neutral';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral', className = '' }) => {
  const baseStyles = 'inline-flex items-center text-[10px] sm:text-[11px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-sm transition-colors';

  const variants = {
    best: 'bg-brand-dark text-white',
    new: 'bg-brand-sand text-brand-dark border border-brand-sandDark',
    vegan: 'bg-[#EAF0E8] text-[#3D5A3A] border border-[#D0DFCE]',
    urgent: 'bg-red-50 text-brand-alert border border-red-200 animate-pulse',
    discount: 'bg-brand-peach text-white font-bold',
    neutral: 'bg-neutral-100 text-neutral-700',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
