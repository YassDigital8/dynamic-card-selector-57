
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
  const platformType = form.watch(`socialMedia.${index}.platform`);
  
  // Get validation status for this field
  const fieldError = form.formState.errors?.socialMedia?.[index]?.url;
  
  // Generate placeholder based on platform
  const getPlaceholder = (platform: string) => {
    switch(platform) {
      case 'website': return 'https://www.example.com';
      case 'facebook': return 'https://facebook.com/page-name';
      case 'instagram': return 'https://instagram.com/username';
      case 'twitter': return 'https://twitter.com/username';
      case 'linkedin': return 'https://linkedin.com/company/name';
      case 'email': return 'contact@example.com';
      default: return 'https://www.example.com';
    }
  };

  // Determine input type based on platform
  const getInputType = (platform: string) => {
    return platform === 'email' ? 'email' : 'url';
  };
  
  return (
    <div className="grid grid-cols-12 gap-3 items-center p-3 rounded-md border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm">
      {/* Platform Type */}
      <FormField
        control={form.control}
        name={`socialMedia.${index}.platform`}
        render={({ field }) => (
          <FormItem className="col-span-12 sm:col-span-3">
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="h-9 text-xs md:text-sm">
                  <div className="flex items-center">
                    <span className="mr-1">{getSocialIcon(field.value)}</span>
                    <SelectValue placeholder="Platform" />
                  </div>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="twitter">Twitter/X</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      
      {/* URL or Email */}
      <FormField
        control={form.control}
        name={`socialMedia.${index}.url`}
        render={({ field }) => (
          <FormItem className="col-span-12 sm:col-span-5">
            <FormControl>
              <div className="flex items-center space-x-1">
                <Input 
                  {...field} 
                  placeholder={getPlaceholder(platformType)} 
                  className={`${fieldError ? "border-red-500 focus-visible:ring-red-500" : ""} h-9 text-xs md:text-sm`}
                  type={getInputType(platformType)}
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
          <FormItem className="col-span-10 sm:col-span-3">
            <FormControl>
              <Input 
                {...field} 
                placeholder={platformType === 'email' ? "Contact person name" : "Display label (optional)"} 
                className="h-9 text-xs md:text-sm"
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      
      {/* Delete Button */}
      <div className="col-span-2 sm:col-span-1 flex justify-end">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="h-8 w-8 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SocialMediaItemForm;
