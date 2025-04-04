
import React from 'react';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { Lock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface EventLocationFieldsProps {
  form: UseFormReturn<any>;
  readOnly?: boolean;
}

const EventLocationFields: React.FC<EventLocationFieldsProps> = ({ form, readOnly = false }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="location.address"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              Address
              {readOnly && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Address cannot be modified for existing events</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </FormLabel>
            <FormControl>
              {readOnly ? (
                <div className="bg-muted p-3 rounded-md">
                  <p>{field.value}</p>
                </div>
              ) : (
                <Input placeholder="Event address/venue" {...field} />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="location.city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                City
                {readOnly && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>City cannot be modified for existing events</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </FormLabel>
              <FormControl>
                {readOnly ? (
                  <div className="bg-muted p-3 rounded-md">
                    <p>{field.value}</p>
                  </div>
                ) : (
                  <Input placeholder="City" {...field} />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location.country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                Country
                {readOnly && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Country cannot be modified for existing events</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </FormLabel>
              <FormControl>
                {readOnly ? (
                  <div className="bg-muted p-3 rounded-md">
                    <p>{field.value}</p>
                  </div>
                ) : (
                  <Input placeholder="Country" {...field} />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default EventLocationFields;
