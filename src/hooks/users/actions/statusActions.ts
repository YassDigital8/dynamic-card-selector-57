
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

  const handleDeleteUser = useCallback(async (userId: string) => {
    setIsLoading(true);
    try {
      // Find the user to delete
      const userToDelete = users.find(user => user.id === userId);
      if (!userToDelete) {
        throw new Error("User not found");
      }
      
      console.log(`Attempting to delete user ${userId}`);
      
      // Get auth headers using the common utility function
      const headers = createAuthHeaders();
      
      // Make API call to delete the user with proper authentication
      const response = await fetch('https://92.112.184.210:7182/api/Authentication/FakeDelete', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          "code": userId,
          "isdeleted": true
        })
      });
      
      // Log the full API response for debugging
      const responseText = await response.text();
      console.log(`API response for user deletion:`, responseText);
      
      if (!response.ok) {
        console.error(`API error: ${response.status} - ${responseText}`);
        throw new Error(`API error: ${response.status}`);
      }
      
      // Remove the user from the state
      setUsers(prev => prev.filter(user => user.id !== userId));
      
      // If the deleted user was selected, clear the selection
      if (selectedUser?.id === userId) {
        setSelectedUser(null);
      }
      
      toast({
        title: "User deleted",
        description: `User ${userToDelete.name} has been successfully deleted`,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, selectedUser, setUsers, setSelectedUser, setIsLoading, users]);

  return {
    handleToggleStatus,
    handleDeleteUser
  };
};
