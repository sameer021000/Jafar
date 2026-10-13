import React, { useState } from 'react';
import BrandHeader from '../Common/BrandHeader/BrandHeader';
import FormInput from '../Common/FormInput/FormInput';
import PasswordInput from '../Common/PasswordInput/PasswordInput';
import PrimaryButton from '../Common/PrimaryButton/PrimaryButton';
import ErrorAlert from '../Common/ErrorAlert/ErrorAlert';
import { validateAdminId, validatePassword } from '../../Utils/Validation';
import { login } from '../../Services/AdminAuthService';
import { saveToken } from '../../Utils/TokenManager';
import './LoginScreen.css';

/**
 * LoginScreen component
 * Orchestrates login form inputs, live validation, error banners, and authentication handling.
 * 
 * @param {object} props
 * @param {function} props.onLoginSuccess - Callback invoked when authentication succeeds
 */
function LoginScreen({ onLoginSuccess }) {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    adminId: '',
    password: '',
    global: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live input handlers that clear individual field errors as the user edits
  const handleAdminIdChange = (e) => {
    const value = e.target.value;
    setAdminId(value);
    if (errors.adminId || errors.global) {
      setErrors((prev) => ({ ...prev, adminId: '', global: '' }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (errors.password || errors.global) {
      setErrors((prev) => ({ ...prev, password: '', global: '' }));
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submission while already processing
    if (isSubmitting) return;

    // Run strict field validations
    const adminIdValidation = validateAdminId(adminId);
    const passwordValidation = validatePassword(password);

    if (!adminIdValidation.isValid || !passwordValidation.isValid) {
      setErrors({
        adminId: adminIdValidation.error || '',
        password: passwordValidation.error || '',
        global: '',
      });
      return;
    }

    // Clear previous errors & activate loading spinner state
    setErrors({ adminId: '', password: '', global: '' });
    setIsSubmitting(true);

    try {
      const data = await login(adminId, password);

      if (data && data.Token) {
        saveToken(data.Token);
        if (typeof onLoginSuccess === 'function') {
          onLoginSuccess({ AdminID: data.AdminID });
        }
      }
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        global: err.message || 'Invalid Admin ID or password. Please verify your credentials.',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-screen-container">
      <div className="login-card">
        {/* Brand Luxury Monogram & Title */}
        <BrandHeader />

        {/* Top-level Error Alert */}
        <ErrorAlert message={errors.global} />

        {/* Credentials Form */}
        <form className="login-card__form" onSubmit={handleSubmit} noValidate>
          <FormInput
            id="adminId"
            label="Admin Identifier / Username"
            type="text"
            value={adminId}
            onChange={handleAdminIdChange}
            placeholder="Enter your admin ID (e.g., admin)"
            error={errors.adminId}
            required
            disabled={isSubmitting}
            autoComplete="username"
            preventSpaces={true}
          />

          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            error={errors.password}
            required
            disabled={isSubmitting}
            autoComplete="current-password"
            preventSpaces={true}
          />

          <div className="login-card__actions">
            <PrimaryButton type="submit" isLoading={isSubmitting}>
              Authenticate &amp; Enter Portal
            </PrimaryButton>
          </div>
        </form>

        {/* Demo Helper Card */}
        <aside className="login-card__demo-helper" aria-label="Demo Credentials Helper">
          <div className="login-card__demo-helper-title">
            <svg
              className="login-card__demo-helper-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>Demo Mode Credentials</span>
          </div>
          <p>
            For demonstration and review, use Admin ID <span className="login-card__demo-helper-code">admin</span> and Password <span className="login-card__demo-helper-code">admin</span>.
          </p>
        </aside>
      </div>
    </main>
  );
}

export default LoginScreen;

