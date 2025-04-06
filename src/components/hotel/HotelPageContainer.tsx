
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hotel } from '@/models/HotelModel';
import { usePageSelectionViewModel } from '@/viewmodels/PageSelectionViewModel';
import { useHotelNetwork, useHotelFilters } from '@/hooks/hotel';
import { useHotelLoadingState } from '@/hooks/hotel/useHotelLoadingState';
import HotelLoadingIndicator from './HotelLoadingIndicator';
import PageContentWrapper from './layout/PageContentWrapper';
import HotelList from './HotelList';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { isInDemoMode } from '@/services/authService';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const HotelPageContainer: React.FC = () => {
  const navigate = useNavigate();
  const { posOptions } = usePageSelectionViewModel();
  const [selectedPOS, setSelectedPOS] = useState<string>('');
  const demoMode = isInDemoMode();
  
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
      <div className="w-full h-[calc(100vh-60px)]">
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
      {demoMode && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
            <Info className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <AlertTitle className="text-amber-800 dark:text-amber-300">Demo Mode Active</AlertTitle>
            <AlertDescription className="text-amber-700 dark:text-amber-400">
              You are currently viewing mock hotel data. API requests are disabled in demo mode.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="w-full h-[calc(100vh-130px)]"
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
