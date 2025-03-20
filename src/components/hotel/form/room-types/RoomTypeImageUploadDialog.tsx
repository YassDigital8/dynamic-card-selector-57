
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { FileDropzone } from '@/components/gallery/FileDropzone';
import { useFileSelection } from '@/hooks/upload/useFileSelection';
import { useFileMetadata, FileMetadataValues } from '@/hooks/upload/useFileMetadata';
import { ImageMetadataForm } from '@/components/gallery/ImageMetadataForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileInfo } from '@/models/FileModel';
import { useGalleryViewModel } from '@/hooks/useGalleryViewModel';

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
          
          <TabsContent value="upload" className="space-y-4">
            <FileDropzone
              onFileSelected={handleFile}
              selectedFile={selectedFile}
              filePreview={filePreview}
              isImage={isImage}
              accept="image/*"
            />
            
            {selectedFile && isImage && (
              <ImageMetadataForm
                metadata={metadata}
                onMetadataChange={handleMetadataChange}
                isImage={isImage}
              />
            )}
            
            <div className="flex justify-end space-x-2 mt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button 
                type="button"
                onClick={handleAddFromUpload}
                disabled={!selectedFile || !isImage}
              >
                Add Image
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="gallery" className="space-y-4">
            {hotelFiles.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {hotelFiles.filter(file => file.type.startsWith('image/')).map((file) => (
                  <div 
                    key={file.id} 
                    className={`cursor-pointer border rounded-md overflow-hidden hover:border-primary transition-colors ${
                      multiSelect && isFileSelected(file) 
                        ? 'ring-2 ring-primary border-primary' 
                        : ''
                    }`}
                    onClick={() => handleSelectFromGallery(file)}
                  >
                    <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                      <img 
                        src={file.url} 
                        alt={file.metadata?.altText || file.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-medium truncate">{file.metadata?.title || file.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No images available in your gallery</p>
                <p className="text-sm text-muted-foreground mt-2">Upload images first to select from gallery</p>
              </div>
            )}
            
            <div className="flex justify-end space-x-2 mt-4">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              {multiSelect && (
                <Button 
                  type="button"
                  onClick={handleConfirmMultipleSelection}
                  disabled={selectedGalleryFiles.length === 0}
                >
                  Add {selectedGalleryFiles.length} Image{selectedGalleryFiles.length !== 1 ? 's' : ''}
                </Button>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default RoomTypeImageUploadDialog;
