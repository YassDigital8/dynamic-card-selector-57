
import React from 'react';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HotelSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const HotelSearch: React.FC<HotelSearchProps> = ({
  searchTerm,
  onSearchChange
}) => {
  return (
    <div className="relative bg-white dark:bg-slate-800">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <SearchIcon className="h-4 w-4 text-indigo-500" />
      </div>
      <Input
        type="text"
        placeholder="Search hotels by name or location..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 border-0 rounded-none focus-visible:ring-1 focus-visible:ring-indigo-400 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default HotelSearch;
