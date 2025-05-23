import React, { useEffect } from 'react';
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
import { useStepNavigation } from './hooks/useStepNavigation';
import { Step } from './types';

interface UseStepsProps {
  form: UseFormReturn<FormValues>;
  hotelId?: string;
}

export const useSteps = ({ form, hotelId }: UseStepsProps) => {
  // Add type assertion to ensure TypeScript treats the watched value as ContractDocument[]
  const contractDocuments = form.watch("contractDocuments") as ContractDocument[];
  
  // Initialize steps with proper checking
  const steps: Step[] = React.useMemo(() => [
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
      // Modified validation to check only if at least one amenity is enabled (boolean true)
      customValidation: (formValues: FormValues) => {
        if (!formValues.amenities) {
          console.log("Amenities validation failed: No amenities object found");
          return false;
        }
        
        // Get only boolean properties in the amenities object, excluding image arrays
        const amenityBooleans = Object.entries(formValues.amenities)
          .filter(([key, value]) => {
            return typeof value === 'boolean' && !key.includes('Images');
          });
        
        // Check if at least one amenity is enabled (true)
        const hasEnabledAmenity = amenityBooleans.some(([_, value]) => value === true);
        
        console.log("Amenities validation result:", hasEnabledAmenity ? "VALID" : "INVALID", 
                   "Enabled count:", amenityBooleans.filter(([_, value]) => value === true).length);
                   
        return hasEnabledAmenity;
      }
    },
    {
      id: 'room-types',
      label: 'Room Types',
      component: <RoomTypesSection form={form} />,
      // Always consider room types step as valid - users can add room types later
      customValidation: () => {
        // Always valid - no need to check roomTypes
        console.log("Room types step is always considered valid");
        return true;
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
  ], [form, hotelId, contractDocuments]);

  const {
    currentStepIndex,
    visitedSteps,
    stepsValidity,
    isLastStep,
    isFirstStep,
    goToNextStep,
    goToPreviousStep,
    goToStep
  } = useStepNavigation({
    form,
    steps
  });

  // Log states for debugging
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log("Steps status:", {
        currentIndex: currentStepIndex,
        totalSteps: steps.length,
        validity: stepsValidity,
        currentStep: steps[currentStepIndex]?.id
      });
    }, 250);
    
    return () => clearTimeout(timeoutId);
  }, [currentStepIndex, steps.length, stepsValidity]);

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
