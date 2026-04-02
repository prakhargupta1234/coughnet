import React from 'react';
import ThemeToggle from './ThemeToggle';

const AuthCard = ({ children, title, subtitle, image }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300 p-0 md:p-6"
         style={{ backgroundColor: 'var(--bg)' }}>
      
      <div className="w-full h-full md:h-auto md:max-w-5xl flex flex-col md:flex-row overflow-hidden shadow-2xl md:rounded-3xl border animate-in fade-in zoom-in duration-700"
           style={{
             backgroundColor: 'var(--card)',
             borderColor: 'var(--border)',
             color: 'var(--text-primary)'
           }}>
        
        {/* Left Side: Image/Animation */}
        <div className="hidden md:flex md:w-1/2 relative bg-slate-900 overflow-hidden">
          <img 
            src={image} 
            alt="Healthcare AI" 
            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000 transform hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/40 to-emerald-500/30"></div>
          
          <div className="relative z-10 p-12 flex flex-col justify-end h-full text-white">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Advanced Respiratory Diagnostics</h2>
            <p className="text-lg text-blue-100/90 leading-relaxed">
              Leveraging state-of-the-art neural networks to analyze cough sound patterns for early disease detection.
            </p>
            <div className="mt-8 flex gap-4">
              <div className="w-12 h-1 bg-white/30 rounded-full"></div>
              <div className="w-12 h-1 bg-white/10 rounded-full"></div>
              <div className="w-12 h-1 bg-white/10 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 relative flex flex-col justify-center min-h-[600px]">
          <div className="absolute top-6 right-6">
            <ThemeToggle />
          </div>
          
          <div className="max-w-sm mx-auto w-full">
            <div className="mb-10">
              <h1 className="text-3xl font-extrabold mb-3 tracking-tight"
                  style={{ color: 'var(--text-primary)' }}>
                {title}
              </h1>
              {subtitle && (
                <p className="text-base font-medium"
                   style={{ color: 'var(--text-secondary)' }}>
                  {subtitle}
                </p>
              )}
            </div>
            
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
