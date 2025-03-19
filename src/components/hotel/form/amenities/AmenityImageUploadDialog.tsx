
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { FileDropzone } from '@/components/gallery/FileDropzone';
import { useFileSelection } from '@/hooks/upload/useFileSelection';
import { useFileMetadata, FileMetadataValues } from '@/hooks/upload/useFileMetadata';
import { ImageMetadataForm } from '@/components/gallery/ImageMetadataForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileInfo } from '@/models/FileModel';
import { AmenityImage } from '@/models/HotelModel';
import { useGalleryViewModel } from '@/hooks/useGalleryViewModel';

interface AmenityImageUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddImage: (imageUrl: string, metadata?: FileMetadataValues) => void;
  amenityLabel: string;
  hotelId?: string;
}

const AmenityImageUploadDialog: React.FC<AmenityImageUploadDialogProps> = ({
  isOpen,
  onClose,
  onAddImage,
  amenityLabel,
  hotelId
}) => {
  const [activeTab, setActiveTab] = useState<string>("upload");
  const { files } = useGalleryViewModel();
  
  // Rather than filtering by hotelId in metadata (which doesn't exist in the type),
  // we'll just use all available files for now
  // In a real implementation, you would add a proper association between files and hotels
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
    onAddImage(file.url, {
      title: file.metadata?.title || file.name,
      altText: file.metadata?.altText || `${amenityLabel} image`,
      caption: file.metadata?.caption || '',
      description: file.metadata?.description || ''
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Add {amenityLabel} Image
          </DialogTitle>
          <DialogDescription>
            Upload a new image or select from your gallery
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
                    className="cursor-pointer border rounded-md overflow-hidden hover:border-primary transition-colors"
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
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AmenityImageUploadDialog;
