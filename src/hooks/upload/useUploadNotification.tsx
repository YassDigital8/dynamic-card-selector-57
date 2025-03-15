
import { useToast } from '@/hooks/use-toast';
import { FileInfo } from '@/models/FileModel';
import { CheckCircle, AlertCircle, InfoIcon } from 'lucide-react';

export const useUploadNotification = () => {
  const { toast } = useToast();

  const showUploadSuccessNotification = (fileInfo: FileInfo, fileName: string) => {
    // Get gallery name using the ID from the fileInfo
    const galleryName = fileInfo.galleryName || 'Unknown Gallery';
    
    toast({
      description: (
        <div className="py-1">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="font-medium">Uploaded to: {galleryName}</span>
          </div>
        </div>
      ),
    });
  };

  const showUploadErrorNotification = () => {
    toast({
      variant: "destructive",
      description: (
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          <div>
            <p className="font-medium">Upload Failed</p>
            <p className="text-xs mt-0.5">Please try again or contact support.</p>
          </div>
        </div>
      ),
    });
  };

  const showValidationErrorNotification = (message: string) => {
    toast({
      variant: "destructive",
      description: (
        <div className="flex items-center gap-2">
          <InfoIcon className="h-4 w-4" />
          <div>
            <p className="font-medium">Validation Error</p>
            <p className="text-xs mt-0.5">{message}</p>
          </div>
        </div>
      ),
    });
  };

  return {
    showUploadSuccessNotification,
    showUploadErrorNotification,
    showValidationErrorNotification
  };
};
