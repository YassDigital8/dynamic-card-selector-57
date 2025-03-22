
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
    <div className="grid grid-cols-12 gap-2 items-center border-b pb-2 border-gray-100 dark:border-gray-800">
      {/* Contact Type */}
      <FormField
        control={form.control}
        name={`contactDetails.${index}.type`}
        render={({ field }) => (
          <FormItem className="col-span-3">
            <Select 
              onValueChange={(value) => {
                field.onChange(value);
                // Clear value when changing type to prevent validation errors carrying over
                form.setValue(`contactDetails.${index}.value`, '', { shouldValidate: true });
              }} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
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
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Contact Value */}
      <FormField
        control={form.control}
        name={`contactDetails.${index}.value`}
        render={({ field }) => (
          <FormItem className="col-span-5">
            <FormControl>
              <div className="flex items-center space-x-1">
                <span className="text-muted-foreground">
                  {getContactIcon(contactType)}
                </span>
                <Input 
                  {...field} 
                  placeholder={getPlaceholder(contactType)} 
                  className={fieldError ? "border-red-500 focus-visible:ring-red-500" : ""}
                  type={contactType === 'email' ? 'email' : 'text'}
                  inputMode={contactType === 'phone' || contactType === 'fax' ? 'tel' : undefined}
                />
                {fieldError && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{fieldError.message?.toString()}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Contact Label */}
      <FormField
        control={form.control}
        name={`contactDetails.${index}.label`}
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormControl>
              <Input {...field} placeholder="Label (optional)" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Primary Switch */}
      <FormField
        control={form.control}
        name={`contactDetails.${index}.isPrimary`}
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-center space-x-1 col-span-1">
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={onSetPrimary}
              />
            </FormControl>
            {field.value && <Badge variant="outline" className="text-xs">Primary</Badge>}
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

export default ContactItemForm;
