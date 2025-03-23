
import { useState, useCallback, useMemo } from 'react';
import { User, UserPrivilege } from '@/types/user.types';

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
    department: '',
    status: ''
  });

  // Get unique departments for filter dropdown
  const departments = useMemo(() => {
    const deptSet = new Set<string>();
    users.forEach(user => {
      if (user.department) {
        deptSet.add(user.department);
      }
    });
    return Array.from(deptSet).sort();
  }, [users]);

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
      department: '',
      status: ''
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
      if (searchFilters.department && user.department !== searchFilters.department) {
        return false;
      }
      
      // Status filter
      if (searchFilters.status) {
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
    filteredUsers,
    departments
  };
};

export default useSearchFilters;
