// PrimaryButton.jsx
// Reusable gold‑gradient button component with loading state.
import React from 'react';
import './PrimaryButton.css';

/**
 * PrimaryButton renders a styled button.
 * @param {object} props
 * @param {React.ReactNode} props.children - button label/content
 * @param {boolean} [props.isLoading] - show loading spinner
 * @param {boolean} [props.disabled] - disable button
 * @param {function} [props.onClick] - click handler
 * @param {string} [props.type='button'] - button type attribute
 * @param {string} [props.loadingLabel='Processing...'] - aria‑label while loading
 */
export default function PrimaryButton({
  children,
  isLoading = false,
  disabled = false,
  onClick,
  type = 'button',
  loadingLabel = 'Processing...',
}) {
  const isDisabled = disabled || isLoading;
  return (
    <button
      className={`primary-button ${isLoading ? 'loading' : ''}`}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={isLoading}
      aria-label={isLoading ? loadingLabel : undefined}
    >
      {isLoading && <span className="spinner" aria-hidden="true" />}
      <span className="label" aria-hidden={isLoading}>
        {children}
      </span>
    </button>
  );
}
