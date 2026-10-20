/* src/Utils/Validation.js */

/**
 * Helper to trim and check emptiness.
 */
const isEmpty = (value) => !value || String(value).trim() === '';



// 1. First name – required. (alphaOnly input prop blocks non-letters at keystroke level)
export const validateFirstName = (v) =>
  isEmpty(v)
    ? { isValid: false, error: 'First name is required' }
    : { isValid: true, error: null };

// 2. Middle name – optional.
export const validateMiddleName = (v) => ({ isValid: true, error: null });

// 3. Last name – required.
export const validateLastName = (v) =>
  isEmpty(v)
    ? { isValid: false, error: 'Last name is required' }
    : { isValid: true, error: null };

// 4. Phone – required, exactly 10 digits.
export const validatePhone = (v) => {
  if (isEmpty(v)) return { isValid: false, error: 'Phone number is required' };
  return /^\d{10}$/.test(v)
    ? { isValid: true, error: null }
    : { isValid: false, error: 'Phone number must be exactly 10 digits' };
};

// 5. Email – basic email pattern.
export const validateEmail = (v) => {
  if (isEmpty(v)) return { isValid: false, error: 'Mail ID is required' };
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
    ? { isValid: true, error: null }
    : { isValid: false, error: 'Enter a valid email address' };
};

// 6. Shop ID – min 5 chars, at least one letter and one digit, alphanumeric only.
export const validateShopId = (v) => {
  if (isEmpty(v)) return { isValid: false, error: 'Shop ID is required' };
  if (v.length < 5)
    return { isValid: false, error: 'Shop ID must be at least 5 characters' };
  if (!/[A-Za-z]/.test(v) || !/\d/.test(v))
    return { isValid: false, error: 'Shop ID must contain at least one letter and one digit' };
  if (/[^A-Za-z0-9_-]/.test(v))
    return { isValid: false, error: 'Shop ID may contain only letters, digits, hyphens, and underscores' };
  return { isValid: true, error: null };
};

// 6b. Shop ID live checks — exposed for ShopIdRules component.
export const getShopIdChecks = (v) => {
  const value = v == null ? '' : String(v);
  return [
    { id: 'minLen',   label: 'At least 5 characters long',                    passed: value.length >= 5 },
    { id: 'maxLen',   label: 'No more than 20 characters',                    passed: value.length > 0 && value.length <= 20 },
    { id: 'hasLetter',label: 'Contains at least one letter (A–Z)',             passed: /[A-Za-z]/.test(value) },
    { id: 'hasDigit', label: 'Contains at least one digit (0–9)',              passed: /\d/.test(value) },
    { id: 'noSpaces', label: 'No spaces allowed',                              passed: value.length > 0 && !/\s/.test(value) },
    { id: 'chars',    label: 'Only letters, digits, hyphens ( - ) or underscores ( _ )', passed: value.length > 0 && /^[A-Za-z0-9_-]+$/.test(value) },
  ];
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
export const validatePincode = (v) => {
  if (isEmpty(v)) return { isValid: false, error: 'Pincode is required' };
  return /^\d{6}$/.test(v)
    ? { isValid: true, error: null }
    : { isValid: false, error: 'Pincode must be exactly 6 digits' };
};

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
  getShopIdChecks,
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
