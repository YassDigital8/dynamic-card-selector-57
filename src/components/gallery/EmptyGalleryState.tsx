
import React from 'react';
import { FolderOpen } from 'lucide-react';

interface EmptyGalleryStateProps {
  onOpenUploadDialog?: () => void;
}

const EmptyGalleryState: React.FC<EmptyGalleryStateProps> = ({ onOpenUploadDialog }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <FolderOpen className="w-16 h-16 text-muted-foreground mb-4" />
      <h3 className="text-xl font-medium mb-2">No files yet</h3>
      <p className="text-muted-foreground">Upload files to get started</p>
    </div>
  );
};

export default EmptyGalleryState;
