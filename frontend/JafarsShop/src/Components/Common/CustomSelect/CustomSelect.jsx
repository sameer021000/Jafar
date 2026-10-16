// CustomSelect.jsx
// Themeable dropdown (replaces native select) matching JafarsShop/JafarAdmin styling.
import React, { useState, useRef, useEffect } from 'react';
import './CustomSelect.css';

export default function CustomSelect({
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
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const handleOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const selectedLabel =
    options.find((opt) => String(opt.value) === String(value))?.label || '';

  const handleToggle = () => {
    if (!disabled) setOpen((prev) => !prev);
  };

  const handleSelect = (optionValue) => {
    if (disabled) return;
    setOpen(false);
    onChange?.({ target: { value: optionValue } });
  };

  const handleKeyDown = (event) => {
    if (disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setOpen((prev) => !prev);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div
      className={`custom-select ${error ? 'has-error' : ''} ${open ? 'is-open' : ''}`}
      ref={rootRef}
    >
      {label && (
        <label htmlFor={id} className="custom-select__label">
          {label}
          {required && <span className="required-star">*</span>}
        </label>
      )}
      <button
        id={id}
        type="button"
        className="custom-select__trigger"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
      >
        <span className={selectedLabel ? 'custom-select__value' : 'custom-select__placeholder'}>
          {selectedLabel || placeholder}
        </span>
        <span className="custom-select__chevron" aria-hidden="true">
          {open ? '▲' : '▼'}
        </span>
      </button>

      {open && (
        <ul className="custom-select__menu" role="listbox" aria-labelledby={id}>
          {options.map((opt) => {
            const isSelected = String(opt.value) === String(value);
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                className={`custom-select__option ${isSelected ? 'custom-select__option--selected' : ''}`}
                onClick={() => handleSelect(opt.value)}
              >
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}

      {error && (
        <p className="custom-select__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}