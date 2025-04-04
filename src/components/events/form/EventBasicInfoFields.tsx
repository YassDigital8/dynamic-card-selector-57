
import React from 'react';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { Lock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface EventBasicInfoFieldsProps {
  form: UseFormReturn<any>;
  readOnly?: boolean;
}

const EventBasicInfoFields: React.FC<EventBasicInfoFieldsProps> = ({ form, readOnly = false }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              Event Title
              {readOnly && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Title cannot be modified for existing events</p>
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
                <Input placeholder="Enter event title" {...field} />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              Description
              {readOnly && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Description cannot be modified for existing events</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </FormLabel>
            <FormControl>
              {readOnly ? (
                <div className="bg-muted p-3 rounded-md min-h-32 whitespace-pre-wrap">
                  <p>{field.value}</p>
                </div>
              ) : (
                <Textarea 
                  placeholder="Enter event description" 
                  className="min-h-32" 
                  {...field} 
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="rating"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              Rating (0-5)
              {readOnly && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Rating cannot be modified for existing events</p>
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
                <Input 
                  type="number" 
                  min="0" 
                  max="5" 
                  step="0.1" 
                  {...field}
                  onChange={e => field.onChange(parseFloat(e.target.value))}
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default EventBasicInfoFields;
