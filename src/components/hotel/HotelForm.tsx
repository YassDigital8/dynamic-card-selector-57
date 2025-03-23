
import React, { useCallback, memo, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
} from '@/components/ui/form';
import { Hotel, HotelFormData, AmenityImage } from '@/models/HotelModel';
import { 
  BasicInformation, 
  AmenitiesSection, 
  RoomTypesSection,
  formSchema,
  defaultValues
} from './form';
import { ContactDetailsSection } from './form/contact';
import { ContractDocumentSection } from './form/contract';
import ExtendedFeaturesSection from './form/ExtendedFeaturesSection';
import { Save } from 'lucide-react';

interface HotelFormProps {
  initialData?: Hotel;
  onSubmit: (data: HotelFormData) => void;
  isLoading: boolean;
  showButtons?: boolean;
}

const HotelForm = memo(({ 
  initialData, 
  onSubmit, 
  isLoading, 
  showButtons = true 
}: HotelFormProps) => {
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
  }, [initialData, form]);

  const handleSubmit = useCallback((values: typeof formSchema._type) => {
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

  return (
    <Form {...form}>
      <form id="hotel-form" onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BasicInformation form={form} />
          <AmenitiesSection form={form} hotelId={initialData?.id} />
          <RoomTypesSection form={form} />
          <ContactDetailsSection />
          <ContractDocumentSection />
          <ExtendedFeaturesSection />
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
