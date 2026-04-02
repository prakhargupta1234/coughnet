import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import InputField from '../components/InputField';
import authHero from '../assets/auth-hero.png';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
    navigate('/dashboard');
  };

  return (
    <AuthCard 
      title="Welcome back" 
      subtitle="Enter your credentials to access your CoughNet dashboard."
      image={authHero}
    >
      <form noValidate onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1200">
        <InputField
          label="Email address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center group cursor-pointer">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 transition-all cursor-pointer accent-blue-600"
            />
            <label htmlFor="remember-me" className="ml-2 block cursor-pointer transition-colors" style={{ color: 'var(--text-secondary)' }}>
              Keep me signed in
            </label>
          </div>
          <a href="#" className="font-bold transition-colors hover:text-blue-500" style={{ color: 'var(--primary)' }}>
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-xl font-bold text-white shadow-xl transition-all hover:shadow-blue-500/20 hover:-translate-y-1 active:scale-95"
          style={{ 
            background: 'linear-gradient(135deg, var(--primary), #1d4ed8)',
          }}
        >
          Sign in to Dashboard
        </button>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" style={{ borderColor: 'var(--border)' }}></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 bg-white dark:bg-slate-900" style={{ color: 'var(--text-secondary)', backgroundColor: 'var(--card)' }}>
              Or continue with
            </span>
          </div>
        </div>

        <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
          New to CoughNet?{' '}
          <span
            onClick={() => navigate("/signup")}
            className="font-bold hover:underline cursor-pointer transition-colors"
            style={{ color: 'var(--primary)' }}
          >
            Create an account
          </span>
        </p>
      </form>
    </AuthCard>
  );
};

export default Login;
