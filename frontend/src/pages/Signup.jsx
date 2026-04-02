import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import InputField from '../components/InputField';
import ThemeToggle from '../components/ThemeToggle';

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
    // Validation removed as requested
    console.log('Signup submitted:', formData);
    navigate('/dashboard');
  };

  return (
    <AuthCard title="Join CoughNet" subtitle="Create your medical AI account to start today">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 active:scale-95"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            Create Account
          </button>
        </div>

        <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" className="font-bold hover:underline" style={{ color: 'var(--primary)' }}>
            Sign in here
          </Link>
        </p>
      </form>
    </AuthCard>
  );
};

export default Signup;
