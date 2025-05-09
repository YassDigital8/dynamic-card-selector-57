
import React, { useEffect } from 'react';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, AlertCircle, CheckCircle } from 'lucide-react';
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
  const isPrimary = form.watch(`contactDetails.${index}.isPrimary`);
  
  // Get validation status for this field
  const fieldError = form.formState.errors?.contactDetails?.[index]?.value;
  
  // Generate placeholder based on type
  const getPlaceholder = (type: string) => {
    switch(type) {
      case 'phone': return '+1 (555) 123-4567';
      case 'fax': return '+1 (555) 987-6543';
      case 'whatsapp': return '+1 (555) 123-4567';
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
    <div className="grid grid-cols-12 gap-3 items-center p-3 rounded-md border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm">
      {/* Contact Type */}
      <FormField
        control={form.control}
        name={`contactDetails.${index}.type`}
        render={({ field }) => (
          <FormItem className="col-span-12 sm:col-span-2">
            <Select 
              onValueChange={(value) => {
                field.onChange(value);
                // Clear value when changing type to prevent validation errors carrying over
                form.setValue(`contactDetails.${index}.value`, '', { shouldValidate: true });
              }} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="h-9 text-xs md:text-sm w-full sm:w-auto">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="fax">Fax</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
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
          <FormItem className="col-span-12 sm:col-span-3">
            <FormControl>
              <div className="flex items-center space-x-1">
                <span className="text-muted-foreground hidden sm:inline-flex">
                  {getContactIcon(contactType)}
                </span>
                <Input 
                  {...field} 
                  placeholder={getPlaceholder(contactType)} 
                  className={`${fieldError ? "border-red-500 focus-visible:ring-red-500" : ""} h-9 text-xs md:text-sm`}
                  type="text"
                  inputMode={contactType === 'phone' || contactType === 'fax' || contactType === 'whatsapp' ? 'tel' : undefined}
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
      
      {/* Person Name */}
      <FormField
        control={form.control}
        name={`contactDetails.${index}.personName`}
        render={({ field }) => (
          <FormItem className="col-span-12 sm:col-span-2">
            <FormControl>
              <Input 
                {...field} 
                placeholder="Contact person name" 
                className="h-9 text-xs md:text-sm"
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      
      {/* Person Role - New field */}
      <FormField
        control={form.control}
        name={`contactDetails.${index}.personRole`}
        render={({ field }) => (
          <FormItem className="col-span-12 sm:col-span-3">
            <FormControl>
              <Input 
                {...field} 
                placeholder="Role (e.g. Manager, Receptionist)" 
                className="h-9 text-xs md:text-sm"
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      
      {/* Primary Toggle */}
      <FormField
        control={form.control}
        name={`contactDetails.${index}.isPrimary`}
        render={({ field }) => (
          <div className="col-span-9 sm:col-span-1 flex items-center justify-center">
            <Button
              type="button"
              variant={isPrimary ? "success" : "outline"}
              size="sm"
              className={`h-8 w-8 rounded-full p-0 ${isPrimary ? 'bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800' : 'text-gray-400'}`}
              onClick={onSetPrimary}
              disabled={isPrimary}
              title={isPrimary ? "Primary contact" : "Set as primary contact"}
            >
              <CheckCircle className={`h-4 w-4 ${isPrimary ? "" : "opacity-50"}`} />
            </Button>
            {isPrimary && (
              <span className="ml-1 text-xs text-blue-600 dark:text-blue-400 hidden sm:block">
                Primary
              </span>
            )}
          </div>
        )}
      />
      
      {/* Delete Button */}
      <div className="col-span-3 sm:col-span-1 flex justify-end">
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

export default ContactItemForm;
