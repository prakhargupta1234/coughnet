import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ShieldCheck, 
  Activity, 
  Zap, 
  ChevronRight,
  Stethoscope,
  Microscope,
  CheckCircle,
  Database,
  ArrowRight,
  Monitor
} from 'lucide-react';
import { Navbar } from '../components/layout/Layout';
import { Button, Card } from '../components/common/UI';

const MotionCard = motion(Card);

export const Landing = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, 250]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const features = [
    { 
      title: 'Neural Mapping', 
      icon: Microscope, 
      color: 'bg-cyan/10 text-cyan',
      description: 'Advanced CNN models trained on clinical datasets for high accuracy respiratory mapping.'
    },
    { 
      title: 'Real-time Screening', 
      icon: Zap, 
      color: 'bg-indigo/5 text-indigo',
      description: 'Get classification results in seconds. Rapid screening for COPD, Asthma, and Infections.'
    },
    { 
      title: 'Clinical Security', 
      icon: ShieldCheck, 
      color: 'bg-emerald-50 text-success',
      description: 'Your health data is encrypted and handled with clinical-grade privacy standards.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.25, delayChildren: 0.6 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] overflow-x-hidden relative">
      <Navbar />
      
      {/* GEN-Z Professional Futuristic Background Blur */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ y: y1, opacity }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[15%] -right-[15%] w-[700px] h-[700px] rounded-full bg-cyan blur-[130px]"
        />
        <motion.div 
          style={{ y: y1, opacity }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-[30%] -left-[10%] w-[600px] h-[600px] rounded-full bg-indigo blur-[110px]"
        />
      </div>

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24 relative z-10">
        <motion.div 
          initial={{ x: -120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="flex-1 space-y-10"
        >
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="inline-flex items-center space-x-3 px-5 py-2 bg-white border border-border-light rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-cyan glow-cyan"
          >
            <Activity size={18} strokeWidth={3} className="animate-pulse" />
            <span>AI Respiratory Interface v3.5</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-black text-text-main leading-[1] tracking-tighter poppins">
            Automated <br/>
            <span className="text-primary">Diagnostic </span>
            <span className="text-cyan glow-cyan">AI</span>
          </h1>
          
          <p className="text-xl text-text-muted leading-relaxed max-w-xl font-bold tracking-tight opacity-80">
            Automated respiratory disease screening via cough sound analysis. Designed for clinical precision and high-tech accessibility.
          </p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap items-center gap-8"
          >
            <Link to="/predict">
              <Button size="lg" className="flex items-center space-x-4 shadow-[0_20px_40px_rgba(59,130,246,0.4)] group px-12 py-7 rounded-[2rem]">
                <span className="text-lg font-black italic">DEPLOY ANALYZER</span>
                <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
            <div className="flex items-center space-x-6 px-6 py-4 bg-white/50 backdrop-blur-md rounded-3xl border border-white">
               <div className="flex -space-x-4">
                  {[4,5,6].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-lg shadow-primary/10">
                       <img src={`https://i.pravatar.cc/100?u=${i}`} alt="practitioner" />
                    </div>
                  ))}
               </div>
               <p className="text-xs font-black text-text-muted uppercase tracking-widest leading-tight">Trusted by<br/><span className="text-primary">150+ Clinics</span></p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.7, opacity: 0, rotate: 10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "backOut" }}
          className="flex-1 relative"
        >
          <div className="relative group">
            <div className="absolute -inset-10 bg-gradient-to-r from-cyan/30 to-indigo/30 rounded-full blur-[100px] opacity-40 group-hover:opacity-70 transition-opacity"></div>
            <Card className="rounded-[4rem] p-4 bg-white shadow-2xl border border-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-12 text-cyan opacity-[0.05] -translate-y-8 translate-x-8">
                  <Activity size={240} />
               </div>
               <div className="aspect-[16/11] bg-gray-50/50 rounded-[3rem] flex flex-col items-center justify-center p-12 text-primary/10 relative border border-border-light inset-shadow">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="text-cyan glow-cyan"
                  >
                    <Stethoscope size={240} strokeWidth={0.5} />
                  </motion.div>
                  
                  {/* Glowing Cyan Waveform Visualization */}
                  <div className="absolute bottom-16 inset-x-12 h-32 flex items-center justify-center gap-2 overflow-hidden px-4 bg-white/30 backdrop-blur-sm rounded-[2rem] border border-white/40">
                    {[4,7,12,6,3,10,16,9,5,11,14,6,8,12,7,10,18,6].map((h, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ scaleY: 0.1 }}
                        animate={{ scaleY: [0.1, h/10, 0.1], backgroundColor: ["#E5E7EB", "#22D3EE", "#E5E7EB"] }}
                        transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.12 }}
                        className="w-2 h-full rounded-full shrink-0 glow-cyan shadow-sm shadow-cyan/20"
                      />
                    ))}
                  </div>
                  
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "250%" }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 bottom-0 left-0 w-48 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 z-20 pointer-events-none"
                  />
               </div>
            </Card>
          </div>
        </motion.div>
      </section>

      {/* Features with Startup-style Registry Grid */}
      <section className="py-32 bg-white relative z-10 border-y-2 border-border-light px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
             <p className="text-[11px] font-black text-indigo uppercase tracking-[0.6em] mb-4">Neural Infrastructure</p>
             <h2 className="text-5xl md:text-6xl font-black text-text-main mb-6 poppins tracking-tight">Health-Tech Reliability</h2>
             <p className="text-xl text-text-muted max-w-2xl mx-auto font-bold tracking-tight leading-relaxed">Built enough for patients but powerful enough for healthcare professionals.</p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid lg:grid-cols-3 gap-12"
          >
            {features.map((f, i) => (
              <MotionCard 
                key={i} 
                variants={itemVariants}
                whileHover={{ y: -16, backgroundColor: '#FFFFFF', boxShadow: '0 30px 60px -12px rgba(99, 102, 241, 0.1)' }}
                className="rounded-[3rem] p-12 border-2 border-border-light shadow-none relative group overflow-hidden bg-gray-50/30 transition-all duration-500"
              >
                <div className={`w-20 h-20 rounded-[1.75rem] ${f.color} flex items-center justify-center mb-10 shadow-2xl shadow-current/10 transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                  <f.icon size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl font-black mb-4 text-text-main poppins tracking-tight leading-tight">{f.title}</h3>
                <p className="text-text-muted font-bold leading-relaxed tracking-tight">{f.description}</p>
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="mt-10 flex items-center text-primary font-black text-[11px] uppercase tracking-widest cursor-pointer group-hover:text-indigo"
                >
                   <span>READ CLINICAL WHITE PAPER</span>
                   <ArrowRight size={16} className="ml-3" />
                </motion.div>
                <div className="absolute -bottom-6 -right-6 text-primary opacity-[0.02] group-hover:scale-125 transition-transform">
                   <f.icon size={160} />
                </div>
              </MotionCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Network Signup Banner */}
      <section className="py-32 px-6">
         <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
         >
            <Card className="rounded-[4rem] p-16 md:p-24 bg-indigo shadow-[0_40px_80px_rgba(99,102,241,0.3)] text-white border-none relative overflow-hidden">
               <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-white opacity-[0.03] rounded-full blur-[60px] -translate-x-1/2 -translate-y-1/2" />
               <div className="relative z-10 flex flex-col items-center text-center">
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="p-6 bg-white/10 rounded-[2rem] border border-white/20 mb-10"
                  >
                    <Database size={56} className="text-cyan glow-cyan" />
                  </motion.div>
                  <h2 className="text-4xl md:text-6xl font-black mb-10 leading-[1.1] poppins tracking-tighter">
                    Empowering Clinics with <br/><span className="text-cyan glow-cyan">Futuristic Intelligence</span>
                  </h2>
                  <Link to="/signup">
                    <Button variant="secondary" size="lg" className="bg-white text-indigo hover:bg-white/90 px-16 py-7 rounded-[2rem] font-black tracking-[0.2em] text-lg shadow-2xl group border-none">
                      <span className="flex items-center">
                         REQUEST CLINICAL KEYS
                         <ChevronRight size={24} className="ml-3 group-hover:translate-x-2 transition-transform" />
                      </span>
                    </Button>
                  </Link>
               </div>
            </Card>
         </motion.div>
      </section>

      <footer className="py-24 bg-white px-6 border-t-2 border-border-light relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-32 mb-16">
            <div className="max-w-sm">
               <div className="flex items-center space-x-4 text-primary font-black text-4xl mb-6 group cursor-pointer transition-all">
                  <motion.div 
                    whileHover={{ rotate: 15 }}
                    className="p-3 bg-primary/5 rounded-[1.5rem] border border-primary/10"
                  >
                    <Stethoscope size={40} className="glow-cyan" />
                  </motion.div>
                  <span className="poppins tracking-tighter">CoughNet <span className="text-cyan glow-cyan italic">AI</span></span>
               </div>
               <p className="text-sm font-bold text-text-muted leading-relaxed tracking-tight">
                  The future of respiratory diagnostics. Leveraging advanced sound analysis for rapid clinical screening.
               </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16 lg:gap-24">
               <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-text-main uppercase tracking-[0.4em]">Intelligence</h4>
                  <ul className="space-y-4">
                     <li><Link to="/predict" className="text-sm font-black text-text-muted hover:text-cyan transition-colors">Neural Analyzer</Link></li>
                     <li><Link to="/history" className="text-sm font-black text-text-muted hover:text-cyan transition-colors">Clinical History</Link></li>
                  </ul>
               </div>
               <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-text-main uppercase tracking-[0.4em]">Research</h4>
                  <ul className="space-y-4">
                     <li><Link to="/" className="text-sm font-black text-text-muted hover:text-cyan transition-colors">Dataset Documentation</Link></li>
                     <li><Link to="/" className="text-sm font-black text-text-muted hover:text-cyan transition-colors">Neural Weights</Link></li>
                  </ul>
               </div>
            </div>
          </div>
          
          <div className="pt-16 border-t border-border-light flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="flex items-center space-x-4">
                <p className="text-[10px] font-black text-text-muted tracking-widest uppercase">© 2026 COUGHNET • MEDICAL INFRASTRUCTURE</p>
                <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
             </div>
             <div className="flex items-center space-x-8 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">
                <a href="#" className="hover:text-cyan">Safety</a>
                <a href="#" className="hover:text-cyan">Privacy</a>
                <a href="#" className="hover:text-cyan">Terms</a>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
