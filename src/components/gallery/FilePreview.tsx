
import React from 'react';
import { FileInfo } from '@/models/FileModel';
import { FileText, Music, Image, Film, File } from 'lucide-react';

interface FilePreviewProps {
  file: FileInfo;
  size?: 'sm' | 'md' | 'lg';
}

export const FilePreview: React.FC<FilePreviewProps> = ({ file, size = 'md' }) => {
  const getFileIcon = () => {
    const iconSize = size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-16 w-16' : 'h-12 w-12';
    const iconClass = `${iconSize} text-gray-400`;
    
    if (file.type.startsWith('image/')) {
      return <Image className={iconClass} />;
    } else if (file.type.startsWith('video/')) {
      return <Film className={iconClass} />;
    } else if (file.type.startsWith('audio/')) {
      return <Music className={iconClass} />;
    } else if (file.type.includes('pdf')) {
      return <FileText className={iconClass} />;
    } else {
      return <File className={iconClass} />;
    }
  };

  if (file.type.startsWith('image/')) {
    return (
      <img 
        src={file.url} 
        alt={file.metadata?.altText || file.name} 
        className="w-full h-full object-cover"
      />
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-50">
      {getFileIcon()}
    </div>
  );
};
