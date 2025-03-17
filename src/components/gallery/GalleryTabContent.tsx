import React, { memo, useCallback } from 'react';
import { Gallery, FileInfo } from '@/models/FileModel';
import { GalleriesView } from './tabs/GalleriesView';
import { UploadView } from './tabs/UploadView';
import GalleryBrowseView from './tabs/GalleryBrowseView';
import { useGalleryNotifications } from './tabs/GalleryNotifications';

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
  onDeleteFile?: (file: FileInfo) => void;
  onMoveFile?: (file: FileInfo, toGalleryId: string) => void;
}

export const GalleryTabContent: React.FC<GalleryTabContentProps> = memo(({
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
  const { showDeleteNotification } = useGalleryNotifications();
  
  // Handler for the "Add Files" button
  const handleAddFiles = useCallback(() => {
    // Switch to upload tab while keeping the selected gallery
    setActiveTab('upload');
  }, [setActiveTab]);

  // Handler for viewing a file after upload
  const handleViewFile = useCallback((file: FileInfo) => {
    // Set the selected gallery to the gallery the file belongs to
    const fileGallery = galleries.find(g => g.id === file.galleryId);
    if (fileGallery) {
      setSelectedGallery(fileGallery);
    }
    
    // Call the parent component's onViewFile
    onViewFile(file);
    
    // Switch to browse tab
    setActiveTab('browse');
  }, [galleries, onViewFile, setActiveTab, setSelectedGallery]);

  // Handler for back to galleries button
  const handleBackToGalleries = useCallback(() => {
    setSelectedGallery(null);
    setActiveTab('galleries');
  }, [setActiveTab, setSelectedGallery]);

  // Handler for deleting a file
  const handleDeleteFile = useCallback((file: FileInfo) => {
    if (onDeleteFile) {
      onDeleteFile(file);
      
      // Show a toast notification for successful deletion
      showDeleteNotification();
    }
  }, [onDeleteFile, showDeleteNotification]);

  return (
    <div className="space-y-4">
      {activeTab === 'galleries' && (
        <GalleriesView 
          galleries={galleries}
          onSelectGallery={onSelectGallery}
          galleryFileTypes={galleryFileTypes}
          onMoveFile={onMoveFile}
        />
      )}
      
      {activeTab === 'upload' && (
        <UploadView 
          onFileUploaded={onFileUploaded}
          galleries={galleries}
          selectedGalleryId={selectedGallery?.id}
          onViewFile={handleViewFile}
        />
      )}
      
      {activeTab === 'browse' && selectedGallery && (
        <GalleryBrowseView
          selectedGallery={selectedGallery}
          onBackToGalleries={handleBackToGalleries}
          onAddFiles={handleAddFiles}
          files={files}
          galleries={galleries}
          galleryFileTypes={galleryFileTypes}
          onViewFile={onViewFile}
          onDeleteFile={handleDeleteFile}
          onMoveFile={onMoveFile}
          onUpdateGallery={onUpdateGallery}
          onOpenUploadDialog={handleAddFiles}
        />
      )}
    </div>
  );
});

GalleryTabContent.displayName = 'GalleryTabContent';

export default GalleryTabContent;
