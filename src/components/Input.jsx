import React, { useId } from 'react';

const Input = React.forwardRef(function Input(
  { label, type = 'text', className = '', error, ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="inline-block mb-1 pl-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        type={type}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none 
          border ${error ? 'border-red-500' : 'border-gray-300'} 
          focus:ring-2 focus:ring-primary/50 focus:bg-gray-50 
          transition-all duration-200 w-full ${className}`}
        {...props}
      />

      {error && (
        <p className="text-red-500 text-sm mt-1 ml-1">{error}</p>
      )}
    </div>
  );
});

export default Input;