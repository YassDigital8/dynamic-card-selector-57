
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './formSchema';
import { AmenityImageUploadDialog, amenitiesWithImages } from './amenities';
import { useAmenityImages } from './amenities/useAmenityImages';
import AmenityList from './amenities/AmenityList';
import AmenitiesSectionHeader from './amenities/AmenitiesSectionHeader';

interface AmenitiesSectionProps {
  form: UseFormReturn<FormValues>;
  hotelId?: string;
}

const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ form, hotelId }) => {
  const {
    selectedAmenity,
    isImageDialogOpen,
    openImageDialog,
    handleAddImage,
    handleAddMultipleImages,
    handleRemoveImage,
    handleCloseDialog
  } = useAmenityImages({ form, hotelId });

  return (
    <div className="space-y-6 col-span-2">
      <AmenitiesSectionHeader />
      
      <AmenityList 
        form={form}
        onAddImage={openImageDialog}
        onRemoveImage={handleRemoveImage}
      />
      
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
