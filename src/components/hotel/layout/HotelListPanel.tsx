
import React, { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import HotelList from '../HotelList';
import { Hotel } from '@/models/HotelModel';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

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
    <div className="h-full w-full p-2 sm:p-4">
      <Card className="h-full overflow-hidden border-indigo-100 dark:border-indigo-900 shadow-md bg-white dark:bg-slate-900 rounded-xl transition-all duration-300 ease-in-out">
        <ScrollArea 
          className={`${contentHeight === 'auto' ? 'h-auto' : 'h-[calc(100vh-130px)] sm:h-[calc(100vh-140px)] md:h-[calc(100vh-145px)] lg:h-[calc(100vh-150px)]'} overflow-y-auto`}
        >
          <div ref={listRef}>
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

export default HotelListPanel;
