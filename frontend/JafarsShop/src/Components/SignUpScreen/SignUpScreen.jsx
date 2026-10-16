// SignUpScreen.jsx
// Two-phase registration flow for JafarsShop (Split-screen luxury layout).
import React, { useState, useRef, useEffect } from 'react';
import BrandHeader from '../Common/BrandHeader/BrandHeader';
import PrimaryButton from '../Common/PrimaryButton/PrimaryButton';
import FormInput from '../Common/FormInput/FormInput';
import PhoneInput from '../Common/PhoneInput/PhoneInput';
import PasswordInput from '../Common/PasswordInput/PasswordInput';
import ErrorAlert from '../Common/ErrorAlert/ErrorAlert';
import SecondaryButton from '../Common/SecondaryButton/SecondaryButton';
import LinkButton from '../Common/LinkButton/LinkButton';
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
import ImageUpload from '../Common/ImageUpload/ImageUpload';
import CustomSelect from '../Common/CustomSelect/CustomSelect';
import SignUpShowcase from '../SignUpShowcase/SignUpShowcase';
import PasswordRules from '../Common/PasswordRules/PasswordRules';
import ProgressSteps from '../Common/ProgressSteps/ProgressSteps';

/**
 * SignUpScreen renders the store sign-up flow in two phases.
 * @param {{ onNavigate: (screen: string) => void }} props
 */
