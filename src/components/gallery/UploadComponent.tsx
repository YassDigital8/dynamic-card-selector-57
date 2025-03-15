
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileInfo } from '@/models/FileModel';
import { useToast } from '@/hooks/use-toast';
import { useAuthentication } from '@/hooks/useAuthentication';
import { FileDropzone } from './FileDropzone';
import { ImageMetadataForm } from './ImageMetadataForm';

interface UploadComponentProps {
  onFileUploaded: (file: FileInfo) => void;
}

export const UploadComponent: React.FC<UploadComponentProps> = ({ onFileUploaded }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isImage, setIsImage] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [metadata, setMetadata] = useState({
    title: '',
    altText: '',
    caption: '',
    description: ''
  });
  
  const { toast } = useToast();
  const { userInfo } = useAuthentication();

  const handleFile = (file: File | null) => {
    if (!file) {
      setSelectedFile(null);
      setFilePreview(null);
      setIsImage(false);
      return;
    }
    
    setSelectedFile(file);
    
    // Check if file is an image
    const isImageFile = file.type.startsWith('image/');
    setIsImage(isImageFile);
    
    // Create preview for images
    if (isImageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setFilePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      
      // Set title to filename by default (without extension)
      const fileName = file.name.split('.').slice(0, -1).join('.');
      setMetadata(prev => ({
        ...prev,
        title: fileName
      }));
    } else {
      setFilePreview(null);
    }
  };

  const handleMetadataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMetadata(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    
    try {
      // In a real application, you would upload the file to a server here
      // For now, we'll simulate the upload with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a mock file info object
      const fileInfo: FileInfo = {
        id: Date.now().toString(),
        name: selectedFile.name,
        type: selectedFile.type,
        size: Math.round(selectedFile.size / 1024), // Convert to KB
        url: filePreview || '/placeholder.svg',
        uploadedBy: userInfo?.email || 'unknown',
        uploadedOn: new Date().toISOString(),
        galleryId: '', // This will be set by the parent component
      };
      
      // Add metadata for images
      if (isImage) {
        fileInfo.metadata = {
          ...metadata
        };
      }
      
      // Notify parent component about the new file
      onFileUploaded(fileInfo);
      
      // Reset form
      setSelectedFile(null);
      setFilePreview(null);
      setIsImage(false);
      setMetadata({
        title: '',
        altText: '',
        caption: '',
        description: ''
      });
      
      // Show success toast
      toast({
        title: "Upload successful",
        description: `File "${selectedFile.name}" has been uploaded.`,
      });
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "There was an error uploading your file.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <FileDropzone 
        onFileSelected={handleFile}
        selectedFile={selectedFile}
        filePreview={filePreview}
        isImage={isImage}
      />

      {isImage && selectedFile && (
        <ImageMetadataForm 
          metadata={metadata}
          onMetadataChange={handleMetadataChange}
        />
      )}

      {selectedFile && (
        <div className="flex justify-end">
          <Button 
            onClick={handleUpload} 
            disabled={isUploading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isUploading ? 'Uploading...' : 'Upload File'}
          </Button>
        </div>
      )}
    </div>
  );
};
