
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  UserPrivilege 
} from '@/types/user.types';
import { 
  getUsersList, 
  updateUserRole, 
  toggleUserStatus, 
  deleteUser, 
  addUser,
  userPrivileges,
  modulePermissions
} from '@/services/userService';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>(getUsersList());
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchUsers = useCallback(() => {
    setIsLoading(true);
    try {
      const userData = getUsersList();
      setUsers(userData);
      toast({
        title: "Users loaded",
        description: `Successfully loaded ${userData.length} users`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

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
          description: `User role updated to ${newRole}`,
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
  }, [toast, selectedUser]);

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
  }, [toast, selectedUser]);

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
  }, [toast, selectedUser]);

  const handleAddUser = useCallback((userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      const newUser = addUser(userData);
      setUsers(prev => [...prev, newUser]);
      toast({
        title: "User added",
        description: "New user has been successfully added",
      });
      return newUser;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add user",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return {
    users,
    selectedUser,
    setSelectedUser,
    isLoading,
    fetchUsers,
    handleUpdateRole,
    handleToggleStatus,
    handleDeleteUser,
    handleAddUser,
    userPrivileges,
    modulePermissions
  };
};

export default useUsers;
