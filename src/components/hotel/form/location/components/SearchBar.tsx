
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Locate } from 'lucide-react';

interface SearchBarProps {
  address: string;
  onAddressChange: (value: string) => void;
  onSearch: () => void;
  onUseCurrentLocation: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  address,
  onAddressChange,
  onSearch,
  onUseCurrentLocation
}) => {
  // Handle "Enter" key press in the search input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch();
    }
  };

  return (
    <div className="flex space-x-2">
      <Input
        placeholder="Search for an address"
        value={address}
        onChange={(e) => onAddressChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1"
      />
      <Button type="button" onClick={onSearch} variant="outline">
        Search
      </Button>
      <Button 
        type="button" 
        onClick={onUseCurrentLocation} 
        variant="outline"
        title="Use current location"
      >
        <Locate className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SearchBar;
