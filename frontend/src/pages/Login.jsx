import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Button, Input, Card } from '../components/common/UI';
import { Stethoscope, Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const success = login(email, password);
      if (success) navigate('/dashboard');
      else setError('Invalid credentials. Access Denied.');
    } catch (err) {
      setError('System connection error. Verify clinical credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-6 py-20 relative overflow-hidden">
      {/* Background Pulse Effect */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.07, 0.03] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[600px] h-[600px] bg-primary rounded-full blur-[120px] -z-10"
      />
      
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg"
      >
        <div className="flex flex-col items-center mb-12 text-center">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: -5 }}
            className="w-16 h-16 bg-white border border-border-light rounded-3xl flex items-center justify-center text-primary shadow-xl mb-6 shadow-primary/5"
          >
            <Lock size={30} strokeWidth={2.5} />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-extrabold text-text-main poppins tracking-tight"
          >
            Workstation Access
          </motion.h2>
          <p className="text-text-muted mt-3 font-medium">Verify your clinical credentials to continue.</p>
        </div>
        
        <Card className="rounded-[3rem] p-10 md:p-16 bg-white shadow-3xl border-none relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-primary/5 -translate-y-4 translate-x-4">
             <Stethoscope size={160} />
          </div>
          
          <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-xs font-black text-danger uppercase tracking-widest text-center"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="space-y-6">
               <Input 
                 label="Medical Email" 
                 type="email" 
                 placeholder="name@clinic.com" 
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required
               />
               <Input 
                 label="System Password" 
                 type="password" 
                 placeholder="••••••••" 
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
               />
            </div>
            
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center space-x-2">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20" />
                  <span className="text-xs font-bold text-text-muted uppercase tracking-widest">Remember Me</span>
               </div>
               <Link to="/login" className="text-xs font-black text-primary uppercase tracking-widest hover:underline">Forgot Access?</Link>
            </div>
            
            <Button type="submit" className="w-full py-5 rounded-[2rem] font-black tracking-widest text-lg group shadow-2xl shadow-primary/20" disabled={isLoading}>
              <div className="flex items-center justify-center space-x-3">
                 <span>{isLoading ? 'VERIFYING IDENTITY...' : 'SECURE SIGN IN'}</span>
                 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Button>
          </form>
        </Card>
        
        <div className="mt-12 text-center space-y-8">
           <p className="text-sm font-bold text-text-muted">
             New clinical associate? <Link to="/signup" className="text-primary font-black hover:underline ml-1">Request Enrollment</Link>
           </p>
           <motion.div whileHover={{ x: -5 }} className="flex items-center justify-center">
              <Link to="/" className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted hover:text-primary transition-colors">
                 <ArrowLeft size={14} />
                 <span>Back to Research Site</span>
              </Link>
           </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
