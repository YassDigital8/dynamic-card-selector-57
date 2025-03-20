
import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormValues } from './formSchema';
import RatingInput from './RatingInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useApiStatus from '@/hooks/useApiStatus';

interface POSOption {
  id: number;
  key: string;
  arabicName: string;
  englishName: string;
}

interface BasicInformationProps {
  form: UseFormReturn<FormValues>;
}

const BasicInformation: React.FC<BasicInformationProps> = ({ form }) => {
  const [posOptions, setPosOptions] = useState<POSOption[]>([]);
  const [isLoadingPOS, setIsLoadingPOS] = useState(false);
  const { isApiLive } = useApiStatus();

  useEffect(() => {
    const fetchPOSOptions = async () => {
      if (!isApiLive) {
        // Demo mode - mock data
        setPosOptions([
          { id: 1, key: 'sy', arabicName: 'سوريا', englishName: 'Syria' },
          { id: 22, key: 'uk', arabicName: 'المملكة المتحدة', englishName: 'United Kingdom' },
          { id: 3, key: 'uae', arabicName: 'الإمارات العربية المتحدة', englishName: 'United Arab Emirates' },
        ]);
        return;
      }

      setIsLoadingPOS(true);
      try {
        const response = await fetch('https://staging.sa3d.online:7036/POS', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(localStorage.getItem('authToken') ? {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            } : {})
          }
        });

        if (response.ok) {
          const data = await response.json();
          setPosOptions(data);
        } else {
          console.error('Failed to fetch POS options:', response.status);
        }
      } catch (error) {
        console.error('Error fetching POS options:', error);
      } finally {
        setIsLoadingPOS(false);
      }
    };

    fetchPOSOptions();
  }, [isApiLive]);

  // Handle POS selection and update country
  const handlePOSChange = (value: string) => {
    const selectedPOS = posOptions.find(pos => pos.key === value);
    
    if (selectedPOS) {
      // Update country field with the English name from the POS
      form.setValue('country', selectedPOS.englishName, { shouldValidate: true });
    }
    
    form.setValue('posKey', value, { shouldValidate: true });
  };

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl">Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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

        <RatingInput form={form} />

        <FormField
          control={form.control}
          name="posKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>POS Key</FormLabel>
              <FormControl>
                <Select 
                  disabled={isLoadingPOS} 
                  value={field.value} 
                  onValueChange={handlePOSChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select POS key" />
                  </SelectTrigger>
                  <SelectContent>
                    {posOptions.map((pos) => (
                      <SelectItem key={pos.key} value={pos.key}>
                        {pos.englishName} ({pos.key.toUpperCase()})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Enter country" {...field} readOnly />
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
                <FormLabel>Governorate/City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter governorate or city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="streetAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter street address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default BasicInformation;
