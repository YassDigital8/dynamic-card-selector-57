
import React from 'react';
import { Clock } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  DropdownMenuItem,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';

interface DateFiltersProps {
  showOnlyNewest: boolean;
  onNewestToggle: () => void;
}

const DateFilters: React.FC<DateFiltersProps> = ({
  showOnlyNewest,
  onNewestToggle
}) => {
  return (
    <>
      <DropdownMenuLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Date
      </DropdownMenuLabel>
      <DropdownMenuItem className="flex items-center justify-between" onSelect={(e) => e.preventDefault()}>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-indigo-500" />
          <span>Newest First</span>
        </div>
        <Checkbox 
          checked={showOnlyNewest}
          onCheckedChange={onNewestToggle} 
          className="data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
        />
      </DropdownMenuItem>
    </>
  );
};

export default DateFilters;
