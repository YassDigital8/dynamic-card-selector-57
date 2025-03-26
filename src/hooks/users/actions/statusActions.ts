
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/types/user.types';
import { toggleUserStatus, deleteUser } from '@/services/userService';

export const useStatusActions = (
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { toast } = useToast();

  const handleToggleStatus = useCallback((userId: string) => {
    setIsLoading(true);
    try {
      const updatedUser = toggleUserStatus(userId);
      if (updatedUser) {
        setUsers(prev => prev.map(user => user.id === userId ? updatedUser : user));
        if (selectedUser?.id === userId) {
          setSelectedUser(updatedUser);
        }
        toast({
          title: "Status updated",
          description: `User status set to ${updatedUser.isActive ? 'active' : 'inactive'}`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, selectedUser, setUsers, setSelectedUser, setIsLoading]);

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
