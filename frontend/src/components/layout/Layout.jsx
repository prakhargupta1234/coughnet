import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart2, 
  Activity, 
  History, 
  User, 
  Settings, 
  LayoutDashboard, 
  Stethoscope, 
  Menu, 
  X,
  Bell,
  Search,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const { user } = useAuth();
  
  return (
    <nav className="fixed top-0 inset-x-0 z-50 px-6 py-6 h-24 flex items-center justify-between pointer-events-none">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between bg-white/80 backdrop-blur-xl border-2 border-white rounded-[2.5rem] px-8 py-4 shadow-2xl shadow-primary/5 pointer-events-auto">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
            <Stethoscope size={24} className="glow-cyan" />
          </div>
          <span className="text-xl font-black text-text-main poppins tracking-tighter">CoughNet <span className="text-cyan glow-cyan italic">AI</span></span>
        </Link>

        <div className="hidden md:flex items-center space-x-10 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">
           <Link to="/" className="hover:text-primary transition-colors">Research</Link>
           <Link to="/predict" className="hover:text-cyan transition-colors">Neural Scan</Link>
           <Link to="/history" className="hover:text-indigo transition-colors">Global Log</Link>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <Link to="/dashboard" className="flex items-center space-x-3 bg-gray-50 px-5 py-2.5 rounded-2xl border-2 border-border-light hover:border-primary/30 transition-all shadow-sm">
               <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <User size={14} />
               </div>
               <span className="text-[10px] font-black text-text-main uppercase tracking-widest">{user.name.split(' ')[0]} Hub</span>
            </Link>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-text-main">Sign In</Link>
              <Link to="/signup">
                <button className="bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-8 py-3 rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all">
                   Join Network
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export const Sidebar = () => {
  const location = useLocation();
  const { logout, user } = useAuth();

  const menuItems = [
    { name: 'Terminal', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Neural Scan', path: '/predict', icon: Zap },
    { name: 'Audit Log', path: '/history', icon: History },
    { name: 'Practitioner', path: '/profile', icon: User },
    // { name: 'Configuration', path: '/settings', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-72 bg-white border-r-2 border-border-light flex flex-col h-screen fixed top-0 left-0 z-40 p-8 shadow-2xl shadow-primary/5">
      <div className="flex items-center space-x-4 mb-16 px-2">
        <div className="p-3 bg-primary/5 rounded-[1.25rem] border border-primary/10 shadow-sm transition-all group-hover:scale-110">
          <Stethoscope size={28} className="text-primary glow-cyan" />
        </div>
        <span className="text-2xl font-black text-text-main poppins tracking-tighter">CoughNet <span className="text-cyan glow-cyan italic">AI</span></span>
      </div>

      <nav className="flex-1 space-y-4">
        {menuItems.map((item) => {
          const Active = isActive(item.path);
          return (
            <Link key={item.path} to={item.path}>
              <motion.div 
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-5 px-6 py-5 rounded-[1.75rem] transition-all relative ${
                  Active 
                  ? 'bg-primary/5 text-primary border-2 border-primary/10 shadow-xl shadow-primary/5' 
                  : 'text-text-muted hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                {Active && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-primary rounded-r-full shadow-cyan shadow-[0_0_12px_rgba(59,130,246,0.6)]"
                  />
                )}
                <item.icon size={22} className={Active ? 'glow-cyan' : ''} />
                <span className="text-xs font-black uppercase tracking-[0.2em]">{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-8">
        <div className="p-6 bg-gray-50/50 rounded-[2rem] border-2 border-border-light relative overflow-hidden group">
           <div className="flex items-center space-x-4 relative z-10">
              <div className="w-12 h-12 rounded-[1.25rem] bg-white border-2 border-border-light flex items-center justify-center text-text-muted transition-all group-hover:border-cyan/40">
                 <User size={20} />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase text-text-muted tracking-widest">{user?.name ? user.name.split(' ')[0] : 'System'} Auth</p>
                 <motion.button 
                   onClick={logout}
                   className="text-[9px] font-black text-danger uppercase tracking-[0.3em] hover:opacity-80 transition-opacity"
                 >
                    DE-AUTHORIZE
                 </motion.button>
              </div>
           </div>
           <div className="absolute top-0 right-0 p-4 text-primary opacity-[0.03] -translate-y-2 translate-x-2">
              <Zap size={64} />
           </div>
        </div>

        <p className="text-[8px] font-black text-center text-text-muted uppercase tracking-[0.5em] opacity-30 mt-8">Secure Terminal v3.5</p>
      </div>
    </div>
  );
};

export const SharedLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex font-inter antialiased">
      <Sidebar />
      <main className="flex-1 ml-72">
        <div className="p-12 relative">
           {/* Global Futuristic Floating Accent */}
           <motion.div 
             animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
             transition={{ duration: 10, repeat: Infinity }}
             className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan rounded-full blur-[120px] -z-10 pointer-events-none"
           />
           {children}
        </div>
      </main>
    </div>
  );
};
