import React, { useState } from 'react';
import { FileInfo, Gallery } from '@/models/FileModel';
import { GalleriesView } from './tabs/GalleriesView';
import GalleryBrowseView from './tabs/GalleryBrowseView';
import { UploadView } from './tabs/UploadView';
import { useGalleryFiles } from '@/components/hotel/form/room-types/useGalleryFiles';

interface GalleryTabContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  galleries: Gallery[];
  files: FileInfo[];
  selectedGallery: Gallery | null;
  setSelectedGallery: (gallery: Gallery | null) => void;
  galleryFileTypes: Record<string, string[]>;
  onSelectGallery: (gallery: Gallery) => void;
  onFileUploaded: (file: FileInfo) => void;
  onViewFile: (file: FileInfo) => void;
  onUpdateGallery: (gallery: Gallery) => void;
  onDeleteFile: (file: FileInfo) => void;
  onMoveFile: (file: FileInfo, toGalleryId: string) => void;
}

export const GalleryTabContent: React.FC<GalleryTabContentProps> = ({
  activeTab,
  setActiveTab,
  galleries,
  files,
  selectedGallery,
  setSelectedGallery,
  galleryFileTypes,
  onSelectGallery,
  onFileUploaded,
  onViewFile,
  onUpdateGallery,
  onDeleteFile,
  onMoveFile
}) => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const { galleryFiles } = useGalleryFiles(); // Import the enhanced gallery files

  // Combine the local files with the enhanced gallery files
  const combinedFiles = [...files];
  
  // For galleries tab, add enhanced files only if they're not already present
  const enhancedGalleryFiles = galleryFiles.filter(gf => 
    !files.some(f => f.id === gf.id)
  );
  
  // When in gallery mode and the user hasn't uploaded their own files yet,
  // show the enhanced gallery files
  const displayFiles = activeTab === "browse" && files.length < 3 
    ? [...files, ...enhancedGalleryFiles]
    : files;

  const handleOpenUploadDialog = () => {
    setIsUploadDialogOpen(true);
  };

  const handleBackToGalleries = () => {
    setSelectedGallery(null);
    setActiveTab("galleries");
  };

  return (
    <div className="mt-4 space-y-6">
      {activeTab === "galleries" && (
        <GalleriesView
          galleries={galleries}
          onSelectGallery={onSelectGallery}
          onOpenUploadDialog={handleOpenUploadDialog}
          galleryFileTypes={galleryFileTypes}
        />
      )}

      {activeTab === "browse" && (
        <GalleryBrowseView
          files={displayFiles}
          selectedGallery={selectedGallery}
          onBackToGalleries={handleBackToGalleries}
          onAddFiles={handleOpenUploadDialog}
          onOpenUploadDialog={handleOpenUploadDialog}
          galleries={galleries}
          galleryFileTypes={galleryFileTypes}
          onViewFile={onViewFile}
          onDeleteFile={onDeleteFile}
          onMoveFile={onMoveFile}
          onUpdateGallery={onUpdateGallery}
        />
      )}

      {activeTab === "upload" && (
        <UploadView
          onFileUploaded={onFileUploaded}
          selectedGallery={selectedGallery}
          galleries={galleries}
          onViewFile={onViewFile}
        />
      )}
    </div>
  );
};
