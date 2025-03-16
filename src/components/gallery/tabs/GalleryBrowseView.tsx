
import React, { useState, useEffect } from 'react';
import FileList from '../FileList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EmptyGalleryState from '../EmptyGalleryState';
import { FileInfo, Gallery } from '@/models/FileModel';
import { GalleryDropTargets } from '../GalleryDropTargets';
import { useGlobalDragState } from '@/hooks/gallery/useDragAndDrop';

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

  const handleCreateFolderClick = () => {
    navigate('/new-folder');
  };

  const handleViewFile = (file: FileInfo) => {
    if (onViewFile) {
      onViewFile(file);
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
    // Handle share functionality
    console.log('Share file:', file.name);
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
    </div>
  );
};

export default GalleryBrowseView;
