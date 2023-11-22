'use client'

import React from 'react';

export interface MessageErrorProps extends React.HTMLAttributes<HTMLDivElement>{
  className?: string;
}
  
export const MessageError = ({ children, className, ...props }: MessageErrorProps): JSX.Element => {
  return (
    <div {...props} className={`p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 ${className}`} role="alert">
      {children}
    </div>
  )
}