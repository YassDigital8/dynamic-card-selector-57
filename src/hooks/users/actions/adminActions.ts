
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { User, UserPrivilege } from '@/types/user.types';
import { updateUserRole } from '@/services/userService';

export const useAdminActions = (
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { toast } = useToast();

  const handlePromoteToSuperAdmin = useCallback(async (userId: string) => {
    setIsLoading(true);
    try {
      // Make the API call to promote user to SuperAdmin with the required body
      const response = await fetch(`https://92.112.184.210:7182/api/Authentication/AssignServiceRoleToUser/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify("SuperAdmin"), // Send "SuperAdmin" as the request body
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      // API call was successful, now update the UI:
      // Find the user to update in our current state
      const userToUpdate = users.find(user => user.id === userId);
      
      if (userToUpdate) {
        // Create an updated user object with Super Admin privileges
        const updatedUser: User = {
          ...userToUpdate,
          // Set the main role to SuperAdmin
          role: 'SuperAdmin' as UserPrivilege,
          // Update all module roles to SuperAdmin
          moduleRoles: ['hotels', 'users', 'gallery', 'cms'].map(moduleId => ({
            moduleId: moduleId as any,
            role: 'SuperAdmin' as UserPrivilege
          }))
        };
        
        // Update the users array with the modified user
        setUsers(prev => prev.map(user => user.id === userId ? updatedUser : user));
        
        // Update selected user if needed
        if (selectedUser?.id === userId) {
          setSelectedUser(updatedUser);
        }
        
        toast({
          title: "User promoted",
          description: "User has been promoted to Super Admin",
        });
      }
    } catch (error) {
      console.error("Error promoting user:", error);
      toast({
        title: "Error",
        description: "Failed to promote user to Super Admin",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, selectedUser, setUsers, setSelectedUser, setIsLoading, users]);

  return {
    handlePromoteToSuperAdmin
  };
};
