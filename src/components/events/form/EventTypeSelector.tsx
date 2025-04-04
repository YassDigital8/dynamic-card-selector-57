
import React, { useMemo } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { eventCategoriesData } from '@/data/eventCategoriesData';
import { UseFormReturn } from 'react-hook-form';
import { EventFormSchema } from './eventFormSchema';
import { Lock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface EventTypeSelectorProps {
  form: UseFormReturn<EventFormSchema>;
  categories: string[];
  readOnly?: boolean;
}

const EventTypeSelector: React.FC<EventTypeSelectorProps> = ({ form, categories, readOnly = false }) => {
  const selectedCategory = form.watch('category');
  
  const eventTypes = useMemo(() => {
    if (!selectedCategory) return [];
    const category = eventCategoriesData.find(c => c.name === selectedCategory);
    return category ? category.eventTypes : [];
  }, [selectedCategory]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              Category
              {readOnly && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Category cannot be modified for existing events</p>
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
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        <div className="flex flex-col">
                          <span>{category}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="eventType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              Event Type
              {readOnly && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Event type cannot be modified for existing events</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </FormLabel>
            <FormControl>
              {readOnly ? (
                <div className="bg-muted p-3 rounded-md">
                  <p>{field.value || 'None'}</p>
                </div>
              ) : (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={!selectedCategory || eventTypes.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default EventTypeSelector;
