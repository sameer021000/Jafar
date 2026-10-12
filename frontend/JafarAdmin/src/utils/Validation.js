/**
 * Validation utilities for JafarAdmin
 * Pure functions with zero UI or state dependencies.
 */

/**
 * Validates the Admin Identifier / Username field.
 * Because space characters are blocked in real-time at the input level,
 * this checks strictly for required presence.
 * 
 * @param {string} adminId 
 * @returns {{ isValid: boolean, error: string | null }}
 */
export const validateAdminId = (adminId) => {
  if (!adminId || typeof adminId !== 'string' || adminId.length === 0) {
    return {
      isValid: false,
      error: 'Admin ID is required.',
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

/**
 * Validates the Password field.
 * Because space characters are blocked in real-time at the input level,
 * this checks strictly for required presence.
 * 
 * @param {string} password 
 * @returns {{ isValid: boolean, error: string | null }}
 */
export const validatePassword = (password) => {
  if (!password || typeof password !== 'string' || password.length === 0) {
    return {
      isValid: false,
      error: 'Password is required.',
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

/**
 * Validates the administrative rejection reason.
 * @param {string} reason 
 * @returns {{ isValid: boolean, error: string | null }}
 */
export const validateRejectionReason = (reason) => {
  if (!reason || typeof reason !== 'string' || reason.trim().length === 0) {
    return {
      isValid: false,
      error: 'A rejection reason is required to document the decision.',
    };
  }

  if (reason.trim().length < 5) {
    return {
      isValid: false,
      error: 'Rejection reason must be at least 5 characters long.',
    };
  }

  return {
    isValid: true,
    error: null,
  };
};
