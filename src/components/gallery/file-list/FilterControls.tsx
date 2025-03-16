
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { FileType, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface FileTypeFilter {
  type: string;
  label: string;
  icon?: React.ReactNode;
}

export interface FilterControlsProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  onClearFilters: () => void;
  fileTypes: FileTypeFilter[];
  hasActiveFilters: boolean;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  selectedType,
  onTypeChange,
  onClearFilters,
  fileTypes,
  hasActiveFilters
}) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground hidden md:inline">Filter:</span>
      <Select value={selectedType} onValueChange={onTypeChange}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="All file types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            <div className="flex items-center">
              <FileType className="h-4 w-4 mr-2" />
              All file types
            </div>
          </SelectItem>
          {fileTypes.map((type) => (
            <SelectItem key={type.type} value={type.type}>
              <div className="flex items-center">
                {type.icon || <FileType className="h-4 w-4 mr-2" />}
                {type.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {hasActiveFilters && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearFilters} 
          className="h-8 px-2"
        >
          <Badge variant="outline" className="gap-1 px-2 py-0">
            <Filter className="h-3 w-3" />
            Clear
          </Badge>
        </Button>
      )}
    </div>
  );
};
