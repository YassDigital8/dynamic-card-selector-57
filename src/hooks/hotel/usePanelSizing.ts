
import { useState, useEffect, useMemo } from 'react';
import { useScreenSize } from '@/hooks/use-mobile';
import { Hotel } from '@/models/HotelModel';

interface UsePanelSizingProps {
  selectedHotel: Hotel | null;
  showAddForm: boolean;
  isEditing: boolean;
}

export const usePanelSizing = ({ selectedHotel, showAddForm, isEditing }: UsePanelSizingProps) => {
  const screenSize = useScreenSize();
  
  // Memoize this calculation to prevent unnecessary recalculations
  const getInitialLeftPanelSize = useMemo(() => {
    // If no hotel is selected and not adding or editing, make the list panel wider
    const hasSelectedContent = selectedHotel || showAddForm || isEditing;
    
    if (!hasSelectedContent) {
      // Make panel wider when nothing is selected, but respect max width limit
      if (screenSize.width < 640) return 40; // Mobile - limit to max 40%
      if (screenSize.width < 1024) return 40; // Tablet - limit to max 40%
      return 40; // Desktop - limit maximum width to 40% when expanded
    } else {
      // Normal size when something is selected
      if (screenSize.width < 640) return 30; // Mobile - smaller panel
      if (screenSize.width < 1024) return 30; // Tablet - smaller panel
      return 30; // Desktop - smaller panel
    }
  }, [selectedHotel, showAddForm, isEditing, screenSize.width]);

  const [panelSize, setPanelSize] = useState(getInitialLeftPanelSize);

  // Effect to handle panel size based on device type and selection state
  useEffect(() => {
    // When selection state changes, reset the panel size
    setPanelSize(getInitialLeftPanelSize);
  }, [getInitialLeftPanelSize]);

  // Custom setPanelSize function that enforces the size limit
  const setLimitedPanelSize = (size: number) => {
    // Ensure we don't exceed the maximum size limit (40%)
    const limitedSize = Math.min(size, 40);
    setPanelSize(limitedSize);
  };

  return {
    panelSize,
    setPanelSize: setLimitedPanelSize
  };
};

export default usePanelSizing;
