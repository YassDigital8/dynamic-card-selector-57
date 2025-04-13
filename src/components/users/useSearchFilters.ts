
import { useState, useCallback, useMemo } from 'react';
import { User } from '@/types/user.types';

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
        if (searchFilters.status === 'active' && !user.isActive) {
          return false;
        }
        if (searchFilters.status === 'inactive' && user.isActive) {
          return false;
        }
      }
      
      return true;
    });
  }, [users, searchFilters]);

  return {
    searchFilters,
    updateFilter,
    resetFilters,
    filteredUsers
  };
};

export default useSearchFilters;
