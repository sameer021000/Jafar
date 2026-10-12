import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen/LoginScreen';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  const handleLoginSuccess = (adminData) => {
    setCurrentAdmin(adminData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setCurrentAdmin(null);
    setIsAuthenticated(false);
  };

  return (
    <div className="app-container">
      {!isAuthenticated ? (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Welcome, {currentAdmin?.name || 'Administrator'}</h2>
          <p>Admin Dashboard is scheduled for the next phase.</p>
          <button
            onClick={handleLogout}
            style={{
              marginTop: '1rem',
              padding: '0.6rem 1.2rem',
              backgroundColor: '#C5A059',
              color: '#FFFFFF',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
