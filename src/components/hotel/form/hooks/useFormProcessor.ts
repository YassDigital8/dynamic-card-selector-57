
import { useCallback, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../formSchema';
import { HotelFormData } from '@/models/HotelModel';

interface UseFormProcessorProps {
  form: UseFormReturn<FormValues>;
  onSubmit: (data: HotelFormData) => void;
}

export const useFormProcessor = ({ form, onSubmit }: UseFormProcessorProps) => {
  // Debug form state to verify values are being captured correctly
  useEffect(() => {
    console.log('HotelForm - Form initialized with:', form.formState.defaultValues ? 'existing hotel data' : 'default values');
    
    // Log amenity image fields in initialData
    const amenities = form.getValues('amenities');
    if (amenities) {
      console.log('HotelForm - Initial amenities state:', JSON.stringify(amenities, null, 2));
      
      // Check all image fields
      Object.entries(amenities).forEach(([key, value]) => {
        if (key.includes('Images')) {
          console.log(`HotelForm - Initial ${key}:`, JSON.stringify(value, null, 2));
          if (Array.isArray(value) && value.length > 0) {
            console.log(`First image in ${key}:`, JSON.stringify(value[0], null, 2));
          }
        }
      });
    }
    
    // Subscribe to form state changes
    const subscription = form.watch((value, { name, type }) => {
      if (name?.startsWith('amenities.') && name.includes('Images')) {
        console.log(`HotelForm - Form field changed: ${name}`, JSON.stringify(value, null, 2));
        console.log('HotelForm - Form is dirty:', form.formState.isDirty);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);

  const handleSubmit = useCallback((values: FormValues) => {
    console.log('HotelForm - Submitting form with values:', JSON.stringify(values, null, 2));
    console.log('HotelForm - Form is dirty before submission:', form.formState.isDirty);
    
    // Create a deep copy to avoid mutating the original values
    const processedValues = JSON.parse(JSON.stringify(values));
    
    // Ensure all image arrays are properly structured and exist
    if (processedValues.amenities) {
      // Process each amenity that can have images
      const amenityKeysWithImages = ['bar', 'gym', 'spa', 'restaurant', 'breakfast', 'swimmingPool'];
      
      amenityKeysWithImages.forEach(amenityKey => {
        const imagesKey = `${amenityKey}Images`;
        
        // Initialize empty array if it doesn't exist
        if (!processedValues.amenities[imagesKey]) {
          processedValues.amenities[imagesKey] = [];
        }
        
        // Ensure images array is valid
        if (Array.isArray(processedValues.amenities[imagesKey])) {
          const images = processedValues.amenities[imagesKey];
          
          // Process each image to ensure it has required properties
          processedValues.amenities[imagesKey] = images.map((img: any, index: number) => {
            if (typeof img !== 'object' || img === null) {
              // Convert strings or invalid values to proper image objects
              return {
                url: typeof img === 'string' ? img : '',
                id: `${amenityKey}-${index}-${Date.now()}`
              };
            }
            
            // Ensure required properties
            return {
              ...img,
              url: img.url || '',
              id: img.id || `${amenityKey}-${index}-${Date.now()}`
            };
          }).filter((img: any) => img.url); // Remove any images without URLs
          
          console.log(`HotelForm - Processed ${imagesKey} - ${processedValues.amenities[imagesKey].length} images:`, 
            JSON.stringify(processedValues.amenities[imagesKey], null, 2));
        }
      });
    }
    
    // Process contact details to ensure they have IDs
    if (processedValues.contactDetails && Array.isArray(processedValues.contactDetails)) {
      processedValues.contactDetails = processedValues.contactDetails.map((contact: any, index: number) => ({
        ...contact,
        id: contact.id || `contact-${index}-${Date.now()}`
      }));
    }
    
    // Process social media links to ensure they have IDs
    if (processedValues.socialMedia && Array.isArray(processedValues.socialMedia)) {
      processedValues.socialMedia = processedValues.socialMedia.map((social: any, index: number) => ({
        ...social,
        id: social.id || `social-${index}-${Date.now()}`
      }));
    }
    
    // Process contract documents to ensure they have IDs
    if (processedValues.contractDocuments && Array.isArray(processedValues.contractDocuments)) {
      processedValues.contractDocuments = processedValues.contractDocuments.map((doc: any, index: number) => ({
        ...doc,
        id: doc.id || `contract-${index}-${Date.now()}`
      }));
    }
    
    // Process payment methods to ensure they have IDs
    if (processedValues.paymentMethods && Array.isArray(processedValues.paymentMethods)) {
      processedValues.paymentMethods = processedValues.paymentMethods.map((method: any, index: number) => ({
        ...method,
        id: method.id || `payment-${index}-${Date.now()}`
      }));
    }
    
    // Process seasonal pricing for room types
    if (processedValues.roomTypes && Array.isArray(processedValues.roomTypes)) {
      processedValues.roomTypes = processedValues.roomTypes.map((roomType: any, rtIndex: number) => {
        // Ensure room type has ID
        const roomTypeWithId = {
          ...roomType,
          id: roomType.id || `room-${rtIndex}-${Date.now()}`
        };
        
        // Process seasonal prices if they exist
        if (roomType.seasonalPrices && Array.isArray(roomType.seasonalPrices)) {
          roomTypeWithId.seasonalPrices = roomType.seasonalPrices.map((season: any, sIndex: number) => ({
            ...season,
            id: season.id || `season-${rtIndex}-${sIndex}-${Date.now()}`
          }));
        } else {
          roomTypeWithId.seasonalPrices = [];
        }
        
        return roomTypeWithId;
      });
    }
    
    // Pass the processed form values to the parent component
    onSubmit(processedValues as HotelFormData);
  }, [onSubmit, form]);

  return { handleSubmit };
};
