
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileInfo } from '@/models/FileModel';
import { FileGrid } from '@/components/gallery/file-list/FileGrid';

interface RoomGalleryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  galleryFiles: FileInfo[];
  onSelectImages: (files: FileInfo[]) => void;
  multiSelect?: boolean;
}

const RoomGalleryDialog: React.FC<RoomGalleryDialogProps> = ({ 
  isOpen, 
  onOpenChange, 
  galleryFiles, 
  onSelectImages,
  multiSelect = false
}) => {
  const [selectedFiles, setSelectedFiles] = useState<FileInfo[]>([]);

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
    onSelectImages(selectedFiles);
    onOpenChange(false);
    setSelectedFiles([]);
  };

  const handleClose = () => {
    setSelectedFiles([]);
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
            selectedFiles={multiSelect ? selectedFiles : []}
            showCheckbox={multiSelect}
          />
        </div>
        {multiSelect && (
          <DialogFooter>
            <div className="flex justify-between w-full items-center">
              <div className="text-sm text-gray-500">
                {selectedFiles.length} {selectedFiles.length === 1 ? 'image' : 'images'} selected
              </div>
              <div className="space-x-2">
                <Button variant="outline" onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm} disabled={selectedFiles.length === 0}>
                  Add Selected Images
                </Button>
              </div>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RoomGalleryDialog;
