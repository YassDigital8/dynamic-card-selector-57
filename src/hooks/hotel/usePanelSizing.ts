
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useScreenSize } from '@/hooks/use-mobile';
import { Hotel } from '@/models/HotelModel';

interface UsePanelSizingProps {
  selectedHotel?: Hotel | null;
  showAddForm?: boolean;
  isEditing?: boolean;
}

export const usePanelSizing = (props?: UsePanelSizingProps) => {
  const screenSize = useScreenSize();
  const { selectedHotel = null, showAddForm = false, isEditing = false } = props || {};
  
  // Calculate dynamic panel sizes based on whether there's a selected hotel
  const getInitialLeftPanelSize = useCallback(() => {
    // If no hotel is selected and not adding or editing, make the list panel wider
    const hasSelectedContent = selectedHotel || showAddForm || isEditing;
    
    if (!hasSelectedContent) {
      // Make panel wider when nothing is selected, but enforce maximum
      if (screenSize.width < 640) return 40; // Mobile - max 40%
      if (screenSize.width < 1024) return 40; // Tablet - max 40%
      return 40; // Desktop - max 40%
    } else {
      // Normal size when something is selected
      if (screenSize.width < 640) return 30; // Mobile
      if (screenSize.width < 1024) return 30; // Tablet
      return 30; // Desktop
    }
  }, [selectedHotel, showAddForm, isEditing, screenSize.width]);

  const [panelSize, setPanelSize] = useState(getInitialLeftPanelSize());

  // Effect to handle panel size based on device type and selection state
  useEffect(() => {
    setPanelSize(getInitialLeftPanelSize());
  }, [screenSize.width, selectedHotel, showAddForm, isEditing, getInitialLeftPanelSize]);

  // Constrain panel size to valid range (never more than 40%)
  const setConstrainedPanelSize = useCallback((size: number) => {
    // Don't allow left panel to be more than 40% of width
    const constrainedSize = Math.min(size, 40);
    setPanelSize(constrainedSize);
  }, []);

  const minLeftPanelSize = useMemo(() => 20, []); // 20% min width
  const maxLeftPanelSize = useMemo(() => 40, []); // 40% max width
  const minRightPanelSize = useMemo(() => 60, []); // 60% min width

  return {
    panelSize,
    setPanelSize: setConstrainedPanelSize,
    minLeftPanelSize,
    maxLeftPanelSize,
    minRightPanelSize
  };
};

export default usePanelSizing;
