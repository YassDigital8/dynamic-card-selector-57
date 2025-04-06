
// API configuration constants and utilities
import { createCorsHandledUrl } from '@/services/corsProxyService';
import { isInDemoMode } from '@/services/authService';

export const API_BASE_URL = createCorsHandledUrl(import.meta.env.VITE_API_BASE_URL || 'http://92.112.184.210:7183');

/**
 * Gets the authentication token from localStorage
 * @returns The token or throws an error if not found
 */
export const getAuthToken = (): string => {
  // In demo mode, return a mock token
  if (isInDemoMode()) {
    return 'demo-mode-token';
  }
  
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Authentication token not found');
  }
  return token;
};

/**
 * Creates headers with authorization token
 */
export const createAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

/**
 * Handle API error responses
 */
export const handleApiError = async (response: Response): Promise<string> => {
  // Try to parse as JSON first
  try {
    const errorData = await response.json();
    return errorData?.message || `API error: ${response.status}`;
  } catch (error) {
    // If it's not JSON, try to get text
    const text = await response.text();
    return text || `API error: ${response.status}`;
  }
};
