
import React from 'react';
import { Button } from '@/components/ui/button';

interface ClearFiltersButtonProps {
  activeFilterCount: number;
  onClearFilters: () => void;
  disabled?: boolean;
}

const ClearFiltersButton: React.FC<ClearFiltersButtonProps> = ({
  activeFilterCount,
  onClearFilters,
  disabled = false
}) => {
  if (activeFilterCount === 0) return null;
  
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={onClearFilters}
      className="h-8 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      disabled={disabled}
    >
      Clear filters ({activeFilterCount})
    </Button>
  );
};

export default ClearFiltersButton;
