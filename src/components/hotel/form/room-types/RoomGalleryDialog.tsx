
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileInfo } from '@/models/FileModel';
import { FileGrid } from '@/components/gallery/file-list/FileGrid';

interface RoomGalleryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  galleryFiles: FileInfo[];
  onSelectImage: (file: FileInfo) => void;
}

const RoomGalleryDialog: React.FC<RoomGalleryDialogProps> = ({ 
  isOpen, 
  onOpenChange, 
  galleryFiles, 
  onSelectImage 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Select Room Image</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[60vh]">
          <FileGrid 
            files={galleryFiles}
            onViewFile={onSelectImage}
            onShareFile={(file, e) => { e.preventDefault(); }}
            onDeleteFile={(file, e) => { e.preventDefault(); }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomGalleryDialog;
