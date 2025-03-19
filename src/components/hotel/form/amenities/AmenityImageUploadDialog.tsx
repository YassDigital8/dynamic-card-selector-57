
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileDropzone } from '@/components/gallery/FileDropzone';
import { useFileSelection } from '@/hooks/upload/useFileSelection';

interface AmenityImageUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddImage: (imageUrl: string) => void;
  amenityLabel: string;
}

const AmenityImageUploadDialog: React.FC<AmenityImageUploadDialogProps> = ({
  isOpen,
  onClose,
  onAddImage,
  amenityLabel
}) => {
  const {
    selectedFile,
    filePreview,
    isImage,
    handleFile,
    resetFileSelection
  } = useFileSelection();

  const handleCancel = () => {
    resetFileSelection();
    onClose();
  };

  const handleAdd = () => {
    if (filePreview && isImage) {
      onAddImage(filePreview);
      resetFileSelection();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Add {amenityLabel} Image
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <FileDropzone
            onFileSelected={handleFile}
            selectedFile={selectedFile}
            filePreview={filePreview}
            isImage={isImage}
            accept="image/*"
          />
          
          <div className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button 
              type="button"
              onClick={handleAdd}
              disabled={!selectedFile || !isImage}
            >
              Add Image
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AmenityImageUploadDialog;
