
import React from 'react';
import { Image } from 'lucide-react';
import { FormLabel } from '@/components/ui/form';

interface RoomImagePreviewProps {
  imageUrl?: string;
  onClick: () => void;
  readOnly?: boolean;
}

const RoomImagePreview: React.FC<RoomImagePreviewProps> = ({ imageUrl, onClick, readOnly = false }) => {
  return (
    <div className={readOnly ? "" : "mb-4"}>
      {!readOnly && <FormLabel>Room Image</FormLabel>}
      <div 
        className={`mt-2 ${!readOnly ? "border-2 border-dashed rounded-md p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800" : ""} flex flex-col items-center justify-center`}
        onClick={readOnly ? undefined : onClick}
      >
        {imageUrl ? (
          <div className="space-y-2 w-full">
            <img 
              src={imageUrl} 
              alt="Room preview" 
              className="w-full h-48 object-cover rounded-md"
            />
            {!readOnly && (
              <p className="text-center text-sm text-gray-500">Click to change image</p>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6">
            <Image className="h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              {readOnly ? "No image available" : "Click to select a room image"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomImagePreview;
