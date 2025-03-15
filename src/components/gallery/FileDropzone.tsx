import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, FileImage, Music, Video, File } from 'lucide-react';
interface FileDropzoneProps {
  onFileSelected: (file: File | null) => void;
  selectedFile: File | null;
  filePreview: string | null;
  isImage: boolean;
  onImageUpload?: (imageUrl: string) => void;
  accept?: string;
  maxFiles?: number;
  className?: string;
}
export const FileDropzone: React.FC<FileDropzoneProps> = ({
  onFileSelected,
  selectedFile,
  filePreview,
  isImage,
  onImageUpload,
  accept,
  maxFiles,
  className
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
      const file = e.dataTransfer.files[0];
      onFileSelected(file);

      // If this is being used for image upload and the onImageUpload prop exists
      if (onImageUpload && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = event => {
          if (event.target?.result && typeof event.target.result === 'string') {
            onImageUpload(event.target.result);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onFileSelected(file);

      // If this is being used for image upload and the onImageUpload prop exists
      if (onImageUpload && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = event => {
          if (event.target?.result && typeof event.target.result === 'string') {
            onImageUpload(event.target.result);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };
  const getFileIcon = () => {
    if (!selectedFile) return <Upload className="h-8 w-8 text-gray-400" />;
    const fileType = selectedFile.type;
    if (fileType.startsWith('image/')) {
      return <FileImage className="h-8 w-8 text-blue-500" />;
    } else if (fileType.startsWith('video/')) {
      return <Video className="h-8 w-8 text-purple-500" />;
    } else if (fileType.startsWith('audio/')) {
      return <Music className="h-8 w-8 text-green-500" />;
    } else if (fileType.includes('pdf')) {
      return <FileText className="h-8 w-8 text-red-500" />;
    } else if (fileType.includes('text/')) {
      return <FileText className="h-8 w-8 text-amber-500" />;
    } else {
      return <File className="h-8 w-8 text-gray-500" />;
    }
  };
  return <Card className={className}>
      <CardContent className="p-6">
        <div onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop} className="">
          {selectedFile ? <div className="space-y-4">
              <div className="flex flex-col items-center justify-center">
                {filePreview && isImage ? <div className="mb-4 max-w-xs max-h-64 overflow-hidden">
                    <img src={filePreview} alt="Preview" className="object-contain max-h-64" />
                  </div> : <div className="mb-4 w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg">
                    {getFileIcon()}
                  </div>}
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024).toFixed(2)} KB • {selectedFile.type}
                </p>
              </div>
              <Button variant="outline" onClick={() => onFileSelected(null)}>
                Change File
              </Button>
            </div> : <div className="space-y-4">
              <div className="flex flex-col items-center justify-center">
                <div className="mb-4 w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full">
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium">Drag and drop file here</h3>
                <p className="text-sm text-gray-500">or click to browse</p>
              </div>
              <Button variant="outline" onClick={() => inputRef.current?.click()}>
                Select File
              </Button>
              <input ref={inputRef} type="file" className="hidden" onChange={handleChange} accept={accept} />
            </div>}
        </div>
      </CardContent>
    </Card>;
};