
import React from 'react';
import { FolderOpen } from 'lucide-react';

export const EmptyGalleryState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <FolderOpen className="w-16 h-16 text-muted-foreground mb-4" />
      <h3 className="text-xl font-medium mb-2">No galleries yet</h3>
      <p className="text-muted-foreground">Create your first gallery to start uploading files</p>
    </div>
  );
};
