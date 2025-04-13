
import { useState, useCallback, useMemo } from 'react';
import { User } from '@/types/user.types';
import { getStatusOptions } from '@/hooks/users/data/userStatusData';

type SearchFilters = {
  name: string;
  email: string;
  department: string;
};

export const useSearchFilters = (
  users: User[], 
  currentStatusFilter: string, 
  onStatusFilterChange: (value: string) => void
) => {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    name: '',
    email: '',
    department: 'all'
  });

  // Get status options for the dropdown
  const statusOptions = useMemo(() => getStatusOptions(), []);

  // Update a specific filter
  const updateFilter = useCallback((key: keyof SearchFilters | 'status', value: string) => {
    if (key === 'status') {
      // Status filter is now handled separately via API
      onStatusFilterChange(value);
    } else {
      setSearchFilters(prev => ({
        ...prev,
        [key]: value
      }));
    }
  }, [onStatusFilterChange]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setSearchFilters({
      name: '',
      email: '',
      department: 'all'
    });
    // Reset status filter to 'all'
    onStatusFilterChange('all');
  }, [onStatusFilterChange]);

  // Apply client-side filters (name, email, department) to users list
  // Status filtering is now handled server-side via API
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
      
      return true;
    });
  }, [users, searchFilters]);

  return {
    searchFilters,
    updateFilter,
    resetFilters,
    filteredUsers,
    statusOptions,
    currentStatusFilter
  };
};

export default useSearchFilters;
