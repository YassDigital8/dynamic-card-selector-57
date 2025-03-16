
import React, { useState, useEffect } from 'react';
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

interface FileListProps {
  files: FileInfo[];
  isLoading?: boolean;
}

const FileList = ({ files, isLoading = false }: FileListProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<FileInfo | null>(null);
  const [previewDialogOpen, setPreviewDialogOpen] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  // Initialize sort config
  const initialSortConfig: SortConfig = { field: 'uploadedOn', direction: 'desc' };
  const { sortedFiles, sortConfig, setSortConfig } = useSortedFiles(files, initialSortConfig);

  useEffect(() => {
    const initialSearchQuery = searchParams.get('search') || '';
    const initialType = searchParams.get('type') || '';
    setSearchQuery(initialSearchQuery);
    setSelectedType(initialType);
  }, [searchParams]);

  const handleFileClick = (file: FileInfo) => {
    setSelectedFile(file);
    setPreviewDialogOpen(true);
  };

  const handleShareFile = (file: FileInfo, e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle share logic
    console.log('Share file:', file.name);
  };

  const handleDeleteFile = (file: FileInfo, e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle delete logic
    console.log('Delete file:', file.name);
  };

  const filteredFiles = sortedFiles.filter((file) => {
    const searchRegex = new RegExp(searchQuery, 'i');
    const nameMatch = searchRegex.test(file.name);
    const typeMatch = selectedType ? file.type === selectedType : true;
    return nameMatch && typeMatch;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <FilterControls 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          selectedType={selectedType}
          setSelectedType={setSelectedType}
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

      <FilePreviewDialog
        file={selectedFile}
        open={previewDialogOpen}
        onOpenChange={setPreviewDialogOpen}
      />
    </div>
  );
};

export default FileList;
