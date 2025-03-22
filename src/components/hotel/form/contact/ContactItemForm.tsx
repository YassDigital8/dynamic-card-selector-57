
import React from 'react';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Trash2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { getContactIcon } from './ContactIcons';

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
  
  return (
    <div className="grid grid-cols-12 gap-2 items-center border-b pb-2 border-gray-100 dark:border-gray-800">
      {/* Contact Type */}
      <FormField
        control={form.control}
        name={`contactDetails.${index}.type`}
        render={({ field }) => (
          <FormItem className="col-span-3">
            <Select 
              onValueChange={field.onChange} 
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
                  {getContactIcon(form.watch(`contactDetails.${index}.type`))}
                </span>
                <Input {...field} placeholder="Contact information" />
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
