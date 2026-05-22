import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  children: ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'px-8 py-3 transition-all duration-200 uppercase tracking-wider text-sm';
  
  const variants = {
    primary: 'bg-[#1A1A1A] text-[#F5F5F0] hover:bg-[#3A5A40]',
    secondary: 'bg-[#3A5A40] text-[#F5F5F0] hover:bg-[#1A1A1A]',
    outline: 'border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F5F5F0]',
    ghost: 'text-[#1A1A1A] hover:bg-[#F5F5F0]/50',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
