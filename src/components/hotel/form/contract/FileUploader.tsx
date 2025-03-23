
import React, { useRef } from 'react';
import { FileUp, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileUploaderProps {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ selectedFile, setSelectedFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) {
      return;
    }
    
    // Check if file is a PDF
    if (file.type !== 'application/pdf') {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Only PDF files are accepted for contracts."
      });
      event.target.value = '';
      return;
    }
    
    setSelectedFile(file);
  };

  return (
    <>
      <div 
        className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept=".pdf,application/pdf" 
          onChange={handleFileChange}
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <FileUp className="h-8 w-8 text-gray-400" />
          <p className="font-medium">Click to select a PDF document</p>
          <p className="text-sm text-gray-500">Only PDF files are accepted</p>
        </div>
      </div>
      
      {selectedFile && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <div className="flex-1">
              <p className="font-medium">{selectedFile.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • PDF Document
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FileUploader;
