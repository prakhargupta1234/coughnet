import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, AlertCircle, LayoutDashboard, RefreshCw, ChevronRight } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- STRICT CRASH PREVENTION ---
  const data = location.state;

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 transition-colors duration-300"
           style={{ backgroundColor: 'var(--bg)' }}>
        <div className="w-full max-w-md rounded-3xl p-8 shadow-xl border text-center transition-colors duration-300"
             style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full" style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)', color: '#f97316' }}>
              <AlertCircle size={48} />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No result available</h1>
          <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
            Please perform an analysis to see your results.
          </p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full py-4 text-white rounded-xl font-bold shadow-lg hover:brightness-110 transition-all active:scale-95"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const resultStatus = data?.status || "Unknown";
  const confidence = data?.confidence || 0;
  const isHealthy = resultStatus === "Healthy";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-700 transition-colors duration-300"
         style={{ backgroundColor: 'var(--bg)' }}>
      
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-lg rounded-[2.5rem] shadow-2xl border overflow-hidden transform transition-all hover:shadow-3xl bg-clip-border"
           style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
        
        {/* Header */}
        <div className="p-8 text-center border-b" style={{ borderColor: 'var(--border)' }}>
          <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Analysis Result
          </h1>
          <p className="mt-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            AI-powered acoustic respiratory screening
          </p>
        </div>

        {/* Content */}
        <div className="p-8 sm:p-10 space-y-10">
          {/* Main Status Circle */}
          <div className="flex flex-col items-center">
            <div className={`relative p-2 rounded-full mb-6 ${isHealthy ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
              <div className={`p-8 rounded-full ${isHealthy ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-red-500 shadow-red-500/20'} text-white shadow-2xl`}>
                {isHealthy ? <CheckCircle2 size={64} strokeWidth={2.5} /> : <AlertCircle size={64} strokeWidth={2.5} />}
              </div>
            </div>
            
            <h2 className={`text-5xl font-black mb-2 tracking-tighter ${isHealthy ? 'text-emerald-500' : 'text-red-500'}`}>
              {resultStatus}
            </h2>
            <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${isHealthy ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'}`}>
              Outcome Detected
            </div>
          </div>

          {/* Confidence Score Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Analysis Confidence</span>
              <span className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>{confidence}%</span>
            </div>
            
            <div className="h-4 w-full rounded-full overflow-hidden p-1" style={{ backgroundColor: 'var(--bg)' }}>
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out animate-shimmer ${isHealthy ? 'bg-emerald-500' : 'bg-red-500'}`}
                style={{ width: `${confidence}%` }}
              />
            </div>
            <p className="text-[11px] text-center font-medium italic" style={{ color: 'var(--text-secondary)' }}>
              Note: This is an AI assessment. Please consult a doctor for a professional diagnosis.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <button
              onClick={() => navigate('/analyze')}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all border active:scale-95"
              style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}
            >
              <RefreshCw size={18} />
              Re-analyze
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="group flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-white shadow-xl hover:brightness-110 hover:scale-[1.02] transition-all active:scale-95"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <LayoutDashboard size={18} />
              Dashboard
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Footer Accent Line */}
        <div className={`h-2 w-full ${isHealthy ? 'bg-emerald-500' : 'bg-red-500'}`} />
      </div>
    </div>
  );
};

export default ResultPage;
