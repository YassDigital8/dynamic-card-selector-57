
import React, { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../formSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import AmenityList from './AmenityList';
import { AmenityImageUploadDialog } from './';
import { useAmenityStepManager } from './hooks/useAmenityStepManager';

interface AmenitiesStepProps {
  form: UseFormReturn<FormValues>;
  hotelId?: string;
}

const AmenitiesStep: React.FC<AmenitiesStepProps> = ({ form, hotelId }) => {
  const {
    selectedAmenity,
    isImageDialogOpen,
    openImageDialog,
    handleAddImage,
    handleAddMultipleImages,
    handleRemoveImage,
    handleCloseDialog,
    hasEnabledAmenities
  } = useAmenityStepManager({ form, hotelId });

  // Add debug effect to monitor validation state
  useEffect(() => {
    const amenities = form.getValues('amenities');
    if (amenities) {
      const enabledAmenities = Object.entries(amenities)
        .filter(([key, value]) => typeof value === 'boolean' && value === true);
      
      console.log("Enabled amenities in AmenitiesStep:", enabledAmenities.length ? enabledAmenities.map(([key]) => key) : 'none');
      console.log("Step validation should pass:", enabledAmenities.length > 0);
    }
  }, [form]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Hotel Amenities</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6 bg-blue-50 dark:bg-blue-950/20">
            <InfoIcon className="h-4 w-4 text-blue-500" />
            <AlertDescription>
              Select the amenities available at your hotel. For some amenities, you can add images to showcase them.
              <strong className="block mt-1 text-amber-600">You must enable at least one amenity to proceed.</strong>
            </AlertDescription>
          </Alert>

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
              amenityLabel={selectedAmenity.label}
              hotelId={hotelId}
              multiSelect={true}
              onSelectMultiple={handleAddMultipleImages}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AmenitiesStep;
