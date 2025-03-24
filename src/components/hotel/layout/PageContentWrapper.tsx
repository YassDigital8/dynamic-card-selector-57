
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
      className="w-full h-full px-0 py-0 md:px-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <HotelPageHeader 
        title="Hotel Network"
        onAddHotel={onAddHotel}
        selectedPOS={selectedPOS}
        onSelectPOS={onSelectPOS}
        filters={filters}
        onFilterChange={onFilterChange}
      />

      {children}
    </motion.div>
  );
};

export default PageContentWrapper;
