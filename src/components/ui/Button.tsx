import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'peach';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const base = 'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.99]';

  const sizes = {
    sm: 'text-xs px-3.5 py-2 rounded-sm',
    md: 'text-xs sm:text-sm px-5 py-3 rounded-sm',
    lg: 'text-sm sm:text-base px-8 py-4 rounded-sm font-semibold',
  };

  const variants = {
    primary: 'bg-brand-dark text-white hover:bg-neutral-800 shadow-sm',
    secondary: 'bg-brand-sand text-brand-dark hover:bg-brand-sandDark',
    peach: 'bg-brand-peach text-white hover:bg-[#D0694E] shadow-sm',
    outline: 'border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white',
    ghost: 'text-brand-dark hover:bg-neutral-100',
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </button>
  );
};
