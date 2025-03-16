
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, LucideGitFork } from 'lucide-react';
import { SelectionStep } from '@/models/PageModel';
import PathConfigOption from './pathSelector/PathConfigOption';
import DynamicUrlDisplay from './pathSelector/DynamicUrlDisplay';
import AddPageOption from './pathSelector/AddPageOption';
import { Button } from '@/components/ui/button';

interface PathSelectorsProps {
  availableSlugs: string[];
  selectedSlug: string;
  setSelectedSlug: (value: string) => void;
  subSlugs: string[];
  selectedSubSlug: string;
  setSelectedSubSlug: (value: string) => void;
  loading: boolean;
  selectedPOS: string;
  selectedLanguage: string;
  onAddPageClick: () => void;
  currentStep: SelectionStep;
  apiReachable?: boolean;
  onRetryConnection?: () => void;
}

const PathSelectors = ({
  availableSlugs,
  selectedSlug,
  setSelectedSlug,
  subSlugs,
  selectedSubSlug,
  setSelectedSubSlug,
  loading,
  selectedPOS,
  selectedLanguage,
  onAddPageClick,
  currentStep,
  apiReachable = true,
  onRetryConnection
}: PathSelectorsProps) => {
  const hasSubSlugs = selectedSlug && subSlugs.length > 0;
  
  return (
    <Card className="shadow-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader className="bg-green-50 dark:bg-green-900/30 border-b border-gray-200 dark:border-gray-700 p-2 sm:p-3 md:p-4">
        <CardTitle className="text-green-800 dark:text-green-300 flex items-center gap-1.5 md:gap-2 text-sm sm:text-base md:text-lg">
          <Link className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
          Path Selection
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-3 md:p-5 space-y-3 sm:space-y-4 md:space-y-6">
        {/* URL Preview Display */}
        <DynamicUrlDisplay
          selectedPOS={selectedPOS}
          selectedLanguage={selectedLanguage}
          selectedSlug={selectedSlug}
          selectedSubSlug={selectedSubSlug}
        />
        
        {/* Parent Path Selection */}
        <div className="space-y-3">
          <PathConfigOption
            title="Parent Path"
            description="Select the parent path for your page"
            options={availableSlugs}
            value={selectedSlug}
            onChange={setSelectedSlug}
            loading={loading}
            apiReachable={apiReachable}
            onRetryConnection={onRetryConnection}
          />
          
          {/* Subpath Selection - Only shown when a parent path is selected */}
          {selectedSlug && (
            <PathConfigOption
              title="Subpath (Optional)"
              description="Select a subpath if needed"
              options={subSlugs}
              value={selectedSubSlug}
              onChange={setSelectedSubSlug}
              loading={loading}
              apiReachable={apiReachable}
            />
          )}
        </div>
        
        {/* Add Page Option */}
        <AddPageOption 
          onAddPageClick={onAddPageClick}
          selectedSlug={selectedSlug}
          hasSubSlugs={hasSubSlugs}
          selectedSubSlug={selectedSubSlug}
        />
      </CardContent>
    </Card>
  );
};

export default PathSelectors;
