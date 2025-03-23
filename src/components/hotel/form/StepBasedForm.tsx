
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Save, ArrowLeft, ArrowRight } from 'lucide-react';
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
import useContentAnimations from '../layout/content/useContentAnimations';

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
  const tabsListRef = useRef<HTMLDivElement>(null);
  const { contentVariants } = useContentAnimations();
  
  // Add type assertion to ensure TypeScript treats the watched value as ContractDocument[]
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

  const scrollTabsLeft = () => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollTabsRight = () => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Ensure active tab is visible when changed
  useEffect(() => {
    if (tabsListRef.current) {
      const activeTab = tabsListRef.current.querySelector('[data-state="active"]');
      if (activeTab) {
        activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentStepIndex]);

  const isLastStep = currentStepIndex === steps.length - 1;
  const isFirstStep = currentStepIndex === 0;

  return (
    <div className="space-y-8">
      <div className="relative">
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 p-0 rounded-full bg-background/80 backdrop-blur-sm hidden sm:flex"
          onClick={scrollTabsLeft}
        >
          <ArrowLeft size={16} />
          <span className="sr-only">Scroll left</span>
        </Button>
        
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
          <TabsList 
            ref={tabsListRef}
            className="w-full flex mb-6 h-12 overflow-x-auto scrollbar-none p-0 md:p-1 mx-auto px-8 sm:px-10"
          >
            {steps.map((step, index) => (
              <TabsTrigger 
                key={step.id} 
                value={step.id}
                className={`flex-1 min-w-[150px] h-10 px-4 mx-1 text-xs sm:text-sm md:text-base whitespace-nowrap 
                  ${index === currentStepIndex ? 'bg-blue-50 dark:bg-blue-900/20 font-medium' : ''}`}
              >
                <span className="hidden sm:inline">{step.label}</span>
                <span className="sm:hidden">{index + 1}. {step.label.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 p-0 rounded-full bg-background/80 backdrop-blur-sm hidden sm:flex"
          onClick={scrollTabsRight}
        >
          <ArrowRight size={16} />
          <span className="sr-only">Scroll right</span>
        </Button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStepIndex}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={contentVariants}
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
