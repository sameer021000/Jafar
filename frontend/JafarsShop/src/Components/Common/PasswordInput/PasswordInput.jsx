// PasswordInput.jsx
// Input field for passwords with show/hide toggle using EyeToggleIcon.
import React, { useState } from 'react';
import './PasswordInput.css';
import EyeToggleIcon from '../EyeToggleIcon/EyeToggleIcon';
import FormInput from '../FormInput/FormInput';

/**
 * PasswordInput wraps FormInput and adds eye toggle for visibility.
 * @param {object} props passed to FormInput (id, label, value, onChange, etc.)
 * @param {boolean} [props.preventSpaces] - block spaces on keydown/paste.
 */
export default function PasswordInput({ preventSpaces = false, ...rest }) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="password-input">
      <FormInput
        type={showPassword ? 'text' : 'password'}
        preventSpaces={preventSpaces}
        {...rest}
      />
      <button
        type="button"
        className="password-input__toggle"
        onClick={toggleVisibility}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        <EyeToggleIcon visible={showPassword} />
      </button>
    </div>
  );
}
