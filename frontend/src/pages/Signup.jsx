import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import InputField from '../components/InputField';
import authHero from '../assets/auth-hero.png';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup submitted:', formData);
    navigate('/dashboard');
  };

  return (
    <AuthCard 
      title="Create account" 
      subtitle="Join CoughNet and start screening with AI sound analytics."
      image={authHero}
    >
      <form noValidate onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1200 overflow-y-auto max-h-[70vh] pr-2">
        <InputField
          label="Full Name"
          type="text"
          name="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <InputField
          label="Email Address"
          type="email"
          name="email"
          placeholder="john@example.com"
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
        <InputField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <div className="flex items-start py-2">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-medium" style={{ color: 'var(--text-secondary)' }}>
              I agree to the{' '}
              <a href="#" className="font-bold hover:underline" style={{ color: 'var(--primary)' }}>
                Terms
              </a>{' '}
              and{' '}
              <a href="#" className="font-bold hover:underline" style={{ color: 'var(--primary)' }}>
                Privacy
              </a>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-xl font-bold text-white shadow-xl transition-all hover:shadow-blue-500/20 hover:-translate-y-1 active:scale-95"
          style={{ 
            background: 'linear-gradient(135deg, var(--primary), #1d4ed8)',
          }}
        >
          Create Free Account
        </button>

        <p className="text-center text-sm pb-4" style={{ color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <span
            onClick={() => navigate("/login")}
            className="font-bold hover:underline cursor-pointer transition-colors"
            style={{ color: 'var(--primary)' }}
          >
            Sign in here
          </span>
        </p>
      </form>
    </AuthCard>
  );
};

export default Signup;
