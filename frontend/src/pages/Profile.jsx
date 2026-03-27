import React from 'react';
import { 
  User as UserIcon, 
  Mail, 
  MapPin, 
  Briefcase, 
  Shield, 
  Edit3,
  Award,
  Activity,
  History
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SharedLayout } from '../components/layout/Layout';
import { Card, Button } from '../components/common/UI';

export const Profile = () => {
  const { user } = useAuth();
  
  const stats = [
    { label: 'Scans Performed', value: '142', icon: Activity, color: 'text-blue-600 bg-blue-50' },
    { label: 'Accuracy Score', value: '98.2%', icon: Award, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'History Range', value: '18m', icon: History, color: 'text-amber-600 bg-amber-50' }
  ];

  return (
    <SharedLayout>
      <div className="max-w-5xl mx-auto space-y-8 animate-fade">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-8">
              <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-5xl font-black shadow-2xl shadow-primary/20 border-4 border-white">
                 {user?.name[0]}
              </div>
              <div className="text-center md:text-left space-y-2 pb-2">
                 <h1 className="text-3xl font-black text-text-main poppins leading-tight">{user?.name}</h1>
                 <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <span className="inline-flex items-center space-x-1.5 text-sm font-semibold text-text-muted">
                       <Briefcase size={16} />
                       <span>Pulmonologist</span>
                    </span>
                    <span className="inline-flex items-center space-x-1.5 text-sm font-semibold text-text-muted">
                       <MapPin size={16} />
                       <span>Central Hospital</span>
                    </span>
                 </div>
              </div>
           </div>
           <Button className="flex items-center space-x-2 rounded-2xl shadow-lg shadow-primary/20 px-8 py-3.5 mb-2">
              <Edit3 size={18} />
              <span>Edit Profile</span>
           </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
           {stats.map((s, i) => (
             <Card key={i} className="flex flex-col items-center justify-center p-8 text-center bg-white/50 border-none shadow-sm rounded-3xl">
                <div className={`p-4 rounded-2xl ${s.color} mb-4`}>
                   <s.icon size={28} />
                </div>
                <h3 className="text-3xl font-black text-text-main poppins mb-1">{s.value}</h3>
                <p className="text-xs font-bold text-text-muted uppercase tracking-wider">{s.label}</p>
             </Card>
           ))}
        </div>

        <div className="grid md:grid-cols-5 gap-8">
           <Card className="md:col-span-3 rounded-3xl p-8 bg-white border-none shadow-sm">
              <h3 className="text-xl font-bold text-text-main mb-6 poppins">Professional Credentials</h3>
              <div className="space-y-6">
                 <div className="flex items-start space-x-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
                    <div className="p-2 bg-white rounded-xl shadow-sm">
                       <Shield size={20} className="text-primary" />
                    </div>
                    <div>
                       <h4 className="text-sm font-bold text-text-main uppercase tracking-wide">ID Verification</h4>
                       <p className="text-xs text-text-muted mt-1 leading-relaxed">Medical Registration ID: #IQL-2026-MEDX-9942. Verified as active practitioner.</p>
                       <div className="mt-2 text-[10px] font-black text-emerald-500 bg-emerald-50 inline-block px-2 py-0.5 rounded uppercase tracking-widest">Verified</div>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-1">
                       <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Full Name</p>
                       <p className="text-sm font-bold text-text-main">{user?.name}</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Email Address</p>
                       <p className="text-sm font-bold text-text-main">{user?.email}</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Specialization</p>
                       <p className="text-sm font-bold text-text-main">Respiratory Medicine</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Years of Practice</p>
                       <p className="text-sm font-bold text-text-main">8 Years</p>
                    </div>
                 </div>
              </div>
           </Card>

           <Card className="md:col-span-2 rounded-3xl p-8 bg-primary/5 border border-primary/10 shadow-none">
              <h3 className="text-xl font-bold text-primary mb-6 poppins">Security Status</h3>
              <div className="space-y-6">
                 <div className="bg-white p-5 rounded-2xl shadow-sm border border-primary/10">
                    <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Two-Factor Auth</p>
                    <div className="flex items-center justify-between">
                       <span className="text-xs font-semibold text-emerald-600">Active - Secured</span>
                       <div className="w-10 h-5 bg-emerald-500 rounded-full flex items-center justify-end px-1 cursor-pointer">
                          <div className="w-3.5 h-3.5 bg-white rounded-full"></div>
                       </div>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <p className="text-xs font-medium text-text-muted leading-relaxed">Ensure your medical credentials are up to date for continued access to the clinical screening tools.</p>
                    <Button variant="ghost" className="bg-white text-primary text-xs font-bold px-0 hover:bg-transparent">Download Certificate</Button>
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </SharedLayout>
  );
};
