
import React from 'react';
import { HotelIcon } from 'lucide-react';

const HotelListEmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 rounded-lg border border-dashed">
      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
        <HotelIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="text-lg font-medium mb-2 text-blue-700 dark:text-blue-300">No Hotels Found</h3>
      <p className="text-sm text-muted-foreground mb-4">
        No hotels in this region. Add your first hotel to get started.
      </p>
    </div>
  );
};

export default HotelListEmptyState;
