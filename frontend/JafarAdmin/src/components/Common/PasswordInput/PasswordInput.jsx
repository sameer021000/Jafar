import React, { useState } from 'react';
import EyeToggleIcon from '../EyeToggleIcon/EyeToggleIcon';
import './PasswordInput.css';

/**
 * PasswordInput component
 * Encapsulates password masking, character preservation, and the accessible show/hide eye toggle.
 * 
 * @param {object} props
 * @param {string} props.id - HTML id
 * @param {string} props.label - Display label
 * @param {string} props.value - Password value
 * @param {function} props.onChange - Change handler
 * @param {function} [props.onBlur] - Blur handler
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.error] - Field error message
 * @param {boolean} [props.required] - Required indicator
 * @param {boolean} [props.disabled] - Disabled state
 * @param {string} [props.autoComplete] - Autocomplete attribute
 */
function PasswordInput({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  disabled = false,
  autoComplete = 'current-password',
}) {
  const [showPassword, setShowPassword] = useState(false);
  const errorId = error ? `${id}-error` : undefined;

  const handleToggle = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="password-input-group">
      <label htmlFor={id} className="password-input-group__label">
        <span>
          {label}
          {required && <span className="password-input-group__required-star" aria-hidden="true">*</span>}
        </span>
      </label>

      <div className="password-input-group__input-wrapper">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          name={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={`password-input-group__input ${error ? 'password-input-group__input--error' : ''}`}
        />

        <button
          type="button"
          className="password-input-group__toggle-btn"
          onClick={handleToggle}
          disabled={disabled}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          tabIndex={0}
        >
          <EyeToggleIcon isVisible={showPassword} />
        </button>
      </div>

      {error && (
        <div id={errorId} className="password-input-group__error-msg" role="alert">
          <svg
            className="password-input-group__error-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default PasswordInput;
