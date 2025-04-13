
import { useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { fetchAllUsers } from './api/operations/fetchUsers';
import { useUserState } from './state/useUserState';
import { getUserPrivileges, getModulePermissions } from './data/userPrivilegeData';
import { mockUsers } from '@/services/users/mockData';
import useAuthentication from '@/hooks/useAuthentication';

export const useUserData = () => {
  const { users, setUsers, selectedUser, setSelectedUser, isLoading, setIsLoading } = useUserState();
  const { toast } = useToast();
  const { authToken, demoMode } = useAuthentication();
  
  const userPrivileges = getUserPrivileges();
  const modulePermissions = getModulePermissions();

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      // Only attempt to fetch if there's an auth token and not in demo mode
      if (!authToken || demoMode) {
        console.log("No auth token available or in demo mode, using mock data");
        setUsers(mockUsers);
        return;
      }

      console.log("Attempting to fetch users with auth token");
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
        description: "Failed to load users. Using mock data.",
        variant: "destructive",
      });
      // If API fails, fall back to mock data for demo purposes
      setUsers(mockUsers);
    } finally {
      setIsLoading(false);
    }
  }, [toast, setUsers, setIsLoading, authToken, demoMode]);

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
