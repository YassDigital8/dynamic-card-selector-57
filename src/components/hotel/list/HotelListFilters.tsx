
import React from 'react';
import { motion } from 'framer-motion';
import { HotelAmenities } from '@/models/HotelModel';
import HotelSearch from '../HotelSearch';

interface HotelListFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filters: {
    pos: string | null;
    country: string | null;
    amenities: { [K in keyof HotelAmenities]: boolean };
    stars: number | null;
    extendedFeatures: {
      extraBed: boolean;
      bankTransfer: boolean;
    };
  };
  onFilterChange: (filters: any) => void;
  disabled: boolean;
  hotels: any[];
}

const HotelListFilters: React.FC<HotelListFiltersProps> = ({
  searchTerm,
  onSearchChange,
  filters,
  onFilterChange,
  disabled,
  hotels
}) => {
  const springConfig = {
    type: "spring" as const,
    stiffness: 220,
    damping: 28,
    mass: 0.7
  };

  if (hotels.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="mb-4 w-full"
    >
      <HotelSearch 
        searchTerm={searchTerm} 
        onSearchChange={onSearchChange}
        filters={filters}
        onFilterChange={onFilterChange}
        disabled={disabled}
      />
    </motion.div>
  );
};

export default HotelListFilters;
