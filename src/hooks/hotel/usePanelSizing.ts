
import { useState, useEffect } from 'react';
import { useScreenSize } from '@/hooks/use-mobile';
import { Hotel } from '@/models/HotelModel';

interface UsePanelSizingProps {
  selectedHotel: Hotel | null;
  showAddForm: boolean;
  isEditing: boolean;
}

export const usePanelSizing = ({ selectedHotel, showAddForm, isEditing }: UsePanelSizingProps) => {
  const screenSize = useScreenSize();
  
  // Calculate dynamic panel sizes based on whether there's a selected hotel
  const getInitialLeftPanelSize = () => {
    // If there's a selected hotel, make the left panel smaller
    const hasSelectedContent = selectedHotel || showAddForm || isEditing;
    return hasSelectedContent ? 35 : 65; // If content is selected, minimize list panel
  };

  const [panelSize, setPanelSize] = useState(getInitialLeftPanelSize());

  // Effect to handle panel size when selection state changes
  useEffect(() => {
    // Determine if we have content selected that should display in the right panel
    const hasSelectedContent = selectedHotel || showAddForm || isEditing;
    
    if (hasSelectedContent) {
      // When content is selected, shrink the left panel
      setPanelSize(35); // Minimum size for the list panel
    } else {
      // When nothing is selected, maximize the list panel
      setPanelSize(65); // Maximum allowed size
    }
  }, [selectedHotel, showAddForm, isEditing]);

  return {
    panelSize,
    setPanelSize
  };
};

export default usePanelSizing;
