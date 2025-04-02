
import React, { useMemo } from 'react';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectGroup,
  SelectLabel,
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { EventType } from '@/models/EventModel';
import { EventTypeIcon } from '@/components/events';
import { UseFormReturn } from 'react-hook-form';
import { eventCategoriesData } from '@/data/eventCategoriesData';
import { categoryDescriptions } from '@/data/categoryDescriptions';

interface EventTypeSelectorProps {
  form: UseFormReturn<any>;
  categories: string[];
}

const EventTypeSelector: React.FC<EventTypeSelectorProps> = ({
  form,
  categories
}) => {
  // Get the current selected category
  const selectedCategory = form.watch('category');
  
  // Filter event types based on selected category
  const availableEventTypes = useMemo(() => {
    if (!selectedCategory) return [];
    
    const categoryData = eventCategoriesData.find(cat => cat.name === selectedCategory);
    return categoryData?.eventTypes || [];
  }, [selectedCategory]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <Select 
              onValueChange={(value) => {
                field.onChange(value);
                // Reset event type when category changes
                form.setValue('eventType', undefined);
              }}
              defaultValue={field.value}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[400px]">
                {categories.map(category => (
                  <SelectItem key={category} value={category} className="py-2">
                    <div className="flex flex-col">
                      <span>{category}</span>
                      {categoryDescriptions[category] && (
                        <span className="text-xs text-muted-foreground">
                          {categoryDescriptions[category]}
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="eventType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Event Type</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
              value={field.value}
              disabled={!selectedCategory || availableEventTypes.length === 0}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select an event type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[300px]">
                {availableEventTypes.map(type => (
                  <SelectItem key={type} value={type} className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <EventTypeIcon eventType={type} className="text-muted-foreground" />
                      <span>{type}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default EventTypeSelector;
