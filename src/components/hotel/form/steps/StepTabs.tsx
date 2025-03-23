
import React, { useRef, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Step {
  id: string;
  label: string;
}

interface StepTabsProps {
  steps: Step[];
  currentStepIndex: number;
  onStepChange: (index: number) => void;
}

const StepTabs: React.FC<StepTabsProps> = ({ 
  steps, 
  currentStepIndex, 
  onStepChange 
}) => {
  const tabsListRef = useRef<HTMLDivElement>(null);

  // Always ensure the first step is visible
  const visibleSteps = useMemo(() => {
    return steps.map((step, index) => ({
      ...step,
      isVisible: true // Make all steps visible
    }));
  }, [steps]);

  const scrollTabsLeft = () => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const scrollTabsRight = () => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Reset scroll position when component mounts to ensure first tab is visible
  useEffect(() => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, []);

  // Ensure active tab is visible when changed
  useEffect(() => {
    if (tabsListRef.current) {
      const activeTab = tabsListRef.current.querySelector('[data-state="active"]');
      if (activeTab) {
        activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentStepIndex]);

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="sm" 
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 p-0 rounded-full bg-background/80 backdrop-blur-sm hidden sm:flex items-center justify-center shadow-sm border"
        onClick={scrollTabsLeft}
      >
        <ArrowLeft size={16} />
        <span className="sr-only">Scroll to start</span>
      </Button>
      
      <Tabs 
        value={steps[currentStepIndex].id} 
        className="w-full"
        onValueChange={(value) => {
          const stepIndex = steps.findIndex(step => step.id === value);
          if (stepIndex !== -1) {
            onStepChange(stepIndex);
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
              className={`
                flex-1 min-w-[150px] h-10 px-4 mx-1 text-xs sm:text-sm md:text-base whitespace-nowrap transition-all duration-200
                ${index === currentStepIndex ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium border-b-2 border-blue-500 shadow-sm' : 'hover:bg-gray-50 dark:hover:bg-gray-800/20'}
                ${index < currentStepIndex ? 'text-gray-500 dark:text-gray-400' : ''}
              `}
            >
              <div className="flex items-center justify-center space-x-1.5">
                <span className={`
                  inline-flex items-center justify-center rounded-full w-5 h-5 text-xs
                  ${index === currentStepIndex ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}
                  ${index < currentStepIndex ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : ''}
                `}>
                  {index + 1}
                </span>
                <span className="hidden sm:inline">{step.label}</span>
                <span className="sm:hidden truncate max-w-[80px]">{step.label}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 p-0 rounded-full bg-background/80 backdrop-blur-sm hidden sm:flex items-center justify-center shadow-sm border"
        onClick={scrollTabsRight}
      >
        <ArrowRight size={16} />
        <span className="sr-only">Scroll right</span>
      </Button>
    </div>
  );
};

export default StepTabs;
