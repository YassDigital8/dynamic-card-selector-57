
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Flag, Building, MapPin, AlertCircle } from 'lucide-react';
import { FormValues } from './formSchema';
import { useIsMobile } from '@/hooks/use-mobile';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface BasicInformationProps {
  form: UseFormReturn<FormValues>;
}

const BasicInformation: React.FC<BasicInformationProps> = ({ form }) => {
  const isMobile = useIsMobile();
  
  // Check if there are any errors in the basic information section
  const hasErrors = 
    !!form.formState.errors.name || 
    !!form.formState.errors.country || 
    !!form.formState.errors.governorate || 
    !!form.formState.errors.streetAddress;
  
  return (
    <div className={`space-y-${isMobile ? '4' : '6'} col-span-2`}>
      <h3 className="text-lg font-medium text-foreground">Basic Information</h3>
      
      {hasErrors && (
        <Alert variant="error" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please correct the highlighted fields to continue.
          </AlertDescription>
        </Alert>
      )}
      
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
                  aria-describedby={form.formState.errors.name ? "name-error" : undefined}
                />
              </FormControl>
              <FormMessage id="name-error" />
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
                  <Flag className={`absolute left-2 top-${isMobile ? '1.5' : '2'} h-4 w-4 text-muted-foreground`} aria-hidden="true" />
                  <Input 
                    id="country"
                    className="pl-8" 
                    placeholder="Enter country" 
                    {...field} 
                    error={!!form.formState.errors.country}
                    aria-describedby={form.formState.errors.country ? "country-error" : undefined}
                  />
                </div>
              </FormControl>
              <FormMessage id="country-error" />
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
                  <Building className={`absolute left-2 top-${isMobile ? '1.5' : '2'} h-4 w-4 text-muted-foreground`} aria-hidden="true" />
                  <Input 
                    id="governorate"
                    className="pl-8" 
                    placeholder="Enter governorate or state" 
                    {...field} 
                    error={!!form.formState.errors.governorate}
                    aria-describedby={form.formState.errors.governorate ? "governorate-error" : undefined}
                  />
                </div>
              </FormControl>
              <FormMessage id="governorate-error" />
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
                  <MapPin className={`absolute left-2 top-${isMobile ? '1.5' : '2'} h-4 w-4 text-muted-foreground`} aria-hidden="true" />
                  <Input 
                    id="streetAddress"
                    className="pl-8" 
                    placeholder="Enter street address" 
                    {...field} 
                    error={!!form.formState.errors.streetAddress}
                    aria-describedby={form.formState.errors.streetAddress ? "streetAddress-error" : undefined}
                  />
                </div>
              </FormControl>
              <FormMessage id="streetAddress-error" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default BasicInformation;
