
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Hotel } from 'lucide-react';

const EmptyRoomTypeState: React.FC = () => {
  return (
    <Alert className="bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900">
      <Hotel className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      <AlertDescription>
        Add your first room type to get started. Each room type can have different occupancy, pricing, and extra bed options.
      </AlertDescription>
    </Alert>
  );
};

export default EmptyRoomTypeState;
