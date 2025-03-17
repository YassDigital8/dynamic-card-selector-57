
import React from 'react';
import { HotelIcon } from 'lucide-react';

const HotelListEmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-indigo-50/70 to-blue-50/70 dark:from-indigo-950/50 dark:to-blue-950/50 rounded-lg border border-dashed border-indigo-200 dark:border-indigo-800">
      <div className="w-16 h-16 bg-white dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4 shadow-sm">
        <HotelIcon className="h-8 w-8 text-indigo-500 dark:text-indigo-300" />
      </div>
      <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-300">No Hotels Found</h3>
      <p className="text-sm text-muted-foreground mb-4">
        No hotels in this region. Add your first hotel to get started.
      </p>
    </div>
  );
};

export default HotelListEmptyState;
