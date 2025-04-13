
// Define user status types
export type UserStatusType = 'active' | 'locked' | 'frozen' | 'deleted';

// Define status options with display values
export interface StatusOption {
  value: UserStatusType;
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
    { value: 'all', label: 'All Statuses' } as StatusOption,
    ...USER_STATUSES
  ];
};
