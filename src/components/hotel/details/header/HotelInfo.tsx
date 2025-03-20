
import React from 'react';
import { Globe } from 'lucide-react';
import StarRating from '../../card/StarRating';

interface HotelInfoProps {
  name: string;
  posKey: string;
  country: string;
  governorate: string;
  rating?: number;
}

const HotelInfo: React.FC<HotelInfoProps> = ({
  name,
  posKey,
  country,
  governorate,
  rating
}) => {
  return (
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
  );
};

export default HotelInfo;

