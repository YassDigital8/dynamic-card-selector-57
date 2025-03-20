
import { useState, useCallback } from 'react';
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

  // Optimize handlers with useCallback to prevent unnecessary re-renders
  const handleSelectHotel = useCallback((hotel: Hotel) => {
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
      updateHotel(selectedHotel.id, data);
      setIsEditing(false);
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
