import {
  validateAdminId,
  validatePassword,
  validateRejectionReason,
  hasLeadingOrTrailingWhitespace,
} from './Validation';

describe('Validation Utility Tests', () => {
  describe('hasLeadingOrTrailingWhitespace', () => {
    test('returns true when leading whitespace exists', () => {
      expect(hasLeadingOrTrailingWhitespace(' admin')).toBe(true);
    });

    test('returns true when trailing whitespace exists', () => {
      expect(hasLeadingOrTrailingWhitespace('admin ')).toBe(true);
    });

    test('returns true when both leading and trailing whitespace exist', () => {
      expect(hasLeadingOrTrailingWhitespace('  admin  ')).toBe(true);
    });

    test('returns false when no leading/trailing whitespace exists', () => {
      expect(hasLeadingOrTrailingWhitespace('admin')).toBe(false);
      expect(hasLeadingOrTrailingWhitespace('admin 01')).toBe(false);
    });
  });

  describe('validateAdminId', () => {
    test('rejects empty string', () => {
      const result = validateAdminId('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Admin ID is required.');
    });

    test('rejects whitespace-only string', () => {
      const result = validateAdminId('   ');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Admin ID cannot consist solely of whitespace.');
    });

    test('rejects leading or trailing whitespace', () => {
      const leading = validateAdminId(' admin');
      expect(leading.isValid).toBe(false);
      expect(leading.error).toBe('Admin ID must not contain leading or trailing spaces.');

      const trailing = validateAdminId('admin ');
      expect(trailing.isValid).toBe(false);
      expect(trailing.error).toBe('Admin ID must not contain leading or trailing spaces.');
    });

    test('accepts valid admin ID', () => {
      const result = validateAdminId('admin');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('validatePassword', () => {
    test('rejects empty password', () => {
      const result = validatePassword('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Password is required.');
    });

    test('rejects whitespace-only password', () => {
      const result = validatePassword('    ');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Password cannot consist solely of whitespace.');
    });

    test('accepts valid password without altering characters', () => {
      const result = validatePassword('admin');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('validateRejectionReason', () => {
    test('rejects empty rejection reason', () => {
      const result = validateRejectionReason('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('A rejection reason is required to document the decision.');
    });

    test('rejects reason shorter than 5 characters', () => {
      const result = validateRejectionReason('No');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Rejection reason must be at least 5 characters long.');
    });

    test('accepts comprehensive rejection reason', () => {
      const result = validateRejectionReason('Incomplete GST registration certificate provided.');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeNull();
    });
  });
});
