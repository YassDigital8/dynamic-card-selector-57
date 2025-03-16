
import { AuthResponse, LoginCredentials } from '@/types/auth.types';

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
    
    return authData;
  } catch (fetchError) {
    // Convert the fetch error to a more specific error
    if (fetchError instanceof TypeError && fetchError.message.includes('Failed to fetch')) {
      // This is likely a CORS or certificate issue
      throw new Error('SSL Certificate Error: The server uses an invalid SSL certificate. If you trust this server, please add an exception in your browser or contact your administrator.');
    }
    throw fetchError;
  }
};
