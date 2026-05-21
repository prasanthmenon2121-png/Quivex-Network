/**
 * Utility for generating and validating Quivex IDs.
 * Format: QVX- + 20 uppercase alphanumeric characters.
 */

const ALPHANUMERIC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export const generateQvexId = (): string => {
  let result = 'QVX-';
  const charactersLength = ALPHANUMERIC.length;
  
  // Use crypto.getRandomValues for cryptographically secure random values
  const randomValues = new Uint32Array(20);
  window.crypto.getRandomValues(randomValues);
  
  for (let i = 0; i < 20; i++) {
    result += ALPHANUMERIC.charAt(randomValues[i] % charactersLength);
  }
  
  return result;
};

export const validateQvexId = (qvexId: string): boolean => {
  const regex = /^QVX-[A-Z0-9]{20}$/;
  return regex.test(qvexId);
};
