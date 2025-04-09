
import { AuthResponse, LoginCredentials } from '@/types/auth.types';
import { fetchWithCorsHandling } from './corsProxyService';

// Flag to track if we're in demo mode due to SSL or connection issues
let isDemoMode = false;

// Define the API endpoint for authentication
const AUTH_ENDPOINT = '132.145.251.144:7182/api/Authentication/login';

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  console.log('Attempting to authenticate with:', credentials.email);
  
  // Check if we're in demo mode from the start
  if (isDemoMode || credentials.email === 'demo@example.com') {
    console.log('Using demo mode for authentication');
    isDemoMode = true;
    
    // Return a demo user
    return {
      token: 'demo-mode-token',
      email: credentials.email || 'demo@example.com',
      firstName: 'Demo User',
      role: 'Demo Admin',
      roles: ['Demo Admin'],
      success: true,
      message: 'Demo mode activated'
    };
  }
  
  try {
    console.log(`Trying authentication endpoint with enhanced CORS handling: ${AUTH_ENDPOINT}`);
    
    // Use our enhanced CORS-handling fetch with improved options
    const response = await fetchWithCorsHandling(AUTH_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest', // This can help with some CORS configurations
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      }),
      // Don't include credentials to avoid preflight issues
    });
    
    // Always capture the raw response text first
    const responseText = await response.text();
    console.log('Raw API response:', responseText);
    
    // Check for the specific CORS Anywhere error message
    if (responseText.includes('See /corsdemo')) {
      console.log('CORS Anywhere requires activation');
      throw new Error('CORS Proxy Activation Required: You need to enable the CORS Anywhere service before using it. Please click the "Enable CORS Anywhere Service" link, then click the button on that page to request temporary access, and then try again.');
    }
    
    // Try to parse as JSON
    let responseData;
    try {
      responseData = JSON.parse(responseText);
      console.log('Parsed API response:', responseData);
    } catch (e) {
      console.log('Response is not valid JSON:', e);
      throw new Error('Invalid response format from authentication server');
    }
    
    if (!response.ok) {
      // For error responses, include the status code and response data
      const errorMessage = typeof responseData === 'string' 
        ? responseData 
        : responseData.message || `Authentication failed: ${response.status}`;
      
      throw new Error(errorMessage);
    }
    
    // Check if there's a token in the response
    if (!responseData.token) {
      console.log('Response missing token:', responseData);
      throw new Error('Authentication response missing token');
    }
    
    console.log('Authentication successful, found valid token');
    
    // Map the API response to our AuthResponse type
    const authResponse: AuthResponse = {
      token: responseData.token,
      email: responseData.email || credentials.email,
      firstName: responseData.firstName || 'User',
      lastName: responseData.lastName || null,
      message: responseData.message || 'Authentication successful',
      isAuthenticated: responseData.isAuthenticated || true,
      role: responseData.roles && responseData.roles.length > 0 ? responseData.roles[0] : 'User',
      roles: responseData.roles || ['User'],
      expiresOn: responseData.expiresOn,
      success: true
    };
    
    // If we got a valid response, reset the demo mode flag (if it was set)
    isDemoMode = false;
    
    return authResponse;
  } catch (error) {
    console.log(`Error with endpoint ${AUTH_ENDPOINT}:`, error);
    
    // Check if this is a CORS Anywhere activation error
    if (error instanceof Error && error.message.includes('CORS Proxy Activation Required')) {
      throw error; // Rethrow the specific error
    }
    
    // Check if this is a CORS or network related error
    if (error instanceof TypeError && 
        (error.message.includes('Failed to fetch') || 
         error.message.includes('NetworkError') ||
         error.message.includes('Network request failed'))) {
      
      console.log('CORS or network error detected, showing specific message');
      throw new Error('Network error: The authentication server is not accessible due to CORS restrictions. Try using Demo Mode or check your network connection.');
    }
    
    // Rethrow the error to be handled by the caller
    throw error;
  }
};

// Helper function to check if in demo mode
export const isInDemoMode = (): boolean => {
  return isDemoMode;
};

// Function to forcibly enable demo mode
export const enableDemoMode = (): void => {
  isDemoMode = true;
};

// Function to disable demo mode (for testing)
export const disableDemoMode = (): void => {
  isDemoMode = false;
};

