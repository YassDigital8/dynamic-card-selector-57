
import { useState, useCallback, useMemo } from 'react';
import { User } from '@/types/user.types';
import { getStatusOptions, UserStatusType } from '@/hooks/users/data/userStatusData';

type SearchFilters = {
  name: string;
  email: string;
  department: string;
  status: string;
};

export const useSearchFilters = (users: User[]) => {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    name: '',
    email: '',
    department: 'all',
    status: 'all'
  });

  // Get status options for the dropdown
  const statusOptions = useMemo(() => getStatusOptions(), []);

  // Update a specific filter
  const updateFilter = useCallback((key: keyof SearchFilters, value: string) => {
    setSearchFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setSearchFilters({
      name: '',
      email: '',
      department: 'all',
      status: 'all'
    });
  }, []);

  // Apply filters to users list
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      // Name filter
      if (searchFilters.name && !user.name.toLowerCase().includes(searchFilters.name.toLowerCase())) {
        return false;
      }
      
      // Email filter
      if (searchFilters.email && !user.email.toLowerCase().includes(searchFilters.email.toLowerCase())) {
        return false;
      }
      
      // Department filter
      if (searchFilters.department !== 'all' && user.department !== searchFilters.department) {
        return false;
      }
      
      // Status filter
      if (searchFilters.status !== 'all') {
        // Map API status values to our constant values
        const userStatus = getUserStatusFromApiStatus(user.isActive, user.status);
        
        if (searchFilters.status !== userStatus) {
          return false;
        }
      }
      
      return true;
    });
  }, [users, searchFilters]);

  // Helper function to map API status to our constant statuses
  const getUserStatusFromApiStatus = (isActive: boolean, apiStatus?: string): string => {
    if (apiStatus?.toLowerCase() === 'deleted') return 'deleted';
    if (apiStatus?.toLowerCase() === 'frozen') return 'frozen';
    if (apiStatus?.toLowerCase() === 'locked') return 'locked';
    return isActive ? 'active' : 'inactive';
  };

  return {
    searchFilters,
    updateFilter,
    resetFilters,
    filteredUsers,
    statusOptions
  };
};

export default useSearchFilters;
