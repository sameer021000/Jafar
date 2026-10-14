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
  validateShopName,
  validateDistrict,
  validatePincode,
  validateLandmark,
  validateStreetAddress,
  validateImages,
} from '../../Utils/Validation';
import FormTextArea from '../Common/FormTextArea/FormTextArea';
import FormSelect from '../Common/FormSelect/FormSelect';
import ImageUpload from '../Common/ImageUpload/ImageUpload';

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

  // ---- Phase‑2 state ----
  const [phase2, setPhase2] = useState({
    shopName: '',
    shopDescription: '',
    state: '',
    district: '',
    pincode: '',
    landmark: '',
    streetAddress: '',
  });

  const [phase2Errors, setPhase2Errors] = useState({
    shopName: '',
    shopDescription: '',
    state: '',
    district: '',
    pincode: '',
    landmark: '',
    streetAddress: '',
    images: '',
  });

  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitNotice, setSubmitNotice] = useState('');
  // ---- Helpers ----
  const handleChange = (field) => (e) => {
    const val = e.target.value;
    setValues((prev) => ({ ...prev, [field]: val }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  // ---- Phase‑2 helpers ----
  const handlePhase2Change = (field) => (e) => {
    const val = e.target.value;
    setPhase2((prev) => ({ ...prev, [field]: val }));
    setPhase2Errors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleBack = () => {
    setPhase(1);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const newErrors = {};
    const n = validateShopName(phase2.shopName);
    if (!n.isValid) newErrors.shopName = n.error;
    const d = validateDistrict(phase2.district);
    if (!d.isValid) newErrors.district = d.error;
    const p = validatePincode(phase2.pincode);
    if (!p.isValid) newErrors.pincode = p.error;
    const lm = validateLandmark(phase2.landmark);
    if (!lm.isValid) newErrors.landmark = lm.error;
    const sa = validateStreetAddress(phase2.streetAddress);
    if (!sa.isValid) newErrors.streetAddress = sa.error;
    if (!phase2.state) newErrors.state = 'State is required';
    const img = validateImages(images);
    if (!img.isValid) newErrors.images = img.error;
    setPhase2Errors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        setSubmitNotice('Registration details are ready. Store registration submission is not yet active — this will be enabled once the backend is live.');
        setIsSubmitting(false);
      }, 300);
    }
  };

  const indianStatesOptions = [
    { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
  ];
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

  // Render Phase 2 UI when phase === 2
  if (phase === 2) {
    return (
      <div className="signup-screen-container">
        <div className="signup-card">
          <BrandHeader />
          <div className="signup-step-indicator">Step 2 of 2</div>
          {phase2Errors.global && <ErrorAlert message={phase2Errors.global} />}
          <form className="signup-form" onSubmit={handleSignUp} noValidate>
            <FormInput
              id="shopName"
              label="Shop Name"
              value={phase2.shopName}
              onChange={handlePhase2Change('shopName')}
              required
              maxLength={35}
              error={phase2Errors.shopName}
            />
            <FormTextArea
              id="shopDescription"
              label="Shop Description"
              value={phase2.shopDescription}
              onChange={handlePhase2Change('shopDescription')}
              rows={3}
              error={phase2Errors.shopDescription}
            />
            <FormSelect
              id="state"
              label="State"
              value={phase2.state}
              onChange={handlePhase2Change('state')}
              options={indianStatesOptions}
              required
              error={phase2Errors.state}
            />
            <FormInput
              id="district"
              label="District"
              value={phase2.district}
              onChange={handlePhase2Change('district')}
              required
              error={phase2Errors.district}
            />
            <FormInput
              id="pincode"
              label="Pincode"
              type="tel"
              inputMode="numeric"
              value={phase2.pincode}
              onChange={handlePhase2Change('pincode')}
              required
              preventSpaces
              maxLength={6}
              error={phase2Errors.pincode}
            />
            <FormTextArea
              id="landmark"
              label="Landmark"
              value={phase2.landmark}
              onChange={handlePhase2Change('landmark')}
              rows={3}
              required
              error={phase2Errors.landmark}
            />
            <FormTextArea
              id="streetAddress"
              label="Street Address"
              value={phase2.streetAddress}
              onChange={handlePhase2Change('streetAddress')}
              rows={3}
              required
              error={phase2Errors.streetAddress}
            />
            <ImageUpload
              id="shopImages"
              label="Shop Images"
              initialFiles={[]}
              onChange={setImages}
              maxFiles={4}
              error={phase2Errors.images}
              required
            />
            {submitNotice && <p className="submit-notice">{submitNotice}</p>}
            <div className="phase2-actions" style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button type="button" className="secondary-button" onClick={handleBack}>← Back</button>
              <PrimaryButton type="submit" isLoading={isSubmitting} loadingLabel="Submitting...">
                Submit Registration
              </PrimaryButton>
            </div>
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
