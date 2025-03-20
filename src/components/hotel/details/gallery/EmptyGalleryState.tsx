
import React from 'react';
import { ImageIcon } from 'lucide-react';

const EmptyGalleryState: React.FC = () => {
  return (
    <div className="text-center p-6">
      <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">Hotel Gallery</h3>
      <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-xl">
        <ImageIcon className="h-12 w-12 mx-auto text-indigo-300 dark:text-indigo-600 mb-3" />
        <p className="text-muted-foreground">No images available for this hotel.</p>
        <p className="text-sm text-muted-foreground mt-2">Add images to amenities or room types to see them here.</p>
      </div>
    </div>
  );
};

export default EmptyGalleryState;
