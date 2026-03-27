import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  History as HistoryIcon, 
  MoreVertical,
  ChevronRight,
  FileText,
  Activity,
  Zap
} from 'lucide-react';
import { SharedLayout } from '../components/layout/Layout';
import { Card, Button } from '../components/common/UI';

const MotionCard = motion(Card);

export const History = () => {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('coughnet_history') || '[]');
    setHistory(storedHistory);
  }, []);

  const getResultColor = (result) => {
    if (result === 'Abnormal' || result === 'Critical') return 'text-danger bg-rose-50 border-danger/10 shadow-danger/5';
    if (result === 'Infection' || result === 'Amber') return 'text-warning bg-amber-50 border-warning/10 shadow-warning/5';
    return 'text-success bg-emerald-50 border-success/10 shadow-success/5';
  };

  const filteredHistory = history.filter(item => 
    item.file.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.result.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SharedLayout>
      <div className="space-y-12 animate-fade pb-24 relative">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b-2 border-border-light pb-10"
        >
          <div className="space-y-4">
             <div className="flex items-center space-x-3 text-[10px] font-black text-indigo uppercase tracking-[0.5em] mb-4 opacity-80">
                <span>RECORDS</span>
                <ChevronRight size={12} className="text-cyan animate-pulse" />
                <span className="text-cyan glow-cyan">CLINICAL AUDIT LOG</span>
             </div>
             <h1 className="text-5xl font-black text-text-main poppins tracking-tighter leading-none">Diagnostic <span className="text-primary italic">Registry</span></h1>
             <p className="text-xl text-text-muted font-bold tracking-tight opacity-70">Secured clinical archives and neural scanning history.</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="indigo" size="lg" className="flex items-center space-x-3 shadow-xl rounded-[1.5rem] px-8 py-5 group">
              <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
              <span className="italic font-black">EXPORT AUDIT</span>
            </Button>
          </div>
        </motion.div>

        <MotionCard 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="rounded-[3.5rem] p-0 overflow-hidden bg-white shadow-2xl border-none"
        >
          <div className="p-10 border-b-2 border-border-light flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-gray-50/10">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-cyan glow-cyan" size={24} strokeWidth={2.5} />
              <input 
                type="text"
                placeholder="Search history by clinical ID or outcome..."
                className="w-full pl-16 pr-8 py-5 bg-white border-2 border-border-light rounded-[2rem] focus:outline-none focus:border-cyan/40 focus:ring-8 focus:ring-cyan/5 transition-all text-sm font-bold text-text-main placeholder:text-text-muted/40 shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-6">
               <motion.button 
                 whileHover={{ scale: 1.05 }}
                 className="flex items-center space-x-3 px-8 py-4 bg-white border-2 border-border-light text-text-muted font-black text-[10px] tracking-widest uppercase rounded-2xl shadow-sm hover:border-indigo/30 hover:text-indigo-600 transition-all"
               >
                  <Filter size={18} className="text-indigo" />
                  <span>FILTER RECAP</span>
               </motion.button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#F9FAFB]/80">
                <tr>
                  <th className="px-10 py-6 text-[10px] font-black text-text-muted uppercase tracking-[0.4em]">Signal Timestamp</th>
                  <th className="px-10 py-6 text-[10px] font-black text-text-muted uppercase tracking-[0.4em]">Clinical Sample ID</th>
                  <th className="px-10 py-6 text-[10px] font-black text-text-muted uppercase tracking-[0.4em]">Diagnostic Mapping</th>
                  <th className="px-10 py-6 text-[10px] font-black text-text-muted uppercase tracking-[0.4em]">Assurance Score</th>
                  <th className="px-10 py-6 text-[10px] font-black text-text-muted uppercase tracking-[0.4em] text-right">Integrity</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-border-light/40">
                <AnimatePresence>
                  {filteredHistory.length > 0 ? filteredHistory.map((item, i) => (
                    <motion.tr 
                      key={item.id} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ delay: i * 0.08 + 0.5 }}
                      className="hover:bg-primary/[0.03] transition-colors group cursor-pointer relative"
                    >
                      <td className="px-10 py-8 relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-primary rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity shadow-cyan" />
                        <p className="text-sm font-black text-text-main poppins tracking-tight uppercase leading-none mb-1">{item.date}</p>
                        <p className="text-[9px] font-black text-text-muted tracking-[0.2em] opacity-40 uppercase">UTC SYNC VERIFIED</p>
                      </td>
                      <td className="px-10 py-8">
                         <div className="flex items-center space-x-5">
                            <div className="w-14 h-14 bg-white border-2 border-border-light rounded-2xl flex items-center justify-center text-text-muted group-hover:bg-cyan group-hover:text-white group-hover:border-cyan transition-all shadow-sm">
                               <Zap size={24} className="group-hover:glow-cyan" />
                            </div>
                            <span className="text-sm font-black text-text-main poppins tracking-tight truncate max-w-[180px]">{item.file}</span>
                         </div>
                      </td>
                      <td className="px-10 py-8">
                         <motion.div 
                           whileHover={{ scale: 1.08 }}
                           className={`inline-flex px-5 py-2 rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] border-2 shadow-sm italic ${getResultColor(item.result)}`}
                         >
                            {item.result}
                         </motion.div>
                      </td>
                      <td className="px-10 py-8">
                         <div className="space-y-2">
                           <div className="flex items-center justify-between text-[10px] font-black text-text-muted uppercase tracking-widest px-1">
                              <span>Confidence</span>
                              <span className="text-indigo">96.4%</span>
                           </div>
                           <div className="w-32 h-2.5 bg-gray-100 rounded-full overflow-hidden border border-border-light">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: '96.4%' }}
                                transition={{ duration: 1.2, delay: 1 }}
                                className="h-full bg-gradient-to-r from-indigo to-cyan shadow-cyan"
                              />
                           </div>
                         </div>
                      </td>
                      <td className="px-10 py-8 text-right">
                         <div className="flex items-center justify-end space-x-4 opacity-0 group-hover:opacity-100 transition-all">
                            <button className="p-4 bg-white text-text-muted hover:text-indigo border-2 border-border-light hover:border-indigo/40 rounded-2xl shadow-sm transition-all">
                               <Download size={20} />
                            </button>
                            <button className="p-4 bg-white text-text-muted hover:text-danger border-2 border-border-light hover:border-danger/40 rounded-2xl shadow-sm transition-all">
                               <Trash2 size={20} />
                            </button>
                         </div>
                      </td>
                    </motion.tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="px-10 py-32 text-center">
                         <div className="flex flex-col items-center justify-center">
                            <motion.div 
                              animate={{ y: [0, -15, 0], opacity: [0.2, 0.4, 0.2] }}
                              transition={{ duration: 4, repeat: Infinity }}
                              className="w-32 h-32 bg-gray-50 border-4 border-dashed border-border-light rounded-[3rem] flex items-center justify-center text-gray-200 mb-8"
                            >
                               <HistoryIcon size={64} strokeWidth={1} />
                            </motion.div>
                            <h4 className="text-3xl font-black text-text-main poppins tracking-tighter uppercase mb-4">Registry Exhausted</h4>
                            <p className="text-lg text-text-muted font-bold tracking-tight max-w-sm mx-auto opacity-70">No archival signals detected. Deploy clinical samples to neural network to populate registry.</p>
                            <Link to="/predict" className="mt-12">
                               <Button variant="indigo" size="lg" className="rounded-2xl px-12 italic">DEPLOY ANALYZER</Button>
                            </Link>
                         </div>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          
          <div className="px-10 py-8 border-t-2 border-border-light flex flex-col md:flex-row items-center justify-between gap-6 bg-gray-50/20">
            <p className="text-[11px] font-black text-text-muted uppercase tracking-[0.5em] opacity-60 italic">CoughNet Registry v3.5 • Secured Clinical Archiving Protocol</p>
            <div className="flex items-center space-x-4">
               <motion.button whileHover={{ x: -4, backgroundColor: '#FFFFFF' }} className="p-4 bg-gray-50 text-text-muted hover:text-primary rounded-2xl border border-border-light transition-all shadow-sm">
                  <ChevronRight size={20} className="rotate-180" />
               </motion.button>
               <div className="flex space-x-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo text-white flex items-center justify-center text-[11px] font-black shadow-lg shadow-indigo/20 italic">01</div>
               </div>
               <motion.button whileHover={{ x: 4, backgroundColor: '#FFFFFF' }} className="p-4 bg-gray-50 text-text-muted hover:text-primary rounded-2xl border border-border-light transition-all shadow-sm">
                  <ChevronRight size={20} />
               </motion.button>
            </div>
          </div>
        </MotionCard>
      </div>
    </SharedLayout>
  );
};
