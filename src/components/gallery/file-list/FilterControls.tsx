
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from "@/components/ui/input";
import { Search, FileType, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

export interface FileTypeFilter {
  type: string;
  label: string;
  icon?: React.ReactNode;
}

export interface FilterControlsProps {
  selectedType: string;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  fileTypes?: FileTypeFilter[];
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  selectedType,
  setSelectedType,
  searchQuery,
  setSearchQuery,
  fileTypes = []
}) => {
  const hasActiveFilters = !!searchQuery || !!selectedType;
  
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedType('');
  };

  const defaultFileTypes: FileTypeFilter[] = [
    { type: 'image/jpeg', label: 'JPEG Images' },
    { type: 'image/png', label: 'PNG Images' },
    { type: 'application/pdf', label: 'PDF Documents' },
  ];

  const allFileTypes = fileTypes.length > 0 ? fileTypes : defaultFileTypes;
  
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search files..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Select value={selectedType} onValueChange={setSelectedType}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All file types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">
            <div className="flex items-center">
              <FileType className="h-4 w-4 mr-2" />
              All file types
            </div>
          </SelectItem>
          {allFileTypes.map((type) => (
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
          onClick={handleClearFilters} 
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
