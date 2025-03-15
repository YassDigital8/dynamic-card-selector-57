
import React from 'react';
import PageContainer from '@/components/pages/index/PageContainer';
import AuthenticatedContent from '@/components/pages/index/AuthenticatedContent';
import { useAuthentication } from '@/hooks/useAuthentication';
import { CreateGalleryDialog } from '@/components/gallery/CreateGalleryDialog';
import { GalleryHeader } from '@/components/gallery/GalleryHeader';
import { GalleryTabs } from '@/components/gallery/GalleryTabs';
import { GalleryTabContent } from '@/components/gallery/GalleryTabContent';
import { useGalleryViewModel } from '@/hooks/useGalleryViewModel';

const GalleryPage: React.FC = () => {
  const { userInfo } = useAuthentication();
  const {
    activeTab,
    setActiveTab,
    isCreateGalleryOpen,
    setIsCreateGalleryOpen,
    selectedGallery,
    galleries,
    files,
    galleryFileTypes,
    handleFileUpload,
    handleCreateGallery,
    handleViewFile,
    handleSelectGallery
  } = useGalleryViewModel();

  return (
    <PageContainer>
      <AuthenticatedContent userInfo={userInfo} />
      
      <GalleryHeader 
        title="Media Gallery"
        description="Manage and organize your media files"
      />
      
      <GalleryTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onCreateGallery={() => setIsCreateGalleryOpen(true)}
      >
        <GalleryTabContent
          activeTab={activeTab}
          galleries={galleries}
          files={files}
          selectedGallery={selectedGallery}
          galleryFileTypes={galleryFileTypes}
          onSelectGallery={handleSelectGallery}
          onFileUploaded={handleFileUpload}
          onViewFile={handleViewFile}
        />
      </GalleryTabs>
      
      <CreateGalleryDialog 
        open={isCreateGalleryOpen} 
        onOpenChange={setIsCreateGalleryOpen}
        onCreateGallery={handleCreateGallery}
      />
    </PageContainer>
  );
};

export default GalleryPage;
