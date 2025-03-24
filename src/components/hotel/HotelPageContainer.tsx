
import React, { useState, useEffect } from 'react';
import { HotelFormData } from '@/models/HotelModel';
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
      <div className="container mx-auto py-3 sm:py-4 md:py-6 h-full">
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
      <div className="w-full p-2 sm:p-4">
        <Card className="h-full overflow-hidden border-indigo-100 dark:border-indigo-900 shadow-md bg-white dark:bg-slate-900 rounded-xl">
          <ScrollArea 
            className="h-[calc(100vh-130px)] sm:h-[calc(100vh-140px)] md:h-[calc(100vh-145px)] lg:h-[calc(100vh-150px)] overflow-y-auto"
          >
            <HotelList
              hotels={filteredHotels}
              selectedHotel={null}
              onSelectHotel={() => {}}
              onEditHotel={() => {}}
              onDeleteHotel={() => {}}
              isEditing={false}
            />
          </ScrollArea>
        </Card>
      </div>
    </PageContentWrapper>
  );
};

export default HotelPageContainer;
