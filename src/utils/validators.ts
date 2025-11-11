/**
 * Validation utilities for form inputs
 */

/**
 * Validates an email address
 * @param email - The email address to validate
 * @returns true if the email is valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validates a password
 * @param password - The password to validate
 * @param minLength - Minimum length required (default: 1)
 * @returns true if the password is valid, false otherwise
 */
export const validatePassword = (password: string, minLength: number = 1): boolean => {
  if (!password || typeof password !== 'string') {
    return false;
  }

  return password.trim().length >= minLength;
};

/**
 * Validates a pair code
 * Format: XXXX-XXXX where X is alphanumeric
 * @param pairCode - The pair code to validate
 * @returns true if the pair code is valid, false otherwise
 */
export const validatePairCode = (pairCode: string): boolean => {
  if (!pairCode || typeof pairCode !== 'string') {
    return false;
  }

  const normalizedCode = pairCode.trim().toUpperCase();
  // Format: XXXX-XXXX where X is alphanumeric
  const pairCodeRegex = /^[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  return pairCodeRegex.test(normalizedCode);
};

/**
 * Validates if a string is not empty
 * @param value - The value to validate
 * @returns true if the value is not empty, false otherwise
 */
export const validateNotEmpty = (value: string): boolean => {
  return value !== null && value !== undefined && value.trim().length > 0;
};

/**
 * Validates a phone number (basic validation)
 * @param phone - The phone number to validate
 * @returns true if the phone number is valid, false otherwise
 */
export const validatePhone = (phone: string): boolean => {
  if (!phone || typeof phone !== 'string') {
    return false;
  }

  // Remove common formatting characters
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  // Check if it's all digits and has reasonable length (7-15 digits)
  const phoneRegex = /^\d{7,15}$/;
  return phoneRegex.test(cleaned);
};

/**
 * Validates a URL
 * @param url - The URL to validate
 * @returns true if the URL is valid, false otherwise
 */
export const validateURL = (url: string): boolean => {
  if (!url || typeof url !== 'string') {
    return false;
  }

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

