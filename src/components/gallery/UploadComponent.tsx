import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { FilePlus, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Progress } from "@/components/ui/progress"
import { useToast } from '@/hooks/use-toast';
import { generateFileName } from '@/lib/utils';
import { uploadFile } from '@/lib/storage';
import { FileMetadata } from '@/models/FileModel';
import ImageMetadataForm from './ImageMetadataForm';

interface UploadComponentProps {
  directory: string;
  onUploadComplete?: (metadata: FileMetadata) => void;
}

const UploadComponent: React.FC<UploadComponentProps> = ({ directory, onUploadComplete }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setOpen(true);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.svg']
    },
    maxFiles: 5,
  });

  const handleUpload = async () => {
    if (files.length === 0) {
      toast({
        title: 'No files selected',
        description: 'Please select files to upload.',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = generateFileName(file.name);
        const uploadPath = `${directory}/${fileName}`;

        const uploadSuccessful = await uploadFile(file, uploadPath, (progress) => {
          const currentProgress = Math.round(((i + progress) / files.length) * 100);
          setUploadProgress(currentProgress);
        });

        if (uploadSuccessful) {
          toast({
            title: 'Upload complete',
            description: `${file.name} uploaded successfully.`,
          });

          // Create default metadata
          const metadata: FileMetadata = {
            id: fileName,
            name: file.name,
            title: file.name,
            altText: file.name,
            description: '',
            url: uploadPath,
            size: file.size,
            type: file.type,
            uploadedAt: new Date().toISOString(),
          };

          // Notify parent component about the successful upload
          onUploadComplete?.(metadata);
        } else {
          toast({
            title: 'Upload failed',
            description: `Failed to upload ${file.name}.`,
            variant: 'destructive',
          });
        }
      }
    } catch (error: any) {
      toast({
        title: 'Upload error',
        description: error.message || 'An error occurred during upload.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      setFiles([]);
      setOpen(false);
    }
  };

  const handleRemoveFile = (fileToRemove: File) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            disabled={isUploading}
            {...getRootProps()}
            className="w-full relative h-40 border-dashed border-2 flex flex-col items-center justify-center rounded-md text-sm"
          >
            <input {...getInputProps()} />
            <FilePlus className="h-5 w-5 absolute top-2 right-2 text-gray-500" />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>
                Drag 'n' drop some files here, or click to select files
              </p>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload Files</DialogTitle>
            <DialogDescription>
              {files.length > 0 ? 'Confirm upload or remove files.' : 'No files selected.'}
            </DialogDescription>
          </DialogHeader>

          {files.length > 0 && (
            <div className="grid gap-4 py-4">
              {files.map((file, index) => (
                <div key={file.name} className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <AspectRatio ratio={1 / 1}>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="object-cover"
                      />
                    </AspectRatio>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">{file.size} bytes</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleRemoveFile(file)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {isUploading && (
            <Progress value={uploadProgress} className="mb-4" />
          )}

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="secondary" onClick={() => { setOpen(false); setFiles([]) }}>
              Cancel
            </Button>
            <Button type="button" onClick={handleUpload} disabled={isUploading || files.length === 0}>
              {isUploading ? 'Uploading...' : 'Upload Files'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadComponent;
