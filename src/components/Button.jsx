import React from 'react';

export default function Button({
  children,
  type = 'button',
  bgColor = 'bg-blue-600',
  textColor = 'text-white',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 
        ${bgColor} ${textColor} 
        hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}