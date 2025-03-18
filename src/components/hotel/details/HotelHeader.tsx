
import React from 'react';
import { motion } from 'framer-motion';
import { Pencil, ArrowLeft, Hotel as HotelIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HotelHeaderProps {
  name: string;
  posKey: string;
  country: string;
  governorate: string;
  onEdit: () => void;
  onBack?: () => void;
}

const HotelHeader: React.FC<HotelHeaderProps> = ({
  name,
  posKey,
  country,
  governorate,
  onEdit,
  onBack
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex flex-col space-y-1">
          {onBack && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              className="mb-2"
            >
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBack}
                className="group p-0 h-8 hover:bg-transparent"
              >
                <ArrowLeft className="mr-1 h-4 w-4 text-indigo-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-transform group-hover:-translate-x-1" />
                <span className="text-indigo-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Back</span>
              </Button>
            </motion.div>
          )}
          
          <motion.div 
            layoutId={`hotel-title-${posKey}`}
            className="flex items-center gap-2"
          >
            <HotelIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{name}</h1>
          </motion.div>
          
          <div className="flex items-center space-x-2">
            <motion.div layoutId={`hotel-badge-${posKey}`}>
              <Badge variant="outline" className="bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 uppercase">
                {posKey}
              </Badge>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Badge variant="secondary" className="bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                {country}
              </Badge>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              <Badge variant="secondary" className="bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                {governorate}
              </Badge>
            </motion.div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            delay: 0.2
          }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="group border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
          >
            <Pencil className="mr-2 h-4 w-4 text-indigo-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
            <span className="text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">Edit Hotel</span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default HotelHeader;
