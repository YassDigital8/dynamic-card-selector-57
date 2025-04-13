
import { User } from '@/types/user.types';
import { toast } from '@/hooks/use-toast';
import { toggleUserStatus, deleteUser } from '../api/operations';

export const useStatusActions = (
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // Toggle user active status
  const handleToggleStatus = async (userId: string) => {
    try {
      setIsLoading(true);
      
      // Find user to toggle
      const userToToggle = users.find(u => u.id === userId);
      if (!userToToggle) {
        throw new Error("User not found");
      }
      
      // Call API to toggle status
      await toggleUserStatus(userId, !userToToggle.isActive);
      
      // Update local state
      const updatedUsers = users.map(u => {
        if (u.id === userId) {
          return { ...u, isActive: !u.isActive };
        }
        return u;
      });
      
      setUsers(updatedUsers);
      
      // Update selected user if it's the one being toggled
      if (selectedUser?.id === userId) {
        setSelectedUser({
          ...selectedUser,
          isActive: !selectedUser.isActive
        });
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update user status",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Delete user
  const handleDeleteUser = async (userId: string) => {
    try {
      setIsLoading(true);
      
      // Call API to delete user
      await deleteUser(userId);
      
      // Update local state
      setUsers(users.filter(u => u.id !== userId));
      
      // Clear selected user if it's the one being deleted
      if (selectedUser?.id === userId) {
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete user",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleToggleStatus,
    handleDeleteUser
  };
};
