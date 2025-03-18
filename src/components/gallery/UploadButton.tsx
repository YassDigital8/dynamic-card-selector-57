
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, Loader2 } from 'lucide-react';

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
          aria-busy={isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>Upload File</span>
            </>
          )}
        </Button>
        <p className="text-xs text-gray-500 mt-2 ml-auto" aria-hidden="true">
          * All fields are required
        </p>
      </div>
      
      {isUploading && (
        <div className="w-full" role="status" aria-live="polite">
          <Progress 
            value={progress} 
            className="h-2 w-full" 
            aria-label={`Upload progress: ${progress.toFixed(0)}%`}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
          <p className="text-xs text-gray-500 mt-1 text-right">
            {progress.toFixed(0)}% uploaded
          </p>
        </div>
      )}
    </div>
  );
};
