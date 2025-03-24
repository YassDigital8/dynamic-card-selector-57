
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FilterButtonProps {
  icon: React.ReactNode;
  label: string;
  activeValue?: string | number | null;
  badgeContent?: string | number;
  disabled?: boolean;
  children: React.ReactNode;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  icon,
  label,
  activeValue,
  badgeContent,
  disabled = false,
  children
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 gap-1 border-gray-200 dark:border-gray-700"
          disabled={disabled}
        >
          {icon}
          {label}
          {activeValue && <Badge variant="secondary" className="ml-1 px-1 py-0 h-5">{badgeContent || activeValue}</Badge>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700">
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default FilterButton;
