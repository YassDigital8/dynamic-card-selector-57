
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hotel } from '@/models/HotelModel';
import { Badge } from "@/components/ui/badge";
import { LayoutGrid, LayoutList } from 'lucide-react';
import DeleteHotelDialog from './DeleteHotelDialog';
import HotelCard from './HotelCard';
import HotelListEmptyState from './HotelListEmptyState';
import HotelSearch from './HotelSearch';

interface HotelListProps {
  hotels: Hotel[];
  selectedHotel: Hotel | null;
  onSelectHotel: (hotel: Hotel) => void;
  onEditHotel: (hotel: Hotel) => void;
  onDeleteHotel: (id: string) => void;
  useGridView?: boolean;
}

const HotelList: React.FC<HotelListProps> = ({
  hotels,
  selectedHotel,
  onSelectHotel,
  onEditHotel,
  onDeleteHotel,
  useGridView = false
}) => {
  const [hotelToDelete, setHotelToDelete] = useState<Hotel | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDeleteClick = (hotel: Hotel) => {
    setHotelToDelete(hotel);
    setConfirmDialogOpen(true);
  };

  const confirmDelete = () => {
    if (hotelToDelete) {
      onDeleteHotel(hotelToDelete.id);
      setConfirmDialogOpen(false);
      setHotelToDelete(null);
    }
  };

  // Filter hotels based on search term
  const filteredHotels = hotels.filter(hotel => 
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.governorate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Enhanced animation variants for list container
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
        duration: 0.3
      }
    }
  };

  // Badge animation
  const badgeVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 20,
        duration: 0.3
      }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  // Heading animation
  const headingVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        duration: 0.4
      }
    }
  };

  // Display the current view mode
  const ViewModeIcon = useGridView ? LayoutGrid : LayoutList;

  return (
    <div className="space-y-6 w-full">
      <motion.div 
        className="flex items-center justify-between"
        initial="initial"
        animate="animate"
        variants={headingVariants}
      >
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
          Hotels ({filteredHotels.length})
        </h2>
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: -10, opacity: 0 }}
            animate={{ 
              rotate: 0, 
              opacity: 1,
              transition: {
                type: "spring",
                stiffness: 500,
                damping: 15
              }
            }}
          >
            <ViewModeIcon size={16} className="text-indigo-500" />
          </motion.div>
          <motion.div
            variants={badgeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Badge variant="outline" className="text-xs border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400">
              {useGridView ? 'Grid View' : 'List View'}
            </Badge>
          </motion.div>
        </div>
      </motion.div>
      
      {hotels.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.3,
              delay: 0.1
            }
          }}
          className="rounded-lg overflow-hidden border border-indigo-100 dark:border-indigo-900"
        >
          <HotelSearch 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />
        </motion.div>
      )}
      
      <AnimatePresence mode="wait">
        {hotels.length === 0 ? (
          <HotelListEmptyState key="empty" />
        ) : filteredHotels.length === 0 ? (
          <motion.div 
            key="no-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 25
              }
            }}
            exit={{ opacity: 0, y: -20 }}
            className="p-8 text-center border border-dashed border-indigo-200 dark:border-indigo-800 rounded-lg bg-indigo-50/50 dark:bg-indigo-900/20"
          >
            <p className="text-muted-foreground">No hotels match your search criteria</p>
          </motion.div>
        ) : (
          <motion.div 
            key={`hotel-list-${useGridView ? 'grid' : 'list'}`}
            className={`grid ${useGridView ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-4`}
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {filteredHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                isSelected={selectedHotel?.id === hotel.id}
                onSelect={() => onSelectHotel(hotel)}
                onEdit={() => onEditHotel(hotel)}
                onDelete={() => handleDeleteClick(hotel)}
                useGridView={useGridView}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <DeleteHotelDialog
        hotel={hotelToDelete}
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default HotelList;
