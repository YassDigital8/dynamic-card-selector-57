
import { useCallback, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { fetchAllUsers } from './api/operations/fetchUsers';
import { fetchDepartments } from './api/operations/fetchDepartments';
import { useUserState } from './state/useUserState';
import { getUserPrivileges, getModulePermissions } from './data/userPrivilegeData';
import { mockUsers } from '@/services/users/mockData';
import useAuthentication from '@/hooks/useAuthentication';
import { StatusFilters, getStatusFiltersFromValues } from './data/userStatusData';

export const useUserData = () => {
  const { users, setUsers, selectedUser, setSelectedUser, isLoading, setIsLoading } = useUserState();
  const { toast } = useToast();
  const { authToken, demoMode } = useAuthentication();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [departments, setDepartments] = useState<string[]>([]);
  const [currentStatusFilters, setCurrentStatusFilters] = useState<string[]>(['all']);
  const pageSize = 15;
  
  const userPrivileges = getUserPrivileges();
  const modulePermissions = getModulePermissions();

  const fetchUsers = useCallback(async (page: number = currentPage, statusFilters: string[] = currentStatusFilters) => {
    setIsLoading(true);
    try {
      // Convert status string to API filter parameters
      const apiStatusFilters = getStatusFiltersFromValues(statusFilters);
      
      // Update current status filter
      setCurrentStatusFilters(statusFilters);
      
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

      console.log(`Attempting to fetch users with auth token for page ${page} and filters`, apiStatusFilters);
      const { users: mappedUsers, totalCount } = await fetchAllUsers(page, pageSize, apiStatusFilters);
      
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
        variant: "destructive",
        title: "Error",
        description: "Failed to load users. Using mock data.",
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
  }, [toast, setUsers, setIsLoading, authToken, demoMode, currentPage, pageSize, currentStatusFilters]);

  // Fetch departments from API
  const loadDepartments = useCallback(async () => {
    try {
      if (!authToken || demoMode) {
        // For demo mode, we use a static list or extract from mock users
        const deptSet = new Set<string>();
        mockUsers.forEach(user => {
          if (user.department) {
            deptSet.add(user.department);
          }
        });
        setDepartments(Array.from(deptSet).sort());
        return;
      }

      const departmentsList = await fetchDepartments();
      console.log("Fetched departments:", departmentsList);
      setDepartments(departmentsList);
    } catch (error) {
      console.error("Error loading departments:", error);
      // Extract departments from users as fallback
      const deptSet = new Set<string>();
      users.forEach(user => {
        if (user.department) {
          deptSet.add(user.department);
        }
      });
      setDepartments(Array.from(deptSet).sort());
    }
  }, [authToken, demoMode, users]);

  // Handle page change
  const changePage = useCallback((page: number) => {
    setCurrentPage(page);
    fetchUsers(page, currentStatusFilters);
  }, [fetchUsers, currentStatusFilters]);

  // Apply status filter
  const applyStatusFilters = useCallback((statusValues: string[]) => {
    setCurrentPage(1); // Reset to first page when changing filters
    fetchUsers(1, statusValues);
  }, [fetchUsers]);

  // Load users when component mounts or when currentPage changes
  useEffect(() => {
    fetchUsers(currentPage, currentStatusFilters);
  }, [fetchUsers, currentPage, currentStatusFilters]);

  // Load departments when component mounts
  useEffect(() => {
    loadDepartments();
  }, [loadDepartments]);

  return {
    users,
    setUsers,
    selectedUser,
    setSelectedUser,
    isLoading,
    setIsLoading,
    fetchUsers,
    applyStatusFilters,
    currentStatusFilters,
    userPrivileges,
    modulePermissions,
    departments,
    pagination: {
      currentPage,
      totalPages,
      totalCount,
      pageSize,
      changePage
    }
  };
};
