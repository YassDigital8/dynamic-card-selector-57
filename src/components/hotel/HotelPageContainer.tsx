
import React, { useState, useEffect } from 'react';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import HotelPageHeader from './HotelPageHeader';
import HotelListPanel from './layout/HotelListPanel';
import HotelContentPanel from './layout/HotelContentPanel';
import { usePageSelectionViewModel } from '@/viewmodels/PageSelectionViewModel';
import useHotelNetwork from '@/hooks/hotel';
import useHotelFilters from '@/hooks/hotel/useHotelFilters';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

const HotelPageContainer: React.FC = () => {
  const { posOptions } = usePageSelectionViewModel();
  const [selectedPOS, setSelectedPOS] = useState<string>('');
  
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [panelSize, setPanelSize] = useState(100);

  // Effect to ensure expanded view is reset when no hotel is selected
  useEffect(() => {
    if (!selectedHotel && !showAddForm && !isEditing) {
      setIsExpanded(false);
    }
  }, [selectedHotel, showAddForm, isEditing]);

  // Effect to automatically set isExpanded to true when a hotel is selected
  useEffect(() => {
    if (selectedHotel || showAddForm || isEditing) {
      setIsExpanded(true);
    }
  }, [selectedHotel, showAddForm, isEditing]);

  const handleSelectHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsEditing(false);
    setShowAddForm(false);
    setIsExpanded(true);
    
    // Expand the details panel when a hotel is selected
    setPanelSize(60);
  };

  const handleEditHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsEditing(true);
    setShowAddForm(false);
    setIsExpanded(true);
    
    // Expand the details panel when editing
    setPanelSize(60);
  };

  const handleAddHotel = () => {
    setSelectedHotel(null);
    setIsEditing(false);
    setShowAddForm(true);
    setIsExpanded(true);
    
    // Expand the details panel when adding
    setPanelSize(60);
  };

  const handleBackToList = () => {
    // First change the expanded state
    setIsExpanded(false);
    
    // Collapse the detail panel
    setPanelSize(100);
    
    // Clear selection states immediately rather than in a timeout
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
    <div className="container mx-auto py-6 space-y-8">
      <HotelPageHeader 
        selectedPOS={selectedPOS}
        onSelectPOS={setSelectedPOS}
        onAddHotel={handleAddHotel}
        filters={filters}
        onFilterChange={setFilters}
      />

      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[calc(100vh-200px)] rounded-lg border border-indigo-100 dark:border-indigo-900 bg-white/90 dark:bg-slate-900/90"
        onLayout={handlePanelResize}
      >
        <ResizablePanel defaultSize={panelSize} minSize={40} maxSize={100}>
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
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={100 - panelSize} minSize={0} maxSize={60}>
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
    </div>
  );
};

export default HotelPageContainer;
