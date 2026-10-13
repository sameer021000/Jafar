// FormTextArea.jsx
// Multi‑line text area component with label, error handling, and optional maxLength.
import React from 'react';
import './FormTextArea.css';

/**
 * FormTextArea renders a labeled textarea with validation feedback.
 * @param {object} props
 * @param {string} props.id - unique id for textarea.
 * @param {string} props.label - field label.
 * @param {string} props.value - controlled value.
 * @param {function} props.onChange - change handler.
 * @param {function} [props.onBlur] - blur handler.
 * @param {string} [props.placeholder] - placeholder text.
 * @param {string} [props.error] - error message.
 * @param {boolean} [props.required] - show required asterisk.
 * @param {boolean} [props.disabled] - disable textarea.
 * @param {number} [props.maxLength] - max characters.
 * @param {number} [props.rows=3] - initial rows.
 */
export default function FormTextArea({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  disabled = false,
  maxLength,
  rows = 3,
}) {
  return (
    <div className={`form-textarea ${error ? 'has-error' : ''}`}>
      <label htmlFor={id} className="form-textarea__label">
        {label}
        {required && <span className="required-star">*</span>}
      </label>
      <textarea
        id={id}
        className="form-textarea__field"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p className="form-textarea__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
