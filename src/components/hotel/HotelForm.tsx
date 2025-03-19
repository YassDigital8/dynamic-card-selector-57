
import React, { useCallback, memo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
} from '@/components/ui/form';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import { 
  BasicInformation, 
  AmenitiesSection, 
  RoomTypesSection,
  formSchema,
  defaultValues
} from './form';

interface HotelFormProps {
  initialData?: Hotel;
  onSubmit: (data: HotelFormData) => void;
  isLoading: boolean;
  showButtons?: boolean;
}

const HotelForm = memo(({ initialData, onSubmit, isLoading, showButtons = true }: HotelFormProps) => {
  const form = useForm<typeof formSchema._type>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || defaultValues,
  });

  const handleSubmit = useCallback((values: typeof formSchema._type) => {
    onSubmit(values as HotelFormData);
  }, [onSubmit]);

  return (
    <Form {...form}>
      <form id="hotel-form" onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BasicInformation form={form} />
          <AmenitiesSection form={form} />
          <RoomTypesSection form={form} />
        </div>

        {showButtons && (
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Hotel"}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
});

HotelForm.displayName = 'HotelForm';

export default HotelForm;
