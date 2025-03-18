import React, { useState, useEffect } from 'react';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import HotelPageHeader from './HotelPageHeader';
import HotelListPanel from './layout/HotelListPanel';
import HotelContentPanel from './layout/HotelContentPanel';
import { usePageSelectionViewModel } from '@/viewmodels/PageSelectionViewModel';
import useHotelNetwork from '@/hooks/hotel';
import useHotelFilters from '@/hooks/hotel/useHotelFilters';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

const HotelPageContainer: React.FC = () => {
  const { posOptions } = usePageSelectionViewModel();
  const [selectedPOS, setSelectedPOS] = useState<string>('');
  const isMobile = useIsMobile();
  
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
  
  // Set fixed panel sizes for consistency 
  const initialLeftPanelSize = isMobile ? 50 : 40; // Smaller on desktop to show more details
  const [panelSize, setPanelSize] = useState(initialLeftPanelSize);

  // Always have a hotel selected if available (for the initial view)
  useEffect(() => {
    if (hotels.length > 0 && !selectedHotel && !showAddForm && !isEditing) {
      setSelectedHotel(hotels[0]);
    }
  }, [hotels, selectedHotel, showAddForm, isEditing, setSelectedHotel]);

  // Effect to handle panel size based on device type
  useEffect(() => {
    setPanelSize(isMobile ? 50 : 40);
  }, [isMobile]);

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
    if (hotels.length > 0) {
      // Keep the first hotel selected for the side-by-side view
      setSelectedHotel(hotels[0]);
    } else {
      setSelectedHotel(null);
    }
    setShowAddForm(false);
    setIsEditing(false);
  };

  const handleSubmitAdd = (data: HotelFormData) => {
    // Include the selected POS in the new hotel data
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

  // We'll disable the panel resize to maintain the fixed position
  const handlePanelResize = (sizes: number[]) => {
    // Keep the size fixed to our desired values
    setPanelSize(initialLeftPanelSize);
    setIsExpanded(true);
  };

  return (
    <motion.div 
      className="container mx-auto py-6 space-y-8"
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
        className="min-h-[calc(100vh-200px)] rounded-lg border border-indigo-100 dark:border-indigo-900 bg-white dark:bg-slate-900 shadow-lg"
        onLayout={handlePanelResize}
      >
        <ResizablePanel 
          defaultSize={initialLeftPanelSize} 
          minSize={isMobile ? 40 : 30}
          maxSize={isMobile ? 60 : 50}
          // Lock the size to prevent resizing
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
          defaultSize={100 - initialLeftPanelSize}
          minSize={isMobile ? 40 : 50}
          maxSize={isMobile ? 60 : 70}
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
