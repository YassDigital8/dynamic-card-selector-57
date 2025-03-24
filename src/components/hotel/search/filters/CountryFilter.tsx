
import React from 'react';
import { MapPin } from 'lucide-react';
import FilterButton from '../FilterButton';
import FilterGroup from '../FilterGroup';
import CheckboxFilter from '../CheckboxFilter';

interface CountryFilterProps {
  countries: string[];
  selectedCountry: string | null;
  onCountryChange: (country: string | null) => void;
  disabled?: boolean;
}

const CountryFilter: React.FC<CountryFilterProps> = ({
  countries,
  selectedCountry,
  onCountryChange,
  disabled = false
}) => {
  return (
    <FilterButton 
      icon={<MapPin className="h-3.5 w-3.5 text-indigo-500" />}
      label="Country"
      activeValue={selectedCountry}
      disabled={disabled}
    >
      <FilterGroup title="Countries">
        {countries.map((country) => (
          <CheckboxFilter
            key={country}
            id={`country-${country}`}
            label={country}
            checked={selectedCountry === country}
            onCheckedChange={() => onCountryChange(selectedCountry === country ? null : country)}
          />
        ))}
      </FilterGroup>
    </FilterButton>
  );
};

export default CountryFilter;
