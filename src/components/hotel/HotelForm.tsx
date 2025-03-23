
import React, { memo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import { formSchema, defaultValues } from './form';
import FormSections from './form/FormSections';
import FormActions from './form/FormActions';
import { useFormProcessor } from './form/hooks/useFormProcessor';

interface HotelFormProps {
  initialData?: Hotel;
  onSubmit: (data: HotelFormData) => void;
  isLoading: boolean;
  showButtons?: boolean;
}

const HotelForm = memo(({ 
  initialData, 
  onSubmit, 
  isLoading, 
  showButtons = true 
}: HotelFormProps) => {
  const form = useForm<typeof formSchema._type>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || defaultValues,
    mode: 'onChange',
  });
  
  const { handleSubmit } = useFormProcessor({ form, onSubmit });

  return (
    <Form {...form}>
      <form id="hotel-form" onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormSections form={form} hotelId={initialData?.id} />
        <FormActions isLoading={isLoading} showButtons={showButtons} />
      </form>
    </Form>
  );
});

HotelForm.displayName = 'HotelForm';

export default HotelForm;
