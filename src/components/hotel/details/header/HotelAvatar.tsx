
import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getHotelAvatar } from '../../card/HotelCardUtils';

interface HotelAvatarProps {
  name: string;
  customLogo?: string;
  onEditClick: () => void;
  isEditing?: boolean;
}

const HotelAvatar: React.FC<HotelAvatarProps> = ({
  name,
  customLogo,
  onEditClick,
  isEditing = false
}) => {
  // Get a consistent avatar for this hotel
  const avatarUrl = customLogo || getHotelAvatar(name);
  
  // Generate initials for the fallback
  const initials = name
    .split(' ')
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="relative group">
      <Avatar className="h-20 w-20 border border-indigo-100 dark:border-indigo-800 shadow-md cursor-pointer hover:opacity-90 transition-opacity">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 text-xl">
          {initials}
        </AvatarFallback>
      </Avatar>
      
      {/* Only show Edit Logo Button when in edit mode */}
      {isEditing && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onEditClick}
          className="absolute bottom-0 right-0 bg-indigo-50 dark:bg-indigo-900 border-indigo-200 dark:border-indigo-700 rounded-full h-6 w-6 p-0 shadow-sm"
        >
          <Pencil className="h-3 w-3" />
          <span className="sr-only">Edit Logo</span>
        </Button>
      )}
    </div>
  );
};

export default HotelAvatar;
