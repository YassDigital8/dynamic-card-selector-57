
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Image, Hotel } from 'lucide-react';
import { getHotelAvatar } from '../card/HotelCardUtils';
import { motion } from 'framer-motion';

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
  // Get a consistent avatar for this hotel
  const avatarUrl = customLogo || getHotelAvatar(hotelName);

  return (
    <motion.div 
      className="flex items-center gap-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative group">
        <Avatar 
          className="h-16 w-16 border-2 border-indigo-200 dark:border-indigo-800 shadow-md cursor-pointer hover:opacity-90 transition-all hover:shadow-lg transform hover:scale-105 duration-200"
          onClick={onLogoClick}
        >
          <AvatarImage src={avatarUrl} alt={hotelName} />
          <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-indigo-900 dark:to-purple-800 text-indigo-700 dark:text-indigo-300 text-xl font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onLogoClick}
          className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-800 border-indigo-200 dark:border-indigo-700 rounded-full h-7 w-7 p-0 shadow-md transform hover:scale-110 transition-all duration-200"
        >
          <Image className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
          <span className="sr-only">Edit Logo</span>
        </Button>
      </div>
      <div className="space-y-1">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
          Edit Hotel
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center">
          <Hotel className="h-3.5 w-3.5 mr-1 text-indigo-500" />
          Customize {hotelName}'s information
        </p>
      </div>
    </motion.div>
  );
};

export default EditFormHeader;
