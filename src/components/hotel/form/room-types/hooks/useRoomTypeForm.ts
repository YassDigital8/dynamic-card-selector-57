
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../../schemas/formSchema';
import { createDefaultRoomType } from '../../schemas/roomTypeSchema';

interface UseRoomTypeFormProps {
  form: UseFormReturn<FormValues>;
  index: number;
}

export const useRoomTypeForm = ({ form, index }: UseRoomTypeFormProps) => {
  const [hasExtraBed, setHasExtraBed] = useState<boolean>(false);
  
  // Initialize the room types array if it doesn't exist
  useEffect(() => {
    const roomTypes = form.getValues('roomTypes');
    if (!roomTypes || !Array.isArray(roomTypes)) {
      console.log("Initializing room types array");
      form.setValue('roomTypes', [], { shouldValidate: false });
    }
    
    // Ensure the current room type exists
    const currentRoomType = form.getValues(`roomTypes.${index}`);
    if (!currentRoomType) {
      console.log(`Room type at index ${index} does not exist, initializing it`);
      // Create a default room type with a uniquely generated ID
      const defaultRoomType = createDefaultRoomType();
      
      // Get the current array
      const currentRoomTypes = form.getValues('roomTypes') || [];
      
      // Ensure we have an array up to this index
      while (currentRoomTypes.length <= index) {
        currentRoomTypes.push(null);
      }
      
      // Set the room type at this index
      currentRoomTypes[index] = defaultRoomType;
      
      // Update the entire array
      form.setValue('roomTypes', currentRoomTypes, { shouldValidate: false });
    }
    
    // Watch for changes in the allowExtraBed field
    const subscription = form.watch((value, { name }) => {
      if (name === `roomTypes.${index}.allowExtraBed`) {
        const extraBedEnabled = form.getValues(`roomTypes.${index}.allowExtraBed`);
        setHasExtraBed(!!extraBedEnabled);
      }
    });
    
    // Set initial value
    const allowExtraBed = form.getValues(`roomTypes.${index}.allowExtraBed`);
    setHasExtraBed(!!allowExtraBed);
    
    return () => subscription.unsubscribe();
  }, [form, index]);
  
  return {
    hasExtraBed
  };
};

// Function to add a new room type to the form
export const addNewRoomType = (form: UseFormReturn<FormValues>) => {
  const currentRoomTypes = form.getValues('roomTypes') || [];
  const newRoomType = createDefaultRoomType();
  
  form.setValue('roomTypes', [...currentRoomTypes, newRoomType], { shouldValidate: true });
  console.log('Added new room type:', newRoomType);
  console.log('Room types after adding:', form.getValues('roomTypes'));
  
  return newRoomType;
};
