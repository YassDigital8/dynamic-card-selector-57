
import React, { useState, useEffect } from 'react';
import { FormValues } from '../formSchema';
import { ContractDocument } from '@/models/HotelModel';
import { BasicInformation } from '../';
import { AmenitiesSection } from '../';
import { RoomTypesSection } from '../';
import { ContactDetailsSection } from '../contact';
import { ContractDocumentSection } from '../contract';
import ExtendedFeaturesSection from '../ExtendedFeaturesSection';
import { PreviewSection } from '../preview';
import { CommercialDealsView } from '../../details/commercial';
import { UseFormReturn } from 'react-hook-form';

export interface Step {
  id: string;
  label: string;
  component: React.ReactNode;
  icon?: React.ReactNode;
  validationFields?: string[]; // Fields to validate for this step
  customValidation?: (formValues: FormValues) => boolean; // Custom validation function
}

interface UseStepsProps {
  form: UseFormReturn<FormValues>;
  hotelId?: string;
}

export const useSteps = ({ form, hotelId }: UseStepsProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepsValidity, setStepsValidity] = useState<boolean[]>([]);
  const [visitedSteps, setVisitedSteps] = useState<boolean[]>([]);
  
  // Add type assertion to ensure TypeScript treats the watched value as ContractDocument[]
  const contractDocuments = form.watch("contractDocuments") as ContractDocument[];
  
  const steps: Step[] = [
    {
      id: 'basic-info',
      label: 'Basic Information',
      component: <BasicInformation form={form} />,
      validationFields: ['name', 'country', 'governorate', 'streetAddress']
    },
    {
      id: 'amenities',
      label: 'Amenities',
      component: <AmenitiesSection form={form} hotelId={hotelId} />,
      // Custom validation to check if at least one amenity is enabled
      customValidation: (formValues: FormValues) => {
        const amenities = formValues.amenities;
        return Object.values(amenities).some(value => 
          typeof value === 'boolean' && value === true
        );
      }
    },
    {
      id: 'room-types',
      label: 'Room Types',
      component: <RoomTypesSection form={form} />,
      // Custom validation to check if at least one room type is added
      customValidation: (formValues: FormValues) => {
        return formValues.roomTypes && formValues.roomTypes.length > 0;
      }
    },
    {
      id: 'contact',
      label: 'Contact & Social Media',
      component: <ContactDetailsSection />,
      // Custom validation to check if at least one contact detail and one social media are added
      customValidation: (formValues: FormValues) => {
        const hasContact = formValues.contactDetails && formValues.contactDetails.length > 0;
        const hasSocialMedia = formValues.socialMedia && formValues.socialMedia.length > 0;
        return hasContact && hasSocialMedia;
      }
    },
    {
      id: 'payment-options',
      label: 'Payment Options',
      component: <ExtendedFeaturesSection />,
      // Custom validation to check if at least one payment method is enabled
      customValidation: (formValues: FormValues) => {
        return formValues.paymentMethods && 
               formValues.paymentMethods.some(method => method.enabled === true);
      }
    },
    {
      id: 'contract-commercial',
      label: 'Contract & Commercial',
      component: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContractDocumentSection />
          <CommercialDealsView contractDocuments={contractDocuments} />
        </div>
      ),
      // Updated validation to check if at least one contract document has been uploaded
      customValidation: (formValues: FormValues) => {
        return formValues.contractDocuments && formValues.contractDocuments.length > 0;
      }
    },
    {
      id: 'preview',
      label: 'Preview',
      component: <PreviewSection />,
      validationFields: [] // Preview has no validation
    },
  ];

  // Initialize steps validity and visited steps arrays
  useEffect(() => {
    setStepsValidity(Array(steps.length).fill(false));
    setVisitedSteps(Array(steps.length).fill(false));
    // Mark the first step as visited
    setVisitedSteps(prev => {
      const newVisited = [...prev];
      newVisited[0] = true;
      return newVisited;
    });
  }, [steps.length]);

  // Function to validate a specific step
  const validateStep = (step: Step, formValues: FormValues, index: number): boolean => {
    // If using custom validation
    if (step.customValidation) {
      return step.customValidation(formValues);
    }
    
    // If no validation fields specified and no custom validation, step is always valid
    if (!step.validationFields || step.validationFields.length === 0) {
      return true;
    }
    
    // Check if all required fields for this step have values
    return step.validationFields.every(field => {
      const fieldValue = field.includes('.') 
        ? form.getValues(field as any) 
        : form.getValues()[field as keyof FormValues];
        
      if (fieldValue === undefined || fieldValue === null || fieldValue === '') {
        return false;
      }
      
      return true;
    });
  };

  // Update step validity whenever form values change
  useEffect(() => {
    const subscription = form.watch((formValues) => {
      const formData = form.getValues();
      
      // Validate all visited steps
      const newStepsValidity = steps.map((step, index) => {
        // If the step hasn't been visited yet or comes after current step, don't validate it
        if (!visitedSteps[index]) {
          return false;
        }
        
        return validateStep(step, formData, index);
      });
      
      setStepsValidity(newStepsValidity);
    });
    
    return () => subscription.unsubscribe();
  }, [form, steps, visitedSteps]);

  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      // Mark the next step as visited
      setVisitedSteps(prev => {
        const newVisited = [...prev];
        newVisited[currentStepIndex + 1] = true;
        return newVisited;
      });
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const goToStep = (index: number) => {
    // Mark this step and all steps before it as visited
    setVisitedSteps(prev => {
      const newVisited = [...prev];
      // Mark all steps up to and including the target step as visited
      for (let i = 0; i <= index; i++) {
        newVisited[i] = true;
      }
      return newVisited;
    });
    
    // Immediately validate all visited steps to update status indicators
    const formData = form.getValues();
    const newStepsValidity = steps.map((step, stepIndex) => {
      if (stepIndex <= index) {
        return validateStep(step, formData, stepIndex);
      }
      return stepsValidity[stepIndex];
    });
    
    setStepsValidity(newStepsValidity);
    setCurrentStepIndex(index);
  };

  const isLastStep = currentStepIndex === steps.length - 1;
  const isFirstStep = currentStepIndex === 0;

  return {
    steps,
    currentStepIndex,
    isLastStep,
    isFirstStep,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    stepsValidity,
    visitedSteps
  };
};
