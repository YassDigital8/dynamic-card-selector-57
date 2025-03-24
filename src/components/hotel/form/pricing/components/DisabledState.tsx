
import React from 'react';
import { CardContent } from '@/components/ui/card';

const DisabledState: React.FC = () => {
  return (
    <CardContent>
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md text-center">
        <p className="text-gray-500 dark:text-gray-400">
          Enable the Extra Bed amenity in the Amenities section to configure extra bed pricing.
        </p>
      </div>
    </CardContent>
  );
};

export default DisabledState;
