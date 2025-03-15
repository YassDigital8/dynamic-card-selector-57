
import React from 'react';
import { FileInfo, Gallery } from '@/models/FileModel';
import { FileDropzone } from './FileDropzone';
import { ImageMetadataForm } from './ImageMetadataForm';
import { GallerySelector } from './GallerySelector';
import { UploadButton } from './UploadButton';
import { useFileUpload } from '@/hooks/useFileUpload';

interface UploadComponentProps {
  onFileUploaded: (file: FileInfo) => void;
  galleries: Gallery[];
  selectedGalleryId?: string;
}

export const UploadComponent: React.FC<UploadComponentProps> = ({ 
  onFileUploaded, 
  galleries,
  selectedGalleryId 
}) => {
  const {
    selectedFile,
    filePreview,
    isImage,
    isUploading,
    targetGalleryId,
    metadata,
    handleFile,
    handleMetadataChange,
    handleUpload,
    setTargetGalleryId
  } = useFileUpload({ onFileUploaded, selectedGalleryId });

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
        />
      )}
    </div>
  );
};
