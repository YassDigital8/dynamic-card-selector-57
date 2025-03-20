
import { useState, useEffect } from 'react';
import { Hotel, HotelFormData } from '@/models/HotelModel';

export const useHotelSelection = (
  updateHotel: (id: string, data: HotelFormData) => void,
  deleteHotel: (id: string) => void
) => {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isSelectingNewHotel, setIsSelectingNewHotel] = useState(false);

  const handleSelectHotel = (hotel: Hotel) => {
    // Set flag to indicate we're selecting a new hotel
    setIsSelectingNewHotel(true);
    
    // Use setTimeout to allow the UI to update before setting the selected hotel
    setTimeout(() => {
      setSelectedHotel(hotel);
      setIsEditing(false);
      setShowAddForm(false);
      setIsExpanded(true);
      setIsSelectingNewHotel(false);
    }, 10);
  };

  const handleEditHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsEditing(true);
    setShowAddForm(false);
    setIsExpanded(true);
  };

  const handleStartEdit = () => {
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

  const handleSubmitEdit = (data: HotelFormData) => {
    if (selectedHotel) {
      updateHotel(selectedHotel.id, data);
      setIsEditing(false);
    }
  };
  
  const handleCancelEdit = () => setIsEditing(false);

  return {
    selectedHotel,
    isEditing,
    showAddForm,
    isExpanded,
    isSelectingNewHotel,
    setSelectedHotel,
    setIsEditing,
    setShowAddForm,
    setIsExpanded,
    handleSelectHotel,
    handleEditHotel,
    handleStartEdit,
    handleAddHotel,
    handleBackToList,
    handleSubmitEdit,
    handleCancelEdit
  };
};

export default useHotelSelection;
