
import React, { useState, useEffect, useCallback, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  SortControls, 
  FilePreviewDialog, 
  FileGrid,
  useSortedFiles,
  FilterControls
} from './file-list';
import type { SortConfig } from './file-list';
import type { FileInfo } from '@/models/FileModel';
import { ShareDialog } from './ShareDialog';

interface FileListProps {
  files: FileInfo[];
  isLoading?: boolean;
  onViewFile?: (file: FileInfo) => void;
  onShareFile?: (file: FileInfo, e: React.MouseEvent) => void;
  onDeleteFile?: (file: FileInfo, e: React.MouseEvent) => void;
}

const FileList = memo(({ 
  files, 
  isLoading = false, 
  onViewFile,
  onShareFile,
  onDeleteFile
}: FileListProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedFile, setSelectedFile] = useState<FileInfo | null>(null);
  const [previewDialogOpen, setPreviewDialogOpen] = useState<boolean>(false);
  const [shareDialogOpen, setShareDialogOpen] = useState<boolean>(false);
  const [fileToShare, setFileToShare] = useState<FileInfo | null>(null);
  const [searchParams] = useSearchParams();

  // Extract unique file types for the filter dropdown
  const fileTypes = Array.from(new Set(files.map(file => file.type)));

  // Initialize sort config
  const initialSortConfig: SortConfig = { field: 'uploadedOn', direction: 'desc' };
  const { sortedFiles, sortConfig, setSortConfig } = useSortedFiles(files, initialSortConfig);

  useEffect(() => {
    const initialSearchQuery = searchParams.get('search') || '';
    const initialType = searchParams.get('type') || 'all';
    setSearchQuery(initialSearchQuery);
    setSelectedType(initialType);
  }, [searchParams]);

  const handleFileClick = useCallback((file: FileInfo) => {
    if (onViewFile) {
      onViewFile(file);
    } else {
      setSelectedFile(file);
      setPreviewDialogOpen(true);
    }
  }, [onViewFile]);

  const handleShareFile = useCallback((file: FileInfo, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (onShareFile) {
      onShareFile(file, e);
    } else {
      setFileToShare(file);
      setShareDialogOpen(true);
    }
  }, [onShareFile]);

  const handleDeleteFile = useCallback((file: FileInfo, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (onDeleteFile) {
      onDeleteFile(file, e);
    } else {
      console.log('Delete file:', file.name);
    }
  }, [onDeleteFile]);

  // Memoize filtered files to prevent unnecessary re-renders
  const filteredFiles = React.useMemo(() => {
    return sortedFiles.filter((file) => {
      const searchRegex = new RegExp(searchQuery, 'i');
      const nameMatch = searchRegex.test(file.name);
      const typeMatch = selectedType === 'all' ? true : file.type === selectedType;
      return nameMatch && typeMatch;
    });
  }, [sortedFiles, searchQuery, selectedType]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <FilterControls 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          fileTypes={fileTypes}
        />
        <SortControls 
          sortConfig={sortConfig} 
          onSortChange={setSortConfig} 
        />
      </div>

      <FileGrid 
        files={filteredFiles} 
        onViewFile={handleFileClick} 
        onShareFile={handleShareFile}
        onDeleteFile={handleDeleteFile}
      />

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
});

FileList.displayName = 'FileList';

export default FileList;
