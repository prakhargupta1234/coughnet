import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';
import { Button, Card } from '../components/common/UI';

export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-6">
      <div className="max-w-md w-full text-center space-y-8 animate-fade">
        <div className="relative">
          <div className="text-9xl font-black text-primary/5 poppins select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-6 bg-white rounded-3xl shadow-xl border border-border-light text-primary">
               <AlertCircle size={64} strokeWidth={1.5} />
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold text-text-main poppins">Page Not Found</h1>
          <p className="text-text-muted leading-relaxed">
            The clinical module you are looking for does not exist or has been moved to a different department.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="primary" className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8">
              <Home size={18} />
              <span>Back to Home</span>
            </Button>
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-text-main bg-white border border-border-light rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center space-x-2"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};
