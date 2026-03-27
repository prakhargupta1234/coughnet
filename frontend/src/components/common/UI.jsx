import React from 'react';

export const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseStyle = 'inline-flex items-center justify-center rounded-2xl font-black transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20',
    secondary: 'bg-white text-primary border-2 border-primary/10 hover:bg-gray-50 shadow-sm',
    success: 'bg-success text-white hover:opacity-90 shadow-lg shadow-success/20',
    danger: 'bg-danger text-white hover:opacity-90 shadow-lg shadow-danger/20',
    ghost: 'bg-transparent text-text-muted hover:bg-gray-100 hover:text-text-main',
    indigo: 'bg-indigo text-white hover:opacity-90 shadow-lg shadow-indigo/20',
  };

  const sizes = {
    sm: 'px-6 py-2.5 text-[10px]',
    md: 'px-8 py-3.5 text-xs',
    lg: 'px-10 py-5 text-sm',
  };

  const finalClass = `button-component ${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <button className={finalClass} {...props}>
      {children}
    </button>
  );
};

export const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`input-group ${className} w-full text-left mb-6`}>
      {label && (
        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-2 px-1">
          {label}
        </label>
      )}
      <input
        className={`w-full px-5 py-4 bg-white border-2 ${error ? 'border-danger' : 'border-border-light'} rounded-[1.25rem] focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold text-text-main placeholder:text-text-muted/40`}
        {...props}
      />
      {error && <p className="mt-2 text-[10px] font-black uppercase text-danger px-1 tracking-wider">{error}</p>}
    </div>
  );
};

export const Card = ({ children, className = '', glow = false, ...props }) => {
  return (
    <div 
      className={`bg-white border-2 border-border-light rounded-[2.5rem] shadow-sm ${glow ? 'shadow-cyan border-cyan/20' : ''} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};

export const Loader = ({ size = 'md', center = false }) => {
  const sizes = { sm: '20px', md: '36px', lg: '56px' };
  const borderSizes = { sm: '2px', md: '3px', lg: '4px' };

  const style = {
    width: sizes[size],
    height: sizes[size],
    border: `${borderSizes[size]} solid var(--border-light)`,
    borderTopColor: 'var(--accent-cyan)',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.4))'
  };

  const containerStyle = center ? { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '120px' } : {};

  return (
    <div style={containerStyle}>
      <div style={style} className="glow-cyan" />
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};
