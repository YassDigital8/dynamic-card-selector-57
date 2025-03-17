
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
      <Card className="p-6 flex flex-col items-center justify-center text-center h-[calc(100vh-320px)] bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border-blue-100 dark:border-blue-900">
        <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
          <HotelIcon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Hotel Network Management</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          {selectedPOS ? 
            hasHotels 
              ? `Select a hotel from the ${posName} region to view details.` 
              : `No hotels found for ${posName}. Add your first hotel.`
            : 'Select a region to view hotels, or add a new hotel to your network.'}
        </p>
        <Button onClick={onAddHotel} className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          <PlusCircle className="h-4 w-4" />
          Add Hotel
        </Button>
      </Card>
    </motion.div>
  );
};

export default HotelEmptyState;
