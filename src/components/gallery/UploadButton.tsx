
import React from 'react';
import { Button } from '@/components/ui/button';

interface UploadButtonProps {
  onUpload: () => void;
  isUploading: boolean;
  disabled: boolean;
}

export const UploadButton: React.FC<UploadButtonProps> = ({
  onUpload,
  isUploading,
  disabled
}) => {
  return (
    <div className="flex justify-end">
      <Button 
        onClick={onUpload} 
        disabled={isUploading || disabled}
      >
        {isUploading ? 'Uploading...' : 'Upload File'}
      </Button>
      <p className="text-xs text-gray-500 mt-2 ml-auto">
        * All fields are required
      </p>
    </div>
  );
};
