
import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText } from 'lucide-react';

interface FileDropzoneProps {
  onFileSelected: (file: File) => void;
  selectedFile: File | null;
  filePreview: string | null;
  isImage: boolean;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  onFileSelected,
  selectedFile,
  filePreview,
  isImage
}) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      onFileSelected(e.target.files[0]);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div 
          className={`border-2 border-dashed rounded-lg p-10 text-center ${dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          {selectedFile ? (
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center">
                {filePreview ? (
                  <div className="mb-4 max-w-xs max-h-64 overflow-hidden">
                    <img
                      src={filePreview}
                      alt="Preview"
                      className="object-contain max-h-64"
                    />
                  </div>
                ) : (
                  <div className="mb-4 w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg">
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024).toFixed(2)} KB • {selectedFile.type}
                </p>
              </div>
              <Button variant="outline" onClick={() => onFileSelected(null)}>
                Change File
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center">
                <div className="mb-4 w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full">
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium">Drag and drop file here</h3>
                <p className="text-sm text-gray-500">or click to browse</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => inputRef.current?.click()}
              >
                Select File
              </Button>
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={handleChange}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
