
import React from 'react';
import { PlusCircle, Hotel as HotelIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface HotelEmptyStateProps {
  selectedPOS: string;
  posName?: string;
  hasHotels: boolean;
  onAddHotel: () => void;
}

const HotelEmptyState: React.FC<HotelEmptyStateProps> = ({ 
  selectedPOS, 
  posName, 
  hasHotels, 
  onAddHotel 
}) => {
  return (
    <motion.div
      key="empty-state"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 flex flex-col items-center justify-center text-center h-[calc(100vh-320px)] bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-slate-900 border-indigo-100 dark:border-indigo-900 shadow-sm">
        <div className="p-5 bg-white dark:bg-indigo-900 rounded-full mb-6 shadow-md">
          <HotelIcon className="h-12 w-12 text-indigo-600 dark:text-indigo-300" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">
          Hotel Network Management
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          {selectedPOS ? 
            hasHotels 
              ? `Select a hotel from the ${posName} region to view details.` 
              : `No hotels found for ${posName}. Add your first hotel.`
            : 'Select a region to view hotels, or add a new hotel to your network.'}
        </p>
        <Button onClick={onAddHotel} className="gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-sm">
          <PlusCircle className="h-4 w-4" />
          Add Hotel
        </Button>
      </Card>
    </motion.div>
  );
};

export default HotelEmptyState;
