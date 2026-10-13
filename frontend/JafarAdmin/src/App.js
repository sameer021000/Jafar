import React, { useState, useEffect } from 'react';
import LoginScreen from './Components/LoginScreen/LoginScreen';
import { verifySession, logout } from './Services/AdminAuthService';
import { getToken, clearToken } from './Utils/TokenManager';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Session rehydration on application load / refresh
  useEffect(() => {
    const rehydrateSession = async () => {
      const token = getToken();
      if (!token) {
        setIsInitializing(false);
        return;
      }

      try {
        const adminData = await verifySession(token);
        if (adminData && adminData.AdminID) {
          setCurrentAdmin({ AdminID: adminData.AdminID });
          setIsAuthenticated(true);
        } else {
          clearToken();
        }
      } catch (err) {
        // If token verification fails (e.g. expired or invalid), clear stored token
        clearToken();
      } finally {
        setIsInitializing(false);
      }
    };

    rehydrateSession();
  }, []);

  const handleLoginSuccess = (adminData) => {
    setCurrentAdmin(adminData);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    const token = getToken();
    try {
      if (token) {
        await logout(token);
      }
    } catch (err) {
      // Log or silently ignore error on logout endpoint to allow client logout
      console.warn('Backend logout notification error:', err.message);
    } finally {
      clearToken();
      setCurrentAdmin(null);
      setIsAuthenticated(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p style={{ color: 'var(--color-primary-gold, #C5A059)', fontSize: '1rem', letterSpacing: '0.05em' }}>
          Loading Jafar Portal...
        </p>
      </div>
    );
  }

  return (
    <div className="app-container">
      {!isAuthenticated ? (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Welcome, {currentAdmin?.AdminID || 'Administrator'}</h2>
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