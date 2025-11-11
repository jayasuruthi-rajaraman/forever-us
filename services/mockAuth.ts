/**
 * Mock authentication service for demo purposes
 */

export interface AuthResult {
  success: boolean;
  message?: string;
}

/**
 * Validates a pair code
 * Valid codes: ABCD-1234, TEST-5678, DEMO-9012
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
 */
export const verifyPairCodeOnly = async (
  pairCode: string
): Promise<AuthResult> => {
  return verifyPairCode(pairCode);
};

