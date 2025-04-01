
import { AuthResponse, LoginCredentials } from '@/types/auth.types';

// Flag to track if we're in demo mode due to SSL or connection issues
let isDemoMode = false;

// Define multiple possible API endpoints for authentication
const AUTH_ENDPOINTS = [
  'https://staging.sa3d.online:7189/api/Authentication/login',  // Primary endpoint
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
  let lastResponseText = null;
  
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
      lastResponseText = responseText;
      
      // Only consider it HTML if it contains both <!DOCTYPE html> and <html
      const isHtmlResponse = responseText.includes('<!DOCTYPE html>') && responseText.includes('<html');
      
      if (isHtmlResponse) {
        console.log('Response is HTML, trying next endpoint');
        continue; // Skip to the next endpoint if we got HTML
      }
      
      // Try to parse as JSON
      let responseData;
      try {
        responseData = JSON.parse(responseText);
        console.log('Parsed API response:', responseData);
      } catch (e) {
        console.log('Response is not valid JSON:', e);
        continue; // Skip to the next endpoint if we couldn't parse JSON
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
        continue; // Skip to the next endpoint if no token in response
      }
      
      console.log('Authentication successful, found valid token');
      
      // Map the API response to our AuthResponse type
      const authResponse: AuthResponse = {
        token: responseData.token,
        email: responseData.email || credentials.email,
        firstName: responseData.firstName || 'User',
        lastName: responseData.lastName || null,
        message: responseData.message || 'Authentication successful',
        isAuthenticated: true,
        role: responseData.roles && responseData.roles.length > 0 ? responseData.roles[0] : 'User',
        roles: responseData.roles || ['User'],
        expiresOn: responseData.expiresOn,
        success: true
      };
      
      // If we got a valid response, reset the demo mode flag (if it was set)
      isDemoMode = false;
      
      return authResponse;
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
  
  // If we got HTML responses instead of JSON, enable demo mode
  // Be more specific about HTML detection to avoid false positives
  if (lastResponseText && lastResponseText.includes('<!DOCTYPE html>') && lastResponseText.includes('<html')) {
    console.log('Enabling demo mode due to HTML response instead of JSON');
    isDemoMode = true;
    
    return {
      token: 'demo-mode-token',
      email: credentials.email || 'demo@example.com',
      firstName: 'Demo User',
      role: 'Demo Admin', 
      success: true,
      message: 'Demo mode activated due to invalid API response format'
    };
  }
  
  // If we get here, all endpoints failed for a reason other than network issues
  throw new Error(lastError ? lastError.message : 'All authentication endpoints failed with unknown errors');
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
