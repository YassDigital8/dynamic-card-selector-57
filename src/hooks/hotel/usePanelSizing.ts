
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
    // Always set the left panel to maximum (65%) when the page first loads
    // regardless of whether there's a selected hotel or not
    return 65; // Maximum allowed size for the left panel
  };

  const [panelSize, setPanelSize] = useState(getInitialLeftPanelSize());

  // Effect to handle panel size when selection state changes
  useEffect(() => {
    // Only adjust panel size when a hotel is selected, otherwise keep it at max
    const hasSelectedContent = selectedHotel || showAddForm || isEditing;
    
    if (hasSelectedContent) {
      // When content is selected, shrink the left panel significantly to match the second image
      if (screenSize.width < 640) setPanelSize(35); // Mobile - minimum size
      else if (screenSize.width < 1024) setPanelSize(35); // Tablet - minimum size
      else setPanelSize(35); // Desktop - minimum size (matches the second image)
    } else {
      // When nothing is selected, maximize the list panel
      setPanelSize(65); // Maximum allowed size
    }
  }, [screenSize.width, selectedHotel, showAddForm, isEditing]);

  return {
    panelSize,
    setPanelSize
  };
};

export default usePanelSizing;
