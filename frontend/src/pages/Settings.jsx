import React from 'react';
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Bell, 
  Lock, 
  Globe, 
  LogOut,
  ChevronRight,
  Database,
  CloudLightning
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SharedLayout } from '../components/layout/Layout';
import { Card, Button } from '../components/common/UI';

export const Settings = () => {
  const { logout } = useAuth();
  
  const sections = [
    { 
      title: 'App Appearance', 
      icon: Sun, 
      items: [
        { name: 'Light Mode', desc: 'Current professional medical theme', action: 'Active' },
        { name: 'High Contrast', desc: 'Better visibility for clinic environments', action: 'Toggle' }
      ]
    },
    { 
      title: 'Clinical Notifications', 
      icon: Bell, 
      items: [
        { name: 'Analysis Alerts', desc: 'Notify when model results are ready', action: 'Enabled' },
        { name: 'Risk Flagging', desc: 'Immediate alert for chronic risk detection', action: 'Enabled' }
      ]
    },
    { 
      title: 'Data & Privacy', 
      icon: Database, 
      items: [
        { name: 'Local Cache', desc: 'Clear screening history from this device', action: 'Clear' },
        { name: 'Export Records', desc: 'Download all clinical scans as encrypted files', action: 'Export' }
      ]
    }
  ];

  return (
    <SharedLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fade">
        <div>
          <h1 className="text-3xl font-extrabold text-text-main poppins">System Settings</h1>
          <p className="text-text-muted mt-1">Configure your clinical workstation and data preferences.</p>
        </div>

        <div className="space-y-6">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <div className="flex items-center space-x-2 px-2">
                 <section.icon size={18} className="text-primary" />
                 <h3 className="text-sm font-black uppercase tracking-widest text-text-muted">{section.title}</h3>
              </div>
              <Card className="rounded-[2rem] p-4 divide-y divide-border-light bg-white border-none shadow-sm">
                 {section.items.map((item, i) => (
                   <div key={i} className="flex items-center justify-between p-4 group cursor-pointer hover:bg-gray-50/50 transition-colors first:rounded-t-2xl last:rounded-b-2xl">
                      <div>
                         <p className="text-sm font-bold text-text-main">{item.name}</p>
                         <p className="text-xs text-text-muted mt-0.5">{item.desc}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                         <span className={`text-[10px] font-black uppercase tracking-widest ${item.action === 'Active' ? 'text-primary' : 'text-text-muted'}`}>
                            {item.action === 'Toggle' ? (
                               <div className="w-8 h-4 bg-gray-200 rounded-full flex items-center px-0.5">
                                  <div className="w-3 h-3 bg-white rounded-full"></div>
                               </div>
                            ) : item.action}
                         </span>
                         <ChevronRight size={14} className="text-gray-300 group-hover:text-primary transition-colors" />
                      </div>
                   </div>
                 ))}
              </Card>
            </div>
          ))}
        </div>

        <div className="pt-8">
           <Card className="rounded-2xl bg-rose-50 border border-rose-100 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                 <div className="p-3 bg-white rounded-xl shadow-sm text-danger">
                    <LogOut size={24} />
                 </div>
                 <div>
                    <h4 className="text-lg font-bold text-danger poppins">End Session</h4>
                    <p className="text-xs text-rose-600 font-medium">Terminate current professional workstation access.</p>
                 </div>
              </div>
              <Button onClick={logout} variant="danger" className="rounded-xl px-8 shadow-lg shadow-rose-200/50">
                 Logout
              </Button>
           </Card>
        </div>
      </div>
    </SharedLayout>
  );
};
