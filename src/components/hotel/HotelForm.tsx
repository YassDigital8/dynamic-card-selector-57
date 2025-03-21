
import React, { useCallback, memo, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
} from '@/components/ui/form';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import { 
  BasicInformation, 
  AmenitiesSection, 
  RoomTypesSection,
  formSchema,
  defaultValues
} from './form';
import { Save } from 'lucide-react';

interface HotelFormProps {
  initialData?: Hotel;
  onSubmit: (data: HotelFormData) => void;
  isLoading: boolean;
  showButtons?: boolean;
}

const HotelForm = memo(({ initialData, onSubmit, isLoading, showButtons = true }: HotelFormProps) => {
  const form = useForm<typeof formSchema._type>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || defaultValues,
    mode: 'onChange',
  });
  
  // Debug form state to verify values are being captured correctly
  useEffect(() => {
    console.log('HotelForm - Form initialized with:', initialData ? 'existing hotel data' : 'default values');
    
    // Log amenity image fields in initialData
    if (initialData?.amenities) {
      const { amenities } = initialData;
      console.log('HotelForm - Initial amenities state:', JSON.stringify(amenities, null, 2));
      
      // Check all image fields
      Object.entries(amenities).forEach(([key, value]) => {
        if (key.includes('Images')) {
          console.log(`HotelForm - Initial ${key}:`, value);
          if (Array.isArray(value) && value.length > 0) {
            console.log(`First image in ${key}:`, value[0]);
          }
        }
      });
    }
    
    // Subscribe to form state changes
    const subscription = form.watch((value, { name, type }) => {
      if (name?.startsWith('amenities.') && name.includes('Images')) {
        console.log(`HotelForm - Form field changed: ${name}`, value);
        console.log('HotelForm - Form is dirty:', form.formState.isDirty);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [initialData, form]);

  const handleSubmit = useCallback((values: typeof formSchema._type) => {
    console.log('HotelForm - Submitting form with values:', JSON.stringify(values, null, 2));
    console.log('HotelForm - Form is dirty before submission:', form.formState.isDirty);
    
    // Ensure all image arrays are properly structured
    const processedValues = { ...values };
    
    // Validate all image arrays before submission
    Object.entries(processedValues.amenities).forEach(([key, value]) => {
      if (key.includes('Images') && Array.isArray(value)) {
        console.log(`HotelForm - Processing ${key} for submission - ${value.length} images`);
        
        // Add unique identifiers to ensure proper tracking
        const processedImages = value.map((img, index) => ({
          ...img,
          // Generate an id if missing using index and timestamp
          id: `${key}-${index}-${Date.now()}`
        }));
        
        // @ts-ignore - TypeScript might complain about this assignment
        processedValues.amenities[key] = processedImages;
        
        console.log(`HotelForm - Processed ${key} - ${processedImages.length} images`);
        if (processedImages.length > 0) {
          console.log('First processed image:', processedImages[0]);
        }
      }
    });
    
    // Pass the processed form values to the parent component
    onSubmit(processedValues as HotelFormData);
  }, [onSubmit, form]);

  return (
    <Form {...form}>
      <form id="hotel-form" onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BasicInformation form={form} />
          <AmenitiesSection form={form} hotelId={initialData?.id} />
          <RoomTypesSection form={form} />
        </div>

        {showButtons && (
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
              <Save className="mr-1 h-4 w-4" />
              {isLoading ? "Saving..." : "Save Hotel"}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
});

HotelForm.displayName = 'HotelForm';

export default HotelForm;
