import React from 'react';

const AuthCard = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300 px-4 py-12"
         style={{ backgroundColor: 'var(--bg)' }}>
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl border animate-in fade-in zoom-in duration-500"
           style={{
             backgroundColor: 'var(--card)',
             borderColor: 'var(--border)',
             color: 'var(--text-primary)'
           }}>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 tracking-tight"
              style={{ color: 'var(--text-primary)' }}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm font-medium"
               style={{ color: 'var(--text-secondary)' }}>
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthCard;
