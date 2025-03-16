
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ArrowDownAZ, ArrowDownUp, ArrowUpDown, CalendarDays, File } from 'lucide-react';

export type SortField = 'name' | 'size' | 'type' | 'uploadedOn';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

interface SortControlsProps {
  sortConfig: SortConfig;
  onSortChange: (field: SortField) => void;
}

export const SortControls: React.FC<SortControlsProps> = ({ sortConfig, onSortChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground mr-2">Sort by:</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            {sortConfig.field === 'name' && <ArrowDownAZ className="h-4 w-4 mr-2" />}
            {sortConfig.field === 'size' && <ArrowDownUp className="h-4 w-4 mr-2" />}
            {sortConfig.field === 'type' && <File className="h-4 w-4 mr-2" />}
            {sortConfig.field === 'uploadedOn' && <CalendarDays className="h-4 w-4 mr-2" />}
            {sortConfig.field.charAt(0).toUpperCase() + sortConfig.field.slice(1)}
            <ArrowUpDown className={`h-4 w-4 ml-2 ${sortConfig.direction === 'asc' ? 'rotate-180' : ''}`} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onSortChange('name')}>
            <ArrowDownAZ className="h-4 w-4 mr-2" />
            Name
            {sortConfig.field === 'name' && (
              <ArrowUpDown className={`h-4 w-4 ml-2 ${sortConfig.direction === 'asc' ? 'rotate-180' : ''}`} />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange('size')}>
            <ArrowDownUp className="h-4 w-4 mr-2" />
            Size
            {sortConfig.field === 'size' && (
              <ArrowUpDown className={`h-4 w-4 ml-2 ${sortConfig.direction === 'asc' ? 'rotate-180' : ''}`} />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange('type')}>
            <File className="h-4 w-4 mr-2" />
            Type
            {sortConfig.field === 'type' && (
              <ArrowUpDown className={`h-4 w-4 ml-2 ${sortConfig.direction === 'asc' ? 'rotate-180' : ''}`} />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange('uploadedOn')}>
            <CalendarDays className="h-4 w-4 mr-2" />
            Upload Date
            {sortConfig.field === 'uploadedOn' && (
              <ArrowUpDown className={`h-4 w-4 ml-2 ${sortConfig.direction === 'asc' ? 'rotate-180' : ''}`} />
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
