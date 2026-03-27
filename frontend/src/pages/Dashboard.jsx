import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, 
  TrendingUp, 
  Users, 
  AlertCircle, 
  ShieldCheck, 
  Activity,
  Calendar,
  ChevronRight,
  Monitor,
  Zap,
  Globe
} from 'lucide-react';
import { SharedLayout } from '../components/layout/Layout';
import { Card } from '../components/common/UI';

const MotionCard = motion(Card);

const StatCard = ({ title, value, icon: Icon, trend, color, delay }) => (
  <MotionCard 
    initial={{ y: 40, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay, duration: 0.8, type: "spring" }}
    whileHover={{ y: -12, backgroundColor: '#FFFFFF', boxShadow: '0 30px 60px -12px rgba(59, 130, 246, 0.15)' }}
    className="flex items-center space-x-6 p-8 border-2 border-border-light rounded-[2.5rem] bg-gray-50/20 group cursor-pointer relative overflow-hidden transition-colors duration-500"
  >
    <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center transition-all group-hover:scale-110 shadow-xl shadow-current/5`}>
      <Icon size={32} strokeWidth={1.5} />
    </div>
    <div className="flex-1">
      <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.4em] mb-2">{title}</p>
      <div className="flex items-baseline space-x-3">
        <h3 className="text-4xl font-black text-text-main poppins leading-none tracking-tighter">{value}</h3>
        {trend && (
          <div className="flex items-center space-x-1 text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 italic shadow-sm">
            <TrendingUp size={10} />
            <span>{trend}%</span>
          </div>
        )}
      </div>
    </div>
    <div className="absolute top-0 right-0 p-6 text-primary opacity-[0.03] -translate-y-6 translate-x-6 group-hover:scale-125 transition-transform duration-700">
       <Icon size={120} />
    </div>
  </MotionCard>
);

export const Dashboard = () => {
  const stats = [
    { title: 'Neural Logs', value: '2.4k', icon: Activity, trend: '15', color: 'bg-cyan/10 text-cyan glow-cyan' },
    { title: 'Screened Clean', value: '1,842', icon: ShieldCheck, trend: '8', color: 'bg-emerald-50 text-success' },
    { title: 'Neural Anomalies', value: '412', icon: AlertCircle, trend: '22', color: 'bg-rose-50 text-danger' },
    { title: 'Clinic Pulse', value: '150+', icon: Globe, trend: '10', color: 'bg-indigo/5 text-indigo' }
  ];

  const chartData = [35, 55, 42, 85, 48, 62, 55, 98, 72, 45, 80, 58];
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  return (
    <SharedLayout>
      <div className="space-y-16 pb-24 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 border-b-2 border-border-light pb-12"
        >
          <div className="space-y-4">
             <div className="flex items-center space-x-3 text-[10px] font-black text-indigo uppercase tracking-[0.5em] mb-4 opacity-80">
                <span>DASHBOARD</span>
                <ChevronRight size={12} className="text-cyan" />
                <span className="text-cyan glow-cyan">GLOBAL SCREENING ANALYTICS</span>
             </div>
             <h1 className="text-5xl font-black text-text-main poppins tracking-tighter leading-none">Intelligence <span className="text-primary italic">Terminal</span></h1>
             <p className="text-xl text-text-muted font-bold tracking-tight opacity-70">Automated respiratory mapping performance and signal logs.</p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-6 px-10 py-6 bg-white rounded-[2rem] border-2 border-border-light shadow-2xl shadow-primary/5 relative group"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo/5 flex items-center justify-center text-indigo group-hover:bg-indigo group-hover:text-white transition-all shadow-md">
              <Calendar size={22} />
            </div>
            <div>
               <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-1">Clinic Horizon</p>
               <span className="text-[12px] font-black text-text-main tracking-widest uppercase italic">March 28, 2026</span>
            </div>
          </motion.div>
        </motion.div>

        {/* High-Tech Registry Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <StatCard key={i} {...s} delay={i * 0.15 + 0.5} />
          ))}
        </div>

        {/* Neural Analytics & Registry Log */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <MotionCard 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1, ease: "circOut" }}
            className="lg:col-span-2 min-h-[500px] flex flex-col rounded-[3.5rem] border-2 border-border-light shadow-2xl p-12 bg-white relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan/5 rounded-full -translate-y-1/2 translate-x-1/2 -z-10 blur-[80px]" />
            
            <div className="flex items-center justify-between mb-16 relative z-10">
              <div className="space-y-2">
                 <h3 className="text-3xl font-black text-text-main poppins tracking-tight">Diagnostic Velocity</h3>
                 <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.4em] opacity-60">Neural branches processed per clinical module</p>
              </div>
              <div className="flex items-center space-x-4">
                 <div className="hidden sm:flex items-center space-x-3 text-[10px] font-black text-text-muted uppercase tracking-widest px-4 border-r border-border-light">
                    <div className="w-3 h-3 bg-cyan glow-cyan rounded-full animate-pulse" />
                    <span>Live Signal Hub</span>
                 </div>
                 <select className="text-[10px] font-black bg-gray-50 border-2 border-border-light rounded-xl px-6 py-3 text-text-muted outline-none hover:border-cyan/40 hover:bg-white transition-all cursor-pointer shadow-sm uppercase tracking-widest">
                   <option>FISCAL Q1 VIEW</option>
                   <option>6 MONTH RECAP</option>
                 </select>
              </div>
            </div>
            
            <div className="flex-1 flex items-end justify-between gap-6 px-4 pb-10 relative z-10">
              {chartData.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center group cursor-pointer h-full justify-end relative">
                  <div className="relative w-full h-full flex items-end">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${h * 2.8}px` }}
                      transition={{ delay: 1.8 + i * 0.08, duration: 1.2, ease: "circOut" }}
                      className="w-full bg-indigo/5 group-hover:bg-cyan rounded-[1.25rem] transition-all duration-500 relative group-hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] glow-cyan overflow-hidden border-2 border-transparent group-hover:border-white/20"
                    >
                       <motion.div 
                         initial={{ bottom: "-100%" }}
                         animate={{ bottom: "100%" }}
                         transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
                         className="absolute inset-x-0 h-20 bg-gradient-to-t from-white/10 to-transparent opacity-40 pointer-events-none"
                       />
                    </motion.div>
                  </div>
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3 }}
                    className="text-[10px] font-black text-text-muted mt-8 uppercase tracking-[0.2em] group-hover:text-cyan transition-colors italic"
                  >
                    {months[i]}
                  </motion.span>
                </div>
              ))}
            </div>
          </MotionCard>

          <MotionCard 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 1, ease: "circOut" }}
            className="rounded-[3.5rem] flex flex-col p-12 bg-white border-2 border-border-light shadow-2xl"
          >
            <div className="flex items-center justify-between mb-12">
               <div>
                  <h3 className="text-3xl font-black text-text-main poppins tracking-tight">Signal Registry</h3>
                  <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] opacity-60">Verified Clinical Inputs</p>
               </div>
               <div className="w-14 h-14 bg-indigo/5 text-indigo rounded-2xl flex items-center justify-center shadow-lg shadow-indigo/5">
                  <Monitor size={24} />
               </div>
            </div>
            
            <div className="space-y-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {[
                { name: 'Patient_104x.wav', result: 'Critical', time: '2m', color: 'text-danger bg-rose-50 border-rose-100' },
                { name: 'Patient_091k.wav', result: 'Healthy', time: '14m', color: 'text-success bg-emerald-50 border-emerald-100' },
                { name: 'Patient_211z.wav', result: 'Amber', time: '45m', color: 'text-warning bg-amber-50 border-amber-100' },
                { name: 'Patient_652q.wav', result: 'Healthy', time: '1h', color: 'text-success bg-emerald-50 border-emerald-100' },
                { name: 'Patient_101r.wav', result: 'Critical', time: '3h', color: 'text-danger bg-rose-50 border-rose-100' }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2 + i * 0.15 }}
                  whileHover={{ x: 8, backgroundColor: '#F9FAFB' }}
                  className="flex items-center justify-between p-5 rounded-[2rem] transition-all cursor-pointer group border-2 border-transparent hover:border-border-light hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="flex items-center space-x-5">
                    <div className="w-14 h-14 rounded-2xl bg-white border-2 border-border-light flex items-center justify-center text-text-muted group-hover:border-cyan/40 group-hover:text-cyan transition-all shadow-sm">
                      <Zap size={22} className="group-hover:glow-cyan" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-text-main truncate w-32 poppins tracking-tight leading-tight mb-1">{item.name}</p>
                      <div className={`inline-flex px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.2em] border-2 shadow-sm ${item.color}`}>
                         {item.result}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-text-muted opacity-40 group-hover:opacity-100 transition-opacity tracking-widest">{item.time} AGO</p>
                    <ChevronRight size={16} className="text-border-light ml-auto group-hover:text-indigo group-hover:translate-x-1 transition-all mt-1" />
                  </div>
                </motion.div>
              ))}
            </div>
            
            <Button variant="ghost" className="mt-12 w-full py-5 text-[11px] font-black text-indigo bg-indigo/5 rounded-2xl hover:bg-indigo/10 transition-all uppercase tracking-[0.4em] shadow-lg shadow-indigo/5 border-2 border-indigo/10">
              EXPLORE FULL ARCHIVE
            </Button>
          </MotionCard>
        </div>
      </div>
    </SharedLayout>
  );
};
