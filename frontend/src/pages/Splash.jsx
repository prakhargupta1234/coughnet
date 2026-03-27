import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, Activity, Zap } from 'lucide-react';

export const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3800);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white overflow-hidden relative">
      {/* Background Pulse Effect - GEN-Z Professional Cyan */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.6, opacity: [0, 0.08, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[600px] h-[600px] rounded-full bg-cyan blur-[120px] pointer-events-none"
      />
      
      <div className="relative z-10 flex flex-col items-center">
        <motion.div 
          initial={{ y: 30, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="w-28 h-28 bg-white border-2 border-border-light rounded-[2.5rem] flex items-center justify-center text-primary mb-10 shadow-2xl shadow-primary/5 relative group"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-primary glow-cyan"
          >
            <Stethoscope size={64} strokeWidth={1.5} />
          </motion.div>
          <div className="absolute inset-0 rounded-[2.5rem] border-2 border-cyan/20 animate-pulse" />
        </motion.div>

        <div className="text-center space-y-4">
          <div className="flex flex-col items-center">
             <motion.h1 
               initial={{ opacity: 0, letterSpacing: "0.2em" }}
               animate={{ opacity: 1, letterSpacing: "-0.02em" }}
               transition={{ delay: 0.6, duration: 1.2, ease: "circOut" }}
               className="text-6xl font-black text-text-main poppins leading-none"
             >
               CoughNet <span className="text-cyan glow-cyan">AI</span>
             </motion.h1>
             <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 1.2, duration: 0.8 }}
               className="mt-4 px-6 py-2 bg-indigo/5 text-indigo rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-indigo/10 shadow-sm"
             >
                Global Diagnostic Network
             </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="flex items-center justify-center space-x-3 text-text-muted font-bold text-xs"
          >
            <Zap size={14} className="text-cyan glow-cyan" />
            <span className="opacity-60">Initializing Neural Parameters...</span>
          </motion.div>
        </div>

        {/* Animated Progress Loader */}
        <div className="mt-20 w-72 h-1.5 bg-gray-50 border border-border-light rounded-full overflow-hidden relative shadow-inner">
          <motion.div 
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-cyan to-primary shadow-cyan"
          />
        </div>
      </div>

      {/* Futuristic Floating Elements */}
      <motion.div 
        animate={{ y: [0, -30, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] right-[20%] text-cyan blur-[1px]"
      >
        <Activity size={32} strokeWidth={1} />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 30, 0], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[15%] left-[20%] text-indigo blur-[1px]"
      >
        <Zap size={28} />
      </motion.div>
    </div>
  );
};
