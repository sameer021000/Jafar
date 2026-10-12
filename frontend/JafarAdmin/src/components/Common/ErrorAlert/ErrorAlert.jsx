import React from 'react';
import './ErrorAlert.css';

/**
 * ErrorAlert component
 * Renders an accessible notification alert for top-level submission errors.
 * 
 * @param {{ message: string }} props
 */
function ErrorAlert({ message }) {
  if (!message) return null;

  return (
    <div className="error-alert" role="alert" aria-live="assertive">
      <svg
        className="error-alert__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span className="error-alert__message">{message}</span>
    </div>
  );
}

export default ErrorAlert;
