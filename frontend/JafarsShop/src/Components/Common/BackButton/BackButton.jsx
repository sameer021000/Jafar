// BackButton.jsx
// Premium minimal back button — unique arrow-pill design.
import React from 'react';
import './BackButton.css';

/**
 * @param {{ onClick: () => void, children?: React.ReactNode }} props
 */
export default function BackButton({ onClick, children = 'Back' }) {
  return (
    <button type="button" className="back-button" onClick={onClick}>
      <span className="back-button__track" aria-hidden="true">
        <svg
          className="back-button__arrow-svg"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="17" y1="10" x2="3" y2="10" />
          <polyline points="9 16 3 10 9 4" />
        </svg>
      </span>
      <span className="back-button__label">{children}</span>
    </button>
  );
}
