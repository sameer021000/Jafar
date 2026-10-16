import React from 'react';
import BrandHeader from '../Common/BrandHeader/BrandHeader';
import SecondaryButton from '../Common/SecondaryButton/SecondaryButton';
import './SignInScreen.css';

/**
 * Placeholder Sign In screen for JafarsShop.
 * @param {{ onNavigate: (screen: string) => void }} props
 */
export default function SignInScreen({ onNavigate }) {
  return (
    <div className="signin-screen-container">
      <div className="signin-card">
        <BrandHeader />
        <h2 className="signin-heading">Sign In to Your Store</h2>
        <p className="placeholder-message">
          The Sign In screen is coming soon. The store login experience will be available once the authentication system is set up.
        </p>
        <SecondaryButton onClick={() => onNavigate('signup')}>
          ← Back to Sign Up
        </SecondaryButton>
      </div>
    </div>
  );
}
