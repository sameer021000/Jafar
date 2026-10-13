// EyeToggleIcon.jsx
// Pure SVG component for showing eye (show) / eye-slash (hide) icons.
// Uses JafarsShop design tokens for colors.
import React from 'react';
import './EyeToggleIcon.css';

/**
 * EyeToggleIcon renders either an open eye or a slashed eye based on `visible`.
 * @param {object} props
 * @param {boolean} props.visible - true shows open eye, false shows slashed eye.
 * @param {string} [props.className] - optional additional class names.
 */
export default function EyeToggleIcon({ visible, className = '' }) {
  return (
    <svg
      className={`eye-toggle-icon ${className}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {visible ? (
        // Open eye path (matches JafarAdmin's style)
        <path
          d="M12 4.5c-5 0-9.27 3.11-11 7.5 1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 13c-3.04 0-5.5-2.46-5.5-5.5S8.96 6.5 12 6.5s5.5 2.46 5.5 5.5-2.46 5.5-5.5 5.5z"
          fill="var(--color-gold-primary)"
        />
      ) : (
        // Eye slash path (matches JafarAdmin's style)
        <path
          d="M12 6.5c-2.76 0-5 2.24-5 5 0 .79.18 1.53.5 2.2l-2.78 2.78c-1.31-1.24-2.34-2.78-3-4.48 1.73-4.39 6-7.5 11-7.5 1.43 0 2.79.24 4.05.68l-1.6 1.6c-.77-.23-1.58-.34-2.45-.34zm9.19 7.19c-.66 1.7-1.69 3.24-3 4.48l-2.78-2.78c.32-.67.5-1.41.5-2.2 0-2.76-2.24-5-5-5-.79 0-1.53.18-2.2.5l-1.6-1.6c1.26-.44 2.62-.68 4.05-.68 5 0 9.27 3.11 11 7.5z"
          fill="var(--color-gold-primary)"
        />
      )}
    </svg>
  );
}
