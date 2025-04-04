
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePageSelectionViewModel } from '@/viewmodels/PageSelectionViewModel';
import { useHotelNetwork, useHotelFilters } from '@/hooks/hotel';
import { useHotelLoadingState } from '@/hooks/hotel/useHotelLoadingState';
import HotelLoadingIndicator from './HotelLoadingIndicator';
import PageContentWrapper from './layout/PageContentWrapper';
import HotelList from './HotelList';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';

const HotelPageContainer: React.FC = () => {
  const navigate = useNavigate();
  const { posOptions } = usePageSelectionViewModel();
  const [selectedPOS, setSelectedPOS] = useState<string>('');
  
  const {
    hotels,
    isLoading,
    isInitialized,
  } = useHotelNetwork(selectedPOS);
  
  // Use the extracted loading state hook
  const { dataLoaded } = useHotelLoadingState({
    isInitialized,
    isLoading
  });
  
  const { filters, setFilters, filteredHotels } = useHotelFilters(hotels);

  // Navigate to add hotel page
  const handleAddHotel = () => {
    navigate('/hotel/add');
  };

  // If data is not yet loaded, show the loading indicator
  if (!dataLoaded) {
    return (
      <div className="w-full h-[calc(100vh-150px)]">
        <HotelLoadingIndicator />
      </div>
    );
  }

  return (
    <PageContentWrapper
      selectedPOS={selectedPOS}
      onSelectPOS={setSelectedPOS}
      filters={filters}
      onFilterChange={setFilters}
      onAddHotel={handleAddHotel}
    >
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="w-full h-[calc(100vh-200px)]"
      >
        <Card className="h-full overflow-hidden border-indigo-100 dark:border-indigo-900 shadow-lg bg-white dark:bg-slate-900 rounded-xl">
          <ScrollArea 
            className="h-full w-full overflow-y-auto"
          >
            <HotelList
              hotels={filteredHotels}
              selectedHotel={null}
              onSelectHotel={(hotel) => navigate(`/hotel/view/${hotel.id}`)}
              onEditHotel={(hotel) => navigate(`/hotel/edit/${hotel.id}`)}
              onDeleteHotel={() => {}}
              isEditing={false}
            />
          </ScrollArea>
        </Card>
      </motion.div>
    </PageContentWrapper>
  );
};

export default HotelPageContainer;
