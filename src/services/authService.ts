
// If the file doesn't exist, we'll create it
import { LoginCredentials } from '@/types/auth.types';

// Always return true for demo mode
export const isInDemoMode = (): boolean => {
  return true;
};

// Enable demo mode
export const enableDemoMode = (): void => {
  localStorage.setItem('demoMode', 'true');
};

// Disable demo mode (but our implementation will ignore this)
export const disableDemoMode = (): void => {
  // Do nothing - we want to stay in demo mode
  console.log('Demo mode is forced on - ignoring request to disable');
};

// Mock login function that always returns a demo token
export const loginUser = async (credentials: LoginCredentials): Promise<any> => {
  console.log('Demo login with:', credentials.email);
  
  return {
    token: 'demo-mode-token',
    firstName: 'Demo',
    lastName: 'User',
    email: credentials.email || 'demo@example.com',
    role: 'Admin',
    roles: ['Admin']
  };
};
