
import React, { useState, useEffect } from 'react';
import { FileInfo, Gallery } from '@/models/FileModel';
import { useGlobalDragState } from '@/hooks/gallery/useDragAndDrop';
import { GalleryDropTargets } from './GalleryDropTargets';
import { ShareDialog } from './ShareDialog';
import { 
  SortControls, 
  FilePreviewDialog, 
  FileGrid, 
  useSortedFiles,
  FilterControls,
  FileTypeFilter
} from './file-list';

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
  const [sortConfig, setSortConfig] = useState<{ field: 'name' | 'size' | 'type' | 'uploadedOn', direction: 'asc' | 'desc' }>({ 
    field: 'uploadedOn', 
    direction: 'desc' 
  });
  const [fileTypeFilter, setFileTypeFilter] = useState('all');
  
  // Define file type filters
  const fileTypeFilters: FileTypeFilter[] = [
    { type: 'image/', label: 'Images' },
    { type: 'application/pdf', label: 'PDF Documents' },
    { type: 'video/', label: 'Videos' },
    { type: 'audio/', label: 'Audio' },
  ];
  
  // Filter files based on type
  const filteredFiles = files.filter(file => {
    return fileTypeFilter === 'all' || file.type.startsWith(fileTypeFilter);
  });
  
  // Sort files based on current sort configuration
  const sortedFiles = useSortedFiles(filteredFiles, sortConfig);
  
  // Change sort field and direction
  const handleSort = (field: 'name' | 'size' | 'type' | 'uploadedOn') => {
    setSortConfig(current => ({
      field,
      direction: current.field === field && current.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFileTypeFilter('all');
  };
  
  // Ensure drag state is properly reflected with proper dependencies
  const showDropTargets = isDragging && draggedItem && galleries.length > 1;
  
  // Force component to re-render when drag state changes
  useEffect(() => {
    // This effect runs whenever isDragging or draggedItem changes
    // It ensures the component re-renders when the drag state changes
  }, [isDragging, draggedItem]);

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
      <div className="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <FilterControls
          selectedType={fileTypeFilter}
          onTypeChange={setFileTypeFilter}
          onClearFilters={handleClearFilters}
          fileTypes={fileTypeFilters}
          hasActiveFilters={fileTypeFilter !== 'all'}
        />
        <SortControls sortConfig={sortConfig} onSortChange={handleSort} />
      </div>

      <FileGrid 
        files={sortedFiles}
        onViewFile={handleViewFile}
        onShareFile={handleShareFile}
        onDeleteFile={handleDeleteFile}
      />

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
      <FilePreviewDialog file={previewFile} onClose={closePreview} />

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
