// SignUpShowcase.jsx
// Dedicated desktop-only panel shown on the left side of the sign-up screen.
import React from 'react';
import './SignUpShowcase.css';

export default function SignUpShowcase({ phase = 1 }) {
  return (
    <aside className="signup-showcase" aria-hidden="true">
      <div className="signup-showcase__emblem">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 21 8.5 18 19 6 19 3 8.5 12 2" />
          <line x1="12" y1="2" x2="12" y2="19" />
          <line x1="3" y1="8.5" x2="21" y2="8.5" />
          <line x1="7.5" y1="19" x2="12" y2="8.5" />
          <line x1="16.5" y1="19" x2="12" y2="8.5" />
        </svg>
      </div>
      <h2 className="signup-showcase__title">Jafar Works</h2>
      <p className="signup-showcase__subtitle">Store Partner Portal</p>
      <p className="signup-showcase__copy">
        Register your jewellery store and manage your presence on the Jafar platform.
      </p>
      <ul className="signup-showcase__list">
        <li>Create your merchant profile</li>
        <li>Add store location and contact details</li>
        <li>Upload up to 4 store images</li>
        <li>Submit for Jafar admin review</li>
      </ul>
      <div className="signup-showcase__step">
        Step {phase} of 2
      </div>
    </aside>
  );
}