
import React, { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../formSchema';
import { Separator } from '@/components/ui/separator';
import { BasicInfoFields, ExtraBedFields } from './components';

interface RoomTypeFormProps {
  form: UseFormReturn<FormValues>;
  index: number;
}

const RoomTypeForm: React.FC<RoomTypeFormProps> = ({ form, index }) => {
  const [hasExtraBed, setHasExtraBed] = useState(false);
  
  // Check if the amenities.extraBed is enabled
  useEffect(() => {
    const extraBedEnabled = form.getValues('amenities.extraBed');
    setHasExtraBed(extraBedEnabled);
  }, [form]);

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <BasicInfoFields form={form} index={index} />

      {/* Extra Bed Section (Only shown if the amenity is enabled) */}
      {hasExtraBed && (
        <>
          <Separator className="my-4 bg-indigo-100 dark:bg-indigo-900/50" />
          <ExtraBedFields form={form} index={index} />
        </>
      )}
    </div>
  );
};

export default RoomTypeForm;

// Helper hook for seasonal pricing (kept for reference)
export const useSeasonalPricing = (roomTypeId: string | undefined, formValues: any, updateFormValues: (values: any) => void) => {
  const [isSeasonalPricingOpen, setIsSeasonalPricingOpen] = useState(false);

  const handleOpenSeasonalPricing = () => {
    setIsSeasonalPricingOpen(true);
  };

  const handleCloseSeasonalPricing = () => {
    setIsSeasonalPricingOpen(false);
  };

  const handleSaveSeasonalPricing = (prices: any[]) => {
    if (!roomTypeId) return;
    
    const roomTypeIndex = formValues.roomTypes.findIndex((rt: any) => rt.id === roomTypeId);
    if (roomTypeIndex === -1) return;
    
    const updatedRoomTypes = [...formValues.roomTypes];
    updatedRoomTypes[roomTypeIndex] = {
      ...updatedRoomTypes[roomTypeIndex],
      seasonalPrices: prices
    };
    
    updateFormValues({
      ...formValues,
      roomTypes: updatedRoomTypes
    });
  };

  return {
    isSeasonalPricingOpen,
    handleOpenSeasonalPricing,
    handleCloseSeasonalPricing,
    handleSaveSeasonalPricing
  };
};
