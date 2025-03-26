
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

  const handleUpdateModuleRole = useCallback((userId: string, moduleId: ModuleType, newRole: UserPrivilege) => {
    setIsLoading(true);
    try {
      const updatedUser = updateUserModuleRole(userId, moduleId, newRole);
      if (updatedUser) {
        setUsers(prev => prev.map(user => user.id === userId ? updatedUser : user));
        if (selectedUser?.id === userId) {
          setSelectedUser(updatedUser);
        }
        toast({
          title: "Module role updated",
          description: `User's role for ${moduleId} module updated to ${newRole}`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update module role",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, selectedUser, setUsers, setSelectedUser, setIsLoading]);

  return {
    handleUpdateRole,
    handleUpdateModuleRole
  };
};
