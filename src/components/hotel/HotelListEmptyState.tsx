
import React from 'react';
import { HotelIcon, Search, Filter, MapPin } from 'lucide-react';

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
      
      {/* New suggestions section */}
      <div className="w-full max-w-xs bg-white/80 dark:bg-indigo-950/40 rounded-lg p-3 mt-2">
        <h4 className="font-medium text-indigo-600 dark:text-indigo-400 text-sm mb-2">Try these options:</h4>
        <ul className="text-xs text-left space-y-2 text-slate-700 dark:text-slate-300">
          <li className="flex items-start">
            <Search className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-indigo-500" />
            <span>Try different search terms</span>
          </li>
          <li className="flex items-start">
            <Filter className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-indigo-500" />
            <span>Clear applied filters</span>
          </li>
          <li className="flex items-start">
            <MapPin className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-indigo-500" />
            <span>Select a different region</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HotelListEmptyState;
