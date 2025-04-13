
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

// Define the structure for multiple status filters
export interface StatusFilters {
  isactive?: boolean;
  islocked?: boolean;
  isfrozen?: boolean;
  isdeleted?: boolean;
}

// Convert selected status values to API filter parameters
export const getStatusFiltersFromValues = (selectedStatuses: string[]): StatusFilters => {
  // If 'all' is selected or no statuses are selected, return empty object (no filters)
  if (selectedStatuses.includes('all') || selectedStatuses.length === 0) {
    return {};
  }
  
  // Initialize all statuses to false
  const filters: StatusFilters = {
    isactive: false,
    islocked: false,
    isfrozen: false,
    isdeleted: false
  };
  
  // Set selected statuses to true
  selectedStatuses.forEach(status => {
    if (status === 'active') filters.isactive = true;
    if (status === 'locked') filters.islocked = true;
    if (status === 'frozen') filters.isfrozen = true;
    if (status === 'deleted') filters.isdeleted = true;
  });
  
  return filters;
};

// Build filter query string for API request
export const buildStatusFilterQueryString = (filters: StatusFilters): string => {
  if (Object.keys(filters).length === 0) return '';
  
  const filterParams: string[] = [];
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      filterParams.push(`${key}=${value}`);
    }
  });
  
  return filterParams.length > 0 ? `&filters=${filterParams.join(',')}` : '';
};
