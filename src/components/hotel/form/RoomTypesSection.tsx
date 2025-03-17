
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
import { Button } from '@/components/ui/button';
import { FormValues } from './formSchema';

interface RoomTypesSectionProps {
  form: UseFormReturn<FormValues>;
}

const RoomTypesSection: React.FC<RoomTypesSectionProps> = ({ form }) => {
  return (
    <div className="space-y-6 col-span-2">
      <h3 className="text-lg font-medium text-foreground">Room Types</h3>
      {form.watch('roomTypes').map((_, index) => (
        <div key={index} className="p-4 border rounded-md space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Room Type {index + 1}</h4>
            {index > 0 && (
              <Button 
                variant="destructive" 
                size="sm" 
                type="button"
                onClick={() => {
                  const currentRoomTypes = form.getValues('roomTypes');
                  form.setValue('roomTypes', currentRoomTypes.filter((_, i) => i !== index));
                }}
              >
                Remove
              </Button>
            )}
          </div>
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
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          const currentRoomTypes = form.getValues('roomTypes');
          form.setValue('roomTypes', [
            ...currentRoomTypes,
            { name: '', maxAdults: 1, maxChildren: 0 }
          ]);
        }}
      >
        Add Room Type
      </Button>
    </div>
  );
};

export default RoomTypesSection;
