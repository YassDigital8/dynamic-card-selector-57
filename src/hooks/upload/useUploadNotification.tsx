
import { useToast } from '@/hooks/use-toast';
import { FileInfo } from '@/models/FileModel';
import { CheckCircle, AlertCircle, InfoIcon } from 'lucide-react';

export const useUploadNotification = () => {
  const { toast } = useToast();

  const showUploadSuccessNotification = (fileInfo: FileInfo, fileName: string) => {
    toast({
      description: (
        <div className="py-1">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <div>
              <span className="font-medium">Upload Successful</span>
              <span className="mx-1.5">·</span>
              <span className="text-sm text-muted-foreground truncate max-w-[180px] inline-block align-bottom">
                {fileName}
              </span>
            </div>
          </div>
          <div>
            <button 
              onClick={() => document.dispatchEvent(new CustomEvent('view-uploaded-file', { detail: fileInfo }))}
              className="text-blue-500 hover:text-blue-600 hover:underline text-sm font-medium transition-colors"
            >
              View File
            </button>
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
