
export interface AuthResponse {
  message: string;
  isAuthenticated?: boolean;
  email: string;
  firstName: string;
  lastName?: string | null;
  token: string;
  expiresOn?: string;
  success?: boolean;
  roles?: string[];
}

export interface UserInfo {
  firstName: string;
  email: string;
  role?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Session duration in milliseconds (1 hour)
export const SESSION_DURATION = 60 * 60 * 1000;
