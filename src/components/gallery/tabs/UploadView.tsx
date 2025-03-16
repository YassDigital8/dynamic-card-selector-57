
import React, { useEffect } from 'react';
import { FileInfo, Gallery } from '@/models/FileModel';
import { UploadComponent } from '../UploadComponent';

interface UploadViewProps {
  onFileUploaded: (file: FileInfo) => void;
  galleries: Gallery[];
  selectedGalleryId?: string;
  onViewFile: (file: FileInfo) => void;
}

export const UploadView: React.FC<UploadViewProps> = ({
  onFileUploaded,
  galleries,
  selectedGalleryId,
  onViewFile
}) => {
  return (
    <UploadComponent 
      onFileUploaded={onFileUploaded}
      galleries={galleries}
      selectedGalleryId={selectedGalleryId}
      onViewFile={onViewFile}
    />
  );
};
