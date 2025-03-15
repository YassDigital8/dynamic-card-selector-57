
import React, { useRef, useEffect, useState } from 'react';
import { TourTooltip } from '@/components/ui/tour-tooltip';
import { useTourGuide } from '@/hooks/useTourGuide';
import { Button } from '@/components/ui/button';
import { HelpCircle, Navigation } from 'lucide-react';

interface PagesTourProps {
  pageSelectorsRef: React.RefObject<HTMLDivElement>;
  pathSelectorsRef: React.RefObject<HTMLDivElement>;
  pageDataRef: React.RefObject<HTMLDivElement>;
  tabsRef: React.RefObject<HTMLDivElement>;
}

const PagesTour: React.FC<PagesTourProps> = ({
  pageSelectorsRef,
  pathSelectorsRef,
  pageDataRef,
  tabsRef
}) => {
  const {
    showTour,
    currentStep,
    isActive,
    needsConfirmation,
    nextStep,
    prevStep,
    closeTour,
    resetTour,
    pauseTour,
    resumeTour,
    requireConfirmation,
    confirmStep
  } = useTourGuide('pages-module-tour');
  
  const [interactionSimulation, setInteractionSimulation] = useState(false);

  // Effect to require user confirmation on steps that need extra attention
  useEffect(() => {
    if (showTour && isActive && [1, 2].includes(currentStep) && !needsConfirmation) {
      requireConfirmation();
    }
  }, [showTour, isActive, currentStep, needsConfirmation, requireConfirmation]);

  // Simulate user interaction when moving between steps
  useEffect(() => {
    if (showTour && isActive) {
      const simulateInteraction = async () => {
        if (currentStep === 1) {
          // Simulate interaction with POS selectors
          setInteractionSimulation(true);
          await new Promise(resolve => setTimeout(resolve, 1000));
          setInteractionSimulation(false);
        } else if (currentStep === 2) {
          // Simulate interaction with page paths
          setInteractionSimulation(true);
          await new Promise(resolve => setTimeout(resolve, 1000));
          setInteractionSimulation(false);
        }
      };
      
      simulateInteraction();
    }
  }, [currentStep, showTour, isActive]);

  // Handle next step - prevent event bubbling
  const handleNextStep = () => {
    console.log("Handling next step");
    nextStep();
  };

  // Handle previous step - prevent event bubbling
  const handlePrevStep = () => {
    console.log("Handling previous step");
    prevStep();
  };

  // Handle close tour - prevent event bubbling
  const handleCloseTour = () => {
    console.log("Handling close tour");
    closeTour();
  };

  // Handle confirm step - prevent event bubbling
  const handleConfirmStep = () => {
    console.log("Handling confirm step");
    confirmStep();
  };

  // Debug log current step and state
  useEffect(() => {
    console.log(`Tour state: Step ${currentStep}, Visible: ${showTour}, Active: ${isActive}, Needs Confirmation: ${needsConfirmation}`);
  }, [currentStep, showTour, isActive, needsConfirmation]);

  const tourSteps = [
    {
      title: "Welcome to Pages Module",
      content: (
        <div>
          <p>This tour will guide you through the main features of the Pages management module. Let's get started!</p>
          <p className="mt-2 text-blue-500 font-medium">You'll see interactive highlights that show you exactly where to click.</p>
          <p className="mt-2 text-orange-500">For some steps, you'll need to confirm your understanding by clicking the "I Understand" button.</p>
        </div>
      ),
      target: tabsRef,
      position: "bottom" as const
    },
    {
      title: "Select POS and Language",
      content: (
        <div>
          <p>Start by selecting the Point of Sale (POS) and Language. This filters the pages you'll be working with.</p>
          <p className="mt-2 text-blue-500">{interactionSimulation ? "Watch as we interact with this component!" : "Try clicking on these dropdowns to see available options."}</p>
          <p className="mt-2 text-red-500 font-medium">This is an important step! You must select both a POS and Language before proceeding.</p>
        </div>
      ),
      target: pageSelectorsRef,
      position: "right" as const
    },
    {
      title: "Navigate Page Paths",
      content: (
        <div>
          <p>Once you've selected a POS and Language, you can navigate through available pages using these dropdowns.</p>
          <p className="mt-2">You can also add new pages using the "Add Page" button.</p>
          <p className="mt-2 text-blue-500">{interactionSimulation ? "Watch as we select different page paths!" : "Try clicking on these dropdowns to navigate through pages."}</p>
          <p className="mt-2 text-red-500 font-medium">Please confirm you understand how to navigate page paths before continuing.</p>
        </div>
      ),
      target: pathSelectorsRef,
      position: "right" as const
    },
    {
      title: "Page Content",
      content: (
        <div>
          <p>This area displays the content of the selected page. You can view and edit the page details here.</p>
          <p className="mt-2">Use the edit button to make changes to the page content.</p>
          <p className="mt-2 text-green-500 font-medium">Try editing a page to see how it works!</p>
        </div>
      ),
      target: pageDataRef,
      position: "left" as const
    }
  ];

  const currentTourStep = tourSteps[currentStep];

  const TourRestartButton = () => (
    <Button
      variant="outline"
      size="sm"
      className="fixed bottom-4 right-4 flex items-center gap-2 z-40"
      onClick={resetTour}
    >
      <HelpCircle className="h-4 w-4" />
      <span>Show Tour Guide</span>
    </Button>
  );

  return (
    <>
      {showTour && currentTourStep ? (
        <>
          <TourTooltip
            step={currentStep}
            totalSteps={tourSteps.length}
            title={currentTourStep.title}
            content={currentTourStep.content}
            targetRef={currentTourStep.target}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            onClose={handleCloseTour}
            position={currentTourStep.position}
            isVisible={showTour && isActive}
            needsConfirmation={needsConfirmation}
            onConfirm={handleConfirmStep}
          />
          {!isActive && (
            <Button
              variant="default"
              size="sm"
              className="fixed bottom-4 right-4 flex items-center gap-2 z-40 bg-green-600 hover:bg-green-700"
              onClick={resumeTour}
            >
              <Navigation className="h-4 w-4" />
              <span>Resume Tour</span>
            </Button>
          )}
        </>
      ) : !showTour && (
        <TourRestartButton />
      )}
    </>
  );
};

export default PagesTour;
