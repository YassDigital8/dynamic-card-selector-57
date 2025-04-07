
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Flag } from 'lucide-react';

// Form validation schema
const formSchema = z.object({
  key: z.string().min(1, "Key is required").max(10, "Key cannot exceed 10 characters"),
  englishName: z.string().min(1, "English name is required"),
  arabicName: z.string().min(1, "Arabic name is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface POSFormProps {
  onSubmit: (data: FormValues) => void;
}

const POSForm: React.FC<POSFormProps> = ({ onSubmit }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      key: '',
      englishName: '',
      arabicName: '',
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <Flag className="mr-2 h-6 w-6" />
          Add New POS Location
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
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
