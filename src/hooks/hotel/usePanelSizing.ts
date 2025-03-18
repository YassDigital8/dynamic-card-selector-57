
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
    // If no hotel is selected and not adding or editing, make the list panel wider
    const hasSelectedContent = selectedHotel || showAddForm || isEditing;
    
    if (!hasSelectedContent) {
      // Make panel wider when nothing is selected
      if (screenSize.width < 640) return 65; // Mobile
      if (screenSize.width < 1024) return 60; // Tablet
      return 55; // Desktop
    } else {
      // Normal size when something is selected
      if (screenSize.width < 640) return 50; // Mobile
      if (screenSize.width < 1024) return 45; // Tablet
      return 40; // Desktop
    }
  };

  const [panelSize, setPanelSize] = useState(getInitialLeftPanelSize());

  // Effect to handle panel size based on device type and selection state
  useEffect(() => {
    setPanelSize(getInitialLeftPanelSize());
  }, [screenSize.width, selectedHotel, showAddForm, isEditing]);

  return {
    panelSize,
    setPanelSize
  };
};

export default usePanelSizing;
