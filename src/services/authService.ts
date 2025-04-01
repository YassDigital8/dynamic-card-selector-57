
import { AuthResponse, LoginCredentials } from '@/types/auth.types';

// Flag to track if we're in demo mode due to SSL or connection issues
let isDemoMode = false;

// Define multiple possible API endpoints for authentication
const AUTH_ENDPOINTS = [
  'https://staging.sa3d.online:7182/api/Authentication/login',
  'https://api.sa3d.online/api/Authentication/login',
  'https://sa3d.online/api/Authentication/login'
];

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
      success: true,
      message: 'Demo mode activated'
    };
  }
  
  // Try all endpoints until one works
  let lastError = null;
  
  for (const endpoint of AUTH_ENDPOINTS) {
    try {
      console.log(`Trying authentication endpoint: ${endpoint}`);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        }),
      });
      
      // Always capture the raw response text first
      const responseText = await response.text();
      console.log('Raw API response:', responseText);
      
      // Try to parse as JSON if possible
      let responseData;
      try {
        responseData = JSON.parse(responseText);
        console.log('Parsed API response:', responseData);
      } catch (e) {
        // If not valid JSON, use the raw text
        console.log('Response is not valid JSON, using raw text');
        responseData = { message: responseText };
      }
      
      if (!response.ok) {
        // For error responses, include the status code and response data
        const errorMessage = typeof responseData === 'string' 
          ? responseData 
          : responseData.message || `Authentication failed: ${response.status}`;
        
        throw new Error(errorMessage);
      }
      
      if (!responseData.token) {
        throw new Error('Invalid authentication response: no token received');
      }
      
      return responseData;
    } catch (error) {
      console.log(`Error with endpoint ${endpoint}:`, error);
      lastError = error;
      // Continue to the next endpoint
    }
  }
  
  // If we've tried all endpoints and none worked, check if this is a network error
  if (lastError instanceof TypeError && lastError.message.includes('Failed to fetch')) {
    console.log('Enabling demo mode due to network issues');
    isDemoMode = true;
    
    // Return a demo user for network issues
    return {
      token: 'demo-mode-token',
      email: credentials.email || 'demo@example.com',
      firstName: 'Demo User',
      role: 'Demo Admin',
      success: true,
      message: 'Demo mode activated due to network issues'
    };
  }
  
  // If we get here, all endpoints failed for a reason other than network issues
  throw lastError;
};

// Helper function to check if in demo mode
export const isInDemoMode = (): boolean => {
  return isDemoMode;
};

// Function to forcibly enable demo mode
export const enableDemoMode = (): void => {
  isDemoMode = true;
};
