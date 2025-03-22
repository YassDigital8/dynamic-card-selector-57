
import React, { useState, useEffect } from 'react';
import { HotelFormData } from '@/models/HotelModel';
import HotelPageHeader from './HotelPageHeader';
import HotelResizablePanels from './layout/HotelResizablePanels';
import { usePageSelectionViewModel } from '@/viewmodels/PageSelectionViewModel';
import useHotelNetwork from '@/hooks/hotel';
import useHotelFilters from '@/hooks/hotel/useHotelFilters';
import useHotelSelection from '@/hooks/hotel/useHotelSelection';
import usePanelSizing from '@/hooks/hotel/usePanelSizing';
import { motion } from 'framer-motion';
import HotelLoadingIndicator from './HotelLoadingIndicator';

const HotelPageContainer: React.FC = () => {
  const { posOptions } = usePageSelectionViewModel();
  const [selectedPOS, setSelectedPOS] = useState<string>('');
  const [dataLoaded, setDataLoaded] = useState(false);
  
  const {
    hotels,
    selectedHotel: networkSelectedHotel,
    isLoading,
    isEditing: networkIsEditing,
    isInitialized,
    setSelectedHotel: networkSetSelectedHotel,
    setIsEditing: networkSetIsEditing,
    addHotel,
    updateHotel,
    deleteHotel
  } = useHotelNetwork(selectedPOS);
  
  // Mark data as loaded once hotels are initialized and not loading
  useEffect(() => {
    if (isInitialized && !isLoading) {
      const timer = setTimeout(() => {
        setDataLoaded(true);
      }, 300); // Short delay to ensure smooth transition
      
      return () => clearTimeout(timer);
    }
  }, [isInitialized, isLoading]);
  
  const { filters, setFilters, filteredHotels } = useHotelFilters(hotels);
  
  const {
    selectedHotel,
    isEditing,
    showAddForm,
    isExpanded,
    isSelectingNewHotel,
    forceRefresh,
    handleSelectHotel,
    handleEditHotel,
    handleStartEdit,
    handleAddHotel,
    handleBackToList,
    handleSubmitEdit,
    handleCancelEdit
  } = useHotelSelection(updateHotel, deleteHotel);
  
  const { panelSize, setPanelSize } = usePanelSizing({
    selectedHotel,
    showAddForm,
    isEditing
  });

  // Log selected hotel changes for debugging
  useEffect(() => {
    if (selectedHotel) {
      console.log('HotelPageContainer - Selected hotel updated:', selectedHotel.id, forceRefresh);
    }
  }, [selectedHotel, forceRefresh]);

  const handleSubmitAdd = (data: HotelFormData) => {
    const hotelWithPOS = {
      ...data,
      posKey: selectedPOS === 'all' ? '' : selectedPOS
    };
    const result = addHotel(hotelWithPOS);
    if (result && result.success && result.hotel) {
      handleSelectHotel(result.hotel);
    } else {
      handleBackToList();
    }
  };

  const handleSubmitUpdate = (data: HotelFormData) => {
    handleSubmitEdit(data);
  };

  const getSelectedPOSName = () => {
    if (!selectedPOS || selectedPOS === 'all') return undefined;
    return posOptions.find(p => p.key.toLowerCase() === selectedPOS.toLowerCase())?.englishName;
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
    <motion.div 
      className="container mx-auto py-3 sm:py-4 md:py-6 space-y-4 sm:space-y-6 md:space-y-8 px-2 sm:px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <HotelPageHeader 
        selectedPOS={selectedPOS}
        onSelectPOS={setSelectedPOS}
        onAddHotel={handleAddHotel}
        filters={filters}
        onFilterChange={setFilters}
      />

      <HotelResizablePanels
        panelSize={panelSize}
        setPanelSize={setPanelSize}
        filteredHotels={filteredHotels}
        selectedHotel={selectedHotel}
        isSelectingNewHotel={isSelectingNewHotel}
        isLoading={isLoading}
        isEditing={isEditing}
        showAddForm={showAddForm}
        isExpanded={isExpanded}
        selectedPOS={selectedPOS}
        posName={getSelectedPOSName()}
        hasHotels={hotels.length > 0}
        onSelectHotel={handleSelectHotel}
        onEditHotel={handleEditHotel}
        onDeleteHotel={deleteHotel}
        onAddHotel={handleAddHotel}
        onBackToList={handleBackToList}
        onSubmitAdd={handleSubmitAdd}
        onSubmitEdit={handleSubmitUpdate}
        onCancelEdit={handleCancelEdit}
        onStartEdit={handleStartEdit}
      />
    </motion.div>
  );
};

export default HotelPageContainer;
