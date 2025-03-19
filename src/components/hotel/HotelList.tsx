
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hotel } from '@/models/HotelModel';
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
}

const HotelList: React.FC<HotelListProps> = ({
  hotels,
  selectedHotel,
  onSelectHotel,
  onEditHotel,
  onDeleteHotel,
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

  const filteredHotels = hotels.filter(hotel => 
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.governorate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Optimized animation settings for smoother transitions
  const springConfig = {
    type: "spring" as const,
    stiffness: 220,
    damping: 28,
    mass: 0.7
  };

  const container = {
    hidden: { opacity: 1 }, // Start with opacity 1 to prevent disappearing
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02, // Faster stagger for smoother appearance
        delayChildren: 0,
        ...springConfig
      }
    }
  };

  return (
    <div className="space-y-6 w-full p-4">
      <motion.div 
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springConfig}
        className="flex items-center justify-between"
      >
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
          Hotels ({filteredHotels.length})
        </h2>
      </motion.div>
      
      {hotels.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springConfig}
          className="rounded-lg overflow-hidden border border-blue-100 dark:border-blue-900"
        >
          <HotelSearch 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />
        </motion.div>
      )}
      
      <AnimatePresence mode="popLayout"> {/* Changed to popLayout for better card handling */}
        {hotels.length === 0 ? (
          <HotelListEmptyState key="empty-state" />
        ) : filteredHotels.length === 0 ? (
          <motion.div
            key="no-results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={springConfig}
            className="p-8 text-center border border-dashed border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50/50 dark:bg-blue-900/20"
          >
            <p className="text-muted-foreground">No hotels match your search criteria</p>
          </motion.div>
        ) : (
          <motion.div 
            key="results"
            className="grid grid-cols-1 gap-4"
            variants={container}
            initial="hidden"
            animate="show"
            layout="position"
          >
            {filteredHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                isSelected={selectedHotel?.id === hotel.id}
                onSelect={() => onSelectHotel(hotel)}
                onEdit={() => onEditHotel(hotel)}
                onDelete={() => handleDeleteClick(hotel)}
                useGridView={false}
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

export default React.memo(HotelList);
