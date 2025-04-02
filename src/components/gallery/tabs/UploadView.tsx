
import React from 'react';
import { FileInfo, Gallery } from '@/models/FileModel';
import { UploadComponent } from '../UploadComponent';

export interface UploadViewProps {
  onFileUploaded: (file: FileInfo) => void;
  galleries: Gallery[];
  selectedGalleryId?: string;
  selectedGallery?: Gallery | null; // Add this prop to match what's being passed
  onViewFile: (file: FileInfo) => void;
}

export const UploadView: React.FC<UploadViewProps> = ({
  onFileUploaded,
  galleries,
  selectedGalleryId,
  selectedGallery, // Include the new prop
  onViewFile
}) => {
  // Use selectedGallery?.id or selectedGalleryId, preferring the former if available
  const galleryId = selectedGallery?.id || selectedGalleryId;
  
  return (
    <UploadComponent 
      onFileUploaded={onFileUploaded}
      galleries={galleries}
      selectedGalleryId={galleryId}
      onViewFile={onViewFile}
    />
  );
};
