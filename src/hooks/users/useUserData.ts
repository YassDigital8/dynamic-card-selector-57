
import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { User, ModuleType, UserPrivilege } from '@/types/user.types';
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

// Helper function to validate a role string is a valid UserPrivilege
const validateUserPrivilege = (role: string): UserPrivilege => {
  const validPrivileges: UserPrivilege[] = ['Super Admin', 'Admin', 'Manager', 'Supervisor', 'Officer'];
  
  // Check if the role is a valid UserPrivilege
  if (validPrivileges.includes(role as UserPrivilege)) {
    return role as UserPrivilege;
  }
  
  // Default to 'Officer' if not valid
  return 'Officer';
};

// Function to convert API user to our User type
const mapApiUserToUser = (apiUser: ApiUser): User => {
  const name = `${apiUser.firstName} ${apiUser.lastName || ''}`.trim();
  
  // Default role - take the first role or default to Officer
  let defaultRole: UserPrivilege = 'Officer';
  
  // Map module roles from the API roles array
  const moduleRoles = apiUser.roles.length > 0 
    ? apiUser.roles
        .map(role => {
          const parts = role.split('-');
          if (parts.length < 2) return null;
          
          const [moduleId, roleLevel] = parts;
          const mappedModuleId = moduleId.toLowerCase() as ModuleType;
          
          // Check if it's one of our valid module types
          if (!['hotels', 'users', 'gallery', 'cms'].includes(mappedModuleId)) {
            return null;
          }
          
          // Convert role level to a valid UserPrivilege type
          let validRole: UserPrivilege;
          
          // Special case for SuperAdmin
          if (roleLevel === 'SuperAdmin') {
            validRole = 'Super Admin';
          } else if (roleLevel === 'Admin') {
            validRole = 'Admin';
          } else if (roleLevel === 'Manager') {
            validRole = 'Manager';
          } else if (roleLevel === 'Supervisor') {
            validRole = 'Supervisor';
          } else {
            validRole = 'Officer';
          }
          
          // If this is the first role, use it as the default
          if (defaultRole === 'Officer' && validRole) {
            defaultRole = validRole;
          }
          
          return {
            moduleId: mappedModuleId,
            role: validRole
          };
        })
        .filter(mr => mr !== null) as { moduleId: ModuleType; role: UserPrivilege }[]
    : [];
  
  return {
    id: apiUser.code,
    name,
    email: apiUser.email,
    role: defaultRole,
    moduleRoles: moduleRoles.length > 0 ? moduleRoles : undefined,
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
