
import React, { useState, useEffect } from 'react';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import HotelPageHeader from './HotelPageHeader';
import HotelListPanel from './layout/HotelListPanel';
import HotelContentPanel from './layout/HotelContentPanel';
import { usePageSelectionViewModel } from '@/viewmodels/PageSelectionViewModel';
import useHotelNetwork from '@/hooks/hotel';
import useHotelFilters from '@/hooks/hotel/useHotelFilters';

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
    setIsExpanded(false);
    // Adding a small delay before clearing selection to allow animation to complete
    setTimeout(() => {
      if (!isExpanded) {
        setSelectedHotel(null);
        setShowAddForm(false);
        setIsEditing(false);
      }
    }, 300);
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

  return (
    <div className="container mx-auto py-6 space-y-8">
      <HotelPageHeader 
        selectedPOS={selectedPOS}
        onSelectPOS={setSelectedPOS}
        onAddHotel={handleAddHotel}
        filters={filters}
        onFilterChange={setFilters}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <HotelListPanel 
          filteredHotels={filteredHotels}
          selectedHotel={selectedHotel}
          isExpanded={isExpanded}
          onSelectHotel={handleSelectHotel}
          onEditHotel={handleEditHotel}
          onDeleteHotel={deleteHotel}
        />

        {(isExpanded || selectedHotel || showAddForm || isEditing) && (
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
        )}
      </div>
    </div>
  );
};

export default HotelPageContainer;
