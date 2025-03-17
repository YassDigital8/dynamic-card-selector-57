
import React from 'react';
import { Search } from 'lucide-react';
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
    <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800">
      <div className="text-indigo-500 flex-shrink-0">
        <Search className="h-5 w-5" />
      </div>
      <Input
        type="text"
        placeholder="Search hotels by name or location..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border-0 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-400 focus-visible:ring-offset-0 flex-grow"
      />
    </div>
  );
};

export default HotelSearch;
