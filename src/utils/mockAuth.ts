/**
 * Mock authentication service for demo purposes
 * Contains stubs for pair code and biometric authentication
 */

export interface AuthResult {
  success: boolean;
  message?: string;
}

/**
 * Validates a pair code
 * Valid codes: ABCD-1234, TEST-5678, DEMO-9012
 * @param pairCode - The pair code to validate
 * @returns Promise<AuthResult> - The authentication result
 */
export const verifyPairCode = async (pairCode: string): Promise<AuthResult> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const validCodes = ['ABCD-1234', 'TEST-5678', 'DEMO-9012'];
  const normalizedCode = pairCode.trim().toUpperCase();

  if (validCodes.includes(normalizedCode)) {
    return { success: true };
  }

  return {
    success: false,
    message: 'Invalid pair code. Please try again.',
  };
};

/**
 * Validates email and password
 * For demo: any valid email format and non-empty password works
 * @param email - The email address
 * @param password - The password
 * @returns Promise<AuthResult> - The authentication result
 */
export const verifyEmailPassword = async (
  email: string,
  password: string
): Promise<AuthResult> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return {
      success: false,
      message: 'Please enter a valid email address.',
    };
  }

  if (password.trim().length === 0) {
    return {
      success: false,
      message: 'Password cannot be empty.',
    };
  }

  return { success: true };
};

/**
 * Validates pair code only (without email/password)
 * @param pairCode - The pair code to validate
 * @returns Promise<AuthResult> - The authentication result
 */
export const verifyPairCodeOnly = async (
  pairCode: string
): Promise<AuthResult> => {
  return verifyPairCode(pairCode);
};

/**
 * Mock biometric authentication stub
 * This is a placeholder for actual biometric authentication
 * @returns Promise<AuthResult> - The authentication result
 */
export const mockBiometricAuth = async (): Promise<AuthResult> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // For demo purposes, always succeed
  // In a real app, this would integrate with the device's biometric API
  return { success: true };
};

