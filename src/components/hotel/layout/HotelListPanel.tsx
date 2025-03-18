
import React from 'react';
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
  return (
    <div className="h-full w-full p-2 sm:p-4">
      <Card className="h-full overflow-hidden border-indigo-100 dark:border-indigo-900 shadow-md bg-white dark:bg-slate-900 rounded-xl transition-all duration-300 ease-in-out">
        <ScrollArea className="h-[calc(100vh-180px)] sm:h-[calc(100vh-170px)] md:h-[calc(100vh-160px)] lg:h-[calc(100vh-150px)] overflow-y-auto">
          <HotelList
            hotels={filteredHotels}
            selectedHotel={selectedHotel}
            onSelectHotel={onSelectHotel}
            onEditHotel={onEditHotel}
            onDeleteHotel={onDeleteHotel}
          />
        </ScrollArea>
      </Card>
    </div>
  );
};

export default HotelListPanel;
