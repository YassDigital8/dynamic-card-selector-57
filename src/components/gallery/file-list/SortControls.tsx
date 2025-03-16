
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ArrowUpDown, ArrowDown, ArrowUp } from 'lucide-react';
import type { SortConfig, SortControlsProps } from './useSortedFiles';

export const SortControls: React.FC<SortControlsProps> = ({ 
  sortConfig, 
  onSortChange 
}) => {
  const handleSortChange = (field: SortConfig['field']) => {
    const direction = 
      field === sortConfig.field && sortConfig.direction === 'asc'
        ? 'desc'
        : 'asc';
        
    onSortChange({ field, direction });
  };
  
  const getSortIcon = () => {
    if (sortConfig.direction === 'asc') {
      return <ArrowUp className="h-4 w-4" />;
    }
    return <ArrowDown className="h-4 w-4" />;
  };
  
  const getSortLabel = () => {
    const fieldLabels = {
      name: 'Name',
      uploadedOn: 'Date',
      size: 'Size',
      type: 'Type'
    };
    
    return `${fieldLabels[sortConfig.field]} (${sortConfig.direction === 'asc' ? 'A-Z' : 'Z-A'})`;
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1 h-9">
          <ArrowUpDown className="h-3.5 w-3.5 mr-1" />
          <span>Sort by:</span>
          <span className="font-medium">{getSortLabel()}</span>
          {getSortIcon()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => handleSortChange('name')}>
          Name
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSortChange('uploadedOn')}>
          Upload Date
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSortChange('size')}>
          File Size
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSortChange('type')}>
          File Type
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
