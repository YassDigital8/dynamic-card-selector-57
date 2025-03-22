
import React from 'react';
import { motion } from 'framer-motion';
import HotelPageHeader from '../HotelPageHeader';
import { FilterOptions } from '../HotelFilters';

interface PageContentWrapperProps {
  children: React.ReactNode;
  selectedPOS: string;
  onSelectPOS: (pos: string) => void;
  onAddHotel: () => void;
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const PageContentWrapper: React.FC<PageContentWrapperProps> = ({
  children,
  selectedPOS,
  onSelectPOS,
  onAddHotel,
  filters,
  onFilterChange
}) => {
  return (
    <motion.div 
      className="container mx-auto py-3 sm:py-4 md:py-6 space-y-4 sm:space-y-6 md:space-y-8 px-2 sm:px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <HotelPageHeader 
        selectedPOS={selectedPOS}
        onSelectPOS={onSelectPOS}
        onAddHotel={onAddHotel}
        filters={filters}
        onFilterChange={onFilterChange}
      />

      {children}
    </motion.div>
  );
};

export default PageContentWrapper;
