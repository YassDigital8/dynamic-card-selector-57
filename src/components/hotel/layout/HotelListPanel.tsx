
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  // Enhanced animation variants
  const panelVariants = {
    expanded: {
      width: "100%",
      gridColumn: "span 3 / span 3",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5
      }
    },
    collapsed: {
      width: "100%",
      gridColumn: "span 12 / span 12",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className={`lg:col-span-${isExpanded ? '3' : '12'}`}
      initial={isExpanded ? "expanded" : "collapsed"}
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={panelVariants}
      layout
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`list-${isExpanded ? 'expanded' : 'collapsed'}`}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
        >
          <Card className="p-4 overflow-hidden border-indigo-100 dark:border-indigo-900 shadow-sm h-[calc(100vh-200px)]">
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
      </AnimatePresence>
    </motion.div>
  );
};

export default HotelListPanel;
