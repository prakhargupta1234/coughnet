import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import InputField from '../components/InputField';
import ThemeToggle from '../components/ThemeToggle';

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
    <AuthCard title="Welcome back" subtitle="Log in to access your CoughNet dashboard">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      <form noValidate onSubmit={handleSubmit} className="space-y-6">
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
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 transition-colors"
              style={{ accentColor: 'var(--primary)' }}
            />
            <label htmlFor="remember-me" className="ml-2 block" style={{ color: 'var(--text-secondary)' }}>
              Remember me
            </label>
          </div>
          <a href="#" className="font-semibold transition-colors hover:underline" style={{ color: 'var(--primary)' }}>
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 active:scale-95"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          Sign in
        </button>

        <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
          Don't have an account?{' '}
          <span
            onClick={() => navigate("/signup")}
            className="font-bold hover:underline cursor-pointer"
            style={{ color: 'var(--primary)' }}
          >
            Create one for free
          </span>
        </p>

      </form>
    </AuthCard>
  );
};

export default Login;
