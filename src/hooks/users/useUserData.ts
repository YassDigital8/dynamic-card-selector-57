
import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { User, ModuleType } from '@/types/user.types';
import { userPrivileges, modulePermissions } from '@/services/userService';

interface ApiUser {
  code: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  department: string;
  lastLogIn: string;
  roles: string[];
}

// Function to convert API user to our User type
const mapApiUserToUser = (apiUser: ApiUser): User => {
  const name = `${apiUser.firstName} ${apiUser.lastName || ''}`.trim();
  
  // Default role - take the first role or default to Officer
  const defaultRole = apiUser.roles.length > 0 
    ? apiUser.roles[0].split('-')[0] as any
    : 'Officer';
  
  // Map module roles from the API roles array
  const moduleRoles = apiUser.roles.map(role => {
    const [module, level] = role.split('-');
    const moduleId = module.toLowerCase() as ModuleType;
    return {
      moduleId,
      role: level || 'Officer'
    };
  }).filter(mr => 
    ['hotels', 'users', 'gallery', 'cms'].includes(mr.moduleId)
  );
  
  return {
    id: apiUser.code,
    name,
    email: apiUser.email,
    role: defaultRole,
    moduleRoles,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLogin: apiUser.lastLogIn ? new Date(apiUser.lastLogIn) : undefined,
    isActive: apiUser.isActive,
    department: apiUser.department
  };
};

export const useUserData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://92.112.184.210:7182/api/Authentication/get-all-users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const apiUsers: ApiUser[] = await response.json();
      const mappedUsers = apiUsers.map(mapApiUserToUser);
      
      setUsers(mappedUsers);
      toast({
        title: "Users loaded",
        description: `Successfully loaded ${mappedUsers.length} users`,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      });
      // If API fails, fall back to mock data for demo purposes
      const fallbackUsers = require('@/services/users/mockData').mockUsers;
      setUsers(fallbackUsers);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Load users when component mounts
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    setUsers,
    selectedUser,
    setSelectedUser,
    isLoading,
    setIsLoading,
    fetchUsers,
    userPrivileges,
    modulePermissions
  };
};
