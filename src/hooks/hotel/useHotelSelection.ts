
import { useState, useCallback, useEffect } from 'react';
import { Hotel, HotelFormData } from '@/models/HotelModel';

export const useHotelSelection = (
  updateHotel: (id: string, data: HotelFormData) => { success: boolean; hotel?: Hotel },
  deleteHotel: (id: string) => void
) => {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isSelectingNewHotel, setIsSelectingNewHotel] = useState(false);

  const handleSelectHotel = useCallback((hotel: Hotel) => {
    // Direct hotel selection without any clearing or transition flags
    setSelectedHotel(hotel);
    setIsEditing(false);
    setShowAddForm(false);
    setIsExpanded(true);
  }, []);

  const handleEditHotel = useCallback((hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsEditing(true);
    setShowAddForm(false);
    setIsExpanded(true);
  }, []);

  const handleStartEdit = useCallback(() => {
    setIsEditing(true);
    setShowAddForm(false);
    setIsExpanded(true);
  }, []);

  const handleAddHotel = useCallback(() => {
    setSelectedHotel(null);
    setIsEditing(false);
    setShowAddForm(true);
    setIsExpanded(true);
  }, []);

  const handleBackToList = useCallback(() => {
    setSelectedHotel(null);
    setShowAddForm(false);
    setIsEditing(false);
  }, []);

  const handleSubmitEdit = useCallback((data: HotelFormData) => {
    if (selectedHotel) {
      const result = updateHotel(selectedHotel.id, data);
      setIsEditing(false);
      
      // Update the selectedHotel with the updated data if successful
      if (result.success && result.hotel) {
        setSelectedHotel(result.hotel);
      }
    }
  }, [selectedHotel, updateHotel]);
  
  const handleCancelEdit = useCallback(() => setIsEditing(false), []);

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
