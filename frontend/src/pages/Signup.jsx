import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Button, Input, Card } from '../components/common/UI';
import { Stethoscope, User, Mail, Shield, ArrowLeft, ArrowRight } from 'lucide-react';

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    try {
      const success = signup({ name: formData.name, email: formData.email });
      if (success) navigate('/dashboard');
    } catch (err) {
      setError('System unavailable. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-6 py-20 relative overflow-hidden">
      {/* Background Decorative Rings */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[800px] h-[800px] border-2 border-primary/5 rounded-full pointer-events-none -z-10"
      />
      
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-xl"
      >
        <div className="flex flex-col items-center mb-12 text-center">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="w-16 h-16 bg-primary rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-primary/30 mb-6"
          >
            <Stethoscope size={32} />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-extrabold text-text-main poppins tracking-tight"
          >
            Join the Network
          </motion.h2>
          <p className="text-text-muted mt-3 font-medium">Create a clinical account for CoughNet AI.</p>
        </div>
        
        <Card className="rounded-[3rem] p-10 md:p-16 bg-white shadow-3xl border-none relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-primary/5 -translate-y-4 translate-x-4">
             <Stethoscope size={160} />
          </div>
          
          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
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
            
            <div className="grid md:grid-cols-2 gap-6">
               <Input 
                 label="Full Professional Name" 
                 placeholder="Dr. Julian Doe"
                 value={formData.name}
                 onChange={(e) => setFormData({...formData, name: e.target.value})}
                 required
               />
               <Input 
                 label="Medical Email" 
                 type="email" 
                 placeholder="name@clinic.com" 
                 value={formData.email}
                 onChange={(e) => setFormData({...formData, email: e.target.value})}
                 required
               />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Input 
                label="System Password" 
                type="password" 
                placeholder="••••••••" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
              <Input 
                label="Verify Password" 
                type="password" 
                placeholder="••••••••" 
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
            </div>
            
            <div className="flex items-start space-x-3 text-xs text-text-muted mb-8 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
              <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20" required />
              <span className="leading-relaxed">I certify that I am a healthcare practitioner and agree to the <b>Clinical Use Agreement</b> and <b>Data Ethics Policy</b>.</span>
            </div>
            
            <Button type="submit" className="w-full py-5 rounded-[2rem] font-black tracking-widest text-lg group shadow-2xl shadow-primary/20" disabled={isLoading}>
              <div className="flex items-center justify-center space-x-3">
                 <span>{isLoading ? 'ENROLLING PRACTITIONER...' : 'ACTIVATE ACCOUNT'}</span>
                 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Button>
          </form>
        </Card>
        
        <div className="mt-12 text-center">
           <p className="text-sm font-bold text-text-muted">
             Existing medical professional? <Link to="/login" className="text-primary font-black hover:underline ml-1">Sign In to Dashboard</Link>
           </p>
           <motion.div whileHover={{ x: -5 }} className="mt-8 flex items-center justify-center">
              <Link to="/" className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted hover:text-primary transition-colors">
                 <ArrowLeft size={14} />
                 <span>Back to Research</span>
              </Link>
           </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
