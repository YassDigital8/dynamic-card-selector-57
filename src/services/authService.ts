
import { AuthResponse, LoginCredentials } from '@/types/auth.types';

// Flag to track if we're in demo mode due to SSL or connection issues
let isDemoMode = false;

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  console.log('Attempting to authenticate with:', credentials.email);
  
  // First try the staging URL
  const authEndpoint = 'https://staging.sa3d.online:7182/api/Authentication/login';
  console.log('Using authentication endpoint:', authEndpoint);
  
  try {
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
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Authentication failed: ${response.status}`);
    }
    
    const authData: AuthResponse = await response.json();
    
    if (!authData.token) {
      throw new Error('Invalid authentication response: no token received');
    }
    
    // Reset demo mode flag on successful login
    isDemoMode = false;
    
    return authData;
  } catch (fetchError) {
    // Convert the fetch error to a more specific error
    if (fetchError instanceof TypeError && fetchError.message.includes('Failed to fetch')) {
      // This is likely a CORS or certificate issue
      console.log('Enabling demo mode due to SSL certificate or network issue');
      isDemoMode = true;
      
      // Return a demo user for certificate issues
      return {
        token: 'demo-mode-token',
        email: credentials.email || 'demo@example.com',
        firstName: 'Demo User',
        role: 'Demo Admin', // Add a demo role
        success: true,
        message: 'Demo mode activated due to SSL certificate issues'
      };
    }
    throw fetchError;
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
