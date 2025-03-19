
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileInfo } from '@/models/FileModel';
import { FileGrid } from '@/components/gallery/file-list/FileGrid';
import { toast } from '@/hooks/use-toast';

interface RoomGalleryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  galleryFiles: FileInfo[];
  onSelectImages: (files: FileInfo[]) => void;
  multiSelect?: boolean;
  currentSelectedImages?: string[]; // Add current selected images URLs
}

const RoomGalleryDialog: React.FC<RoomGalleryDialogProps> = ({ 
  isOpen, 
  onOpenChange, 
  galleryFiles, 
  onSelectImages,
  multiSelect = false,
  currentSelectedImages = []
}) => {
  // Pre-select files that are already selected
  const initialSelectedFiles = galleryFiles.filter(file => 
    currentSelectedImages.includes(file.url)
  );

  const [selectedFiles, setSelectedFiles] = useState<FileInfo[]>(initialSelectedFiles);

  const handleFileSelect = (file: FileInfo) => {
    if (multiSelect) {
      setSelectedFiles(prev => {
        const isSelected = prev.some(f => f.id === file.id);
        if (isSelected) {
          return prev.filter(f => f.id !== file.id);
        } else {
          return [...prev, file];
        }
      });
    } else {
      // For single select, just call onSelectImages directly
      onSelectImages([file]);
      onOpenChange(false);
    }
  };

  const handleConfirm = () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No images selected",
        description: "Please select at least one image",
        variant: "destructive"
      });
      return;
    }
    
    onSelectImages(selectedFiles);
    onOpenChange(false);
  };

  const handleClose = () => {
    // Reset to initial selection when closing without confirming
    setSelectedFiles(initialSelectedFiles);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Select Room {multiSelect ? 'Images' : 'Image'}</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[60vh]">
          <FileGrid 
            files={galleryFiles}
            onViewFile={handleFileSelect}
            onShareFile={(file, e) => { e.preventDefault(); }}
            onDeleteFile={(file, e) => { e.preventDefault(); }}
            selectedFiles={selectedFiles}
            showCheckbox={true}
            onSelectFile={handleFileSelect}
          />
        </div>
        <DialogFooter>
          <div className="flex justify-between w-full items-center">
            <div className="text-sm text-gray-500">
              {selectedFiles.length} {selectedFiles.length === 1 ? 'image' : 'images'} selected
            </div>
            <div className="space-x-2">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleConfirm} disabled={selectedFiles.length === 0}>
                {multiSelect ? 'Add Selected Images' : 'Select Image'}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </Dialog>
    </Dialog>
  );
};

export default RoomGalleryDialog;
