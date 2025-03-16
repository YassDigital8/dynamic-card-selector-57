
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  fileTypes?: string[];
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  fileTypes = []
}) => {
  // Group and format file types for display
  const uniqueFileTypes = Array.from(new Set(fileTypes)).sort();
  
  const getTypeLabel = (type: string): string => {
    if (type.startsWith('image/')) return `Image (${type.split('/')[1]})`;
    if (type.startsWith('video/')) return `Video (${type.split('/')[1]})`;
    if (type.startsWith('audio/')) return `Audio (${type.split('/')[1]})`;
    if (type === 'application/pdf') return 'PDF Document';
    return type.split('/').pop() || type;
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>
      
      <Select
        value={selectedType}
        onValueChange={setSelectedType}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="All file types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All file types</SelectItem>
          {uniqueFileTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {getTypeLabel(type)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
