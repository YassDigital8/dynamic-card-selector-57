
import React from 'react';
import { MapPin } from 'lucide-react';
import { 
  DropdownMenuItem,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';

interface CountryFiltersProps {
  countryFilter: string | null;
  onCountryChange: (country: string | null) => void;
}

const CountryFilters: React.FC<CountryFiltersProps> = ({
  countryFilter,
  onCountryChange
}) => {
  return (
    <>
      <DropdownMenuLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Country
      </DropdownMenuLabel>
      {['UAE', 'Saudi Arabia', 'Bahrain', 'Qatar'].map(country => (
        <DropdownMenuItem 
          key={country} 
          className="flex items-center gap-2"
          onSelect={() => onCountryChange(country === countryFilter ? null : country)}
        >
          <MapPin className="h-4 w-4 text-indigo-500" />
          <span>{country}</span>
          {countryFilter === country && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
      ))}
    </>
  );
};

export default CountryFilters;
