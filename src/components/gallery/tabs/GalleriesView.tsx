
import React from 'react';
import { Gallery, FileInfo } from '@/models/FileModel';
import { GalleryList } from '../GalleryList';

export interface GalleriesViewProps {
  galleries: Gallery[];
  onSelectGallery: (gallery: Gallery) => void;
  galleryFileTypes: Record<string, string[]>;
  onMoveFile?: (file: FileInfo, toGalleryId: string) => void;
  onOpenUploadDialog?: () => void; // Add this prop to match what's being passed
}

export const GalleriesView: React.FC<GalleriesViewProps> = ({
  galleries,
  onSelectGallery,
  galleryFileTypes,
  onMoveFile,
  onOpenUploadDialog // Include the new prop
}) => {
  return (
    <GalleryList 
      galleries={galleries}
      onSelectGallery={onSelectGallery}
      fileTypes={galleryFileTypes}
      onMoveFile={onMoveFile}
    />
  );
};