export default function SignUpScreen({ onNavigate }) {
  // ---- Phase control ----
  const [phase, setPhase] = useState(1);
  const prevPhaseRef = useRef(1);

  // Focus management + step announcements when advancing/backtracking.
  useEffect(() => {
    if (prevPhaseRef.current === phase) return;
    const targetSelector = phase === 1 ? '#firstName' : '#shopName';
    // Defer to after render so the new step's first field exists.
    requestAnimationFrame(() => {
      const field = document.querySelector(targetSelector);
      if (field && typeof field.focus === 'function') {
        field.focus();
      }
    });
    prevPhaseRef.current = phase;
  }, [phase]);

  // ---- Phase 1 state ----
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

  // ---- Phase 2 state ----
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

  const handlePhase2Change = (field) => (e) => {
    const val = e.target.value;
    setPhase2((prev) => ({ ...prev, [field]: val }));
    setPhase2Errors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleBack = () => {
    setPhase(1);
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
      setPhase(2);
    }
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
        setSubmitNotice(
          'Registration details are ready. Store registration submission is not yet active — this will be enabled once the backend is live.'
        );
        setIsSubmitting(false);
      }, 300);
    }
  };

  const indianStatesOptions = [
    { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
    { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
    { value: 'Assam', label: 'Assam' },
    { value: 'Bihar', label: 'Bihar' },
    { value: 'Chhattisgarh', label: 'Chhattisgarh' },
    { value: 'Goa', label: 'Goa' },
    { value: 'Gujarat', label: 'Gujarat' },
    { value: 'Haryana', label: 'Haryana' },
    { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
    { value: 'Jharkhand', label: 'Jharkhand' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Kerala', label: 'Kerala' },
    { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Manipur', label: 'Manipur' },
    { value: 'Meghalaya', label: 'Meghalaya' },
    { value: 'Mizoram', label: 'Mizoram' },
    { value: 'Nagaland', label: 'Nagaland' },
    { value: 'Odisha', label: 'Odisha' },
    { value: 'Punjab', label: 'Punjab' },
    { value: 'Rajasthan', label: 'Rajasthan' },
    { value: 'Sikkim', label: 'Sikkim' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
    { value: 'Telangana', label: 'Telangana' },
    { value: 'Tripura', label: 'Tripura' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    { value: 'Uttarakhand', label: 'Uttarakhand' },
    { value: 'West Bengal', label: 'West Bengal' },
    { value: 'Andaman and Nicobar Islands', label: 'Andaman and Nicobar Islands' },
    { value: 'Chandigarh', label: 'Chandigarh' },
    { value: 'Dadra and Nagar Haveli and Daman and Diu', label: 'Dadra and Nagar Haveli and Daman and Diu' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Jammu and Kashmir', label: 'Jammu and Kashmir' },
    { value: 'Ladakh', label: 'Ladakh' },
    { value: 'Lakshadweep', label: 'Lakshadweep' },
    { value: 'Puducherry', label: 'Puducherry' },
  ];

  const progressSteps = [
    { label: 'Your Details' },
    { label: 'Store Details' },
  ];

  return (
    <div className="signup-screen-container">
      <div className="signup-layout">
        {/* Dedicated desktop showcase panel */}
        <SignUpShowcase phase={phase} />

        {/* Form panel */}
        <section className="signup-form-panel">
          <div className="signup-card">
            <span className="sr-only" aria-live="polite" aria-atomic="true">
              Step {phase} of 2: {phase === 1 ? 'Your details' : 'Store details'}
            </span>
            <BrandHeader />
            <ProgressSteps steps={progressSteps} current={phase - 1} />

            <div className="signup-step" key={phase}>
              {phase === 1 ? (
                <form className="signup-form" onSubmit={handleNext} noValidate>
                  {errors.global && <ErrorAlert message={errors.global} />}

                  <FormInput
                    id="firstName"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange('firstName')}
                    required
                    preventSpaces
                    alphaOnly
                    error={errors.firstName}
                    placeholder="Enter first name (letters only)"
                  />
                  <FormInput
                    id="middleName"
                    label="Middle Name"
                    value={values.middleName}
                    onChange={handleChange('middleName')}
                    preventSpaces
                    alphaOnly
                    error={errors.middleName}
                    placeholder="Optional middle name"
                  />
                  <FormInput
                    id="lastName"
                    label="Last Name"
                    value={values.lastName}
                    onChange={handleChange('lastName')}
                    required
                    preventSpaces
                    alphaOnly
                    error={errors.lastName}
                    placeholder="Enter last name"
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
                    placeholder="name@example.com"
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
                    placeholder="Create a strong password"
                  />
                  <PasswordRules value={values.password} id="password-rules" />
                  <PasswordInput
                    id="confirmPassword"
                    label="Confirm Password"
                    value={values.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    required
                    preventSpaces
                    autoComplete="new-password"
                    error={errors.confirmPassword}
                    placeholder="Re-enter password"
                  />
                  <PrimaryButton type="submit" isLoading={false} loadingLabel="Processing...">
                    Next →
                  </PrimaryButton>
                </form>
              ) : (
                <form className="signup-form" onSubmit={handleSignUp} noValidate>
                  {phase2Errors.global && <ErrorAlert message={phase2Errors.global} />}

                  <FormInput
                    id="shopName"
                    label="Shop Name"
                    value={phase2.shopName}
                    onChange={handlePhase2Change('shopName')}
                    required
                    maxLength={35}
                    error={phase2Errors.shopName}
                    placeholder="Your store name"
                  />
                  <FormTextArea
                    id="shopDescription"
                    label="Shop Description"
                    value={phase2.shopDescription}
                    onChange={handlePhase2Change('shopDescription')}
                    rows={3}
                    error={phase2Errors.shopDescription}
                    placeholder="Brief description (optional)"
                  />
                  <CustomSelect
                    id="state"
                    label="State"
                    value={phase2.state}
                    onChange={handlePhase2Change('state')}
                    options={indianStatesOptions}
                    required
                    error={phase2Errors.state}
                    placeholder="Select a state"
                  />
                  <FormInput
                    id="district"
                    label="District"
                    value={phase2.district}
                    onChange={handlePhase2Change('district')}
                    required
                    error={phase2Errors.district}
                    placeholder="e.g. East Godavari"
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
                    numericOnly
                    maxLength={6}
                    error={phase2Errors.pincode}
                    placeholder="6-digit pincode"
                  />
                  <FormTextArea
                    id="landmark"
                    label="Landmark"
                    value={phase2.landmark}
                    onChange={handlePhase2Change('landmark')}
                    rows={3}
                    required
                    error={phase2Errors.landmark}
                    placeholder="Nearby landmark"
                  />
                  <FormTextArea
                    id="streetAddress"
                    label="Street Address"
                    value={phase2.streetAddress}
                    onChange={handlePhase2Change('streetAddress')}
                    rows={3}
                    required
                    error={phase2Errors.streetAddress}
                    placeholder="House no., street, area"
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
                  <div className="phase2-actions">
                    <SecondaryButton onClick={handleBack}>
                      ← Back
                    </SecondaryButton>
                    <PrimaryButton type="submit" isLoading={isSubmitting} loadingLabel="Submitting...">
                      Submit Registration
                    </PrimaryButton>
                  </div>
                </form>
              )}

              <p className="signin-link">
                Already have an account?{' '}
                <LinkButton onClick={() => onNavigate('signin')}>
                  Sign In
                </LinkButton>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}