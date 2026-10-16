/* src/Utils/Validation.js */

/**
 * Helper to trim and check emptiness.
 */
const isEmpty = (value) => !value || String(value).trim() === '';

/**
 * Generic regex validator that returns { isValid, error }.
 */
const testRegex = (value, regex, errorMsg) => {
  if (isEmpty(value)) return { isValid: false, error: errorMsg };
  return regex.test(value)
    ? { isValid: true, error: null }
    : { isValid: false, error: errorMsg };
};

// 1. First name – required, letters only, single word, no spaces.
export const validateFirstName = (v) =>
  testRegex(v, /^[A-Za-z]+$/, 'First name must contain only letters and no spaces');

// 2. Middle name – optional, if present letters only, single word.
export const validateMiddleName = (v) => {
  if (isEmpty(v)) return { isValid: true, error: null };
  return testRegex(v, /^[A-Za-z]+$/, 'Middle name must contain only letters and no spaces');
};

// 3. Last name – same as first.
export const validateLastName = (v) =>
  testRegex(v, /^[A-Za-z]+$/, 'Last name must contain only letters and no spaces');

// 4. Phone – required, exactly 10 digits.
export const validatePhone = (v) =>
  testRegex(v, /^\d{10}$/, 'Phone number must be exactly 10 digits');

// 5. Email – basic email pattern.
export const validateEmail = (v) =>
  testRegex(v, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address');

// 6. Shop ID – min 5 chars, at least one letter and one digit, alphanumeric only.
export const validateShopId = (v) => {
  if (isEmpty(v) || v.length < 5)
    return { isValid: false, error: 'Shop ID must be at least 5 characters' };
  if (!/[A-Za-z]/.test(v) || !/\d/.test(v))
    return { isValid: false, error: 'Shop ID must contain at least one letter and one digit' };
  if (/[^A-Za-z0-9]/.test(v))
    return { isValid: false, error: 'Shop ID may contain only letters and digits' };
  return { isValid: true, error: null };
};

// 7. Password rules exposed for live UI feedback (Phase 2).
export const getPasswordChecks = (v) => {
  const value = v == null ? '' : String(v);
  return [
    { id: 'length', label: 'Password must be 7-20 characters long', passed: value.length >= 7 && value.length <= 20 },
    { id: 'uppercase', label: 'Password must include an uppercase letter', passed: /[A-Z]/.test(value) },
    { id: 'lowercase', label: 'Password must include a lowercase letter', passed: /[a-z]/.test(value) },
    { id: 'digit', label: 'Password must include a digit', passed: /\d/.test(value) },
    { id: 'special', label: 'Password must include a special character', passed: /[!@#$%^&*(),.?":{}|<>]/.test(value) },
    { id: 'noSpaces', label: 'Password must not contain spaces', passed: value.length > 0 && !/\s/.test(value) },
  ];
};

// 7. Password – 7‑20 chars, at least one upper, lower, digit, special, no spaces.
export const validatePassword = (v) => {
  const value = v == null ? '' : String(v);
  if (isEmpty(value)) return { isValid: false, error: 'Password is required' };
  const failing = getPasswordChecks(value).find((check) => !check.passed);
  return failing
    ? { isValid: false, error: failing.label }
    : { isValid: true, error: null };
};

// 8. Confirm password – must match password.
export const validateConfirmPassword = (confirm, password) => {
  if (isEmpty(confirm)) return { isValid: false, error: 'Confirm password is required' };
  return confirm === password
    ? { isValid: true, error: null }
    : { isValid: false, error: 'Passwords do not match' };
};

// 9. Shop name – required, trimmed, max 35 chars.
export const validateShopName = (v) => {
  if (isEmpty(v)) return { isValid: false, error: 'Shop name is required' };
  const trimmed = v.trim();
  if (trimmed.length > 35)
    return { isValid: false, error: 'Shop name must be 35 characters or fewer' };
  return { isValid: true, error: null };
};

// 10. Shop description – optional, allowed chars, max length not defined (allow any).
export const validateShopDescription = (v) => {
  if (isEmpty(v)) return { isValid: true, error: null };
  const allowed = /^[A-Za-z0-9 .,'"]+$/;
  return allowed.test(v)
    ? { isValid: true, error: null }
    : { isValid: false, error: 'Description contains invalid characters' };
};

// 11. State – required non‑empty string.
export const validateState = (v) =>
  isEmpty(v) ? { isValid: false, error: 'State is required' } : { isValid: true, error: null };

// 12. District – required, letters only, up to 5 words, spaces allowed between words but not leading/trailing, no punctuation.
export const validateDistrict = (v) => {
  if (isEmpty(v)) return { isValid: false, error: 'District is required' };
  const trimmed = v.trim();
  const words = trimmed.split(/\s+/);
  if (words.length > 5)
    return { isValid: false, error: 'District may contain up to 5 words' };
  const lettersOnly = /^[A-Za-z]+$/;
  for (const w of words) {
    if (!lettersOnly.test(w))
      return { isValid: false, error: 'District must contain only letters' };
  }
  return { isValid: true, error: null };
};

// 13. Pincode – exactly 6 digits.
export const validatePincode = (v) =>
  testRegex(v, /^\d{6}$/, 'Pincode must be exactly 6 digits');

// 14. Landmark – required non‑empty after trim.
export const validateLandmark = (v) =>
  isEmpty(v) ? { isValid: false, error: 'Landmark is required' } : { isValid: true, error: null };

// 15. Street address – required non‑empty after trim.
export const validateStreetAddress = (v) =>
  isEmpty(v) ? { isValid: false, error: 'Street address is required' } : { isValid: true, error: null };

// 16. Images – array must contain at least one element.
export const validateImages = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0)
    return { isValid: false, error: 'At least one image must be uploaded' };
  return { isValid: true, error: null };
};

const Validation = {
  validateFirstName,
  validateMiddleName,
  validateLastName,
  validatePhone,
  validateEmail,
  validateShopId,
  validatePassword,
  getPasswordChecks,
  validateConfirmPassword,
  validateShopName,
  validateShopDescription,
  validateState,
  validateDistrict,
  validatePincode,
  validateLandmark,
  validateStreetAddress,
  validateImages,
};

export default Validation;
