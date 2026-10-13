// FormSelect.jsx
// Styled select dropdown component consistent with JafarsShop design system.
import React from 'react';
import './FormSelect.css';

/**
 * FormSelect renders a label and a <select> element with custom styling.
 * @param {object} props
 * @param {string} props.id - unique id for the select element.
 * @param {string} props.label - field label.
 * @param {string|number} props.value - controlled value.
 * @param {function} props.onChange - change handler.
 * @param {Array<{value:string|number, label:string}>} props.options - dropdown options.
 * @param {string} [props.placeholder] - placeholder option (non selectable).
 * @param {string} [props.error] - validation error message.
 * @param {boolean} [props.required] - show required asterisk.
 * @param {boolean} [props.disabled] - disable the control.
 */
export default function FormSelect({
  id,
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  error,
  required = false,
  disabled = false,
}) {
  return (
    <div className={`form-select ${error ? 'has-error' : ''}`}> 
      <label htmlFor={id} className="form-select__label">
        {label}
        {required && <span className="required-star">*</span>}
      </label>
      <select
        id={id}
        className="form-select__field"
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        disabled={disabled}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="form-select__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
