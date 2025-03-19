
import React from 'react';
import { ArrowLeft, Pencil, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StarRating from '../card/StarRating';

interface HotelHeaderProps {
  name: string;
  posKey: string;
  country: string;
  governorate: string;
  rating?: number;
  onEdit: () => void;
  onBack?: () => void;
}

const HotelHeader: React.FC<HotelHeaderProps> = ({
  name,
  posKey,
  country,
  governorate,
  rating,
  onEdit,
  onBack
}) => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-2">
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
          <h1 className="text-2xl font-bold">{name}</h1>
        </div>
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

export default HotelHeader;
