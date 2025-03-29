
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/types/user.types';
import { deleteUser } from '@/services/userService';
import { createAuthHeaders } from '@/services/api/config/apiConfig';

export const useStatusActions = (
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { toast } = useToast();

  const handleToggleStatus = useCallback(async (userId: string) => {
    setIsLoading(true);
    try {
      // Find current user to get current status
      const currentUser = users.find(user => user.id === userId);
      if (!currentUser) {
        throw new Error("User not found");
      }
      
      // Get auth headers using the common utility function
      const headers = createAuthHeaders();
      console.log(`Toggling status for user ${userId} with headers:`, headers);
      
      // Make API call to change user status with proper authentication
      const response = await fetch(`https://92.112.184.210:7182/api/Authentication/ChangeUserAccountStatus/${userId}`, {
        method: 'PUT',
        headers,
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API error: ${response.status} - ${errorText}`);
        throw new Error(`API error: ${response.status}`);
      }
      
      // Update the user in the state with toggled status
      const updatedUser = {
        ...currentUser,
        isActive: !currentUser.isActive
      };
      
      setUsers(prev => prev.map(user => user.id === userId ? updatedUser : user));
      
      if (selectedUser?.id === userId) {
        setSelectedUser(updatedUser);
      }
      
      toast({
        title: "Status updated",
        description: `User status set to ${updatedUser.isActive ? 'active' : 'inactive'}`,
      });
    } catch (error) {
      console.error("Error updating user status:", error);
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, selectedUser, setUsers, setSelectedUser, setIsLoading, users]);

  const handleDeleteUser = useCallback((userId: string) => {
    setIsLoading(true);
    try {
      const success = deleteUser(userId);
      if (success) {
        setUsers(prev => prev.filter(user => user.id !== userId));
        if (selectedUser?.id === userId) {
          setSelectedUser(null);
        }
        toast({
          title: "User deleted",
          description: "User has been successfully removed",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, selectedUser, setUsers, setSelectedUser, setIsLoading]);

  return {
    handleToggleStatus,
    handleDeleteUser
  };
};
