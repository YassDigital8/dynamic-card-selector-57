import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { 
  BasicInformation, 
  AmenitiesSection, 
  RoomTypesSection,
  ContactDetailsSection,
} from './';
import ExtendedFeaturesSection from './ExtendedFeaturesSection';
import { ContractDocumentSection } from './contract';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './formSchema';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CommercialDealsView } from '../details/commercial';
import { ContractDocument } from '@/models/HotelModel';

interface Step {
  id: string;
  label: string;
  component: React.ReactNode;
  icon?: React.ReactNode;
}

interface StepBasedFormProps {
  form: UseFormReturn<FormValues>;
  hotelId?: string;
  onSubmit: () => void;
  isLoading: boolean;
}

const StepBasedForm: React.FC<StepBasedFormProps> = ({ 
  form, 
  hotelId, 
  onSubmit,
  isLoading
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  const contractDocuments = form.watch("contractDocuments") as ContractDocument[];
  
  const steps: Step[] = [
    {
      id: 'basic-info',
      label: 'Basic Information',
      component: <BasicInformation form={form} />
    },
    {
      id: 'amenities',
      label: 'Amenities',
      component: <AmenitiesSection form={form} hotelId={hotelId} />
    },
    {
      id: 'room-types',
      label: 'Room Types',
      component: <RoomTypesSection form={form} />
    },
    {
      id: 'contact',
      label: 'Contact & Social Media',
      component: <ContactDetailsSection />
    },
    {
      id: 'extended-features',
      label: 'Extended Features',
      component: <ExtendedFeaturesSection />
    },
    {
      id: 'contract-commercial',
      label: 'Contract & Commercial',
      component: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContractDocumentSection />
          <CommercialDealsView contractDocuments={contractDocuments} />
        </div>
      )
    },
  ];

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

  return (
    <div className="space-y-8">
      <Tabs 
        value={steps[currentStepIndex].id} 
        className="w-full"
        onValueChange={(value) => {
          const stepIndex = steps.findIndex(step => step.id === value);
          if (stepIndex !== -1) {
            goToStep(stepIndex);
          }
        }}
      >
        <TabsList className="w-full grid grid-cols-3 md:grid-cols-6 mb-8">
          {steps.map((step, index) => (
            <TabsTrigger 
              key={step.id} 
              value={step.id}
              className={`${index === currentStepIndex ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
            >
              <span className="hidden md:inline">{step.label}</span>
              <span className="md:hidden">{index + 1}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStepIndex}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="rounded-lg border p-6 bg-card">
            <h2 className="text-xl font-semibold mb-6 text-blue-600 dark:text-blue-400 flex items-center">
              <span className="bg-blue-600 dark:bg-blue-500 text-white w-7 h-7 rounded-full inline-flex items-center justify-center mr-2 text-sm">
                {currentStepIndex + 1}
              </span>
              {steps[currentStepIndex].label}
            </h2>
            {steps[currentStepIndex].component}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={goToPreviousStep}
          disabled={isFirstStep}
          className="border-blue-200 dark:border-blue-800"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        <div className="flex gap-2">
          {isLastStep ? (
            <Button 
              type="button" 
              onClick={onSubmit}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Saving..." : "Save Hotel"}
            </Button>
          ) : (
            <Button 
              type="button" 
              onClick={goToNextStep}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepBasedForm;
