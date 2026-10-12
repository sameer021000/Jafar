import React from 'react';
import './FormInput.css';

/**
 * FormInput component
 * Labeled text input with validation error states and accessibility support.
 * 
 * @param {object} props
 * @param {string} props.id - HTML id for input/label association
 * @param {string} props.label - Display label
 * @param {string} props.type - Input type (text, email, etc.)
 * @param {string} props.value - Input value
 * @param {function} props.onChange - Change handler
 * @param {function} [props.onBlur] - Blur handler
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.error] - Field validation error message
 * @param {boolean} [props.required] - If the field is required
 * @param {boolean} [props.disabled] - Disabled state
 * @param {string} [props.autoComplete] - Autocomplete attribute
 */
function FormInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  disabled = false,
  autoComplete,
}) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="form-input-group">
      <label htmlFor={id} className="form-input-group__label">
        <span>
          {label}
          {required && <span className="form-input-group__required-star" aria-hidden="true">*</span>}
        </span>
      </label>

      <div className="form-input-group__input-wrapper">
        <input
          id={id}
          type={type}
          name={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={`form-input-group__input ${error ? 'form-input-group__input--error' : ''}`}
        />
      </div>

      {error && (
        <div id={errorId} className="form-input-group__error-msg" role="alert">
          <svg
            className="form-input-group__error-icon"
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

export default FormInput;
