
import React, { useState, useEffect } from 'react';
import { FormValues } from '../formSchema';
import { ContractDocument } from '@/models/HotelModel';
import { BasicInformation } from '../';
import { AmenitiesSection } from '../';
import { RoomTypesSection } from '../';
import { ContactDetailsSection } from '../contact';
import { ContractDocumentSection } from '../contract';
import ExtendedFeaturesSection from '../ExtendedFeaturesSection';
import { CommercialDealsView } from '../../details/commercial';
import { UseFormReturn } from 'react-hook-form';

export interface Step {
  id: string;
  label: string;
  component: React.ReactNode;
  icon?: React.ReactNode;
  validationFields?: string[]; // Fields to validate for this step
}

interface UseStepsProps {
  form: UseFormReturn<FormValues>;
  hotelId?: string;
}

export const useSteps = ({ form, hotelId }: UseStepsProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepsValidity, setStepsValidity] = useState<boolean[]>([]);
  
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
      validationFields: ['amenities']
    },
    {
      id: 'room-types',
      label: 'Room Types',
      component: <RoomTypesSection form={form} />,
      validationFields: []  // Room types are optional
    },
    {
      id: 'contact',
      label: 'Contact & Social Media',
      component: <ContactDetailsSection />,
      validationFields: [] // Contact details are optional
    },
    {
      id: 'extended-features',
      label: 'Extended Features',
      component: <ExtendedFeaturesSection />,
      validationFields: [] // Extended features are optional
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
      validationFields: [] // Contract documents are optional
    },
  ];

  // Initialize steps validity array
  useEffect(() => {
    setStepsValidity(Array(steps.length).fill(false));
  }, [steps.length]);

  // Update step validity whenever form values change
  useEffect(() => {
    const subscription = form.watch(() => {
      const newStepsValidity = steps.map((step, index) => {
        if (!step.validationFields || step.validationFields.length === 0) {
          return true; // If no validation fields specified, step is always valid
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
      });
      
      setStepsValidity(newStepsValidity);
    });
    
    return () => subscription.unsubscribe();
  }, [form, steps]);

  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const goToStep = (index: number) => {
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
    stepsValidity
  };
};
