'use client'

import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size?: 'large' | 'small';
  variant?: 'primary' | 'secondary';
}
  
export const Button = ({
  children,
  className,
  size = "large",
  variant = "primary",
  ...props
}: ButtonProps): JSX.Element => {
  const variantClasses = {
    primary: 'text-white bg-blue-700 hover:bg-blue-800',
    secondary: 'text-gray-900 border border-gray-200 hover:bg-gray-100',
  };

  const sizeClasses = {
    large: 'py-[14px] px-[20px] text-[14px]',
    small: 'py-[5px] px-[15px] text-[12px]',
  };

  return (
    <button
      {...props}
      className={`disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40`}
    >
      <div className={`flex items-center gap-[10px] rounded-[8px] font-regular ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
        {children}
      </div>
    </button>
  )
}