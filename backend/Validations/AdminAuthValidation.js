/**
 * Pure validation schemas and rules for Admin Authentication.
 * Validates request payload structures before entering business logic.
 * Enforces uppercase JSON keys: AdminID and Password.
 */

/**
 * Validates login and admin creation payload.
 * 
 * Rules:
 * - AdminID: string, required, non-empty, contains no spaces
 * - Password: string, required, non-empty, contains no spaces
 * 
 * @param {object} body 
 * @returns {{ isValid: boolean, error?: string, fieldErrors?: object }}
 */
const validateAdminCredentialsPayload = (body = {}) => {
  const { AdminID, Password } = body;
  const fieldErrors = {};

  // AdminID validation
  if (!AdminID || typeof AdminID !== 'string' || AdminID.trim().length === 0) {
    fieldErrors.AdminID = 'AdminID is required.';
  } else if (/\s/.test(AdminID)) {
    fieldErrors.AdminID = 'AdminID must not contain spaces.';
  }

  // Password validation
  if (!Password || typeof Password !== 'string' || Password.length === 0) {
    fieldErrors.Password = 'Password is required.';
  } else if (/\s/.test(Password)) {
    fieldErrors.Password = 'Password must not contain spaces.';
  }

  const isValid = Object.keys(fieldErrors).length === 0;

  return {
    isValid,
    error: isValid ? null : 'Invalid credentials payload.',
    fieldErrors: isValid ? null : fieldErrors,
  };
};

module.exports = {
  validateAdminCredentialsPayload,
};
