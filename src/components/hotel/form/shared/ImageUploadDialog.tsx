
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UploadTab } from './upload-dialog/UploadTab';
import { GalleryTab } from './upload-dialog/GalleryTab';
import { UrlTab } from './upload-dialog/UrlTab';
import { FileInfo } from '@/models/FileModel';
import { FileMetadataValues } from '@/hooks/upload/useFileMetadata';

interface ImageUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddImage: (imageUrl: string, metadata?: FileMetadataValues) => void;
  itemLabel: string;
  multiSelect?: boolean;
  onSelectMultiple?: (files: FileInfo[]) => void;
}

const ImageUploadDialog: React.FC<ImageUploadDialogProps> = ({
  isOpen,
  onClose,
  onAddImage,
  itemLabel,
  multiSelect = false,
  onSelectMultiple
}) => {
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [selectedGalleryFiles, setSelectedGalleryFiles] = useState<FileInfo[]>([]);

  const handleCancel = () => {
    setSelectedGalleryFiles([]);
    onClose();
  };

  const handleSelectFromGallery = (file: FileInfo) => {
    if (multiSelect) {
      // For multi-select mode
      const isSelected = selectedGalleryFiles.some(f => f.id === file.id);
      
      if (isSelected) {
        setSelectedGalleryFiles(selectedGalleryFiles.filter(f => f.id !== file.id));
      } else {
        setSelectedGalleryFiles([...selectedGalleryFiles, file]);
      }
    } else {
      // For single select mode
      onAddImage(file.url, {
        title: file.metadata?.title || file.name,
        altText: file.metadata?.altText || `${itemLabel} image`,
        caption: file.metadata?.caption || '',
        description: file.metadata?.description || ''
      });
      onClose();
    }
  };

  const handleConfirmMultipleSelection = () => {
    if (multiSelect && onSelectMultiple && selectedGalleryFiles.length > 0) {
      onSelectMultiple(selectedGalleryFiles);
      setSelectedGalleryFiles([]);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-background dark:bg-background">
        <DialogHeader>
          <DialogTitle>
            {`Add ${itemLabel} Image${multiSelect ? '(s)' : ''}`}
          </DialogTitle>
          <DialogDescription>
            {multiSelect 
              ? `Upload new images, enter URLs, or select from your gallery. You can select multiple images.`
              : 'Upload a new image, enter a URL, or select from your gallery'}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="upload">Upload New</TabsTrigger>
            <TabsTrigger value="url">From URL</TabsTrigger>
            <TabsTrigger value="gallery">From Gallery</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-4">
            <UploadTab 
              itemLabel={itemLabel}
              onAddImage={onAddImage}
              onClose={onClose}
              onCancel={handleCancel}
            />
          </TabsContent>
          
          <TabsContent value="url" className="space-y-4">
            <UrlTab
              itemLabel={itemLabel}
              onAddImage={onAddImage}
              onClose={onClose}
              onCancel={handleCancel}
            />
          </TabsContent>
          
          <TabsContent value="gallery" className="space-y-4">
            <GalleryTab
              itemLabel={itemLabel}
              onSelectFile={handleSelectFromGallery}
              selectedFiles={selectedGalleryFiles}
              multiSelect={multiSelect}
              onConfirmSelection={handleConfirmMultipleSelection}
              onCancel={handleCancel}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadDialog;
