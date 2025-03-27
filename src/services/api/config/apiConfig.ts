
// API configuration constants and utilities

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://staging.sa3d.online:7183';

/**
 * Gets the authentication token from localStorage
 * @returns The token or throws an error if not found
 */
export const getAuthToken = (): string => {
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
  const errorData = await response.json().catch(() => null);
  return errorData?.message || `API error: ${response.status}`;
};
