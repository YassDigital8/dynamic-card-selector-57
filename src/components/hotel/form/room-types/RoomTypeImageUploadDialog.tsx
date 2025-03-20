
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFileSelection } from '@/hooks/upload/useFileSelection';
import { useFileMetadata, FileMetadataValues } from '@/hooks/upload/useFileMetadata';
import { FileInfo } from '@/models/FileModel';
import { useGalleryViewModel } from '@/hooks/useGalleryViewModel';
import { GalleryTab, UploadTab } from './upload-dialog';

interface RoomTypeImageUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddImage: (imageUrl: string, metadata?: FileMetadataValues) => void;
  roomTypeName: string;
  hotelId?: string;
  multiSelect?: boolean;
  onSelectMultiple?: (files: FileInfo[]) => void;
}

const RoomTypeImageUploadDialog: React.FC<RoomTypeImageUploadDialogProps> = ({
  isOpen,
  onClose,
  onAddImage,
  roomTypeName,
  hotelId,
  multiSelect = false,
  onSelectMultiple
}) => {
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [selectedGalleryFiles, setSelectedGalleryFiles] = useState<FileInfo[]>([]);
  const { files } = useGalleryViewModel();
  
  // Use all available files
  const hotelFiles = files;

  const {
    selectedFile,
    filePreview,
    isImage,
    handleFile,
    resetFileSelection
  } = useFileSelection();

  const {
    metadata,
    handleMetadataChange,
    validateMetadata,
    resetMetadata
  } = useFileMetadata();

  const handleCancel = () => {
    resetFileSelection();
    resetMetadata();
    setSelectedGalleryFiles([]);
    onClose();
  };

  const handleAddFromUpload = () => {
    if (filePreview && isImage) {
      if (!validateMetadata(isImage)) {
        return;
      }
      onAddImage(filePreview, metadata);
      resetFileSelection();
      resetMetadata();
      onClose();
    }
  };

  const handleSelectFromGallery = (file: FileInfo) => {
    if (multiSelect && onSelectMultiple) {
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
        altText: file.metadata?.altText || `${roomTypeName} room image`,
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

  const isFileSelected = (file: FileInfo): boolean => {
    return selectedGalleryFiles.some(f => f.id === file.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {multiSelect ? 'Select Room Images' : 'Add Room Image'}
          </DialogTitle>
          <DialogDescription>
            {multiSelect 
              ? 'Select multiple images from your gallery or upload new ones'
              : 'Upload a new image or select from your gallery'}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="upload">Upload New</TabsTrigger>
            <TabsTrigger value="gallery">From Gallery</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <UploadTab
              selectedFile={selectedFile}
              filePreview={filePreview}
              isImage={isImage}
              metadata={metadata}
              onFileSelected={handleFile}
              onMetadataChange={handleMetadataChange}
              onCancel={handleCancel}
              onAddImage={handleAddFromUpload}
            />
          </TabsContent>
          
          <TabsContent value="gallery">
            <GalleryTab
              files={hotelFiles}
              selectedFiles={selectedGalleryFiles}
              onSelectFile={handleSelectFromGallery}
              onCancel={handleCancel}
              onConfirmSelection={handleConfirmMultipleSelection}
              multiSelect={multiSelect}
              isFileSelected={isFileSelected}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default RoomTypeImageUploadDialog;
