
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface EmptyPageStateProps {
  onRefresh?: () => void;
  selectedPOS?: string;
  selectedLanguage?: string;
}

const EmptyPageState = ({ onRefresh, selectedPOS, selectedLanguage }: EmptyPageStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
      <p className="mb-4">Select a page to view its details</p>
      {(selectedPOS && selectedLanguage) && (
        <Button 
          variant="outline" 
          onClick={onRefresh}
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Fetch Page Data
        </Button>
      )}
    </div>
  );
};

export default EmptyPageState;
