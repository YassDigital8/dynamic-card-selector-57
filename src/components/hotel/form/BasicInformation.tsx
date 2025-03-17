
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Flag, Building, MapPin } from 'lucide-react';
import { FormValues } from './formSchema';

interface BasicInformationProps {
  form: UseFormReturn<FormValues>;
}

const BasicInformation: React.FC<BasicInformationProps> = ({ form }) => {
  return (
    <div className="space-y-6 col-span-2">
      <h3 className="text-lg font-medium text-foreground">Basic Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hotel Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter hotel name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <div className="relative">
                  <Flag className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-8" placeholder="Enter country" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="governorate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Governorate/State</FormLabel>
              <FormControl>
                <div className="relative">
                  <Building className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-8" placeholder="Enter governorate or state" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="streetAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <div className="relative">
                  <MapPin className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-8" placeholder="Enter street address" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default BasicInformation;
