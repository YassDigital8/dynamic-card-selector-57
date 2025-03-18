
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Flag, Building, MapPin } from 'lucide-react';
import { FormValues } from './formSchema';
import { useIsMobile } from '@/hooks/use-mobile';
import { Label } from '@/components/ui/label';

interface BasicInformationProps {
  form: UseFormReturn<FormValues>;
}

const BasicInformation: React.FC<BasicInformationProps> = ({ form }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`space-y-${isMobile ? '4' : '6'} col-span-2`}>
      <h3 className="text-lg font-medium text-foreground">Basic Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="name" required>Hotel Name</Label>
              <FormControl>
                <Input 
                  id="name"
                  placeholder="Enter hotel name" 
                  {...field} 
                  error={!!form.formState.errors.name}
                />
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
              <Label htmlFor="country" required>Country</Label>
              <FormControl>
                <div className="relative">
                  <Flag className={`absolute left-2 top-${isMobile ? '1.5' : '2'} h-4 w-4 text-muted-foreground`} />
                  <Input 
                    id="country"
                    className="pl-8" 
                    placeholder="Enter country" 
                    {...field} 
                    error={!!form.formState.errors.country}
                  />
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
              <Label htmlFor="governorate" required>Governorate/State</Label>
              <FormControl>
                <div className="relative">
                  <Building className={`absolute left-2 top-${isMobile ? '1.5' : '2'} h-4 w-4 text-muted-foreground`} />
                  <Input 
                    id="governorate"
                    className="pl-8" 
                    placeholder="Enter governorate or state" 
                    {...field} 
                    error={!!form.formState.errors.governorate}
                  />
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
              <Label htmlFor="streetAddress" required>Street Address</Label>
              <FormControl>
                <div className="relative">
                  <MapPin className={`absolute left-2 top-${isMobile ? '1.5' : '2'} h-4 w-4 text-muted-foreground`} />
                  <Input 
                    id="streetAddress"
                    className="pl-8" 
                    placeholder="Enter street address" 
                    {...field} 
                    error={!!form.formState.errors.streetAddress}
                  />
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
