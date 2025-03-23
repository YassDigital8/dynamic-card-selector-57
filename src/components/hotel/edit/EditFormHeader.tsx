
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Image } from 'lucide-react';
import { getHotelAvatar } from '../card/HotelCardUtils';

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
    <div className="flex items-center gap-4">
      <div className="relative group">
        <Avatar 
          className="h-16 w-16 border border-blue-100 dark:border-blue-800 shadow-md cursor-pointer hover:opacity-90 transition-opacity"
          onClick={onLogoClick}
        >
          <AvatarImage src={avatarUrl} alt={hotelName} />
          <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-xl">
            {initials}
          </AvatarFallback>
        </Avatar>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onLogoClick}
          className="absolute bottom-0 right-0 bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700 rounded-full h-6 w-6 p-0 shadow-sm"
        >
          <Image className="h-3 w-3" />
          <span className="sr-only">Edit Logo</span>
        </Button>
      </div>
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Edit Hotel</h2>
    </div>
  );
};

export default EditFormHeader;
