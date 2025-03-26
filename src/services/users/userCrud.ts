
import { v4 as uuidv4 } from 'uuid';
import { User } from '@/types/user.types';
import { UserPrivilege, ModuleType } from './types';
import { mockUsers, modulePermissions } from './mockData';

export const getUsersList = (): User[] => {
  return [...mockUsers];
};

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const updateUserRole = (userId: string, newRole: UserPrivilege): User | undefined => {
  const userIndex = mockUsers.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      role: newRole,
      updatedAt: new Date()
    };
    return mockUsers[userIndex];
  }
  return undefined;
};

export const updateUserModuleRole = (
  userId: string, 
  moduleId: ModuleType, 
  newRole: UserPrivilege
): User | undefined => {
  const userIndex = mockUsers.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    const user = mockUsers[userIndex];
    
    // Create moduleRoles array if it doesn't exist
    if (!user.moduleRoles) {
      user.moduleRoles = [];
    }
    
    // Check if the module role already exists
    const moduleRoleIndex = user.moduleRoles.findIndex(mr => mr.moduleId === moduleId);
    
    if (moduleRoleIndex !== -1) {
      // Update existing module role
      user.moduleRoles[moduleRoleIndex] = { moduleId, role: newRole };
    } else {
      // Add new module role
      user.moduleRoles.push({ moduleId, role: newRole });
    }
    
    // Update the user
    mockUsers[userIndex] = {
      ...user,
      updatedAt: new Date()
    };
    
    return mockUsers[userIndex];
  }
  return undefined;
};

export const toggleUserStatus = (userId: string): User | undefined => {
  const userIndex = mockUsers.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      isActive: !mockUsers[userIndex].isActive,
      updatedAt: new Date()
    };
    return mockUsers[userIndex];
  }
  return undefined;
};

export const deleteUser = (userId: string): boolean => {
  const userIndex = mockUsers.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    mockUsers.splice(userIndex, 1);
    return true;
  }
  return false;
};

export const addUser = (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User => {
  const newUser: User = {
    id: uuidv4(),
    ...user,
    createdAt: new Date(),
    updatedAt: new Date(),
    // Initialize moduleRoles for new users
    moduleRoles: modulePermissions.map(module => ({
      moduleId: module.id,
      role: user.role // Default to the user's main role
    }))
  };
  mockUsers.push(newUser);
  return newUser;
};
