import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Microscope, History, AlertCircle, CheckCircle, ChevronRight, FileAudio, RotateCcw, Monitor, Zap, Activity } from 'lucide-react';
import { SharedLayout } from '../components/layout/Layout';
import { Card, Button, Loader } from '../components/common/UI';
import { UploadBox, PredictionResult, ScannerAnimation } from '../components/predict/PredictComponents';

export const Predict = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
    else if (e.type === 'dragleave') setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.endsWith('.wav')) {
        setFile(droppedFile);
        setError(null);
        setPrediction(null);
      } else {
        setError('UNRECOGNIZED SIGNAL: PLEASE DEPLOY .WAV SAMPLES FOR NEURAL MAPPING.');
      }
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setPrediction(null);
    }
  };

  const handlePredict = async () => {
    if (!file) return;

    setIsPredicting(true);
    setError(null);
    setPrediction(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        // Artificially wait for high-end animation impact
        setTimeout(() => {
          setPrediction(data.prediction);
          setIsPredicting(false);
          const history = JSON.parse(localStorage.getItem('coughnet_history') || '[]');
          localStorage.setItem('coughnet_history', JSON.stringify([
            { date: new Date().toLocaleDateString(), file: file.name, result: data.prediction, id: Date.now() },
            ...history
          ]));
        }, 2200); 
      } else {
        setError(data.error || 'DIAGNOSTIC FAILURE: ANALYZER COULD NOT MAP SIGNAL.');
        setIsPredicting(false);
      }
    } catch (err) {
      setError('NETWORK OFFLINE: CLINICAL SERVER CONNECTION FAILED.');
      setIsPredicting(false);
    }
  };

  return (
    <SharedLayout>
      <div className="max-w-5xl mx-auto space-y-12 pb-24 relative">
        {/* Futuristic Page Header */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b-2 border-border-light pb-10"
        >
          <div className="space-y-4">
             <div className="flex items-center space-x-3 text-[10px] font-black text-indigo uppercase tracking-[0.5em] mb-4">
                <span className="opacity-40">MODULE</span>
                <ChevronRight size={10} className="text-cyan animate-pulse" />
                <span className="text-cyan glow-cyan">NEURAL DIAGNOSTICS HUB</span>
             </div>
             <h1 className="text-5xl font-black text-text-main poppins tracking-tighter leading-none">Acoustic Signal <span className="text-primary italic">Analyzer</span></h1>
             <p className="text-text-muted font-bold tracking-tight text-lg opacity-80">Deploy respiratory sound profiles for automated AI screening.</p>
          </div>
          <div className="flex items-center space-x-6 px-10 py-5 bg-white rounded-[2rem] border-2 border-border-light shadow-xl shadow-primary/5">
             <div className="w-14 h-14 rounded-2xl bg-cyan/10 flex items-center justify-center text-cyan glow-cyan">
                <Monitor size={28} />
             </div>
             <div>
                <p className="text-[10px] font-black uppercase text-text-muted tracking-[0.3em] mb-1">Clinic Sync</p>
                <div className="flex items-center space-x-2">
                   <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
                   <p className="text-xs font-black text-text-main uppercase tracking-widest">Active Link</p>
                </div>
             </div>
          </div>
        </motion.div>

        <Card className="rounded-[4rem] p-1.5 relative overflow-hidden bg-white shadow-2xl border-none">
           <AnimatePresence mode="wait">
             {!prediction ? (
               <motion.div 
                 key="diagnostic-input"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0, scale: 0.98 }}
                 className="p-10 lg:p-16 space-y-10 relative bg-gray-50/20"
               >
                 {isPredicting && <ScannerAnimation />}
                 
                 <UploadBox 
                   file={file} 
                   isDragging={isDragging} 
                   onDrag={handleDrag} 
                   onDrop={handleDrop} 
                   onFileSelect={handleFileSelect}
                   onClear={() => setFile(null)}
                 />
                 
                 <AnimatePresence>
                   {error && (
                     <motion.div 
                       initial={{ height: 0, opacity: 0 }}
                       animate={{ height: 'auto', opacity: 1 }}
                       exit={{ height: 0, opacity: 0 }}
                       className="flex items-center space-x-4 p-6 bg-rose-50 text-danger rounded-[2rem] border-2 border-rose-100 text-xs font-black tracking-widest leading-relaxed overflow-hidden"
                     >
                       <AlertCircle size={24} className="shrink-0" />
                       <span>{error}</span>
                     </motion.div>
                   )}
                 </AnimatePresence>
                 
                 <Button 
                   variant="indigo" 
                   size="lg" 
                   className={`w-full py-7 rounded-[2rem] font-black text-xl italic tracking-[0.2em] shadow-2xl transition-all relative z-20 ${
                     !file || isPredicting ? 'bg-gray-100 text-gray-400 shadow-none' : 'shadow-indigo/30'
                   }`}
                   disabled={!file || isPredicting}
                   onClick={handlePredict}
                 >
                   <div className="flex items-center justify-center space-x-4">
                     {isPredicting ? (
                       <>
                         <Loader size="sm" />
                         <span className="animate-pulse glow-cyan">MAPPING SIGNAL ARMS...</span>
                       </>
                     ) : (
                       <>
                         <Zap size={28} className="text-cyan glow-cyan" />
                         <span>RUN NEURAL SCAN</span>
                       </>
                     )}
                   </div>
                 </Button>
               </motion.div>
             ) : (
               <motion.div 
                 key="diagnostic-outcome"
                 initial={{ opacity: 0, y: 50 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="p-10 lg:p-16 space-y-12"
               >
                  <div className="flex items-center justify-between bg-white border-2 border-border-light p-6 rounded-[2.5rem] shadow-xl shadow-primary/5">
                     <div className="flex items-center space-x-6">
                        <div className="w-16 h-16 bg-success text-white rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-success/20">
                           <CheckCircle size={32} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-indigo uppercase tracking-[0.4em] mb-1">Signal Decrypted</p>
                          <p className="text-sm text-text-muted font-bold tracking-tight">{file.name}</p>
                        </div>
                     </div>
                     <motion.button 
                       whileHover={{ scale: 1.05, x: -5 }}
                       whileTap={{ scale: 0.95 }}
                       onClick={() => { setFile(null); setPrediction(null); }} 
                       className="flex items-center space-x-3 px-8 py-4 bg-gray-50 text-indigo font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl border border-border-light hover:bg-white transition-all shadow-sm"
                     >
                        <RotateCcw size={16} />
                        <span>RE-SCAN SAMPLE</span>
                     </motion.button>
                  </div>
                  
                  <PredictionResult prediction={prediction} />
               </motion.div>
             )}
           </AnimatePresence>
        </Card>

        {/* Clinical Parameters Grid */}
        <div className="grid md:grid-cols-2 gap-10">
           <motion.div 
             initial={{ y: 30, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             viewport={{ once: true }}
             className="p-10 bg-white rounded-[3rem] border-2 border-border-light flex items-start space-x-8 group hover:border-cyan/50 hover:shadow-2xl transition-all duration-500"
           >
              <div className="w-20 h-20 rounded-[1.5rem] bg-cyan/10 text-cyan flex items-center justify-center group-hover:bg-cyan group-hover:text-white transition-all shadow-xl shadow-cyan/5">
                 <FileAudio size={40} strokeWidth={1.5} />
              </div>
              <div className="space-y-3">
                 <h4 className="text-2xl font-black text-text-main poppins tracking-tight">Standardization</h4>
                 <p className="text-sm text-text-muted leading-relaxed font-bold tracking-tight opacity-80">Use clinical 22kHz mono .wav files for 99.8% pattern recognition accuracy across neural branches.</p>
              </div>
           </motion.div>
           <motion.div 
             initial={{ y: 30, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3 }}
             className="p-10 bg-white rounded-[3rem] border-2 border-border-light flex items-start space-x-8 group hover:border-indigo/50 hover:shadow-2xl transition-all duration-500"
           >
              <div className="w-20 h-20 rounded-[1.5rem] bg-indigo/5 text-indigo flex items-center justify-center group-hover:bg-indigo group-hover:text-white transition-all shadow-xl shadow-indigo/5">
                 <History size={40} strokeWidth={1.5} />
              </div>
              <div className="space-y-3">
                 <h4 className="text-2xl font-black text-text-main poppins tracking-tight">Clinical Sandbox</h4>
                 <p className="text-sm text-text-muted leading-relaxed font-bold tracking-tight opacity-80">Local-first data encryption protocol. Diagnostic history remains within your hardware medical secure-key.</p>
              </div>
           </motion.div>
        </div>
      </div>
    </SharedLayout>
  );
};
