
import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

  // Animation variants for list container
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.01,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  // Display the current view mode
  const ViewModeIcon = useGridView ? LayoutGrid : LayoutList;

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
          Hotels ({filteredHotels.length})
        </h2>
        <div className="flex items-center gap-2">
          <ViewModeIcon size={16} className="text-indigo-500" />
          <Badge variant="outline" className="text-xs border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400">
            {useGridView ? 'Grid View' : 'List View'}
          </Badge>
        </div>
      </div>
      
      {hotels.length > 0 && (
        <div className="rounded-lg overflow-hidden border border-indigo-100 dark:border-indigo-900">
          <HotelSearch 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />
        </div>
      )}
      
      {hotels.length === 0 ? (
        <HotelListEmptyState />
      ) : filteredHotels.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-indigo-200 dark:border-indigo-800 rounded-lg bg-indigo-50/50 dark:bg-indigo-900/20">
          <p className="text-muted-foreground">No hotels match your search criteria</p>
        </div>
      ) : (
        <motion.div 
          className={`grid ${useGridView ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-4`}
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
              useGridView={useGridView}
            />
          ))}
        </motion.div>
      )}

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
