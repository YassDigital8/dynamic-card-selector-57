
import React from 'react';
import { FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormValues } from '../../formSchema';

const RoomTypeSelector: React.FC = () => {
  const form = useFormContext<FormValues>();
  const roomTypes = form.watch('roomTypes') || [];

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

  return (
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
  );
};

export default RoomTypeSelector;
