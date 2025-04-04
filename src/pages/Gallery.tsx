
import React from 'react';
import AuthenticatedContent from '@/components/pages/index/AuthenticatedContent';
import { CreateGalleryDialog } from '@/components/gallery/CreateGalleryDialog';
import { GalleryHeader } from '@/components/gallery/GalleryHeader';
import { GalleryTabs } from '@/components/gallery/GalleryTabs';
import { GalleryTabContent } from '@/components/gallery/GalleryTabContent';
import { useGalleryViewModel } from '@/hooks/useGalleryViewModel';

const GalleryPage: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isCreateGalleryOpen,
    setIsCreateGalleryOpen,
    selectedGallery,
    setSelectedGallery,
    galleries,
    files,
    galleryFileTypes,
    handleFileUpload,
    handleCreateGallery,
    handleViewFile,
    handleSelectGallery,
    handleUpdateGallery,
    handleDeleteFile,
    handleMoveFile
  } = useGalleryViewModel();

  return (
    <>
      <GalleryTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onCreateGallery={() => setIsCreateGalleryOpen(true)}
        selectedGallery={selectedGallery}
      >
        <GalleryTabContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          galleries={galleries}
          files={files}
          selectedGallery={selectedGallery}
          setSelectedGallery={setSelectedGallery}
          galleryFileTypes={galleryFileTypes}
          onSelectGallery={handleSelectGallery}
          onFileUploaded={handleFileUpload}
          onViewFile={handleViewFile}
          onUpdateGallery={handleUpdateGallery}
          onDeleteFile={handleDeleteFile}
          onMoveFile={handleMoveFile}
        />
      </GalleryTabs>
      
      <CreateGalleryDialog 
        open={isCreateGalleryOpen} 
        onOpenChange={setIsCreateGalleryOpen}
        onCreateGallery={handleCreateGallery}
      />
    </>
  );
};

export default GalleryPage;
