
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
        className="bg-blue-600 hover:bg-blue-700"
      >
        {isUploading ? 'Uploading...' : 'Upload File'}
      </Button>
    </div>
  );
};
