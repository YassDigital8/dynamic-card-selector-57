
import { useState, useCallback, useEffect, useRef } from 'react';
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
  const [forceRefresh, setForceRefresh] = useState(0); // Counter to force refresh
  
  // Use ref to prevent infinite re-renders when logging
  const prevHotelIdRef = useRef<string | null>(null);

  const handleSelectHotel = useCallback((hotel: Hotel) => {
    console.log('Selecting hotel:', hotel.id);
    // Direct hotel selection without any clearing or transition flags
    setSelectedHotel(hotel);
    setIsEditing(false);
    setShowAddForm(false);
    setIsExpanded(true);
  }, []);

  const handleEditHotel = useCallback((hotel: Hotel) => {
    console.log('Editing hotel:', hotel.id);
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
      console.log('Submitting edit for hotel:', selectedHotel.id);
      const result = updateHotel(selectedHotel.id, data);
      setIsEditing(false);
      
      // Update the selectedHotel with the updated data if successful
      if (result.success && result.hotel) {
        console.log('Hotel updated successfully, refreshing with new data');
        // Force immediate refresh with the updated hotel data
        setSelectedHotel(result.hotel);
        // Increment force refresh counter to trigger re-renders
        setForceRefresh(prev => prev + 1);
      }
    }
  }, [selectedHotel, updateHotel]);
  
  const handleCancelEdit = useCallback(() => setIsEditing(false), []);

  // Log when selected hotel changes for debugging, but use a ref to prevent infinite re-renders
  useEffect(() => {
    const currentHotelId = selectedHotel?.id || null;
    if (currentHotelId !== prevHotelIdRef.current) {
      prevHotelIdRef.current = currentHotelId;
      if (selectedHotel) {
        console.log('Selected hotel updated:', selectedHotel.id, 'Refresh count:', forceRefresh);
      }
    }
  }, [selectedHotel, forceRefresh]);

  return {
    selectedHotel,
    isEditing,
    showAddForm,
    isExpanded,
    isSelectingNewHotel,
    forceRefresh,
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
