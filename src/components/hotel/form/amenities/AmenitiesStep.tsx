
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
    getEnabledCount
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
    console.log("Amenities count changed:", getEnabledCount());
    form.trigger('amenities').then(() => {
      form.trigger();
    });
  }, [getEnabledCount, form]);

  return (
    <div className="space-y-6">
      <Card className="border border-indigo-100 dark:border-indigo-900/50 shadow-sm">
        <CardHeader className="pb-3 border-b border-indigo-100 dark:border-indigo-900/50">
          <CardTitle className="text-xl text-indigo-700 dark:text-indigo-400">Hotel Amenities</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Alert className="mb-6 bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500">
            <InfoIcon className="h-4 w-4 text-blue-600" />
            <AlertDescription>
              Slide to enable the amenities available at your hotel. For some amenities, you can add images to showcase them.
              <strong className="block mt-1 text-amber-600 dark:text-amber-500">You must select at least one amenity to proceed.</strong>
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
