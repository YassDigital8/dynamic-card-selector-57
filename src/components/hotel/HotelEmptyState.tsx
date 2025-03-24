
import React from 'react';
import { PlusCircle, Hotel as HotelIcon, MapPin, Search, Info } from 'lucide-react';
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
  // Animation variants for the card
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        type: "spring", 
        stiffness: 100 
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -45 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { delay: 0.3, duration: 0.5 }
    },
    hover: {
      y: [0, -5, 0],
      transition: { 
        repeat: Infinity, 
        repeatType: "reverse" as const,
        duration: 1.5 
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.5, duration: 0.3 } 
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2, type: "spring", stiffness: 400 }
    }
  };

  return (
    <motion.div
      key="empty-state"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full"
    >
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className="w-full h-full"
      >
        <Card className="p-6 flex flex-col items-center justify-center text-center h-[calc(100vh-200px)] bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-slate-900 border-indigo-100 dark:border-indigo-900 shadow-sm">
          <motion.div 
            className="p-5 bg-white dark:bg-indigo-900 rounded-full mb-6 shadow-md"
            variants={iconVariants}
            whileHover="hover"
          >
            <HotelIcon className="h-12 w-12 text-indigo-600 dark:text-indigo-300" />
          </motion.div>
          
          <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">
            Hotel Network Management
          </h2>
          
          <div className="mb-8 max-w-md">
            <p className="text-muted-foreground mb-4">
              {selectedPOS ? 
                hasHotels 
                  ? `Select a hotel from the ${posName || 'selected'} region to view details.` 
                  : `No hotels found for ${posName || 'selected region'}. Add your first hotel.`
                : 'Select a region to view hotels, or add a new hotel to your network.'}
            </p>
            
            {/* New guidance section */}
            <div className="bg-white/70 dark:bg-indigo-950/50 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-300 mb-2 flex items-center justify-center">
                <Info className="h-5 w-5 mr-2" />
                Getting Started
              </h3>
              <ul className="text-sm text-left space-y-2 text-slate-700 dark:text-slate-300">
                <li className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 text-indigo-500" />
                  <span>Select a <strong>region</strong> from the dropdown above to filter hotels</span>
                </li>
                <li className="flex items-start">
                  <Search className="h-4 w-4 mr-2 mt-0.5 text-indigo-500" />
                  <span>Use <strong>search and filters</strong> to find specific hotels</span>
                </li>
                <li className="flex items-start">
                  <PlusCircle className="h-4 w-4 mr-2 mt-0.5 text-indigo-500" />
                  <span>Click <strong>Add Hotel</strong> to create a new property</span>
                </li>
              </ul>
            </div>
          </div>
          
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            className="space-y-3"
          >
            <Button onClick={onAddHotel} className="gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-sm">
              <PlusCircle className="h-4 w-4" />
              Add Hotel
            </Button>
            
            {!selectedPOS && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Or first select a region from the dropdown above
              </p>
            )}
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default HotelEmptyState;
