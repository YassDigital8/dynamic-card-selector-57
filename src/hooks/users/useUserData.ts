
import { useCallback, useEffect, useState } from 'react';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 15;
  
  const userPrivileges = getUserPrivileges();
  const modulePermissions = getModulePermissions();

  const fetchUsers = useCallback(async (page: number = currentPage) => {
    setIsLoading(true);
    try {
      // Only attempt to fetch if there's an auth token and not in demo mode
      if (!authToken || demoMode) {
        console.log("No auth token available or in demo mode, using mock data");
        // For demo mode or no auth, we'll still simulate pagination with mock data
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginatedMockUsers = mockUsers.slice(start, end);
        setUsers(paginatedMockUsers);
        setTotalCount(mockUsers.length);
        setTotalPages(Math.ceil(mockUsers.length / pageSize));
        return;
      }

      console.log(`Attempting to fetch users with auth token for page ${page}`);
      const { users: mappedUsers, totalCount } = await fetchAllUsers(page, pageSize);
      
      setUsers(mappedUsers);
      setTotalCount(totalCount);
      setTotalPages(Math.ceil(totalCount / pageSize));
      
      toast({
        title: "Users loaded",
        description: `Showing page ${page} of ${Math.ceil(totalCount / pageSize)}`,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to load users. Using mock data.",
        variant: "destructive",
      });
      // If API fails, fall back to mock data for demo purposes
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedMockUsers = mockUsers.slice(start, end);
      setUsers(paginatedMockUsers);
      setTotalCount(mockUsers.length);
      setTotalPages(Math.ceil(mockUsers.length / pageSize));
    } finally {
      setIsLoading(false);
    }
  }, [toast, setUsers, setIsLoading, authToken, demoMode, currentPage, pageSize]);

  // Handle page change
  const changePage = useCallback((page: number) => {
    setCurrentPage(page);
    fetchUsers(page);
  }, [fetchUsers]);

  // Load users when component mounts or when currentPage changes
  useEffect(() => {
    fetchUsers(currentPage);
  }, [fetchUsers, currentPage]);

  return {
    users,
    setUsers,
    selectedUser,
    setSelectedUser,
    isLoading,
    setIsLoading,
    fetchUsers,
    userPrivileges,
    modulePermissions,
    pagination: {
      currentPage,
      totalPages,
      totalCount,
      pageSize,
      changePage
    }
  };
};
