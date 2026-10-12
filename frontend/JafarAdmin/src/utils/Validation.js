/**
 * Validation utilities for JafarAdmin
 * Pure functions with zero UI or state dependencies.
 */

/**
 * Checks whether a string contains leading or trailing whitespace.
 * @param {string} str 
 * @returns {boolean}
 */
export const hasLeadingOrTrailingWhitespace = (str) => {
  if (typeof str !== 'string') return false;
  return str.trim() !== str;
};

/**
 * Validates the Admin Identifier / Username field.
 * Strict rules:
 * 1. Must not be empty.
 * 2. Must not consist solely of whitespace.
 * 3. Must not have accidental leading or trailing whitespace.
 * 
 * @param {string} adminId 
 * @returns {{ isValid: boolean, error: string | null }}
 */
export const validateAdminId = (adminId) => {
  if (!adminId || typeof adminId !== 'string') {
    return {
      isValid: false,
      error: 'Admin ID is required.',
    };
  }

  if (adminId.trim().length === 0) {
    return {
      isValid: false,
      error: 'Admin ID cannot consist solely of whitespace.',
    };
  }

  if (hasLeadingOrTrailingWhitespace(adminId)) {
    return {
      isValid: false,
      error: 'Admin ID must not contain leading or trailing spaces.',
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

/**
 * Validates the Password field.
 * Strict rules:
 * 1. Must not be empty.
 * 2. Must not consist solely of whitespace.
 * 3. Exact entered characters are strictly preserved without silent modification.
 * 
 * @param {string} password 
 * @returns {{ isValid: boolean, error: string | null }}
 */
export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return {
      isValid: false,
      error: 'Password is required.',
    };
  }

  if (password.trim().length === 0) {
    return {
      isValid: false,
      error: 'Password cannot consist solely of whitespace.',
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
