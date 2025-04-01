
import { AuthResponse, LoginCredentials } from '@/types/auth.types';

// Flag to track if we're in demo mode due to SSL or connection issues
let isDemoMode = false;

// Define the API endpoint for authentication
const AUTH_ENDPOINT = 'http://sa3d.online:7189/api/Authentication/login';

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
    console.log(`Trying authentication endpoint: ${AUTH_ENDPOINT}`);
    
    const response = await fetch(AUTH_ENDPOINT, {
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
    
    // If we want to fallback to demo mode on error, uncomment this
    // console.log('Falling back to demo mode due to API error');
    // isDemoMode = true;
    // return {
    //   token: 'demo-mode-token',
    //   email: credentials.email || 'demo@example.com',
    //   firstName: 'Demo User',
    //   role: 'Demo Admin',
    //   roles: ['Demo Admin'],
    //   success: true,
    //   message: 'Demo mode activated due to API error'
    // };
    
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
