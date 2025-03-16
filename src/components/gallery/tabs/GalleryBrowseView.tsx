
import React, { useState } from 'react';
import FileList from '../FileList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EmptyGalleryState from '../EmptyGalleryState';
import { FileInfo, Gallery } from '@/models/FileModel';
import { GalleryDropTargets } from '../GalleryDropTargets';
import { useGlobalDragState } from '@/hooks/gallery/useDragAndDrop';
import { ShareDialog } from '../ShareDialog';
import { FilePreviewDialog } from '../file-list/FilePreviewDialog';

interface GalleryBrowseViewProps {
  onOpenUploadDialog: () => void;
  files?: FileInfo[];
  selectedGallery?: Gallery;
  onBackToGalleries?: () => void;
  onAddFiles?: () => void;
  galleries?: Gallery[];
  galleryFileTypes?: Record<string, string[]>;
  onViewFile?: (file: FileInfo) => void;
  onDeleteFile?: (file: FileInfo) => void;
  onMoveFile?: (file: FileInfo, toGalleryId: string) => void;
  onUpdateGallery?: (gallery: Gallery) => void;
}

const GalleryBrowseView: React.FC<GalleryBrowseViewProps> = ({ 
  onOpenUploadDialog,
  files = [],
  selectedGallery,
  onBackToGalleries,
  onAddFiles,
  galleries = [],
  galleryFileTypes = {},
  onViewFile,
  onDeleteFile,
  onMoveFile,
  onUpdateGallery
}) => {
  const navigate = useNavigate();
  const { isDragging } = useGlobalDragState();
  const [fileToShare, setFileToShare] = useState<FileInfo | null>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileInfo | null>(null);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);

  const handleCreateFolderClick = () => {
    navigate('/new-folder');
  };

  const handleViewFile = (file: FileInfo) => {
    if (onViewFile) {
      onViewFile(file);
    } else {
      setSelectedFile(file);
      setPreviewDialogOpen(true);
    }
  };

  const handleDeleteFile = (file: FileInfo, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDeleteFile) {
      onDeleteFile(file);
    }
  };

  const handleShareFile = (file: FileInfo, e: React.MouseEvent) => {
    e.stopPropagation();
    setFileToShare(file);
    setShareDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={onOpenUploadDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Upload
          </Button>
          <Button variant="secondary" onClick={handleCreateFolderClick}>
            Create Folder
          </Button>
        </div>
      </div>

      {files.length === 0 ? (
        <EmptyGalleryState onOpenUploadDialog={onOpenUploadDialog} />
      ) : (
        <FileList 
          files={files} 
          onViewFile={handleViewFile}
          onShareFile={handleShareFile}
          onDeleteFile={handleDeleteFile}
        />
      )}

      {/* Show gallery drop targets when dragging */}
      {isDragging && selectedGallery && (
        <GalleryDropTargets
          galleries={galleries}
          currentGalleryId={selectedGallery.id}
          onMoveFile={onMoveFile || (() => {})}
          fileTypes={galleryFileTypes}
        />
      )}
      
      {/* File Preview Dialog */}
      <FilePreviewDialog
        file={selectedFile}
        open={previewDialogOpen}
        onOpenChange={setPreviewDialogOpen}
      />
      
      {/* Share Dialog */}
      <ShareDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        item={fileToShare}
        itemType="file"
      />
    </div>
  );
};

export default GalleryBrowseView;
