
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FormField, 
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormValues } from '../formSchema';
import { Bed, DollarSign } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const ExtraBedPricingSection: React.FC = () => {
  const form = useFormContext<FormValues>();
  const roomTypes = form.watch('roomTypes') || [];
  const amenities = form.watch('amenities') || {};
  const extraBedEnabled = amenities.extraBed || false;
  
  // Watch for price changes to force updates
  const pricePerNight = useWatch({
    control: form.control,
    name: 'extraBedPolicy.pricePerNight',
    defaultValue: 0
  });

  // Initialize extra bed policy if not present
  useEffect(() => {
    if (!form.getValues('extraBedPolicy') && extraBedEnabled) {
      form.setValue('extraBedPolicy', {
        pricePerNight: 0,
        availableForRoomTypes: [],
        maxExtraBedsPerRoom: 1,
        notes: ''
      }, { shouldValidate: true });
    }
  }, [form, extraBedEnabled]);

  // Log when the price changes to debug
  useEffect(() => {
    if (extraBedEnabled) {
      console.log('Extra bed price updated:', pricePerNight);
    }
  }, [extraBedEnabled, pricePerNight]);

  // Toggle extra bed availability
  const toggleRoomTypeForExtraBed = (roomTypeId: string) => {
    const currentAvailable = form.getValues('extraBedPolicy.availableForRoomTypes') || [];
    
    if (currentAvailable.includes(roomTypeId)) {
      // Remove room type if it's already included
      const newAvailable = currentAvailable.filter(id => id !== roomTypeId);
      form.setValue('extraBedPolicy.availableForRoomTypes', newAvailable, { shouldValidate: true });
    } else {
      // Add room type if it's not already included
      form.setValue('extraBedPolicy.availableForRoomTypes', [...currentAvailable, roomTypeId], { shouldValidate: true });
    }
  };

  // If extra bed is not enabled, don't show the pricing section
  if (!extraBedEnabled) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Bed className="h-5 w-5 text-blue-500" />
            Extra Bed Pricing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md text-center">
            <p className="text-gray-500 dark:text-gray-400">
              Enable the Extra Bed amenity in the Amenities section to configure extra bed pricing.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Bed className="h-5 w-5 text-blue-500" />
          Extra Bed Pricing
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="extraBedPolicy.pricePerNight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price per Night</FormLabel>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      step="0.01"
                      onChange={e => {
                        const value = parseFloat(e.target.value) || 0;
                        field.onChange(value);
                      }}
                      className="pl-10"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="extraBedPolicy.maxExtraBedsPerRoom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Extra Beds per Room</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value?.toString()}
                    onValueChange={val => field.onChange(parseInt(val))}
                    className="flex flex-row space-x-4"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <FormItem key={num} className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value={num.toString()} id={`max-beds-${num}`} />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer" htmlFor={`max-beds-${num}`}>
                          {num}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Available for Room Types</FormLabel>
            <div className="space-y-2">
              {roomTypes.length > 0 ? (
                roomTypes.map(roomType => {
                  const isAvailable = form.watch('extraBedPolicy.availableForRoomTypes')?.includes(roomType.id || '');
                  return (
                    <div
                      key={roomType.id}
                      className={`p-3 rounded-md border cursor-pointer transition-colors ${
                        isAvailable ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      }`}
                      onClick={() => toggleRoomTypeForExtraBed(roomType.id || '')}
                    >
                      <div className="font-medium">{roomType.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Max Occupancy: {roomType.maxAdults} adults, {roomType.maxChildren} children
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-sm text-muted-foreground">
                  Add room types first to make them available for extra beds
                </div>
              )}
            </div>
            <FormDescription>
              Click on a room type to toggle extra bed availability
            </FormDescription>
          </FormItem>

          <FormField
            control={form.control}
            name="extraBedPolicy.notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Add any special conditions or notes about extra beds"
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormDescription>
                  Optional information about availability, restrictions, etc.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ExtraBedPricingSection;
