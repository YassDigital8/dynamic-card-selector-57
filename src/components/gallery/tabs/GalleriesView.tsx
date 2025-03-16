
import React from 'react';
import { Gallery, FileInfo } from '@/models/FileModel';
import { GalleryList } from '../GalleryList';

interface GalleriesViewProps {
  galleries: Gallery[];
  onSelectGallery: (gallery: Gallery) => void;
  galleryFileTypes: Record<string, string[]>;
  onMoveFile?: (file: FileInfo, toGalleryId: string) => void;
}

export const GalleriesView: React.FC<GalleriesViewProps> = ({
  galleries,
  onSelectGallery,
  galleryFileTypes,
  onMoveFile
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
