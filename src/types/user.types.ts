
export type UserPrivilege = 'Super Admin' | 'Admin' | 'Manager' | 'Supervisor' | 'Officer' | 'SuperAdmin';

export type ModuleType = 'hotels' | 'users' | 'gallery' | 'settings' | 'reports' | 'cms';

export interface ModulePermission {
  id: ModuleType;
  name: string;
  description: string;
  allowedRoles: UserPrivilege[];
}

export interface ModuleRole {
  moduleId: ModuleType;
  role: UserPrivilege;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserPrivilege; // Default role
  moduleRoles?: ModuleRole[]; // Specific roles per module
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  isActive: boolean;
  department?: string;
}

// Used only for user creation API requests
export interface UserCreationData extends Partial<User> {
  password?: string;
}

// API User interface for mapping
export interface ApiUser {
  code: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  department: string;
  lastLogIn: string;
  roles: string[];
  status: string;
  reason: string;
  numberOfLogIn: number;
}
