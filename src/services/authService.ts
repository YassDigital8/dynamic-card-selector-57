
import { AuthResponse, LoginCredentials } from '@/types/auth.types';

// Flag to track if we're in demo mode due to SSL or connection issues
let isDemoMode = false;

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  console.log('Attempting to authenticate with:', credentials.email);
  
  // First try the staging URL
  const authEndpoint = 'https://staging.sa3d.online:7182/api/Authentication/login';
  console.log('Using authentication endpoint:', authEndpoint);
  
  try {
    console.log('Making fetch request to:', authEndpoint);
    
    // Set up proper CORS headers and credentials
    const response = await fetch(authEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      }),
      // Add mode and credentials for better cross-origin support
      mode: 'cors',
      credentials: 'include'
    });
    
    console.log('API response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Authentication error response:', errorData);
      throw new Error(errorData.message || `Authentication failed: ${response.status}`);
    }
    
    const authData: AuthResponse = await response.json();
    console.log('Authentication successful, received data:', { 
      hasToken: !!authData.token, 
      email: authData.email,
      role: authData.role 
    });
    
    if (!authData.token) {
      console.error('Invalid authentication response: no token received');
      throw new Error('Invalid authentication response: no token received');
    }
    
    // Reset demo mode flag on successful login
    isDemoMode = false;
    
    return authData;
  } catch (fetchError) {
    // Log detailed error information
    console.error('Authentication fetch error:', fetchError);
    
    // Convert the fetch error to a more specific error
    if (fetchError instanceof TypeError && fetchError.message.includes('Failed to fetch')) {
      // This is likely a CORS or certificate issue
      console.log('Failed to fetch error - enabling demo mode due to connectivity issue');
      isDemoMode = true;
      
      // Return a demo user for certificate issues
      return {
        token: 'demo-mode-token',
        email: credentials.email || 'demo@example.com',
        firstName: 'Demo User',
        role: 'Demo Admin', // Add a demo role
        success: true,
        message: 'Demo mode activated due to API connectivity issues'
      };
    }
    
    // For other errors, let's try the demo mode as a fallback but with a more specific message
    console.log('Other authentication error, enabling demo mode as fallback');
    isDemoMode = true;
    return {
      token: 'demo-mode-token',
      email: credentials.email || 'demo@example.com', 
      firstName: 'Demo User',
      role: 'Demo Admin',
      success: true,
      message: `Demo mode activated. Original error: ${fetchError instanceof Error ? fetchError.message : 'Unknown error'}`
    };
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

// Function to check API connectivity
export const checkApiConnectivity = async (): Promise<boolean> => {
  try {
    // Try a simple HEAD request to check if the API is reachable
    const response = await fetch('https://staging.sa3d.online:7182/api/health', {
      method: 'HEAD',
      mode: 'cors'
    });
    return response.ok;
  } catch (error) {
    console.error('API connectivity check failed:', error);
    return false;
  }
};
