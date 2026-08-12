import React from 'react';

export interface BadgeProps {
  variant?: 'emerald' | 'amber' | 'red' | 'blue' | 'slate';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'emerald',
  children,
  className = '',
}) => {
  const variantStyles = {
    emerald: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    amber: 'bg-amber-100 text-amber-800 border border-amber-200',
    red: 'bg-red-100 text-red-800 border border-red-200',
    blue: 'bg-blue-100 text-blue-800 border border-blue-200',
    slate: 'bg-slate-100 text-slate-700 border border-slate-200',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
