
import React from 'react';
import { FileInfo } from '@/models/FileModel';
import { DraggableFileCard } from '../DraggableFileCard';

interface FileGridProps {
  files: FileInfo[];
  onViewFile: (file: FileInfo) => void;
  onShareFile: (file: FileInfo, e: React.MouseEvent) => void;
  onDeleteFile: (file: FileInfo, e: React.MouseEvent) => void;
}

export const FileGrid: React.FC<FileGridProps> = ({
  files,
  onViewFile,
  onShareFile,
  onDeleteFile,
}) => {
  if (files.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">No files to display</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {files.map((file) => (
        <DraggableFileCard
          key={file.id}
          file={file}
          onView={() => onViewFile(file)}
          onShare={(e) => onShareFile(file, e)}
          onDelete={(e) => onDeleteFile(file, e)}
        />
      ))}
    </div>
  );
};
