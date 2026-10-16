// LinkButton.jsx
// Reusable text-link-styled button for inline navigation actions.
import React from 'react';
import './LinkButton.css';

/**
 * LinkButton renders a text-styled button that looks like a hyperlink.
 * @param {object} props
 * @param {React.ReactNode} props.children - button label/content.
 * @param {function} [props.onClick] - click handler.
 */
export default function LinkButton({ children, onClick }) {
  return (
    <button type="button" className="link-button" onClick={onClick}>
      {children}
    </button>
  );
}
