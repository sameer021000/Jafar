import React from 'react';
import './BrandHeader.css';

/**
 * BrandHeader component
 * Displays the Jafar luxury monogram, jewelry emblem, and administrative portal typography.
 */
function BrandHeader() {
  return (
    <header className="brand-header">
      <div className="brand-header__emblem-container" aria-hidden="true">
        <svg
          className="brand-header__emblem-svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Stylized jewelry jewel & crown motif */}
          <polygon points="12 2 21 8.5 18 19 6 19 3 8.5 12 2" />
          <line x1="12" y1="2" x2="12" y2="19" />
          <line x1="3" y1="8.5" x2="21" y2="8.5" />
          <line x1="7.5" y1="19" x2="12" y2="8.5" />
          <line x1="16.5" y1="19" x2="12" y2="8.5" />
        </svg>
      </div>

      <h1 className="brand-header__title">Jafar Works</h1>

      <div className="brand-header__tagline-wrapper">
        <span className="brand-header__accent-line" aria-hidden="true"></span>
        <span className="brand-header__subtitle">Administrative Portal</span>
        <span className="brand-header__accent-line" aria-hidden="true"></span>
      </div>

      <p className="brand-header__description">
        Review &amp; authenticate imitation-gold merchant registration requests
      </p>
    </header>
  );
}

export default BrandHeader;
