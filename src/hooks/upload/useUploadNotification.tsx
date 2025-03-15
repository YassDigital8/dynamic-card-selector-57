
import { useToast } from '@/hooks/use-toast';
import { FileInfo } from '@/models/FileModel';
import { Eye, CheckCircle, AlertCircle, InfoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const useUploadNotification = () => {
  const { toast } = useToast();

  const showUploadSuccessNotification = (fileInfo: FileInfo, fileName: string) => {
    toast({
      description: (
        <div className="py-2 -mx-4 px-4 -my-2">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 shadow-sm">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 dark:text-gray-50">Upload Successful</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[250px]">
                {fileName}
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <Button 
              onClick={() => document.dispatchEvent(new CustomEvent('view-uploaded-file', { detail: fileInfo }))}
              className="w-full"
              size="sm"
            >
              <Eye className="h-4 w-4 mr-1" />
              View File
            </Button>
          </div>
        </div>
      ),
    });
  };

  const showUploadErrorNotification = () => {
    toast({
      variant: "destructive",
      title: "Upload Failed",
      description: (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 shadow-sm">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm">There was an error uploading your file.</p>
            <p className="text-xs text-muted-foreground mt-1">Please try again or contact support.</p>
          </div>
        </div>
      ),
    });
  };

  const showValidationErrorNotification = (message: string) => {
    toast({
      variant: "destructive",
      title: "Validation Error",
      description: (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0 shadow-sm">
            <InfoIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm">{message}</p>
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
