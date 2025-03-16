
import React, { useState, useEffect } from 'react';
import FileList from '../FileList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EmptyGalleryState from '../EmptyGalleryState';
import { FilterControls } from '../file-list';
import { FileInfo, Gallery } from '@/models/FileModel';

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
  galleries,
  galleryFileTypes,
  onViewFile,
  onDeleteFile,
  onMoveFile,
  onUpdateGallery
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const navigate = useNavigate();

  const handleCreateFolderClick = () => {
    navigate('/new-folder');
  };

  const filteredFiles = files.filter(file => {
    const searchRegex = new RegExp(searchQuery, 'i');
    const nameMatches = searchRegex.test(file.name);
    const typeMatches = selectedType ? file.type === selectedType : true;
    return nameMatches && typeMatches;
  });

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
        <FileList files={filteredFiles} />
      )}
    </div>
  );
};

export default GalleryBrowseView;
