
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormDescription } from '@/components/ui/form';
import AmenityImages from './AmenityImages';
import AmenityImagePlaceholder from './AmenityImagePlaceholder';

interface AmenityImagesSectionProps {
  hasImages: boolean;
  amenityValue: boolean;
  imageField?: string;
  images: any[];
  name: string;
  onAddImage?: (amenityName: string) => void;
  onRemoveImage?: (amenityKey: string, index: number) => void;
}

const AmenityImagesSection: React.FC<AmenityImagesSectionProps> = ({
  hasImages,
  amenityValue,
  imageField,
  images,
  name,
  onAddImage,
  onRemoveImage
}) => {
  if (!hasImages || !amenityValue) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 dark:border-gray-800 pt-3 mt-3">
      <div className="flex items-center justify-between mb-2">
        <FormDescription className="text-xs mt-0">
          Add images for this amenity
        </FormDescription>
        {onAddImage && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 text-xs"
            onClick={() => onAddImage(name)}
          >
            <PlusCircle className="h-3.5 w-3.5 mr-1.5" />
            Add
          </Button>
        )}
      </div>
      
      {/* Display uploaded images or placeholder */}
      {imageField && Array.isArray(images) && images.length > 0 ? (
        <AmenityImages 
          images={images} 
          amenityKey={imageField} 
          onRemove={onRemoveImage} 
        />
      ) : (
        <AmenityImagePlaceholder 
          onAddImage={() => onAddImage && onAddImage(name)} 
        />
      )}
    </div>
  );
};

export default AmenityImagesSection;
