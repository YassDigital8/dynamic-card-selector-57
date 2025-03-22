
import React from 'react';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { getSocialIcon } from './ContactIcons';

interface SocialMediaItemFormProps {
  index: number;
  onRemove: () => void;
}

const SocialMediaItemForm: React.FC<SocialMediaItemFormProps> = ({ 
  index, 
  onRemove 
}) => {
  const form = useFormContext();
  
  return (
    <div className="grid grid-cols-12 gap-2 items-center border-b pb-2 border-gray-100 dark:border-gray-800">
      {/* Platform Type */}
      <FormField
        control={form.control}
        name={`socialMedia.${index}.platform`}
        render={({ field }) => (
          <FormItem className="col-span-3">
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* URL */}
      <FormField
        control={form.control}
        name={`socialMedia.${index}.url`}
        render={({ field }) => (
          <FormItem className="col-span-6">
            <FormControl>
              <div className="flex items-center space-x-1">
                <span className="text-muted-foreground">
                  {getSocialIcon(form.watch(`socialMedia.${index}.platform`))}
                </span>
                <Input {...field} placeholder="URL (https://...)" />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Label */}
      <FormField
        control={form.control}
        name={`socialMedia.${index}.label`}
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormControl>
              <Input {...field} placeholder="Label (optional)" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Delete Button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="col-span-1 h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SocialMediaItemForm;
