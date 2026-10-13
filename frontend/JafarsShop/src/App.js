import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

import SignUpScreen from './Components/SignUpScreen/SignUpScreen';
import SignInScreen from './Components/SignInScreen/SignInScreen';
import ForgotPasswordScreen from './Components/ForgotPasswordScreen/ForgotPasswordScreen';

/**
 * Wrapper component that provides navigation callback via react-router-dom.
 */
function AppContent() {
  const navigate = useNavigate();

  const handleNavigate = (screen) => {
    const map = {
      signup: '/signup',
      signin: '/signin',
      'forgot-password': '/forgot-password',
    };
    const path = map[screen] || '/signup';
    navigate(path);
  };

  return (
    <Routes>
      <Route path="/signup" element={<SignUpScreen onNavigate={handleNavigate} />} />
      <Route path="/signin" element={<SignInScreen onNavigate={handleNavigate} />} />
      <Route path="/forgot-password" element={<ForgotPasswordScreen onNavigate={handleNavigate} />} />
      {/* Fallback redirects to signup */}
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <AppContent />
      </div>
    </Router>
  );
}

export default App;
