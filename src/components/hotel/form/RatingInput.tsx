
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormValues } from './formSchema';

interface RatingInputProps {
  form: UseFormReturn<FormValues>;
}

const RatingInput: React.FC<RatingInputProps> = ({ form }) => {
  const ratingStars = [1, 2, 3, 4, 5];

  return (
    <FormField
      control={form.control}
      name="rating"
      render={({ field }) => (
        <FormItem className="space-y-1.5">
          <FormLabel>Rating</FormLabel>
          <FormControl>
            <div className="flex items-center space-x-1">
              {ratingStars.map((star) => (
                <Button
                  key={star}
                  type="button"
                  variant="ghost"
                  size="sm"
                  className={`h-8 w-8 p-0 ${
                    (field.value || 0) >= star ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                  }`}
                  onClick={() => field.onChange(star)}
                >
                  <Star 
                    className="h-5 w-5" 
                    fill={(field.value || 0) >= star ? 'currentColor' : 'none'} 
                  />
                  <span className="sr-only">Rate {star} stars</span>
                </Button>
              ))}
              {field.value !== 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-xs ml-2"
                  onClick={() => field.onChange(0)}
                >
                  Clear
                </Button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RatingInput;
