
import { useToast } from '@/hooks/use-toast';
import { FileInfo } from '@/models/FileModel';
import { CheckCircle, AlertCircle, InfoIcon, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const useUploadNotification = () => {
  const { toast } = useToast();

  const showUploadSuccessNotification = (fileInfo: FileInfo, fileName: string) => {
    // Get gallery name using the ID from the fileInfo
    const galleryName = fileInfo.galleryName || 'Unknown Gallery';
    
    toast({
      description: (
        <div className="py-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="font-medium">Uploaded to: {galleryName}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => {
                // Dispatch a custom event to view the uploaded file
                const event = new CustomEvent('view-uploaded-file', { detail: fileInfo });
                document.dispatchEvent(event);
              }}
            >
              <Eye className="h-3.5 w-3.5 mr-1" />
              View
            </Button>
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
