
import React, { useEffect, memo } from 'react';
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

// Use memo to prevent excessive re-renders
const AmenitiesStep: React.FC<AmenitiesStepProps> = memo(({ form, hotelId }) => {
  const {
    selectedAmenity,
    isImageDialogOpen,
    openImageDialog,
    handleAddImage,
    handleAddMultipleImages,
    handleRemoveImage,
    handleCloseDialog,
    hasEnabledAmenities,
    getEnabledCount,
    enabledAmenities
  } = useAmenityStepManager({ form, hotelId });

  // Validate as soon as the component is mounted
  useEffect(() => {
    const validateTimer = setTimeout(() => {
      // Force validation of the amenities field
      form.trigger('amenities').then(() => {
        // Trigger the parent form validation
        form.trigger();
      });
      
      console.log("Initial amenities validation triggered");
    }, 200);
    
    return () => clearTimeout(validateTimer);
  }, [form]);

  // Validate whenever an amenity is enabled/disabled
  useEffect(() => {
    console.log("Amenities enabled:", enabledAmenities);
    form.trigger('amenities').then(() => {
      form.trigger();
    });
  }, [enabledAmenities, form]);

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
              <strong className="block mt-1 text-amber-600">You must select at least one amenity to proceed.</strong>
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
              amenityLabel={selectedAmenity}
              hotelId={hotelId}
              multiSelect={true}
              onSelectMultiple={handleAddMultipleImages}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
});

AmenitiesStep.displayName = 'AmenitiesStep';

export default AmenitiesStep;
