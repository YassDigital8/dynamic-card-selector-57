
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Flag, MapPin, Phone, Mail, Clock, User } from 'lucide-react';
import { POSEntry, GSADetails } from '@/models/POSModel';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

// Form validation schema
const formSchema = z.object({
  key: z.string().min(1, "Key is required").max(10, "Key cannot exceed 10 characters"),
  englishName: z.string().min(1, "English name is required"),
  arabicName: z.string().min(1, "Arabic name is required"),
  hasGSA: z.boolean().default(false),
  gsa: z.object({
    name: z.string().min(1, "GSA name is required").optional().or(z.literal('')),
    location: z.string().min(1, "GSA location is required").optional().or(z.literal('')),
    phoneNumber: z.string().min(1, "GSA phone number is required").optional().or(z.literal('')),
    email: z.string().email("Invalid email format").optional().or(z.literal('')),
    officeHours: z.string().optional().or(z.literal('')),
  }).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface POSFormProps {
  onSubmit: (data: POSEntry) => void;
}

const POSForm: React.FC<POSFormProps> = ({ onSubmit }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      key: '',
      englishName: '',
      arabicName: '',
      hasGSA: false,
      gsa: {
        name: '',
        location: '',
        phoneNumber: '',
        email: '',
        officeHours: '',
      },
    },
  });

  const hasGSA = form.watch('hasGSA');

  const handleSubmit = (data: FormValues) => {
    // Convert form values to POSEntry type
    const posData: POSEntry = {
      key: data.key,
      englishName: data.englishName,
      arabicName: data.arabicName,
    };

    // Add GSA details if available
    if (data.hasGSA && data.gsa) {
      const gsaDetails: GSADetails = {
        name: data.gsa.name || '',
        location: data.gsa.location || '',
        phoneNumber: data.gsa.phoneNumber || '',
        email: data.gsa.email || '',
        officeHours: data.gsa.officeHours || '',
      };
      posData.gsa = gsaDetails;
    }

    onSubmit(posData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <Flag className="mr-2 h-6 w-6" />
          Add New POS Location
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="key"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key (Identifier)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. SY, UAE, KSA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="englishName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>English Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Syria, United Arab Emirates" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="arabicName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Arabic Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. سوريا، الإمارات العربية المتحدة" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="my-4" />

            <FormField
              control={form.control}
              name="hasGSA"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Has GSA (General Sale Assembly)</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {hasGSA && (
              <div className="space-y-4 rounded-md border p-4">
                <h3 className="font-medium text-lg">GSA Information</h3>
                
                <FormField
                  control={form.control}
                  name="gsa.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        GSA Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="gsa.location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        Location
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St, City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="gsa.phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Phone className="mr-2 h-4 w-4" />
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="gsa.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="gsa@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="gsa.officeHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        Office Hours
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Mon-Fri: 9am-5pm, Sat: 10am-2pm, Sun: Closed" 
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button type="submit">
              Save POS
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default POSForm;
