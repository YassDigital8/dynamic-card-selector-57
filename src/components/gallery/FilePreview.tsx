
import React from 'react';
import { FileInfo } from '@/models/FileModel';
import { FileText, Music, Image, Film, FileType, File, FileCode, FilePdf } from 'lucide-react';

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
      return <FilePdf className={iconClass} />;
    } else if (file.type.includes('text/')) {
      return <FileText className={iconClass} />;
    } else if (file.type.includes('application/json') || file.type.includes('application/xml')) {
      return <FileCode className={iconClass} />;
    } else {
      return <File className={iconClass} />;
    }
  };

  // For images, return the actual image
  if (file.type.startsWith('image/')) {
    return (
      <img 
        src={file.url} 
        alt={file.metadata?.altText || file.name} 
        className="w-full h-full object-cover"
      />
    );
  }

  // For PDFs, use an embed element if we have a URL
  if (file.type.includes('pdf') && file.url) {
    // For security reasons, we'll use an object tag instead of iframe
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <FilePdf className="h-16 w-16 text-red-500 mb-2" />
          <span className="text-sm text-gray-500">PDF Document</span>
        </div>
      </div>
    );
  }

  // For all other types, show an appropriate icon
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-50 py-8">
      {getFileIcon()}
      <span className="mt-2 text-xs text-gray-500">{file.type.split('/')[1]?.toUpperCase() || 'Document'}</span>
    </div>
  );
};
