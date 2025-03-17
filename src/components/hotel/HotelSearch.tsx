
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface HotelSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const HotelSearch: React.FC<HotelSearchProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search hotels..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-8"
      />
    </div>
  );
};

export default HotelSearch;
