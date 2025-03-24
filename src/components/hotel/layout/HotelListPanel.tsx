
import React, { useRef, useEffect, useState, memo } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import HotelList from '../HotelList';
import { Hotel } from '@/models/HotelModel';

interface HotelListPanelProps {
  filteredHotels: Hotel[];
  selectedHotel: Hotel | null;
  isExpanded: boolean;
  onSelectHotel: (hotel: Hotel) => void;
  onEditHotel: (hotel: Hotel) => void;
  onDeleteHotel: (id: string) => void;
  panelSize?: number;
  isEditing?: boolean;
}

const HotelListPanel: React.FC<HotelListPanelProps> = ({
  filteredHotels,
  selectedHotel,
  isExpanded,
  onSelectHotel,
  onEditHotel,
  onDeleteHotel,
  panelSize = 100,
  isEditing = false
}) => {
  const [contentHeight, setContentHeight] = useState<string>('auto');
  const listRef = useRef<HTMLDivElement>(null);
  
  // Dynamically adjust content height based on the number of hotels
  useEffect(() => {
    if (listRef.current) {
      const newHeight = filteredHotels.length <= 10 
        ? 'auto' 
        : 'calc(100vh-130px)';
      setContentHeight(newHeight);
    }
  }, [filteredHotels.length]);

  return (
    <div className="h-full w-full p-0">
      <Card className="h-full w-full overflow-hidden border-0 shadow-none bg-white dark:bg-slate-900 rounded-none">
        <ScrollArea 
          className="h-full w-full"
        >
          <div ref={listRef} className="h-full w-full">
            <HotelList
              hotels={filteredHotels}
              selectedHotel={selectedHotel}
              onSelectHotel={onSelectHotel}
              onEditHotel={onEditHotel}
              onDeleteHotel={onDeleteHotel}
              isEditing={isEditing}
            />
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default memo(HotelListPanel);
