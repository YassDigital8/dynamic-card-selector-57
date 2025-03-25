
import React, { memo, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import { formSchema } from './form/schemas';
import { defaultValues } from './form/formDefaults';
import StepBasedForm from './form/StepBasedForm';
import { useFormProcessor } from './form/hooks';

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
  
  // Store step validation state and navigation function
  const [stepsValidity, setStepsValidity] = React.useState<boolean[]>([]);
  const [goToStepFn, setGoToStepFn] = React.useState<((index: number) => void) | undefined>();
  
  const { handleSubmit } = useFormProcessor({ 
    form, 
    onSubmit,
    stepsValidity,
    goToStep: goToStepFn
  });

  // For debugging
  useEffect(() => {
    console.log("Current steps validity in HotelForm:", stepsValidity);
  }, [stepsValidity]);

  // Make sure extraBedPolicy is properly set when extraBed is enabled
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'amenities.extraBed' && form.getValues('amenities.extraBed')) {
        // Initialize extra bed policy if not present when enabling the extraBed amenity
        if (!form.getValues('extraBedPolicy')) {
          form.setValue('extraBedPolicy', {
            pricePerNight: 0,
            availableForRoomTypes: [],
            maxExtraBedsPerRoom: 1,
            notes: ''
          }, { shouldValidate: true });
        }
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <Form {...form}>
      <form id="hotel-form" onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <StepBasedForm 
          form={form} 
          hotelId={initialData?.id} 
          onSubmit={form.handleSubmit(handleSubmit)}
          isLoading={isLoading}
          onStepsValidityChange={setStepsValidity}
          onGoToStepChange={setGoToStepFn}
        />
      </form>
    </Form>
  );
});

HotelForm.displayName = 'HotelForm';

export default HotelForm;
