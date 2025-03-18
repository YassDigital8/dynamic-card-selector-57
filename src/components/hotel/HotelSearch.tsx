
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

interface HotelSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const HotelSearch: React.FC<HotelSearchProps> = ({
  searchTerm,
  onSearchChange
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded-md">
      <div className="text-indigo-500 flex-shrink-0">
        <Search className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
      </div>
      <Input
        type="text"
        placeholder={isMobile ? "Search hotels..." : "Search hotels by name or location..."}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border-0 shadow-none rounded-md focus-visible:ring-1 focus-visible:ring-indigo-400 focus-visible:ring-offset-0 flex-grow"
        aria-label="Search hotels"
      />
    </div>
  );
};

export default HotelSearch;
