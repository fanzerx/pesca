import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-blue-700 disabled:bg-gray-400',
    secondary: 'bg-secondary text-white hover:bg-blue-500 disabled:bg-gray-400',
    accent: 'bg-accent text-primary hover:bg-yellow-600 disabled:bg-gray-400',
    outline: 'border-2 border-primary text-primary hover:bg-light disabled:border-gray-400 disabled:text-gray-400',
    ghost: 'text-primary hover:bg-light disabled:text-gray-400',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    full: 'w-full px-4 py-2',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Carregando...
        </>
      ) : (
        children
      )}
    </button>
  );
};
