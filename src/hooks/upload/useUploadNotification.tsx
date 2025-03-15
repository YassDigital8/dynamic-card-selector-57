
import { useToast } from '@/hooks/use-toast';
import { FileInfo } from '@/models/FileModel';
import { Eye } from 'lucide-react';

export const useUploadNotification = () => {
  const { toast } = useToast();

  const showUploadSuccessNotification = (fileInfo: FileInfo, fileName: string) => {
    toast({
      description: (
        <div className="py-2 -mx-4 px-4 -my-2">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
              <svg 
                className="h-5 w-5 text-green-600 dark:text-green-400" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">File Uploaded</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[220px]">
                {fileName}
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <button 
              onClick={() => document.dispatchEvent(new CustomEvent('view-uploaded-file', { detail: fileInfo }))}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md flex items-center gap-2 text-sm w-full justify-center transition-colors"
            >
              <Eye className="h-4 w-4" />
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
      description: (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
            <svg 
              className="h-4 w-4 text-red-600 dark:text-red-400" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <p>There was an error uploading your file.</p>
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
          <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
            <svg 
              className="h-4 w-4 text-red-600 dark:text-red-400" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <p>{message}</p>
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
