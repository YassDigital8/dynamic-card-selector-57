
import React, { useEffect } from 'react';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Trash2, AlertCircle } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { getContactIcon } from './ContactIcons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ContactItemFormProps {
  index: number;
  onRemove: () => void;
  onSetPrimary: () => void;
}

const ContactItemForm: React.FC<ContactItemFormProps> = ({ 
  index, 
  onRemove,
  onSetPrimary
}) => {
  const form = useFormContext();
  const contactType = form.watch(`contactDetails.${index}.type`);
  
  // Get validation status for this field
  const fieldError = form.formState.errors?.contactDetails?.[index]?.value;
  
  // Generate placeholder based on type
  const getPlaceholder = (type: string) => {
    switch(type) {
      case 'phone': return '+1 (555) 123-4567';
      case 'email': return 'contact@example.com';
      case 'address': return 'Full address';
      case 'fax': return '+1 (555) 987-6543';
      default: return 'Contact information';
    }
  };
  
  // Revalidate when contact type changes
  useEffect(() => {
    if (form.getValues(`contactDetails.${index}.value`)) {
      form.trigger(`contactDetails.${index}.value`);
    }
  }, [contactType, form, index]);
  
  return (
    <div className="grid grid-cols-12 gap-1 md:gap-2 items-center border-b pb-2 border-gray-100 dark:border-gray-800">
      {/* Contact Type */}
      <FormField
        control={form.control}
        name={`contactDetails.${index}.type`}
        render={({ field }) => (
          <FormItem className="col-span-3 sm:col-span-3">
            <Select 
              onValueChange={(value) => {
                field.onChange(value);
                // Clear value when changing type to prevent validation errors carrying over
                form.setValue(`contactDetails.${index}.value`, '', { shouldValidate: true });
              }} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="h-8 text-xs md:text-sm">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="address">Address</SelectItem>
                <SelectItem value="fax">Fax</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      
      {/* Contact Value */}
      <FormField
        control={form.control}
        name={`contactDetails.${index}.value`}
        render={({ field }) => (
          <FormItem className="col-span-6 sm:col-span-7">
            <FormControl>
              <div className="flex items-center space-x-1">
                <span className="text-muted-foreground hidden sm:inline-flex">
                  {getContactIcon(contactType)}
                </span>
                <Input 
                  {...field} 
                  placeholder={getPlaceholder(contactType)} 
                  className={`${fieldError ? "border-red-500 focus-visible:ring-red-500" : ""} h-8 text-xs md:text-sm`}
                  type={contactType === 'email' ? 'email' : 'text'}
                  inputMode={contactType === 'phone' || contactType === 'fax' ? 'tel' : undefined}
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
      
      {/* Primary Switch */}
      <FormField
        control={form.control}
        name={`contactDetails.${index}.isPrimary`}
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-center space-x-1 col-span-2 md:col-span-1">
            <FormControl>
              <div className="flex flex-col items-center sm:flex-row sm:space-x-1">
                <Switch
                  checked={field.value}
                  onCheckedChange={onSetPrimary}
                  className="scale-75 sm:scale-90 md:scale-100"
                />
                {field.value && <Badge variant="outline" className="text-[10px] hidden sm:inline-flex">Primary</Badge>}
              </div>
            </FormControl>
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

export default ContactItemForm;
