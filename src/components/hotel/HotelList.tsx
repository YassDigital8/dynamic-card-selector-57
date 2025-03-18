
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hotel } from '@/models/HotelModel';
import { LayoutGrid, LayoutList } from 'lucide-react';
import { Button } from "@/components/ui/button";
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(useGridView ? 'grid' : 'list');

  // Update viewMode when useGridView prop changes
  useEffect(() => {
    setViewMode(useGridView ? 'grid' : 'list');
  }, [useGridView]);

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

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  };

  const filteredHotels = hotels.filter(hotel => 
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.governorate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Spring configuration for natural animations
  const springConfig = {
    type: "spring" as const,
    stiffness: 280,
    damping: 24,
    mass: 0.9
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.01,
        ...springConfig
      }
    }
  };

  // Determine if we should actually use grid view based on our internal state and prop
  // Allow manual toggling only when view is free to change (not forced by layout)
  const activeGridView = useGridView ? true : viewMode === 'grid';

  return (
    <div className="space-y-6 w-full p-4">
      <motion.div 
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springConfig}
        className="flex items-center justify-between"
      >
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
          Hotels ({filteredHotels.length})
        </h2>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="flex items-center gap-2"
        >
          {!useGridView && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleViewMode}
              className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400"
            >
              {viewMode === 'grid' ? (
                <>
                  <LayoutList size={16} />
                  <span className="text-xs">List View</span>
                </>
              ) : (
                <>
                  <LayoutGrid size={16} />
                  <span className="text-xs">Grid View</span>
                </>
              )}
            </Button>
          )}
        </motion.div>
      </motion.div>
      
      {hotels.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springConfig}
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
          <HotelListEmptyState key="empty-state" />
        ) : filteredHotels.length === 0 ? (
          <motion.div
            key="no-results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={springConfig}
            className="p-8 text-center border border-dashed border-indigo-200 dark:border-indigo-800 rounded-lg bg-indigo-50/50 dark:bg-indigo-900/20"
          >
            <p className="text-muted-foreground">No hotels match your search criteria</p>
          </motion.div>
        ) : (
          <motion.div 
            key="results"
            className={`grid ${activeGridView ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-4`}
            variants={container}
            initial="hidden"
            animate="show"
            layout
            layoutRoot
          >
            {filteredHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                isSelected={selectedHotel?.id === hotel.id}
                onSelect={() => onSelectHotel(hotel)}
                onEdit={() => onEditHotel(hotel)}
                onDelete={() => handleDeleteClick(hotel)}
                useGridView={activeGridView}
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
