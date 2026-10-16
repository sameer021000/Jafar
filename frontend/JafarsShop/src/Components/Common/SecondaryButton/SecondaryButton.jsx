// SecondaryButton.jsx
// Reusable outlined button with gold border, used for back navigation and secondary actions.
import React from 'react';
import './SecondaryButton.css';

/**
 * SecondaryButton renders an outlined gold-bordered button.
 * @param {object} props
 * @param {React.ReactNode} props.children - button label/content.
 * @param {function} [props.onClick] - click handler.
 * @param {string} [props.type='button'] - button type attribute.
 * @param {boolean} [props.disabled] - disable button.
 */
export default function SecondaryButton({
  children,
  onClick,
  type = 'button',
  disabled = false,
}) {
  return (
    <button
      className="secondary-button"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
