
import React from 'react';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, AlertCircle } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { getSocialIcon } from './ContactIcons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SocialMediaItemFormProps {
  index: number;
  onRemove: () => void;
}

const SocialMediaItemForm: React.FC<SocialMediaItemFormProps> = ({ 
  index, 
  onRemove 
}) => {
  const form = useFormContext();
  const platform = form.watch(`socialMedia.${index}.platform`);
  
  // Get validation status for this field
  const fieldError = form.formState.errors?.socialMedia?.[index]?.url;
  
  // Generate placeholder based on platform
  const getPlaceholder = (platform: string) => {
    switch(platform) {
      case 'website': return 'https://www.example.com';
      case 'facebook': return 'https://www.facebook.com/example';
      case 'instagram': return 'https://www.instagram.com/example';
      case 'twitter': return 'https://twitter.com/example';
      case 'linkedin': return 'https://www.linkedin.com/company/example';
      default: return 'https://...';
    }
  };
  
  return (
    <div className="grid grid-cols-12 gap-1 md:gap-2 items-center border-b pb-2 border-gray-100 dark:border-gray-800">
      {/* Platform Type */}
      <FormField
        control={form.control}
        name={`socialMedia.${index}.platform`}
        render={({ field }) => (
          <FormItem className="col-span-3">
            <Select 
              onValueChange={(value) => {
                field.onChange(value);
                // Trigger validation after platform change
                setTimeout(() => form.trigger(`socialMedia.${index}.url`), 0);
              }} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="h-8 text-xs md:text-sm">
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
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      
      {/* URL */}
      <FormField
        control={form.control}
        name={`socialMedia.${index}.url`}
        render={({ field }) => (
          <FormItem className="col-span-5 sm:col-span-6">
            <FormControl>
              <div className="flex items-center space-x-1">
                <span className="text-muted-foreground hidden sm:inline-flex">
                  {getSocialIcon(platform)}
                </span>
                <Input 
                  {...field} 
                  placeholder={getPlaceholder(platform)} 
                  className={`${fieldError ? "border-red-500 focus-visible:ring-red-500" : ""} h-8 text-xs md:text-sm`}
                />
                {fieldError && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">{fieldError.message?.toString()}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      
      {/* Label */}
      <FormField
        control={form.control}
        name={`socialMedia.${index}.label`}
        render={({ field }) => (
          <FormItem className="col-span-3 sm:col-span-2">
            <FormControl>
              <Input {...field} placeholder="Label (optional)" className="h-8 text-xs md:text-sm" />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      
      {/* Delete Button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="col-span-1 h-6 w-6 sm:h-8 sm:w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
      >
        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
      </Button>
    </div>
  );
};

export default SocialMediaItemForm;
