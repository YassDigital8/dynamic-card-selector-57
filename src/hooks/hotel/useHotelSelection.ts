
import { useState } from 'react';
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
    // Skip the clearing animation when selecting a different hotel
    // This makes transitions between hotels more seamless
    if (selectedHotel && selectedHotel.id !== hotel.id) {
      // Just set a flag that we're selecting a new hotel without clearing the current one
      setIsSelectingNewHotel(true);
      
      // Directly update to the new hotel without the temporary clearing
      setSelectedHotel(hotel);
      
      // Reset the flag after a very short delay
      setTimeout(() => {
        setIsSelectingNewHotel(false);
      }, 10);
    } else {
      // If no hotel was selected before, just set it directly
      setSelectedHotel(hotel);
    }
    
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
    handleAddHotel,
    handleBackToList,
    handleSubmitEdit,
    handleCancelEdit
  };
};

export default useHotelSelection;
