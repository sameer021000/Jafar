import React, { useState } from 'react';
import EyeToggleIcon from '../EyeToggleIcon/EyeToggleIcon';
import './PasswordInput.css';

function PasswordInput({
  id,
  label,
  value,
  onChange,
  onBlur,
  onKeyDown,
  placeholder,
  error,
  required = false,
  disabled = false,
  autoComplete = 'new-password',
  preventSpaces = false,
  defaultShow = true,
}) {
  const [showPassword, setShowPassword] = useState(defaultShow);
  const errorId = error ? `${id}-error` : undefined;

  const handleToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    if (preventSpaces && (e.key === ' ' || e.code === 'Space')) {
      e.preventDefault();
    }
    if (typeof onKeyDown === 'function') {
      onKeyDown(e);
    }
  };

  const handlePaste = (e) => {
    if (preventSpaces) {
      const pasteText = e.clipboardData.getData('text');
      if (/\s/.test(pasteText)) {
        e.preventDefault();
        const sanitized = pasteText.replace(/\s+/g, '');
        if (typeof onChange === 'function') {
          onChange({
            target: {
              name: id,
              value: (value || '') + sanitized,
            },
          });
        }
      }
    }
  };

  return (
    <div className={`password-input-group ${error ? 'has-error' : ''}`}>
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
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
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
          {error}
        </div>
      )}
    </div>
  );
}

export default PasswordInput;