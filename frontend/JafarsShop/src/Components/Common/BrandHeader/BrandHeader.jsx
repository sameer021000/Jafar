// BrandHeader.jsx
// Shared branding header for JafarsShop (store partner portal).
import React from 'react';
import './BrandHeader.css';

/**
 * BrandHeader displays the emblem, title, subtitle and a short description.
 * It is used on all major screens (SignUp, SignIn, ForgotPassword).
 */
export default function BrandHeader() {
  return (
    <div className="brand-header">
      <div className="brand-header__emblem" aria-hidden="true">
        {/* Crown‑jewelry SVG – identical path to JafarAdmin but recolored via CSS */}
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 48L20 20L32 44L44 20L52 48H12Z"
            className="brand-header__svg-path"
          />
          <circle cx="32" cy="52" r="4" className="brand-header__svg-path" />
        </svg>
      </div>
      <h1 className="brand-header__title">Jafar Works</h1>
      <h2 className="brand-header__subtitle">Store Partner Portal</h2>
      <p className="brand-header__description">
        Register your jewellery store and manage your Jafar presence
      </p>
    </div>
  );
}
