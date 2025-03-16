
import React, { useEffect } from 'react';
import { FileInfo, Gallery } from '@/models/FileModel';
import { FileDropzone } from './FileDropzone';
import { ImageMetadataForm } from './ImageMetadataForm';
import { GallerySelector } from './GallerySelector';
import { UploadButton } from './UploadButton';
import { useFileUpload } from '@/hooks/useFileUpload';
import { Eye } from 'lucide-react';

interface UploadComponentProps {
  onFileUploaded: (file: FileInfo) => void;
  galleries: Gallery[];
  selectedGalleryId?: string;
  onViewFile?: (file: FileInfo) => void;
}

export const UploadComponent: React.FC<UploadComponentProps> = ({ 
  onFileUploaded, 
  galleries,
  selectedGalleryId,
  onViewFile 
}) => {
  const {
    selectedFile,
    filePreview,
    isImage,
    isUploading,
    targetGalleryId,
    metadata,
    uploadedFile,
    uploadProgress,
    handleFile,
    handleMetadataChange,
    handleUpload,
    setTargetGalleryId,
    resetUploadedFile
  } = useFileUpload({ 
    onFileUploaded, 
    selectedGalleryId,
    galleries 
  });

  const handleViewFile = () => {
    if (uploadedFile && onViewFile) {
      onViewFile(uploadedFile);
      resetUploadedFile();
    }
  };
  
  useEffect(() => {
    const handleViewUploadedFile = (e: CustomEvent) => {
      if (onViewFile) {
        onViewFile(e.detail);
        resetUploadedFile();
      }
    };
    
    const handleResetUpload = () => {
      resetUploadedFile();
    };
    
    document.addEventListener('view-uploaded-file', handleViewUploadedFile as EventListener);
    document.addEventListener('reset-upload', handleResetUpload);
    
    return () => {
      document.removeEventListener('view-uploaded-file', handleViewUploadedFile as EventListener);
      document.removeEventListener('reset-upload', handleResetUpload);
    };
  }, [onViewFile, resetUploadedFile]);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <GallerySelector 
          galleries={galleries}
          selectedGalleryId={targetGalleryId}
          onGalleryChange={setTargetGalleryId}
        />
      </div>

      <FileDropzone 
        onFileSelected={handleFile}
        selectedFile={selectedFile}
        filePreview={filePreview}
        isImage={isImage}
      />

      {selectedFile && (
        <ImageMetadataForm 
          metadata={metadata}
          onMetadataChange={handleMetadataChange}
          isImage={isImage}
        />
      )}

      {selectedFile && (
        <UploadButton 
          onUpload={handleUpload}
          isUploading={isUploading}
          disabled={!targetGalleryId}
          progress={uploadProgress}
        />
      )}
    </div>
  );
};
