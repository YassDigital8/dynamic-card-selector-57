
import React, { useRef, useEffect } from 'react';
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

  return (
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
  );
};

export default StepTabs;
