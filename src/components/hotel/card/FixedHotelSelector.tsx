
import React from 'react';
import { motion } from 'framer-motion';
import { Hotel, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FixedHotelSelectorProps {
  hasHotels: boolean;
  onAddHotel: () => void;
}

const FixedHotelSelector: React.FC<FixedHotelSelectorProps> = ({ 
  hasHotels, 
  onAddHotel 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 30, delay: 0.2 }}
      className="fixed bottom-6 right-6 z-50 sm:bottom-8 sm:right-8"
      aria-label={hasHotels ? "Select or add a hotel" : "Add your first hotel"}
      role="complementary"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="shadow-lg rounded-full bg-white dark:bg-slate-800 p-2"
      >
        <Button 
          onClick={onAddHotel}
          size="lg"
          className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-700 dark:hover:bg-indigo-600 rounded-full shadow-md"
          aria-label={hasHotels ? "Add a new hotel" : "Add your first hotel"}
        >
          {hasHotels ? (
            <>
              <Plus className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Add New Hotel</span>
            </>
          ) : (
            <>
              <Hotel className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Add First Hotel</span>
            </>
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default FixedHotelSelector;
