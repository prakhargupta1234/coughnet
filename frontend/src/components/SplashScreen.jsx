import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const title = "Coughnet";

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 1000);
    }, 4000); // Extended slightly to enjoy animations

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-1000 ${fadeOut ? 'opacity-0 scale-110 blur-xl' : 'opacity-100 scale-100'}`}
         style={{ backgroundColor: 'var(--bg)' }}>
      
      <div className="text-center relative">
        {/* Animated Title with Staggered Characters */}
        <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tighter flex justify-center">
          {title.split('').map((char, index) => (
            <span 
              key={index}
              className="animate-char-fade inline-block hover:scale-125 transition-transform cursor-default"
              style={{ 
                animationDelay: `${index * 100}ms`,
                background: 'linear-gradient(to bottom, var(--primary), var(--secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Shimmering Subheading */}
        <div className="relative inline-block overflow-hidden rounded-lg px-4 py-2">
          <p className="text-lg md:text-xl font-bold tracking-wide relative z-10"
             style={{ color: 'var(--text-secondary)' }}>
            Automated respiratory disease screening via cough sound analytics
          </p>
          <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-30"></div>
        </div>
      </div>
      
      {/* Dynamic Interactive Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary opacity-10 blur-[100px] animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-secondary opacity-10 blur-[80px] animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-400 opacity-5 blur-[120px] animate-ripple"></div>

      {/* Loading Indicator */}
      <div className="absolute bottom-12 w-48 h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-primary animate-shimmer rounded-full" style={{ width: '100%' }}></div>
      </div>
    </div>
  );
};

export default SplashScreen;
