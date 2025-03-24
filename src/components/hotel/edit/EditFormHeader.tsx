
import React from 'react';
import { motion } from 'framer-motion';
import { Hotel } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface EditFormHeaderProps {
  hotelName: string;
  customLogo?: string;
  onLogoClick: () => void;
  initials: string;
}

const EditFormHeader: React.FC<EditFormHeaderProps> = ({
  hotelName,
  customLogo,
  onLogoClick,
  initials
}) => {
  return (
    <div className="flex items-center gap-4">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="rounded-full overflow-hidden cursor-pointer"
        onClick={onLogoClick}
      >
        <Avatar className="h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 border-2 border-white dark:border-gray-800 shadow-md">
          <AvatarImage src={customLogo || ''} alt={hotelName} />
          <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
            {customLogo ? (
              <Hotel className="h-8 w-8" />
            ) : (
              initials
            )}
          </AvatarFallback>
        </Avatar>
      </motion.div>
      
      <div className="space-y-1">
        <motion.h2 
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {hotelName}
        </motion.h2>
        <motion.p 
          className="text-sm text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Edit hotel information
        </motion.p>
      </div>
    </div>
  );
};

export default EditFormHeader;
