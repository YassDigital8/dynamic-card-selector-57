
import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import HotelList from '../HotelList';
import { Hotel } from '@/models/HotelModel';
import { useIsMobile } from '@/hooks/use-mobile';

interface HotelListPanelProps {
  filteredHotels: Hotel[];
  selectedHotel: Hotel | null;
  isExpanded: boolean;
  onSelectHotel: (hotel: Hotel) => void;
  onEditHotel: (hotel: Hotel) => void;
  onDeleteHotel: (id: string) => void;
  panelSize?: number;
}

const HotelListPanel: React.FC<HotelListPanelProps> = ({
  filteredHotels,
  selectedHotel,
  isExpanded,
  onSelectHotel,
  onEditHotel,
  onDeleteHotel,
  panelSize = 100
}) => {
  const isMobile = useIsMobile();

  // Determine if we should show grid or list view based on panel size
  // Show list view when panel size is smaller (details panel is visible)
  // The threshold is different for mobile devices
  const useGridView = isMobile ? panelSize > 90 : panelSize > 70;

  return (
    <div className="h-full w-full p-4">
      <Card className="h-full overflow-hidden border-indigo-100 dark:border-indigo-900 shadow-md backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 rounded-xl">
        <ScrollArea className="h-[calc(100vh-230px)]">
          <HotelList
            hotels={filteredHotels}
            selectedHotel={selectedHotel}
            onSelectHotel={onSelectHotel}
            onEditHotel={onEditHotel}
            onDeleteHotel={onDeleteHotel}
            useGridView={useGridView}
          />
        </ScrollArea>
      </Card>
    </div>
  );
};

export default HotelListPanel;
