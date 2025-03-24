
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useFormContext } from 'react-hook-form';

interface LocationDisplayProps {
  onReset: () => void;
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({ onReset }) => {
  const form = useFormContext();
  
  return (
    <FormField
      control={form.control}
      name="geolocation"
      render={({ field }) => (
        <FormItem>
          <div className="flex justify-between">
            <FormLabel>Selected Coordinates</FormLabel>
            <Button 
              type="button" 
              onClick={onReset} 
              variant="ghost" 
              size="sm" 
              className="text-red-500 hover:text-red-700"
            >
              Reset
            </Button>
          </div>
          <FormControl>
            <div className="text-sm text-muted-foreground">
              {field.value ? (
                <div className="space-y-1">
                  <p>Latitude: {field.value.lat.toFixed(6)}</p>
                  <p>Longitude: {field.value.lng.toFixed(6)}</p>
                  {field.value.formattedAddress && (
                    <p>Address: {field.value.formattedAddress}</p>
                  )}
                </div>
              ) : (
                <p>No location selected</p>
              )}
            </div>
          </FormControl>
          <FormDescription>
            Click on the map to select a location or search for an address
          </FormDescription>
        </FormItem>
      )}
    />
  );
};

export default LocationDisplay;
