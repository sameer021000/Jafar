// FormInput.jsx
// Reusable labeled input component with built‑in validation helpers.
import React from 'react';
import './FormInput.css';

/**
 * FormInput renders a label, input field, and optional error message.
 * @param {object} props
 * @param {string} props.id - unique input id (used for label `htmlFor`).
 * @param {string} props.label - field label text.
 * @param {string} [props.type='text'] - HTML input type.
 * @param {string} props.value - controlled value.
 * @param {function} props.onChange - change handler (event).
 * @param {function} [props.onBlur] - blur handler.
 * @param {string} [props.placeholder] - placeholder text.
 * @param {string} [props.error] - error message to display.
 * @param {boolean} [props.required] - show required asterisk.
 * @param {boolean} [props.disabled] - disable input.
 * @param {string} [props.autoComplete] - autocomplete attribute.
 * @param {boolean} [props.preventSpaces] - block space characters on keydown.
 * @param {number} [props.maxLength] - maxLength attribute.
 * @param {string} [props.inputMode] - inputMode attribute.
 * @param {ReactNode} [props.prefix] - optional element displayed before the input (e.g., country code).
 */
export default function FormInput({
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
  preventSpaces = false,
  maxLength,
  inputMode,
  prefix,
}) {
  const handleKeyDown = (e) => {
    if (preventSpaces && e.key === ' ') {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    if (preventSpaces) {
      const txt = e.clipboardData.getData('text').replace(/\s+/g, '');
      e.preventDefault();
  
      e.target.value = txt.replace(/\s+/g, '');
      onChange(e);
    }
  };

  return (
    <div className={`form-input ${error ? 'has-error' : ''}`}>
      <label htmlFor={id} className="form-input__label">
        {label}
        {required && <span className="required-star">*</span>}
      </label>
      <div className="form-input__wrapper">
        {prefix && <span className="form-input__prefix">{prefix}</span>}
        <input
          id={id}
          className="form-input__field"
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          maxLength={maxLength}
          inputMode={inputMode}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
        />
      </div>
      {error && (
        <p className="form-input__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
