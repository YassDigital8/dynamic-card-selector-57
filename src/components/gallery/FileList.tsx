
import React, { useState, useEffect } from 'react';
import { FileInfo, Gallery } from '@/models/FileModel';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Image, File, Eye, Trash2, Share2, ArrowUpDown, ArrowDownAZ, ArrowDownUp, CalendarDays } from 'lucide-react';
import { formatDate } from '@/lib/date-utils';
import { Button } from '@/components/ui/button';
import { FileDetails } from './FileDetails';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { FilePreview } from './FilePreview';
import { ShareDialog } from './ShareDialog';
import { DraggableFileCard } from './DraggableFileCard';
import { GalleryDropTargets } from './GalleryDropTargets';
import { useGlobalDragState } from '@/hooks/gallery/useDragAndDrop';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

type SortField = 'name' | 'size' | 'type' | 'uploadedOn';
type SortDirection = 'asc' | 'desc';

interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

interface FileListProps {
  files: FileInfo[];
  galleries?: Gallery[];
  galleryFileTypes?: Record<string, string[]>;
  currentGalleryId?: string;
  onViewFile?: (file: FileInfo) => void;
  onDeleteFile?: (file: FileInfo) => void;
  onMoveFile?: (file: FileInfo, newGalleryId: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const FileList: React.FC<FileListProps> = ({ 
  files, 
  galleries = [],
  galleryFileTypes = {},
  currentGalleryId = '',
  onViewFile, 
  onDeleteFile,
  onMoveFile,
  searchQuery = '',
  onSearchChange
}) => {
  const [previewFile, setPreviewFile] = useState<FileInfo | null>(null);
  const [shareFile, setShareFile] = useState<FileInfo | null>(null);
  const { isDragging, draggedItem } = useGlobalDragState();
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: 'uploadedOn', direction: 'desc' });
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  
  // Update local search when prop changes
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);
  
  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };
  
  // Sort files based on current sort configuration
  const sortedFiles = [...files].sort((a, b) => {
    const direction = sortConfig.direction === 'asc' ? 1 : -1;
    
    switch (sortConfig.field) {
      case 'name':
        return (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1) * direction;
      case 'size':
        return (a.size - b.size) * direction;
      case 'type':
        return (a.type.toLowerCase() > b.type.toLowerCase() ? 1 : -1) * direction;
      case 'uploadedOn':
        return (new Date(a.uploadedOn).getTime() - new Date(b.uploadedOn).getTime()) * direction;
      default:
        return 0;
    }
  });
  
  // Change sort field and direction
  const handleSort = (field: SortField) => {
    setSortConfig(current => ({
      field,
      direction: current.field === field && current.direction === 'desc' ? 'asc' : 'desc'
    }));
  };
  
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
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 justify-between">
          <div className="w-full sm:max-w-sm">
            <Input
              placeholder="Search files..."
              value={localSearchQuery}
              onChange={handleSearchChange}
              className="px-4 h-10"
            />
          </div>
          
          <div className="flex-grow flex items-center justify-end space-x-4">
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground whitespace-nowrap mr-2">Sort by:</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-10">
                    {sortConfig.field === 'name' && <ArrowDownAZ className="h-4 w-4 mr-2" />}
                    {sortConfig.field === 'size' && <ArrowDownUp className="h-4 w-4 mr-2" />}
                    {sortConfig.field === 'type' && <File className="h-4 w-4 mr-2" />}
                    {sortConfig.field === 'uploadedOn' && <CalendarDays className="h-4 w-4 mr-2" />}
                    {sortConfig.field.charAt(0).toUpperCase() + sortConfig.field.slice(1)}
                    <ArrowUpDown className={`h-4 w-4 ml-2 ${sortConfig.direction === 'asc' ? 'rotate-180' : ''}`} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleSort('name')}>
                    <ArrowDownAZ className="h-4 w-4 mr-2" />
                    Name
                    {sortConfig.field === 'name' && (
                      <ArrowUpDown className={`h-4 w-4 ml-2 ${sortConfig.direction === 'asc' ? 'rotate-180' : ''}`} />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort('size')}>
                    <ArrowDownUp className="h-4 w-4 mr-2" />
                    Size
                    {sortConfig.field === 'size' && (
                      <ArrowUpDown className={`h-4 w-4 ml-2 ${sortConfig.direction === 'asc' ? 'rotate-180' : ''}`} />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort('type')}>
                    <File className="h-4 w-4 mr-2" />
                    Type
                    {sortConfig.field === 'type' && (
                      <ArrowUpDown className={`h-4 w-4 ml-2 ${sortConfig.direction === 'asc' ? 'rotate-180' : ''}`} />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort('uploadedOn')}>
                    <CalendarDays className="h-4 w-4 mr-2" />
                    Upload Date
                    {sortConfig.field === 'uploadedOn' && (
                      <ArrowUpDown className={`h-4 w-4 ml-2 ${sortConfig.direction === 'asc' ? 'rotate-180' : ''}`} />
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedFiles.map((file) => (
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
