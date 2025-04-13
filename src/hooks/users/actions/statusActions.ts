
import { User } from '@/types/user.types';
import { toast } from '@/hooks/use-toast';
import { toggleUserStatus, deleteUser } from '../api/userApi';

export const useStatusActions = (
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const handleToggleStatus = async (userId: string) => {
    try {
      setIsLoading(true);
      
      // Find the user and determine their current status
      const user = users.find(u => u.id === userId);
      if (!user) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "User not found",
        });
        return;
      }
      
      // Toggle status via API
      await toggleUserStatus(userId, !user.isActive);
      
      // Update local state
      setUsers(users.map(u => 
        u.id === userId 
          ? { ...u, isActive: !u.isActive } 
          : u
      ));
      
      // Update selected user if it's the one being edited
      if (selectedUser?.id === userId) {
        setSelectedUser({
          ...selectedUser,
          isActive: !selectedUser.isActive
        });
      }
      
      toast({
        title: "Status Updated",
        description: `User is now ${user.isActive ? 'inactive' : 'active'}`,
      });
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

  const handleDeleteUser = async (userId: string) => {
    try {
      setIsLoading(true);
      
      // Delete user via API
      await deleteUser(userId);
      
      // Update local state
      setUsers(users.filter(u => u.id !== userId));
      
      // Clear selection if the deleted user was selected
      if (selectedUser?.id === userId) {
        setSelectedUser(null);
      }
      
      toast({
        title: "User Deleted",
        description: "User has been successfully deleted",
      });
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
