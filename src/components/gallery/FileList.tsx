
import React from 'react';
import { FileInfo } from '@/models/FileModel';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Image, FileImage, File } from 'lucide-react';
import { formatDate } from '@/lib/date-utils';

interface FileListProps {
  files: FileInfo[];
  onViewFile?: (file: FileInfo) => void;
}

export const FileList: React.FC<FileListProps> = ({ files, onViewFile }) => {
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
        <Card 
          key={file.id} 
          className={`overflow-hidden transition-all ${onViewFile ? 'cursor-pointer hover:shadow-md' : ''}`}
          onClick={() => onViewFile && onViewFile(file)}
        >
          <div className="h-40 bg-muted flex items-center justify-center overflow-hidden">
            {file.type.startsWith('image/') ? (
              <img 
                src={file.url} 
                alt={file.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                {getFileIcon(file.type)}
                <span className="text-sm text-muted-foreground mt-2">{file.type.split('/')[1].toUpperCase()}</span>
              </div>
            )}
          </div>
          <CardContent className="p-4">
            <h3 className="font-medium text-md mb-1 truncate" title={file.name}>
              {file.name}
            </h3>
            <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
              <span>{formatFileSize(file.size)}</span>
              <span>{formatDate(file.uploadedOn)}</span>
            </div>
            {file.metadata?.title && (
              <p className="text-sm mt-2 truncate" title={file.metadata.title}>
                {file.metadata.title}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
