// ErrorAlert.jsx
// Accessible error alert component with icon.
import React from 'react';
import './ErrorAlert.css';

/**
 * ErrorAlert displays an error message with an icon.
 * @param {object} props
 * @param {string} props.message - error text to display
 */
export default function ErrorAlert({ message }) {
  if (!message) return null;
  return (
    <div className="error-alert" role="alert" aria-live="assertive">
      <svg
        className="error-alert__icon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
          fill="var(--color-error)"
        />
      </svg>
      <span className="error-alert__message">{message}</span>
    </div>
  );
}
