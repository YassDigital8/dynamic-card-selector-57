
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { User, UserPrivilege, ModuleType } from '@/types/user.types';
import { updateUserRole, updateUserModuleRole } from '@/services/userService';

export const useRoleActions = (
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { toast } = useToast();

  const handleUpdateRole = useCallback((userId: string, newRole: UserPrivilege) => {
    setIsLoading(true);
    try {
      const updatedUser = updateUserRole(userId, newRole);
      if (updatedUser) {
        setUsers(prev => prev.map(user => user.id === userId ? updatedUser : user));
        if (selectedUser?.id === userId) {
          setSelectedUser(updatedUser);
        }
        toast({
          title: "Role updated",
          description: `User's default role updated to ${newRole}`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, selectedUser, setUsers, setSelectedUser, setIsLoading]);

  const handleUpdateModuleRole = useCallback(async (userId: string, moduleId: ModuleType, newRole: UserPrivilege) => {
    setIsLoading(true);
    
    // Map our internal module names to the API-expected service names
    const moduleToServiceMap: Record<ModuleType, string> = {
      'hotels': 'Hotel',
      'users': 'Authntication', // Note: This is the spelling used in the API (fixed from Authentication)
      'gallery': 'Gallery',
      'cms': 'CMS',
      'settings': 'Settings',
      'reports': 'Reports'
    };
    
    const serviceName = moduleToServiceMap[moduleId];
    
    try {
      // Format the request body as "ServiceName-Role" (e.g. "CMS-Admin")
      const roleBody = `${serviceName}-${newRole}`;
      
      // Make the API call to update the module-specific role
      const response = await fetch(`https://92.112.184.210:7182/api/Authentication/AssignServiceRoleToUser/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roleBody),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      // Update the local state
      const userToUpdate = users.find(user => user.id === userId);
      
      if (userToUpdate) {
        // Create updated module roles
        const moduleRoles = userToUpdate.moduleRoles 
          ? [...userToUpdate.moduleRoles]
          : [];
        
        // Find if there's already a role for this module
        const existingRoleIndex = moduleRoles.findIndex(mr => mr.moduleId === moduleId);
        
        if (existingRoleIndex >= 0) {
          // Update existing role
          moduleRoles[existingRoleIndex] = { ...moduleRoles[existingRoleIndex], role: newRole };
        } else {
          // Add new role
          moduleRoles.push({ moduleId, role: newRole });
        }
        
        // Create updated user
        const updatedUser: User = {
          ...userToUpdate,
          moduleRoles
        };
        
        // Update users array
        setUsers(prev => prev.map(user => user.id === userId ? updatedUser : user));
        
        // Update selected user if needed
        if (selectedUser?.id === userId) {
          setSelectedUser(updatedUser);
        }
        
        toast({
          title: "Module role updated",
          description: `User's role for ${moduleId} updated to ${newRole}`,
        });
      }
    } catch (error) {
      console.error("Error updating module role:", error);
      toast({
        title: "Error",
        description: "Failed to update module role",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, selectedUser, setUsers, setSelectedUser, setIsLoading, users]);

  return {
    handleUpdateRole,
    handleUpdateModuleRole
  };
};
