
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface UploadButtonProps {
  onUpload: () => void;
  isUploading: boolean;
  disabled: boolean;
  progress?: number;
}

export const UploadButton: React.FC<UploadButtonProps> = ({
  onUpload,
  isUploading,
  disabled,
  progress = 0
}) => {
  return (
    <div className="space-y-3">
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
      
      {isUploading && (
        <div className="w-full">
          <Progress value={progress} className="h-2 w-full" />
          <p className="text-xs text-gray-500 mt-1 text-right">
            {progress.toFixed(0)}% uploaded
          </p>
        </div>
      )}
    </div>
  );
};
