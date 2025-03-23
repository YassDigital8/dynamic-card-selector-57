
import { User, UserPrivilege, ModulePermission } from '@/types/user.types';
import { v4 as uuidv4 } from 'uuid';

// Mock data
const mockUsers: User[] = [
  {
    id: uuidv4(),
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Super Admin',
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-04-15'),
    lastLogin: new Date('2023-06-20'),
    isActive: true,
    department: 'IT',
  },
  {
    id: uuidv4(),
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Admin',
    createdAt: new Date('2023-02-15'),
    updatedAt: new Date('2023-05-10'),
    lastLogin: new Date('2023-06-18'),
    isActive: true,
    department: 'HR',
  },
  {
    id: uuidv4(),
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    role: 'Manager',
    createdAt: new Date('2023-03-05'),
    updatedAt: new Date('2023-04-20'),
    lastLogin: new Date('2023-06-15'),
    isActive: true,
    department: 'Sales',
  },
  {
    id: uuidv4(),
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'Supervisor',
    createdAt: new Date('2023-04-10'),
    updatedAt: new Date('2023-05-25'),
    lastLogin: new Date('2023-06-10'),
    isActive: false,
    department: 'Marketing',
  },
  {
    id: uuidv4(),
    name: 'Michael Wilson',
    email: 'michael.wilson@example.com',
    role: 'Officer',
    createdAt: new Date('2023-05-15'),
    updatedAt: new Date('2023-06-05'),
    lastLogin: new Date('2023-06-05'),
    isActive: true,
    department: 'Finance',
  },
];

// Available user privileges
export const userPrivileges: UserPrivilege[] = [
  'Super Admin', 
  'Admin', 
  'Manager', 
  'Supervisor', 
  'Officer'
];

// Module permissions with detailed role access
export const modulePermissions: ModulePermission[] = [
  { 
    id: 'hotels', 
    name: 'Hotels', 
    description: 'Manage hotel listings and details',
    allowedRoles: ['Super Admin', 'Admin', 'Manager', 'Supervisor', 'Officer']
  },
  { 
    id: 'users', 
    name: 'Users', 
    description: 'Manage system users and privileges',
    allowedRoles: ['Super Admin']
  },
  { 
    id: 'gallery', 
    name: 'Gallery', 
    description: 'Manage image gallery and uploads',
    allowedRoles: ['Super Admin', 'Admin', 'Manager', 'Supervisor', 'Officer']
  },
  { 
    id: 'settings', 
    name: 'Settings', 
    description: 'Configure system settings',
    allowedRoles: ['Super Admin', 'Admin']
  },
  { 
    id: 'reports', 
    name: 'Reports', 
    description: 'Generate and view reports',
    allowedRoles: ['Super Admin', 'Admin', 'Manager', 'Supervisor']
  },
];

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
    updatedAt: new Date()
  };
  mockUsers.push(newUser);
  return newUser;
};
