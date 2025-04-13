
// Define user status types
export type UserStatusType = 'active' | 'locked' | 'frozen' | 'deleted';

// Define status options with display values
export interface StatusOption {
  value: UserStatusType | 'all';
  label: string;
}

// Status constants for use throughout the application
export const USER_STATUSES: StatusOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'locked', label: 'Locked' },
  { value: 'frozen', label: 'Frozen' },
  { value: 'deleted', label: 'Deleted' }
];

// Export a function to get statuses for use in filters
export const getStatusOptions = (): StatusOption[] => {
  return [
    { value: 'all', label: 'All Statuses' },
    ...USER_STATUSES
  ];
};

// API status filter interface for the query parameters
export interface StatusFilters {
  isactive?: boolean;
  islocked?: boolean;
  isfrozen?: boolean;
  isdeleted?: boolean;
}

// Convert a status string to API filter parameters
export const getStatusFiltersFromValue = (statusValue: string): StatusFilters => {
  const filters: StatusFilters = {};
  
  if (statusValue === 'all') {
    // If 'all' is selected, return empty object (no filters)
    return {};
  }
  
  // Set only the selected status to true
  if (statusValue === 'active') filters.isactive = true;
  if (statusValue === 'locked') filters.islocked = true;
  if (statusValue === 'frozen') filters.isfrozen = true;
  if (statusValue === 'deleted') filters.isdeleted = true;
  
  return filters;
};

// Build filter query string for API request
export const buildStatusFilterQueryString = (filters: StatusFilters): string => {
  if (Object.keys(filters).length === 0) return '';
  
  const filterParams: string[] = [];
  
  if (filters.isactive) filterParams.push('isactive=true');
  if (filters.islocked) filterParams.push('islocked=true');
  if (filters.isfrozen) filterParams.push('isfrozen=true');
  if (filters.isdeleted) filterParams.push('isdeleted=true');
  
  return filterParams.length > 0 ? `&filters=${filterParams.join(',')}` : '';
};
