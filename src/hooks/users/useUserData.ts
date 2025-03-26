
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/types/user.types';
import { getUsersList, userPrivileges, modulePermissions } from '@/services/userService';

export const useUserData = () => {
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
