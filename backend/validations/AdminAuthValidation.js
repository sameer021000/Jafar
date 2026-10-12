/**
 * Pure validation schemas and rules for Admin Authentication.
 * Validates request payload structures before entering business logic.
 */

/**
 * Validates login and admin creation payload.
 * 
 * Rules:
 * - adminId: string, required, non-empty, contains no spaces
 * - password: string, required, non-empty
 * 
 * @param {object} body 
 * @returns {{ isValid: boolean, error?: string, fieldErrors?: object }}
 */
const validateAdminCredentialsPayload = (body = {}) => {
  const { adminId, password } = body;
  const fieldErrors = {};

  // Admin ID validation
  if (!adminId || typeof adminId !== 'string' || adminId.trim().length === 0) {
    fieldErrors.adminId = 'Admin ID is required.';
  } else if (/\s/.test(adminId)) {
    fieldErrors.adminId = 'Admin ID must not contain spaces.';
  }

  // Password validation
  if (!password || typeof password !== 'string' || password.length === 0) {
    fieldErrors.password = 'Password is required.';
  } else if (/\s/.test(password)) {
    fieldErrors.password = 'Password must not contain spaces.';
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
