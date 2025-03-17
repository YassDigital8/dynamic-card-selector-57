
import React from 'react';

interface FilterBadgeProps {
  count: number;
}

const FilterBadge: React.FC<FilterBadgeProps> = ({ count }) => {
  if (count === 0) return null;
  
  return (
    <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-300 text-xs">
      {count}
    </span>
  );
};

export default FilterBadge;
