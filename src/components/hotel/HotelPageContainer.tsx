
import React, { useState, useEffect } from 'react';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import HotelPageHeader from './HotelPageHeader';
import HotelListPanel from './layout/HotelListPanel';
import HotelContentPanel from './layout/HotelContentPanel';
import { usePageSelectionViewModel } from '@/viewmodels/PageSelectionViewModel';
import useHotelNetwork from '@/hooks/hotel';
import useHotelFilters from '@/hooks/hotel/useHotelFilters';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { useIsMobile, useScreenSize } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

const HotelPageContainer: React.FC = () => {
  const { posOptions } = usePageSelectionViewModel();
  const [selectedPOS, setSelectedPOS] = useState<string>('');
  const isMobile = useIsMobile();
  const screenSize = useScreenSize();
  
  const {
    hotels,
    selectedHotel,
    isLoading,
    isEditing,
    setSelectedHotel,
    setIsEditing,
    addHotel,
    updateHotel,
    deleteHotel
  } = useHotelNetwork(selectedPOS);
  
  // Setup filter state through the custom hook
  const { filters, setFilters, filteredHotels } = useHotelFilters(hotels);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Set dynamic panel sizes based on whether there's a selected hotel
  const getInitialLeftPanelSize = () => {
    // If no hotel is selected and not adding or editing, make the list panel wider
    const hasSelectedContent = selectedHotel || showAddForm || isEditing;
    
    if (!hasSelectedContent) {
      // Make panel wider when nothing is selected
      if (screenSize.width < 640) return 65; // Mobile
      if (screenSize.width < 1024) return 60; // Tablet
      return 55; // Desktop
    } else {
      // Normal size when something is selected
      if (screenSize.width < 640) return 50; // Mobile
      if (screenSize.width < 1024) return 45; // Tablet
      return 40; // Desktop
    }
  };

  const [panelSize, setPanelSize] = useState(getInitialLeftPanelSize());

  // Effect to handle panel size based on device type and selection state
  useEffect(() => {
    setPanelSize(getInitialLeftPanelSize());
  }, [screenSize.width, selectedHotel, showAddForm, isEditing]);

  const handleSelectHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsEditing(false);
    setShowAddForm(false);
    setIsExpanded(true);
  };

  const handleEditHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsEditing(true);
    setShowAddForm(false);
    setIsExpanded(true);
  };

  const handleAddHotel = () => {
    setSelectedHotel(null);
    setIsEditing(false);
    setShowAddForm(true);
    setIsExpanded(true);
  };

  const handleBackToList = () => {
    setSelectedHotel(null);
    setShowAddForm(false);
    setIsEditing(false);
  };

  const handleSubmitAdd = (data: HotelFormData) => {
    const hotelWithPOS = {
      ...data,
      posKey: selectedPOS === 'all' ? '' : selectedPOS
    };
    addHotel(hotelWithPOS);
    setShowAddForm(false);
  };

  const handleSubmitEdit = (data: HotelFormData) => {
    if (selectedHotel) {
      updateHotel(selectedHotel.id, data);
      setIsEditing(false);
    }
  };
  
  const handleCancelEdit = () => setIsEditing(false);

  const getSelectedPOSName = () => {
    if (!selectedPOS || selectedPOS === 'all') return undefined;
    return posOptions.find(p => p.key.toLowerCase() === selectedPOS.toLowerCase())?.englishName;
  };

  return (
    <motion.div 
      className="container mx-auto py-3 sm:py-4 md:py-6 space-y-4 sm:space-y-6 md:space-y-8 px-2 sm:px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HotelPageHeader 
        selectedPOS={selectedPOS}
        onSelectPOS={setSelectedPOS}
        onAddHotel={handleAddHotel}
        filters={filters}
        onFilterChange={setFilters}
      />

      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[calc(100vh-180px)] sm:min-h-[calc(100vh-200px)] rounded-lg border border-indigo-100 dark:border-indigo-900 bg-white dark:bg-slate-900 shadow-lg"
        onLayout={(sizes) => {
          // This will run when the panels are resized by the user
          if (sizes.length > 0) {
            setPanelSize(sizes[0]);
          }
        }}
      >
        <ResizablePanel 
          defaultSize={panelSize}
          minSize={35}
          maxSize={65} // Increased max size to allow wider panel when needed
          className="transition-all duration-300"
        >
          <HotelListPanel 
            filteredHotels={filteredHotels}
            selectedHotel={selectedHotel}
            isExpanded={!isExpanded}
            onSelectHotel={handleSelectHotel}
            onEditHotel={handleEditHotel}
            onDeleteHotel={deleteHotel}
            panelSize={panelSize}
          />
        </ResizablePanel>
        
        <ResizableHandle withHandle className="transition-colors bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800" />
        
        <ResizablePanel 
          defaultSize={100 - panelSize}
          minSize={35} // Decreased min size to allow left panel to be wider
          maxSize={65}
          className="transition-all duration-300"
        >
          <HotelContentPanel 
            selectedHotel={selectedHotel}
            isLoading={isLoading}
            isEditing={isEditing}
            showAddForm={showAddForm}
            isExpanded={isExpanded}
            selectedPOS={selectedPOS}
            posName={getSelectedPOSName()}
            hasHotels={hotels.length > 0}
            onAddHotel={handleAddHotel}
            onBackToList={handleBackToList}
            onSubmitAdd={handleSubmitAdd}
            onSubmitEdit={handleSubmitEdit}
            onCancelEdit={handleCancelEdit}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </motion.div>
  );
};

export default HotelPageContainer;
