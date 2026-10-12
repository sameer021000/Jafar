import {
  validateAdminId,
  validatePassword,
  validateRejectionReason,
} from './Validation';

describe('Validation Utility Tests (Streamlined)', () => {
  describe('validateAdminId', () => {
    test('rejects empty string', () => {
      const result = validateAdminId('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Admin ID is required.');
    });

    test('rejects null or non-string', () => {
      expect(validateAdminId(null).isValid).toBe(false);
      expect(validateAdminId(undefined).isValid).toBe(false);
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

    test('rejects null or non-string', () => {
      expect(validatePassword(null).isValid).toBe(false);
      expect(validatePassword(undefined).isValid).toBe(false);
    });

    test('accepts valid password', () => {
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
