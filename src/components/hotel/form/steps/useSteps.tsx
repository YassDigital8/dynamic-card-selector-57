
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
      validationFields: ['amenities']
    },
    {
      id: 'room-types',
      label: 'Room Types',
      component: <RoomTypesSection form={form} />,
      // Room types are optional, so no validation required
    },
    {
      id: 'contact',
      label: 'Contact & Social Media',
      component: <ContactDetailsSection />,
      // Contact details are optional, so no validation required
    },
    {
      id: 'payment-options',
      label: 'Payment Options',
      component: <ExtendedFeaturesSection />,
      // Extended features are optional, so no validation required
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
      // Contract documents are optional, so no validation required
    },
    {
      id: 'preview',
      label: 'Preview',
      component: <PreviewSection />,
      // Preview has no validation, always valid
    },
  ];

  // Initialize steps validity and visited steps arrays
  useEffect(() => {
    // Initialize step validity array based on steps having validation fields
    const initialStepsValidity = steps.map(step => {
      // If no validation fields defined, the step is always valid
      if (!step.validationFields || step.validationFields.length === 0) {
        return true;
      }
      return false; // Otherwise assume invalid until validated
    });
    
    setStepsValidity(initialStepsValidity);
    setVisitedSteps(Array(steps.length).fill(false));
    
    // Mark the first step as visited
    setVisitedSteps(prev => {
      const newVisited = [...prev];
      newVisited[0] = true;
      return newVisited;
    });
  }, [steps.length]);

  // Update step validity whenever form values change
  useEffect(() => {
    const subscription = form.watch(() => {
      const newStepsValidity = steps.map((step) => {
        // If no validation fields specified, step is always valid
        if (!step.validationFields || step.validationFields.length === 0) {
          return true;
        }
        
        // Check if all required fields for this step have values
        return step.validationFields.every(field => {
          const fieldValue = field.includes('.') 
            ? form.getValues(field as any) 
            : form.getValues()[field as keyof FormValues];
            
          // Check for arrays, objects, strings, etc.
          if (Array.isArray(fieldValue)) {
            return fieldValue.length > 0;
          } else if (typeof fieldValue === 'object' && fieldValue !== null) {
            return Object.keys(fieldValue).length > 0;
          } else if (fieldValue === undefined || fieldValue === null || fieldValue === '') {
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
    // Mark this step as visited
    setVisitedSteps(prev => {
      const newVisited = [...prev];
      newVisited[index] = true;
      return newVisited;
    });
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
