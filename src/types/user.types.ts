
export type UserPrivilege = 'Super Admin' | 'Admin' | 'Manager' | 'Supervisor' | 'Officer';

export type ModuleType = 'hotels' | 'users' | 'gallery' | 'settings' | 'reports';

export interface ModulePermission {
  id: ModuleType;
  name: string;
  description: string;
  allowedRoles: UserPrivilege[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserPrivilege;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  isActive: boolean;
  department?: string;
}
