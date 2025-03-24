
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
      <div className="mb-4">
        <HotelPageHeader 
          title="Hotel Network"
          onAddHotel={onAddHotel}
          selectedPOS={selectedPOS}
          onSelectPOS={onSelectPOS}
          filters={filters}
          onFilterChange={onFilterChange}
        />
      </div>

      <div className="relative">
        {/* Background decorative element */}
        <div className="absolute -z-10 top-20 right-10 w-64 h-64 bg-indigo-100/30 dark:bg-indigo-900/10 rounded-full blur-3xl" />
        <div className="absolute -z-10 top-40 left-20 w-72 h-72 bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl" />
        
        {children}
      </div>
    </motion.div>
  );
};

export default PageContentWrapper;
