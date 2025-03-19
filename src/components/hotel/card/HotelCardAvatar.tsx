
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getHotelAvatar } from './HotelCardUtils';
import { Hotel } from '@/models/HotelModel';

interface HotelCardAvatarProps {
  hotel: Hotel;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const HotelCardAvatar: React.FC<HotelCardAvatarProps> = ({ 
  hotel, 
  size = 'md',
  className 
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };
  
  const avatarUrl = getHotelAvatar(hotel.name);
  const fallbackText = hotel.name.substring(0, 2).toUpperCase();
  
  return (
    <Avatar className={`${sizeClasses[size]} ${className || ''}`}>
      <AvatarImage src={avatarUrl} alt={hotel.name} />
      <AvatarFallback className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
        {fallbackText}
      </AvatarFallback>
    </Avatar>
  );
};

export default HotelCardAvatar;
