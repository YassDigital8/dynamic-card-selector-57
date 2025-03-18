
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
  const isMobile = useIsMobile();

  // Determine if we should show grid or list view based on panel size
  // Show list view when panel size is smaller (details panel is visible)
  const useGridView = isMobile ? panelSize > 80 : panelSize > 60;

  // Animation variants for panel
  const panelVariants = {
    expanded: { 
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 30,
        mass: 1
      }
    },
    contracted: { 
      opacity: 0.95,
      scale: 0.98,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 30,
        mass: 1
      }
    }
  };

  return (
    <motion.div 
      className="h-full w-full p-4"
      initial="expanded"
      animate={isExpanded ? "expanded" : "contracted"}
      variants={panelVariants}
    >
      <Card className="h-full overflow-hidden border-indigo-100 dark:border-indigo-900 shadow-md backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 rounded-xl transition-all duration-300 ease-in-out">
        <ScrollArea className="h-[calc(100vh-230px)] overflow-y-auto">
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
    </motion.div>
  );
};

export default HotelListPanel;
