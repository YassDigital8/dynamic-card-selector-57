
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../formSchema';
import { HotelFormData } from '@/models/HotelModel';

export interface FormProcessorProps {
  form: UseFormReturn<FormValues>;
  onSubmit: (data: HotelFormData) => void;
  stepsValidity?: boolean[];
  goToStep?: (index: number) => void;
}

export interface FormValidationResult {
  isValid: boolean;
  invalidStepIndex?: number;
}
