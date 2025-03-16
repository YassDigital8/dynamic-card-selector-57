
import React, { useState, useEffect } from 'react';
import { FileInfo, Gallery } from '@/models/FileModel';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Image, File, Eye, Trash2, Share2 } from 'lucide-react';
import { formatDate } from '@/lib/date-utils';
import { Button } from '@/components/ui/button';
import { FileDetails } from './FileDetails';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { FilePreview } from './FilePreview';
import { ShareDialog } from './ShareDialog';
import { DraggableFileCard } from './DraggableFileCard';
import { GalleryDropTargets } from './GalleryDropTargets';
import { useGlobalDragState } from '@/hooks/gallery/useDragAndDrop';

interface FileListProps {
  files: FileInfo[];
  galleries?: Gallery[];
  galleryFileTypes?: Record<string, string[]>;
  currentGalleryId?: string;
  onViewFile?: (file: FileInfo) => void;
  onDeleteFile?: (file: FileInfo) => void;
  onMoveFile?: (file: FileInfo, newGalleryId: string) => void;
}

export const FileList: React.FC<FileListProps> = ({ 
  files, 
  galleries = [],
  galleryFileTypes = {},
  currentGalleryId = '',
  onViewFile, 
  onDeleteFile,
  onMoveFile 
}) => {
  const [previewFile, setPreviewFile] = useState<FileInfo | null>(null);
  const [shareFile, setShareFile] = useState<FileInfo | null>(null);
  const { isDragging, draggedItem } = useGlobalDragState();
  
  // Ensure drag state is properly reflected with proper dependencies
  const showDropTargets = isDragging && draggedItem && galleries.length > 1;
  
  // Force component to re-render when drag state changes
  useEffect(() => {
    // This effect runs whenever isDragging or draggedItem changes
    // It ensures the component re-renders when the drag state changes
  }, [isDragging, draggedItem]);
  
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <Image className="h-10 w-10 text-muted-foreground" />;
    } else if (fileType === 'application/pdf') {
      return <FileText className="h-10 w-10 text-muted-foreground" />;
    } else {
      return <File className="h-10 w-10 text-muted-foreground" />;
    }
  };

  const formatFileSize = (sizeInKB: number) => {
    if (sizeInKB < 1024) {
      return `${sizeInKB} KB`;
    } else {
      return `${(sizeInKB / 1024).toFixed(2)} MB`;
    }
  };

  const handleViewFile = (file: FileInfo) => {
    setPreviewFile(file);
    if (onViewFile) onViewFile(file);
  };

  const closePreview = () => {
    setPreviewFile(null);
  };

  const handleShareFile = (file: FileInfo, e: React.MouseEvent) => {
    e.stopPropagation();
    setShareFile(file);
  };

  const handleDeleteFile = (file: FileInfo, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDeleteFile) onDeleteFile(file);
  };

  if (files.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">No files to display</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {files.map((file) => (
          <DraggableFileCard
            key={file.id}
            file={file}
            onView={() => handleViewFile(file)}
            onShare={(e) => handleShareFile(file, e)}
            onDelete={(e) => handleDeleteFile(file, e)}
          />
        ))}
      </div>

      {/* Gallery Drop Targets - Shows when dragging */}
      {showDropTargets && onMoveFile && (
        <GalleryDropTargets
          galleries={galleries}
          currentGalleryId={currentGalleryId}
          onMoveFile={onMoveFile}
          fileTypes={galleryFileTypes}
        />
      )}

      {/* File Preview Dialog */}
      <Dialog open={previewFile !== null} onOpenChange={(open) => !open && closePreview()}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          {previewFile && (
            <div className="space-y-4">
              <DialogTitle className="text-xl font-semibold">
                {previewFile.metadata?.title || previewFile.name}
              </DialogTitle>
              
              <div className="bg-muted rounded-md max-h-[50vh] flex items-center justify-center overflow-hidden">
                <FilePreview file={previewFile} size="lg" />
              </div>
              
              <FileDetails file={previewFile} />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <ShareDialog
        open={shareFile !== null}
        onOpenChange={(open) => !open && setShareFile(null)}
        item={shareFile}
        itemType="file"
      />
    </>
  );
};
