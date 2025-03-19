
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AmenityImage } from '@/models/HotelModel';
import { FormValues } from './formSchema';
import { 
  AmenityItem, 
  AmenityImageUploadDialog, 
  amenitiesWithImages, 
  amenitiesList 
} from './amenities';

interface AmenitiesSectionProps {
  form: UseFormReturn<FormValues>;
}

type AmenityWithImages = 'bar' | 'gym' | 'spa' | 'restaurant' | 'breakfast' | 'swimmingPool';

const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ form }) => {
  const [selectedAmenity, setSelectedAmenity] = useState<AmenityWithImages | null>(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  
  const openImageDialog = (amenityName: string) => {
    // Extract just the amenity key from the full path (e.g., "amenities.bar" -> "bar")
    const amenityKey = amenityName.split('.')[1] as AmenityWithImages;
    setSelectedAmenity(amenityKey);
    setIsImageDialogOpen(true);
  };
  
  const handleAddImage = (imageUrl: string) => {
    if (!selectedAmenity || !imageUrl) {
      return;
    }
    
    const imageFieldName = `amenities.${selectedAmenity}Images` as const;
    const currentImages = form.getValues(imageFieldName as any) || [];
    
    const newImage: AmenityImage = {
      url: imageUrl,
      description: `${amenitiesWithImages[selectedAmenity]} image`
    };
    
    form.setValue(imageFieldName as any, [...currentImages, newImage], { shouldDirty: true });
    
    setIsImageDialogOpen(false);
  };
  
  const handleRemoveImage = (amenityName: string, index: number) => {
    const imageFieldName = `amenities.${amenityName}Images` as const;
    const currentImages = form.getValues(imageFieldName as any) || [];
    
    const updatedImages = currentImages.filter((_, i) => i !== index);
    
    form.setValue(imageFieldName as any, updatedImages, { shouldDirty: true });
  };
  
  const handleCloseDialog = () => {
    setIsImageDialogOpen(false);
  };

  return (
    <div className="space-y-6 col-span-2">
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg font-medium text-foreground">Amenities</h3>
        <p className="text-sm text-muted-foreground">
          Select amenities available at your hotel. For amenities with images, you can add photos that will appear in the hotel gallery.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {amenitiesList.map((amenity) => (
          <AmenityItem
            key={amenity.name}
            name={amenity.name}
            label={amenity.label}
            icon={amenity.icon}
            hasImages={amenity.hasImages}
            imageField={amenity.imageField}
            form={form}
            onAddImage={openImageDialog}
            onRemoveImage={handleRemoveImage}
          />
        ))}
      </div>
      
      {/* Image Upload Dialog */}
      {selectedAmenity && (
        <AmenityImageUploadDialog
          isOpen={isImageDialogOpen}
          onClose={handleCloseDialog}
          onAddImage={handleAddImage}
          amenityLabel={amenitiesWithImages[selectedAmenity]}
        />
      )}
    </div>
  );
};

export default AmenitiesSection;
