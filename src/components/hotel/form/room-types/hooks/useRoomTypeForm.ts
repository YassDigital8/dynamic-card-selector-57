
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../../formSchema';

interface UseRoomTypeFormProps {
  form: UseFormReturn<FormValues>;
  index: number;
}

export const useRoomTypeForm = ({ form, index }: UseRoomTypeFormProps) => {
  const hasExtraBed = form.watch('amenities.extraBed');
  const roomType = form.watch(`roomTypes.${index}`);
  
  // Initialize form fields when component mounts
  useEffect(() => {
    // If room name is empty, set a default name
    const currentName = form.getValues(`roomTypes.${index}.name`);
    if (!currentName || currentName.trim() === '') {
      form.setValue(`roomTypes.${index}.name`, `Room Type ${index + 1}`, {
        shouldValidate: true
      });
    }
  }, [form, index]);

  // Handle allowing extra beds based on the global amenity setting
  useEffect(() => {
    if (!hasExtraBed) {
      form.setValue(`roomTypes.${index}.allowExtraBed`, false);
    }
  }, [hasExtraBed, form, index]);

  return {
    hasExtraBed,
    roomType
  };
};
