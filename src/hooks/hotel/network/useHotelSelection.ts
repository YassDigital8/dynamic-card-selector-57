
import { useState, useCallback } from 'react';
import { Hotel, HotelFormData } from '@/models/HotelModel';

export interface UseHotelSelectionProps {
  selectedHotel: Hotel | null;
  setSelectedHotel: (hotel: Hotel | null) => void;
  updateHotel: (id: string, data: HotelFormData) => Promise<any>;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
}

export const useHotelSelection = ({
  selectedHotel,
  setSelectedHotel,
  updateHotel,
  isEditing,
  setIsEditing
}: UseHotelSelectionProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isSelectingNewHotel, setIsSelectingNewHotel] = useState(false);
  const [forceRefresh, setForceRefresh] = useState(0); // Counter to force refresh

  const handleSelectHotel = useCallback((hotel: Hotel) => {
    console.log('Selecting hotel:', hotel.id);
    // Direct hotel selection without any clearing or transition flags
    setSelectedHotel(hotel);
    setIsEditing(false);
    setShowAddForm(false);
    setIsExpanded(true);
  }, [setSelectedHotel, setIsEditing]);

  const handleEditHotel = useCallback((hotel: Hotel) => {
    console.log('Editing hotel:', hotel.id);
    setSelectedHotel(hotel);
    setIsEditing(true);
    setShowAddForm(false);
    setIsExpanded(true);
  }, [setSelectedHotel, setIsEditing]);

  const handleStartEdit = useCallback(() => {
    setIsEditing(true);
    setShowAddForm(false);
    setIsExpanded(true);
  }, [setIsEditing]);

  const handleAddHotel = useCallback(() => {
    setSelectedHotel(null);
    setIsEditing(false);
    setShowAddForm(true);
    setIsExpanded(true);
  }, [setSelectedHotel, setIsEditing]);

  const handleBackToList = useCallback(() => {
    setSelectedHotel(null);
    setShowAddForm(false);
    setIsEditing(false);
  }, [setSelectedHotel, setIsEditing]);

  const handleSubmitEdit = useCallback(async (data: HotelFormData) => {
    if (selectedHotel) {
      console.log('Submitting edit for hotel:', selectedHotel.id);
      const result = await updateHotel(selectedHotel.id, data);
      
      // Increment force refresh counter to trigger re-renders if needed
      setForceRefresh(prev => prev + 1);
      
      return result;
    }
    return { success: false, error: 'No hotel selected' };
  }, [selectedHotel, updateHotel]);
  
  const handleCancelEdit = useCallback(() => setIsEditing(false), [setIsEditing]);

  return {
    showAddForm,
    isExpanded,
    isSelectingNewHotel,
    forceRefresh,
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
