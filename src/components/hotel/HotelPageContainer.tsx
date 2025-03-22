
import React, { useState, useEffect } from 'react';
import { HotelFormData } from '@/models/HotelModel';
import HotelResizablePanels from './layout/HotelResizablePanels';
import { usePageSelectionViewModel } from '@/viewmodels/PageSelectionViewModel';
import { useHotelNetwork, useHotelFilters, useHotelSelection, usePanelSizing } from '@/hooks/hotel';
import { useHotelLoadingState } from '@/hooks/hotel/useHotelLoadingState';
import HotelLoadingIndicator from './HotelLoadingIndicator';
import PageContentWrapper from './layout/PageContentWrapper';

const HotelPageContainer: React.FC = () => {
  const { posOptions } = usePageSelectionViewModel();
  const [selectedPOS, setSelectedPOS] = useState<string>('');
  
  const {
    hotels,
    isLoading,
    isInitialized,
    addHotel,
    updateHotel,
    deleteHotel
  } = useHotelNetwork(selectedPOS);
  
  // Use the extracted loading state hook
  const { dataLoaded } = useHotelLoadingState({
    isInitialized,
    isLoading
  });
  
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
    <PageContentWrapper
      selectedPOS={selectedPOS}
      onSelectPOS={setSelectedPOS}
      onAddHotel={handleAddHotel}
      filters={filters}
      onFilterChange={setFilters}
    >
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
    </PageContentWrapper>
  );
};

export default HotelPageContainer;
