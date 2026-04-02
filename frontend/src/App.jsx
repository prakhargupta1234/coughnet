import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AnalyzeCough from './pages/AnalyzeCough';
import ResultPage from './pages/ResultPage';
import SplashScreen from './components/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Set default theme to light on first load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analyze" element={<AnalyzeCough />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
