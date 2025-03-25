
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormValues } from '../formSchema';
import { Switch } from '@/components/ui/switch';
import { Bed } from 'lucide-react';

interface RoomTypeFormProps {
  form: UseFormReturn<FormValues>;
  index: number;
}

const RoomTypeForm: React.FC<RoomTypeFormProps> = ({ form, index }) => {
  const [hasExtraBed, setHasExtraBed] = useState(false);
  
  // Check if the amenities.extraBed is enabled
  React.useEffect(() => {
    const extraBedEnabled = form.getValues('amenities.extraBed');
    setHasExtraBed(extraBedEnabled);
  }, [form]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`roomTypes.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Type Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Deluxe Room" {...field} />
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
                <Input placeholder="Description of room" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`roomTypes.${index}.maxAdults`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Adults</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="1" 
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
              <FormLabel>Max Children</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="0" 
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
              <FormLabel>Price (Optional)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="0" 
                  placeholder="0.00"
                  {...field} 
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {hasExtraBed && (
        <div className="mt-4 p-4 border border-blue-100 dark:border-blue-900 rounded-md">
          <div className="flex items-center gap-2 mb-3">
            <Bed className="w-4 h-4 text-blue-500" />
            <h4 className="font-medium">Extra Bed Settings</h4>
          </div>
          
          <FormField
            control={form.control}
            name={`roomTypes.${index}.allowExtraBed`}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Allow Extra Bed</FormLabel>
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
                    <FormLabel>Extra Bed Price per Night</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        placeholder="0.00"
                        {...field} 
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RoomTypeForm;

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
