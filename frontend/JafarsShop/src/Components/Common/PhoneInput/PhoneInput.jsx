// PhoneInput.jsx
// Input component for Indian phone numbers with a fixed +91 prefix.
import React from 'react';
import './PhoneInput.css';
import FormInput from '../FormInput/FormInput';

/**
 * PhoneInput displays a non‑editable "+91" badge followed by a numeric input.
 * @param {object} props – passed through to FormInput (id, label, value, onChange, error, required, etc.)
 */
export default function PhoneInput({ prefix = '+91', maxLength = 10, ...rest }) {
  const handleKeyDown = (e) => {
    // Allow only digits, Backspace, Arrow keys, Delete, Tab, etc.
    if (!/^[0-9]$/.test(e.key) &&
        e.key !== 'Backspace' &&
        e.key !== 'Delete' &&
        e.key !== 'ArrowLeft' &&
        e.key !== 'ArrowRight' &&
        e.key !== 'Tab') {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    const txt = e.clipboardData.getData('text').replace(/\D+/g, '').slice(0, maxLength);
    e.preventDefault();
    const syntheticEvent = { target: { value: txt } };
    if (rest.onChange) rest.onChange(syntheticEvent);
  };

  return (
    <div className="phone-input">
      <FormInput
        {...rest}
        type="tel"
        inputMode="numeric"
        maxLength={maxLength}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        prefix={<span className="phone-input__prefix">{prefix}</span>}
        placeholder={rest.placeholder || 'Enter phone number'}
      />
    </div>
  );
}
