
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Hotel, PointerIcon } from 'lucide-react';

interface NoHotelSelectedProps {
  hasHotels: boolean;
  onAddHotel: () => void;
}

const NoHotelSelected: React.FC<NoHotelSelectedProps> = ({ hasHotels }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      className="h-full flex flex-col items-center justify-center p-4 sm:p-8"
    >
      <div className="flex flex-col items-center text-center max-w-md space-y-6">
        <div className="p-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
          {hasHotels ? (
            <PointerIcon size={48} className="text-indigo-500 dark:text-indigo-400" />
          ) : (
            <Hotel size={48} className="text-indigo-500 dark:text-indigo-400" />
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {hasHotels ? 'Select a Hotel' : 'No Hotels Found'}
          </h3>
          <p className="text-muted-foreground">
            {hasHotels 
              ? 'Tap on a hotel from the list to view its details and information.' 
              : 'Get started by adding your first hotel using the button below.'}
          </p>
        </div>
        
        {hasHotels && (
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1 h-4 w-4" />
            <span>Or select a hotel from the list on the left</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NoHotelSelected;
