
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { CardFooter } from '@/components/ui/card';

interface PageFooterProps {
  onRefresh?: () => void;
}

const PageFooter = ({ onRefresh }: PageFooterProps) => {
  return (
    <CardFooter className="bg-gray-50 border-t">
      <div className="w-full flex justify-end">
        <Button 
          variant="outline" 
          onClick={onRefresh}
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Data
        </Button>
      </div>
    </CardFooter>
  );
};

export default PageFooter;
