// SignUpScreen.jsx
// Phase 1 – Personal Information & Credentials for JafarsShop sign‑up flow.
import React, { useState } from 'react';
import BrandHeader from '../Common/BrandHeader/BrandHeader';
import PrimaryButton from '../Common/PrimaryButton/PrimaryButton';
import FormInput from '../Common/FormInput/FormInput';
import PhoneInput from '../Common/PhoneInput/PhoneInput';
import PasswordInput from '../Common/PasswordInput/PasswordInput';
import ErrorAlert from '../Common/ErrorAlert/ErrorAlert';
import './SignUpScreen.css';
import {
  validateFirstName,
  validateMiddleName,
  validateLastName,
  validatePhone,
  validateEmail,
  validateShopId,
  validatePassword,
  validateConfirmPassword,
} from '../../Utils/Validation';

/**
 * SignUpScreen renders the first half of the two‑phase registration form.
 * @param {{ onNavigate: (screen: string) => void }} props
 */
export default function SignUpScreen({ onNavigate }) {
  // ---- Phase control (only Phase 1 UI is rendered here) ----
  const [phase, setPhase] = useState(1);

  // ---- Form state ----
  const [values, setValues] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    email: '',
    shopId: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    email: '',
    shopId: '',
    password: '',
    confirmPassword: '',
  });

  // ---- Helpers ----
  const handleChange = (field) => (e) => {
    const val = e.target.value;
    setValues((prev) => ({ ...prev, [field]: val }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const runValidation = () => {
    const newErrors = {};
    const f = validateFirstName(values.firstName);
    if (!f.isValid) newErrors.firstName = f.error;
    const m = validateMiddleName(values.middleName);
    if (!m.isValid) newErrors.middleName = m.error;
    const l = validateLastName(values.lastName);
    if (!l.isValid) newErrors.lastName = l.error;
    const p = validatePhone(values.phone);
    if (!p.isValid) newErrors.phone = p.error;
    const e = validateEmail(values.email);
    if (!e.isValid) newErrors.email = e.error;
    const s = validateShopId(values.shopId);
    if (!s.isValid) newErrors.shopId = s.error;
    const pw = validatePassword(values.password);
    if (!pw.isValid) newErrors.password = pw.error;
    const cp = validateConfirmPassword(values.confirmPassword, values.password);
    if (!cp.isValid) newErrors.confirmPassword = cp.error;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (runValidation()) {
      // In a full implementation we would advance to Phase 2.
      // For now we keep Phase 1 visible – the next phase will be added later.
      setPhase(2);
    }
  };

  // Render Phase 1 only (Phase 2 UI will be added in a later phase).
  if (phase !== 1) {
    // Simple placeholder – real Phase 2 will replace this.
    return (
      <div className="signup-screen-container">
        <div className="signup-card">
          <BrandHeader />
          <p>Phase 2 UI will be implemented in a later step.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-screen-container">
      <div className="signup-card">
        <BrandHeader />
        <div className="signup-step-indicator">Step 1 of 2</div>
        {/* Global error banner placeholder – can be used for server‑side errors */}
        {errors.global && <ErrorAlert message={errors.global} />}
        <form className="signup-form" onSubmit={handleNext} noValidate>
          <FormInput
            id="firstName"
            label="First Name"
            value={values.firstName}
            onChange={handleChange('firstName')}
            required
            preventSpaces
            error={errors.firstName}
          />
          <FormInput
            id="middleName"
            label="Middle Name"
            value={values.middleName}
            onChange={handleChange('middleName')}
            preventSpaces
            error={errors.middleName}
          />
          <FormInput
            id="lastName"
            label="Last Name"
            value={values.lastName}
            onChange={handleChange('lastName')}
            required
            preventSpaces
            error={errors.lastName}
          />
          <PhoneInput
            id="phone"
            label="Phone Number"
            value={values.phone}
            onChange={handleChange('phone')}
            required
            error={errors.phone}
          />
          <FormInput
            id="email"
            label="Mail ID"
            type="email"
            value={values.email}
            onChange={handleChange('email')}
            required
            error={errors.email}
          />
          <FormInput
            id="shopId"
            label="Shop ID"
            value={values.shopId}
            onChange={handleChange('shopId')}
            required
            preventSpaces
            error={errors.shopId}
            placeholder="Minimum 5 chars, letters & digits"
          />
          <PasswordInput
            id="password"
            label="Create Password"
            value={values.password}
            onChange={handleChange('password')}
            required
            preventSpaces
            autoComplete="new-password"
            error={errors.password}
          />
          <PasswordInput
            id="confirmPassword"
            label="Confirm Password"
            value={values.confirmPassword}
            onChange={handleChange('confirmPassword')}
            required
            preventSpaces
            autoComplete="new-password"
            error={errors.confirmPassword}
          />
          <PrimaryButton type="submit" isLoading={false} loadingLabel="Processing...">
            Next →
          </PrimaryButton>
        </form>
        <p className="signin-link">
          Already have an account?{' '}
          <button type="button" className="link-button" onClick={() => onNavigate('signin')}>
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
