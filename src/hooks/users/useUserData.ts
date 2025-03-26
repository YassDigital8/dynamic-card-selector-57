
import { useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { fetchAllUsers } from './api/userApi';
import { useUserState } from './state/useUserState';
import { getUserPrivileges, getModulePermissions } from './data/userPrivilegeData';

export const useUserData = () => {
  const { users, setUsers, selectedUser, setSelectedUser, isLoading, setIsLoading } = useUserState();
  const { toast } = useToast();
  
  const userPrivileges = getUserPrivileges();
  const modulePermissions = getModulePermissions();

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const mappedUsers = await fetchAllUsers();
      
      setUsers(mappedUsers);
      toast({
        title: "Users loaded",
        description: `Successfully loaded ${mappedUsers.length} users`,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to load users. Please try again later.",
        variant: "destructive",
      });
      // No fallback to mock data anymore
    } finally {
      setIsLoading(false);
    }
  }, [toast, setUsers, setIsLoading]);

  // Load users when component mounts
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
