// Validation.test.js
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
  validateImages,
} from './Validation';

describe('Validation utilities', () => {
  test('validateFirstName – rejects empty and spaces', () => {
    expect(validateFirstName('')).toEqual({ isValid: false, error: expect.any(String) });
    expect(validateFirstName('John Doe')).toEqual({ isValid: false, error: expect.any(String) });
    expect(validateFirstName('John')).toEqual({ isValid: true, error: null });
  });

  test('validateMiddleName – optional', () => {
    expect(validateMiddleName('')).toEqual({ isValid: true, error: null });
    expect(validateMiddleName('Lee')).toEqual({ isValid: true, error: null });
    expect(validateMiddleName('Lee23')).toEqual({ isValid: false, error: expect.any(String) });
  });

  test('validatePhone – exactly 10 digits', () => {
    expect(validatePhone('1234567890')).toEqual({ isValid: true, error: null });
    expect(validatePhone('12345')).toEqual({ isValid: false, error: expect.any(String) });
    expect(validatePhone('123456789a')).toEqual({ isValid: false, error: expect.any(String) });
  });

  test('validateEmail – basic format', () => {
    expect(validateEmail('test@example.com')).toEqual({ isValid: true, error: null });
    expect(validateEmail('invalid-email')).toEqual({ isValid: false, error: expect.any(String) });
  });

  test('validateShopId – min 5 chars, alphanumeric, contains letter & digit', () => {
    expect(validateShopId('A1B2C')).toEqual({ isValid: true, error: null });
    expect(validateShopId('12345')).toEqual({ isValid: false, error: expect.any(String) });
    expect(validateShopId('ABCD')).toEqual({ isValid: false, error: expect.any(String) });
    expect(validateShopId('AB@12')).toEqual({ isValid: false, error: expect.any(String) });
  });

  test('validatePassword – length & character requirements', () => {
    expect(validatePassword('Abcdef1!')).toEqual({ isValid: true, error: null });
    expect(validatePassword('short')).toEqual({ isValid: false, error: expect.any(String) });
    expect(validatePassword('NoSpecial1')).toEqual({ isValid: false, error: expect.any(String) });
    expect(validatePassword('Space 1!')).toEqual({ isValid: false, error: expect.any(String) });
  });

  test('validateConfirmPassword – matches password', () => {
    expect(validateConfirmPassword('Secret1!', 'Secret1!')).toEqual({ isValid: true, error: null });
    expect(validateConfirmPassword('Secret1!', 'Secret2!')).toEqual({ isValid: false, error: expect.any(String) });
  });

  test('validateDistrict – up to 5 words, letters only', () => {
    expect(validateDistrict('East Godavari')).toEqual({ isValid: true, error: null });
    expect(validateDistrict('Very Long District Name Exceeding')).toEqual({ isValid: false, error: expect.any(String) });
    expect(validateDistrict('District123')).toEqual({ isValid: false, error: expect.any(String) });
  });

  test('validatePincode – exactly 6 digits', () => {
    expect(validatePincode('560001')).toEqual({ isValid: true, error: null });
    expect(validatePincode('5600')).toEqual({ isValid: false, error: expect.any(String) });
  });

  test('validateImages – at least one image', () => {
    expect(validateImages([])).toEqual({ isValid: false, error: expect.any(String) });
    expect(validateImages([{}])).toEqual({ isValid: true, error: null });
  });
});
