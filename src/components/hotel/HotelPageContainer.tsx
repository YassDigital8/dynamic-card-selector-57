
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
  
  // Set initial panel size based on device, showing both panels by default
  const initialPanelSize = isMobile ? 60 : 55;
  const [panelSize, setPanelSize] = useState(initialPanelSize);

  useEffect(() => {
    // Adjust panel size when device type changes
    setPanelSize(isMobile ? 60 : 55);
  }, [isMobile]);

  // Effect to update panel size when selection changes
  useEffect(() => {
    if (selectedHotel || showAddForm || isEditing) {
      // Show more details when an item is selected
      const newPanelSize = isMobile ? 50 : 40;
      setPanelSize(newPanelSize);
      setIsExpanded(true);
    } else {
      // Default layout showing both panels
      const defaultSize = isMobile ? 60 : 55;
      setPanelSize(defaultSize);
    }
  }, [selectedHotel, showAddForm, isEditing, isMobile]);

  const handleSelectHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsEditing(false);
    setShowAddForm(false);
    setIsExpanded(true);
    
    // Adjust panel size when selecting a hotel
    const newPanelSize = isMobile ? 50 : 40;
    setPanelSize(newPanelSize);
  };

  const handleEditHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsEditing(true);
    setShowAddForm(false);
    setIsExpanded(true);
    
    // Similar panel adjustment for edit mode
    const newPanelSize = isMobile ? 50 : 40;
    setPanelSize(newPanelSize);
  };

  const handleAddHotel = () => {
    setSelectedHotel(null);
    setIsEditing(false);
    setShowAddForm(true);
    setIsExpanded(true);
    
    // Similar panel adjustment for add mode
    const newPanelSize = isMobile ? 50 : 40;
    setPanelSize(newPanelSize);
  };

  const handleBackToList = () => {
    // Restore default panel size
    const defaultSize = isMobile ? 60 : 55;
    setPanelSize(defaultSize);
    
    // Clear selection states
    setSelectedHotel(null);
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

  // Handle panel resize events
  const handlePanelResize = (sizes: number[]) => {
    setPanelSize(sizes[0]);
    // If the left panel is resized larger than 80%, consider it as collapsed detail view
    setIsExpanded(sizes[0] < 80);
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
        className="min-h-[calc(100vh-200px)] rounded-lg border border-indigo-100 dark:border-indigo-900 bg-white/90 dark:bg-slate-900/90 shadow-lg"
        onLayout={handlePanelResize}
      >
        <ResizablePanel 
          defaultSize={initialPanelSize} 
          minSize={isMobile ? 40 : 30} 
          maxSize={isMobile ? 100 : 70}
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
        
        <ResizableHandle withHandle className="transition-colors hover:bg-indigo-100 dark:hover:bg-indigo-800" />
        
        <ResizablePanel 
          defaultSize={100 - initialPanelSize} 
          minSize={isMobile ? 0 : 30} 
          maxSize={isMobile ? 60 : 70}
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
