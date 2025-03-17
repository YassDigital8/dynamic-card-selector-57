
import React from 'react';
import { motion } from 'framer-motion';
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
}

const HotelListPanel: React.FC<HotelListPanelProps> = ({
  filteredHotels,
  selectedHotel,
  isExpanded,
  onSelectHotel,
  onEditHotel,
  onDeleteHotel
}) => {
  return (
    <motion.div 
      className={`lg:col-span-${isExpanded ? '3' : '12'}`}
      initial={{ width: "100%" }}
      animate={{ 
        width: "100%",
        gridColumn: isExpanded ? "span 3 / span 3" : "span 12 / span 12"
      }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 35,
        mass: 1,
        layout: { 
          type: "spring",
          stiffness: 300,
          damping: 35
        }
      }}
      layout
    >
      <Card className="p-4 overflow-hidden border-indigo-100 dark:border-indigo-900 shadow-md h-[calc(100vh-200px)] backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 rounded-xl">
        <ScrollArea className="h-[calc(100vh-230px)]">
          <HotelList
            hotels={filteredHotels}
            selectedHotel={selectedHotel}
            onSelectHotel={onSelectHotel}
            onEditHotel={onEditHotel}
            onDeleteHotel={onDeleteHotel}
            useGridView={!isExpanded}
          />
        </ScrollArea>
      </Card>
    </motion.div>
  );
};

export default HotelListPanel;
