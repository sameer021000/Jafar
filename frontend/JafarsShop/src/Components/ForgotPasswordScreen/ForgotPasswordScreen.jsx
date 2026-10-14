import React from 'react';
import BrandHeader from '../Common/BrandHeader/BrandHeader';
import './ForgotPasswordScreen.css';

/**
 * Placeholder Forgot Password screen for JafarsShop.
 * @param {{ onNavigate: (screen: string) => void }} props
 */
export default function ForgotPasswordScreen({ onNavigate }) {
  return (
    <div className="signup-screen-container">
      <div className="signup-card">
        <BrandHeader />
        <h2 className="forgot-heading">Forgot Your Password?</h2>
        <p className="placeholder-message">
          Password recovery is coming soon. This feature will be available once the recovery system is implemented.
        </p>
        <button type="button" className="secondary-button" onClick={() => onNavigate('signup')}>
          ← Back to Sign Up
        </button>
      </div>
    </div>
  );
}
