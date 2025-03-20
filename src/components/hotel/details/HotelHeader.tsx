
import React from 'react';
import { ArrowLeft, Pencil, Globe, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StarRating from '../card/StarRating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getHotelAvatar } from '../card/HotelCardUtils';

interface HotelHeaderProps {
  name: string;
  posKey: string;
  country: string;
  governorate: string;
  rating?: number;
  onEdit: () => void;
  onBack?: () => void;
  onSave?: () => void;
  onDelete?: () => void;
}

const HotelHeader: React.FC<HotelHeaderProps> = ({
  name,
  posKey,
  country,
  governorate,
  rating,
  onEdit,
  onBack,
  onSave,
  onDelete
}) => {
  // Get a consistent avatar for this hotel
  const avatarUrl = getHotelAvatar(name);
  
  // Generate initials for the fallback
  const initials = name
    .split(' ')
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4">
          {onBack && (
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="rounded-full h-8 w-8 p-0"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          )}
          
          {/* Hotel Logo */}
          <Avatar className="h-12 w-12 border border-indigo-100 dark:border-indigo-800 shadow-sm">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h1 className="text-2xl font-bold">{name}</h1>
            
            {/* Star Rating */}
            {typeof rating === 'number' && rating > 0 && (
              <div className="flex items-center">
                <StarRating rating={rating} size="md" />
                <span className="ml-2 text-sm text-gray-500">{rating.toFixed(1)} stars</span>
              </div>
            )}
            
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Globe className="mr-1 h-4 w-4 text-indigo-500" />
              <span>
                {posKey} · {country}, {governorate}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {onSave && (
            <Button
              onClick={onSave}
              variant="default"
              size="sm"
              className="text-xs h-8 bg-green-600 hover:bg-green-700"
            >
              <Save className="mr-1 h-3.5 w-3.5" />
              Save Hotel
            </Button>
          )}
          {onDelete && (
            <Button
              onClick={onDelete}
              variant="destructive"
              size="sm"
              className="text-xs h-8"
            >
              <Trash2 className="mr-1 h-3.5 w-3.5" />
              Delete
            </Button>
          )}
          <Button
            onClick={onEdit}
            variant="outline"
            size="sm"
            className="text-xs h-8"
          >
            <Pencil className="mr-1 h-3.5 w-3.5" />
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HotelHeader;
