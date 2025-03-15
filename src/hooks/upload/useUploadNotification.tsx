
import { useToast } from '@/hooks/use-toast';
import { FileInfo } from '@/models/FileModel';

export const useUploadNotification = () => {
  const { toast } = useToast();

  const showUploadSuccessNotification = (fileInfo: FileInfo, fileName: string) => {
    toast({
      description: (
        <div className="py-2 -mx-4 px-4 -my-2 text-center">
          <p className="text-gray-700 mb-3">
            Your file "{fileName}" has been uploaded.
          </p>
          <div className="flex justify-center">
            <button 
              onClick={() => document.dispatchEvent(new CustomEvent('view-uploaded-file', { detail: fileInfo }))}
              className="bg-gray-800 text-white px-3 py-1.5 rounded-md flex items-center gap-2 text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
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
      title: "Upload failed",
      description: "There was an error uploading your file.",
    });
  };

  const showValidationErrorNotification = (message: string) => {
    toast({
      variant: "destructive",
      title: "Validation Error",
      description: message,
    });
  };

  return {
    showUploadSuccessNotification,
    showUploadErrorNotification,
    showValidationErrorNotification
  };
};
