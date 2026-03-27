import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileAudio, X, CheckCircle, AlertTriangle, ShieldCheck, Activity, Search, zap, Pulse } from 'lucide-react';
import { Button, Card, Loader } from '../common/UI';

export const UploadBox = ({ file, isDragging, onDrag, onDrop, onFileSelect, onClear }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <motion.div 
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.995 }}
        className={`relative border-2 border-dashed rounded-[3rem] p-16 text-center transition-all cursor-pointer group overflow-hidden ${
          isDragging 
          ? 'border-cyan bg-cyan/5 shadow-cyan' 
          : file 
            ? 'border-success bg-success/5' 
            : 'border-border-light hover:border-cyan/50 bg-white shadow-sm'
        }`}
        onDragEnter={onDrag}
        onDragLeave={onDrag}
        onDragOver={onDrag}
        onDrop={onDrop}
        onClick={() => !file && document.getElementById('audio-upload').click()}
      >
        {/* Animated Background AI Pattern */}
        <AnimatePresence>
          {isDragging && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-cyan pointer-events-none"
            />
          )}
        </AnimatePresence>

        <input 
          id="audio-upload"
          type="file" 
          accept=".wav" 
          className="hidden" 
          onChange={onFileSelect}
        />
        
        <div className="relative z-10 flex flex-col items-center">
          <motion.div 
            layoutId="upload-icon-pulse"
            className={`w-28 h-28 rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl transition-all duration-500 ${
              file ? 'bg-success text-white shadow-success/20' : 'bg-cyan/10 text-cyan shadow-cyan/10 glow-cyan'
            }`}
          >
            {file ? <CheckCircle size={56} /> : <Activity size={56} strokeWidth={1} />}
          </motion.div>
          
          <AnimatePresence mode="wait">
            {file ? (
              <motion.div 
                key="sample-loaded"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <h3 className="text-2xl font-black text-text-main poppins tracking-tight">{file.name}</h3>
                <div className="inline-flex items-center space-x-2 text-success font-black uppercase tracking-[0.2em] text-[10px] bg-white px-4 py-1.5 rounded-full border border-success/10 shadow-sm">
                   <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                   <span>Signal Integrity Verified</span>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="sample-upload-info"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                <h3 className="text-2xl font-black text-text-main poppins tracking-tight">AI Diagnostic Input</h3>
                <p className="text-sm text-text-muted font-bold tracking-tight">Deploy respiratory samples (.wav) for neural analysis</p>
                <div className="flex items-center justify-center space-x-4 pt-4 opacity-40">
                   <Activity size={18} />
                   <div className="w-8 h-px bg-border-light" />
                   <ShieldCheck size={18} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {file && (
          <motion.button 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            onClick={(e) => { e.stopPropagation(); onClear(); }}
            className="absolute top-8 right-8 p-3 bg-white rounded-2xl shadow-xl text-danger border-2 border-border-light z-20"
          >
            <X size={20} />
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
};

export const ScannerAnimation = () => (
  <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-[3rem]">
    <motion.div 
      initial={{ top: "-10%" }}
      animate={{ top: "110%" }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-cyan to-transparent shadow-[0_0_30px_rgba(34,211,238,1)] glow-cyan"
    />
    <motion.div 
      animate={{ opacity: [0.05, 0.15, 0.05] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="absolute inset-0 bg-cyan"
    />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
       <Loader size="lg" />
       <p className="mt-8 text-[11px] font-black text-cyan uppercase tracking-[0.5em] glow-cyan">AI SCAN IN PROGRESS</p>
    </div>
  </div>
);

export const GlowingWaveform = ({ height = 100, active = false }) => (
  <div className="h-full flex items-center justify-center gap-1.5 opacity-80">
    {[5,8,12,6,3,10,14,7,5,9].map((h, i) => (
      <motion.div 
        key={i} 
        animate={active ? {
          scaleY: [0.2, h/10, 0.2],
          backgroundColor: ["#E5E7EB", "#22D3EE", "#E5E7EB"]
        } : {}}
        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
        className="w-2 rounded-full"
        style={{ height: `${height}%`, backgroundColor: '#E5E7EB' }}
      />
    ))}
  </div>
);

export const PredictionResult = ({ prediction, confidence = 98 }) => {
  const configs = {
    Abnormal: {
      icon: AlertTriangle,
      color: 'text-danger',
      bg: 'bg-rose-50',
      border: 'border-danger/10',
      tag: 'bg-danger text-white',
      badge: 'Immediate Action Required',
      msg: 'Critical respiratory anomalies detected. Neural patterns indicate significant lung function deviation. Consult practitioner immediately.'
    },
    Healthy: {
      icon: ShieldCheck,
      color: 'text-success',
      bg: 'bg-emerald-50',
      border: 'border-success/10',
      tag: 'bg-success text-white',
      badge: 'Neural Baseline Match',
      msg: 'No significant respiratory signatures detected. Sample matches healthy population benchmarks with high statistical confidence.'
    }
  };

  const config = configs[prediction] || configs.Healthy;
  const Icon = config.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`mt-12 p-12 rounded-[3.5rem] border-2 ${config.border} ${config.bg} relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 p-12 text-primary opacity-[0.03] -translate-y-8 translate-x-8">
         <Icon size={240} />
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 relative z-10">
        <motion.div 
          initial={{ rotate: -10, scale: 0.9 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className={`w-32 h-32 rounded-[2rem] ${config.tag} flex items-center justify-center shrink-0 shadow-2xl shadow-current/20 glow-cyan`}
        >
          <Icon size={64} strokeWidth={1.5} />
        </motion.div>
        
        <div className="flex-1 text-center lg:text-left space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-2">
              <p className="text-[11px] font-black uppercase text-indigo tracking-[0.4em] mb-3">AI Diagnostic Summary</p>
              <h2 className={`text-7xl font-black poppins uppercase leading-none tracking-tighter ${config.color}`}>{prediction}</h2>
              <div className="inline-block mt-4 px-5 py-2 bg-white rounded-full text-[10px] font-black text-text-muted uppercase tracking-widest border border-border-light shadow-sm">
                 {config.badge}
              </div>
            </div>
            
            <motion.div 
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-white px-10 py-6 rounded-[2.5rem] border-2 border-border-light shadow-xl flex flex-col items-center min-w-[180px]"
            >
              <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">AI Assurance</p>
              <p className={`text-4xl font-black poppins ${config.color}`}>{confidence}%</p>
            </motion.div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-md p-8 rounded-[2rem] border-2 border-white/80 shadow-inner">
             <p className="text-text-main text-lg font-bold leading-relaxed">{config.msg}</p>
          </div>
          
          <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-2">
             <Button variant="indigo" size="lg" className="rounded-2xl px-12 group">
                <span className="flex items-center">
                   EVALUATE FULL REPORT
                   <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="ml-3 font-bold">→</motion.span>
                </span>
             </Button>
             <Button variant="secondary" size="lg" className="rounded-2xl bg-white/40 border-border-light shadow-none">
                ENCRYPT & SHARE
             </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
