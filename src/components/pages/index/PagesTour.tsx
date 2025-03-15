
import React, { useRef } from 'react';
import { TourTooltip } from '@/components/ui/tour-tooltip';
import { useTourGuide } from '@/hooks/useTourGuide';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

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
    nextStep,
    prevStep,
    closeTour,
    resetTour
  } = useTourGuide('pages-module-tour');

  const tourSteps = [
    {
      title: "Welcome to Pages Module",
      content: (
        <div>
          <p>This tour will guide you through the main features of the Pages management module. Let's get started!</p>
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
        <TourTooltip
          step={currentStep}
          totalSteps={tourSteps.length}
          title={currentTourStep.title}
          content={currentTourStep.content}
          targetRef={currentTourStep.target}
          onNext={nextStep}
          onPrev={prevStep}
          onClose={closeTour}
          position={currentTourStep.position}
          isVisible={showTour}
        />
      ) : !showTour && (
        <TourRestartButton />
      )}
    </>
  );
};

export default PagesTour;
