
import React from 'react';
import { Image, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AmenityImagePlaceholderProps {
  onAddImage?: () => void;
}

const AmenityImagePlaceholder: React.FC<AmenityImagePlaceholderProps> = ({ onAddImage }) => {
  return (
    <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 dark:border-gray-700 rounded-md p-4 text-gray-500 dark:text-gray-400">
      <Image className="h-8 w-8 mb-2 text-gray-300 dark:text-gray-600" />
      <p className="text-xs text-center">No images added yet</p>
      {onAddImage && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 text-xs mt-2"
          onClick={onAddImage}
        >
          <PlusCircle className="h-3.5 w-3.5 mr-1.5" />
          Add Image
        </Button>
      )}
    </div>
  );
};

export default AmenityImagePlaceholder;
