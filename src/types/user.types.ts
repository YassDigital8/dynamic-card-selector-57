
export type UserPrivilege = 'Super Admin' | 'Admin' | 'Manager' | 'Supervisor' | 'Officer';

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
