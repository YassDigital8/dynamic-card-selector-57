import React from 'react';
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

interface RoomTypeFormProps {
  form: UseFormReturn<FormValues>;
  index: number;
}

const RoomTypeForm: React.FC<RoomTypeFormProps> = ({ form, index }) => {
  return (
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
