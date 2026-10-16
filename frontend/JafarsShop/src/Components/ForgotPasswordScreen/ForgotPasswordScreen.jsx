import React from 'react';
import BrandHeader from '../Common/BrandHeader/BrandHeader';
import SecondaryButton from '../Common/SecondaryButton/SecondaryButton';
import './ForgotPasswordScreen.css';

/**
 * Placeholder Forgot Password screen for JafarsShop.
 * @param {{ onNavigate: (screen: string) => void }} props
 */
export default function ForgotPasswordScreen({ onNavigate }) {
  return (
    <div className="forgot-screen-container">
      <div className="forgot-card">
        <BrandHeader />
        <h2 className="forgot-heading">Forgot Your Password?</h2>
        <p className="placeholder-message">
          Password recovery is coming soon. This feature will be available once the recovery system is implemented.
        </p>
        <SecondaryButton onClick={() => onNavigate('signup')}>
          ← Back to Sign Up
        </SecondaryButton>
      </div>
    </div>
  );
}
