
import React, { useState, useMemo } from 'react';
import { HotelFormData } from '@/models/HotelModel';
import HotelPageHeader from './HotelPageHeader';
import HotelResizablePanels from './layout/HotelResizablePanels';
import { usePageSelectionViewModel } from '@/viewmodels/PageSelectionViewModel';
import useHotelNetwork from '@/hooks/hotel';
import useHotelFilters from '@/hooks/hotel/useHotelFilters';
import useHotelSelection from '@/hooks/hotel/useHotelSelection';
import usePanelSizing from '@/hooks/hotel/usePanelSizing';
import { motion } from 'framer-motion';

const HotelPageContainer: React.FC = () => {
  const { posOptions } = usePageSelectionViewModel();
  const [selectedPOS, setSelectedPOS] = useState<string>('');
  
  const {
    hotels,
    selectedHotel: networkSelectedHotel,
    isLoading,
    isEditing: networkIsEditing,
    setSelectedHotel: networkSetSelectedHotel,
    setIsEditing: networkSetIsEditing,
    addHotel,
    updateHotel,
    deleteHotel
  } = useHotelNetwork(selectedPOS);
  
  // Setup filter state through the custom hook
  const { filters, setFilters, filteredHotels } = useHotelFilters(hotels);
  
  // Use the hotel selection hook to manage selection state
  const {
    selectedHotel,
    isEditing,
    showAddForm,
    isExpanded,
    isSelectingNewHotel,
    handleSelectHotel,
    handleEditHotel,
    handleStartEdit,
    handleAddHotel,
    handleBackToList,
    handleSubmitEdit,
    handleCancelEdit
  } = useHotelSelection(updateHotel, deleteHotel);
  
  // Use the panel sizing hook
  const { panelSize, setPanelSize } = usePanelSizing({
    selectedHotel,
    showAddForm,
    isEditing
  });

  const handleSubmitAdd = (data: HotelFormData) => {
    const hotelWithPOS = {
      ...data,
      posKey: selectedPOS === 'all' ? '' : selectedPOS
    };
    addHotel(hotelWithPOS);
    handleBackToList();
  };

  const getSelectedPOSName = useMemo(() => {
    if (!selectedPOS || selectedPOS === 'all') return undefined;
    return posOptions.find(p => p.key.toLowerCase() === selectedPOS.toLowerCase())?.englishName;
  }, [selectedPOS, posOptions]);

  // Animation variants memoized to avoid recreation
  const pageAnimation = useMemo(() => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 }
  }), []);

  return (
    <motion.div 
      className="container mx-auto py-3 sm:py-4 md:py-6 space-y-4 sm:space-y-6 md:space-y-8 px-2 sm:px-4"
      {...pageAnimation}
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
        posName={getSelectedPOSName}
        hasHotels={hotels.length > 0}
        onSelectHotel={handleSelectHotel}
        onEditHotel={handleEditHotel}
        onDeleteHotel={deleteHotel}
        onAddHotel={handleAddHotel}
        onBackToList={handleBackToList}
        onSubmitAdd={handleSubmitAdd}
        onSubmitEdit={handleSubmitEdit}
        onCancelEdit={handleCancelEdit}
        onStartEdit={handleStartEdit}
      />
    </motion.div>
  );
};

export default HotelPageContainer;
