
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
import { FileMetadataValues } from '@/hooks/upload/useFileMetadata';
import { FileInfo } from '@/models/FileModel';

interface AmenitiesSectionProps {
  form: UseFormReturn<FormValues>;
  hotelId?: string;
}

type AmenityWithImages = 'bar' | 'gym' | 'spa' | 'restaurant' | 'breakfast' | 'swimmingPool';

const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ form, hotelId }) => {
  const [selectedAmenity, setSelectedAmenity] = useState<AmenityWithImages | null>(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  
  const openImageDialog = (amenityName: string) => {
    // Extract just the amenity key from the full path (e.g., "amenities.bar" -> "bar")
    const amenityKey = amenityName.split('.')[1] as AmenityWithImages;
    setSelectedAmenity(amenityKey);
    setIsImageDialogOpen(true);
  };
  
  const handleAddImage = (imageUrl: string, metadata?: FileMetadataValues) => {
    if (!selectedAmenity || !imageUrl) {
      return;
    }
    
    const imageFieldName = `amenities.${selectedAmenity}Images` as const;
    const currentImages = form.getValues(imageFieldName as any) || [];
    
    const newImage: AmenityImage = {
      url: imageUrl,
      description: metadata?.altText || `${amenitiesWithImages[selectedAmenity]} image`,
      title: metadata?.title || '',
      caption: metadata?.caption || '',
      metadata: metadata
    };
    
    form.setValue(imageFieldName as any, [...currentImages, newImage], { shouldDirty: true });
    
    setIsImageDialogOpen(false);
  };

  const handleAddMultipleImages = (files: FileInfo[]) => {
    if (!selectedAmenity || files.length === 0) {
      return;
    }
    
    const imageFieldName = `amenities.${selectedAmenity}Images` as const;
    const currentImages = form.getValues(imageFieldName as any) || [];
    
    const newImages = files.map(file => ({
      url: file.url,
      description: file.metadata?.altText || `${amenitiesWithImages[selectedAmenity]} image`,
      title: file.metadata?.title || file.name,
      caption: file.metadata?.caption || '',
      metadata: file.metadata
    }));
    
    form.setValue(imageFieldName as any, [...currentImages, ...newImages], { shouldDirty: true });
    
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
          hotelId={hotelId}
          multiSelect={true}
          onSelectMultiple={handleAddMultipleImages}
        />
      )}
    </div>
  );
};

export default AmenitiesSection;
