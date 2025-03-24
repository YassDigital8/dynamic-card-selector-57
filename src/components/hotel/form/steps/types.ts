
import React from 'react';
import { FormValues } from '../formSchema';

export interface Step {
  id: string;
  label: string;
  component: React.ReactNode;
  icon?: React.ReactNode;
  validationFields?: string[]; // Fields to validate for this step
  customValidation?: (formValues: FormValues) => boolean; // Custom validation function
}
