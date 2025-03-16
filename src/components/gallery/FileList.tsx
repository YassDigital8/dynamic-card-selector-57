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
import type { FileModel } from '@/models/FileModel';

interface FileListProps {
  files: FileModel[];
  isLoading?: boolean;
}

const FileList = ({ files, isLoading = false }: FileListProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<FileModel | null>(null);
  const [previewDialogOpen, setPreviewDialogOpen] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  // Use the custom hook for sorting
  const { sortedFiles, sortConfig, setSortConfig } = useSortedFiles(files);

  useEffect(() => {
    const initialSearchQuery = searchParams.get('search') || '';
    const initialType = searchParams.get('type') || '';
    setSearchQuery(initialSearchQuery);
    setSelectedType(initialType);
  }, [searchParams]);

  const handleFileClick = (file: FileModel) => {
    setSelectedFile(file);
    setPreviewDialogOpen(true);
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
        <SortControls sortConfig={sortConfig} setSortConfig={setSortConfig} />
      </div>

      <FileGrid 
        files={filteredFiles} 
        isLoading={isLoading} 
        onFileClick={handleFileClick} 
      />

      <FilePreviewDialog
        isOpen={previewDialogOpen}
        onClose={() => setPreviewDialogOpen(false)}
        file={selectedFile}
      />
    </div>
  );
};

export default FileList;
