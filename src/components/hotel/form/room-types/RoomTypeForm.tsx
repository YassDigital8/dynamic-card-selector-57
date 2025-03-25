
import React, { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormValues } from '../formSchema';
import { Switch } from '@/components/ui/switch';
import { Bed, DollarSign, Users, Child } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name={`roomTypes.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Room Type Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. Deluxe Room" 
                    {...field} 
                    className="bg-white dark:bg-gray-950"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`roomTypes.${index}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Brief description of room" 
                    {...field}
                    className="bg-white dark:bg-gray-950"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name={`roomTypes.${index}.maxAdults`}
            render={({ field }) => (
              <FormItem>
                <FormLabel required className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                  Max Adults
                </FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1" 
                    className="bg-white dark:bg-gray-950"
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`roomTypes.${index}.maxChildren`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  <Child className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                  Max Children
                </FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0"
                    className="bg-white dark:bg-gray-950" 
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`roomTypes.${index}.price`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                  Base Price
                </FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    placeholder="0.00"
                    className="bg-white dark:bg-gray-950"
                    {...field} 
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                  />
                </FormControl>
                <FormDescription>Per night price (optional)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Extra Bed Section (Only shown if the amenity is enabled) */}
      {hasExtraBed && (
        <>
          <Separator className="my-4 bg-indigo-100 dark:bg-indigo-900/50" />
          
          <div className="p-4 bg-blue-50/50 dark:bg-blue-950/10 rounded-md border border-blue-100 dark:border-blue-900/50">
            <div className="flex items-center gap-2 mb-3">
              <Bed className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h4 className="font-medium text-blue-700 dark:text-blue-400">Extra Bed Settings</h4>
            </div>
            
            <FormField
              control={form.control}
              name={`roomTypes.${index}.allowExtraBed`}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-blue-100 dark:border-blue-900/50 p-3 bg-white dark:bg-gray-950">
                  <div className="space-y-0.5">
                    <FormLabel>Allow Extra Bed</FormLabel>
                    <FormDescription>
                      Enable extra bed option for this room type
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch(`roomTypes.${index}.allowExtraBed`) && (
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`roomTypes.${index}.maxExtraBeds`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Extra Beds</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          max="5"
                          placeholder="1"
                          className="bg-white dark:bg-gray-950"
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`roomTypes.${index}.extraBedPrice`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Extra Bed Price</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          placeholder="0.00"
                          className="bg-white dark:bg-gray-950"
                          {...field} 
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormDescription>Price per night</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
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
