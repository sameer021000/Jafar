import React from 'react';
import './PrimaryButton.css';

/**
 * PrimaryButton component
 * Luxury champagne-gold button with built-in loading spinner and double-click prevention.
 * 
 * @param {object} props
 * @param {string} props.children - Button label/content
 * @param {boolean} [props.isLoading] - Loading spinner state
 * @param {boolean} [props.disabled] - Disabled state
 * @param {function} [props.onClick] - Click handler
 * @param {string} [props.type] - Button type ('submit' | 'button' | 'reset')
 */
function PrimaryButton({
  children,
  isLoading = false,
  disabled = false,
  onClick,
  type = 'submit',
}) {
  return (
    <button
      type={type}
      className="primary-btn"
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading && <span className="primary-btn__spinner" aria-hidden="true"></span>}
      <span>{isLoading ? 'Authenticating...' : children}</span>
    </button>
  );
}

export default PrimaryButton;
