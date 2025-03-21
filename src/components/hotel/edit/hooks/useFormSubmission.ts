
import { useCallback } from 'react';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import { processAmenityImages } from '../utils/imageHandling';

interface UseFormSubmissionProps {
  selectedHotel: Hotel;
  customLogo?: string;
  onSubmit: (data: HotelFormData) => void;
}

export const useFormSubmission = ({ selectedHotel, customLogo, onSubmit }: UseFormSubmissionProps) => {
  const handleSubmit = useCallback((data: HotelFormData) => {
    // Debug - log the form data before submission
    console.log('Form data before submission:', JSON.stringify(data, null, 2));
    
    // Validate image arrays before submission
    if (data.amenities) {
      Object.entries(data.amenities).forEach(([key, value]) => {
        if (key.includes('Images')) {
          console.log(`Submitting ${key}:`, JSON.stringify(value, null, 2));
          if (Array.isArray(value)) {
            console.log(`Found ${value.length} images in ${key}:`, value.length > 0 ? JSON.stringify(value[0], null, 2) : 'empty array');
          } else {
            console.error(`WARNING: ${key} is not an array:`, value);
          }
        }
      });
    }
    
    // Process the data to ensure correct structure
    const processedData = processAmenityImages(data);
    
    // Include the logo URL in the form data
    processedData.logoUrl = customLogo;
    
    console.log('Final processed data:', JSON.stringify(processedData, null, 2));
    
    // Submit the processed form data to the parent component
    onSubmit(processedData);
  }, [customLogo, onSubmit]);

  return { handleSubmit };
};
