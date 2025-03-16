
import React from 'react';
import { Gallery, FileInfo } from '@/models/FileModel';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FolderOpen, Image, FileText, Images, Folder, 
  GalleryHorizontal, GalleryVertical, Library, BookImage, Share2
} from 'lucide-react';
import { formatDate } from '@/lib/date-utils';
import { Button } from '@/components/ui/button';
import { useDrop } from '@/hooks/gallery/useDragAndDrop';

interface GalleryCardProps {
  gallery: Gallery;
  onSelectGallery: (gallery: Gallery) => void;
  onMoveFile?: (file: FileInfo, toGalleryId: string) => void;
  onShareGallery: (gallery: Gallery, e: React.MouseEvent) => void;
  fileTypes: string[];
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ 
  gallery, 
  onSelectGallery,
  onMoveFile,
  onShareGallery,
  fileTypes = []
}) => {
  const renderGalleryIcon = () => {
    if (gallery.coverImageUrl) {
      return (
        <img 
          src={gallery.coverImageUrl} 
          alt={gallery.name} 
          className="w-full h-full object-cover"
        />
      );
    }
    
    // Check for mixed content
    const hasPdfs = fileTypes.some(type => type === 'application/pdf');
    const hasImages = fileTypes.some(type => type.startsWith('image/'));
    
    // Mixed content (both PDFs and images)
    if (hasPdfs && hasImages) {
      return <Images className="w-12 h-12 text-muted-foreground" />;
    }
    
    // Only PDFs
    if (hasPdfs && !hasImages) {
      return <FileText className="w-12 h-12 text-muted-foreground" />;
    }
    
    // Only images
    if (hasImages && !hasPdfs) {
      return <Image className="w-12 h-12 text-muted-foreground" />;
    }

    if (gallery.iconName) {
      switch (gallery.iconName) {
        case 'Image':
          return <Image className="w-12 h-12 text-muted-foreground" />;
        case 'Images':
          return <Images className="w-12 h-12 text-muted-foreground" />;
        case 'Folder':
          return <Folder className="w-12 h-12 text-muted-foreground" />;
        case 'GalleryHorizontal':
          return <GalleryHorizontal className="w-12 h-12 text-muted-foreground" />;
        case 'GalleryVertical':
          return <GalleryVertical className="w-12 h-12 text-muted-foreground" />;
        case 'Library':
          return <Library className="w-12 h-12 text-muted-foreground" />;
        case 'BookImage':
          return <BookImage className="w-12 h-12 text-muted-foreground" />;
        case 'FileText':
          return <FileText className="w-12 h-12 text-muted-foreground" />;
        case 'FolderOpen':
        default:
          return <FolderOpen className="w-12 h-12 text-muted-foreground" />;
      }
    }

    return <FolderOpen className="w-12 h-12 text-muted-foreground" />;
  };

  // Helper to determine the icon for the file count indicator
  const getFileCountIcon = () => {
    const hasPdfs = fileTypes.some(type => type === 'application/pdf');
    const hasImages = fileTypes.some(type => type.startsWith('image/'));
    
    if (hasPdfs && hasImages) {
      return <Images className="h-4 w-4" />;
    } else if (hasPdfs) {
      return <FileText className="h-4 w-4" />;
    } else {
      return <Image className="h-4 w-4" />;
    }
  };

  const createGalleryDropHandler = () => {
    return (file: FileInfo) => {
      if (file.galleryId === gallery.id) {
        // File is already in this gallery
        return;
      }
      
      if (onMoveFile) {
        onMoveFile(file, gallery.id);
      }
    };
  };

  const { dropRef, isOver } = useDrop<FileInfo>(createGalleryDropHandler());

  return (
    <Card 
      key={gallery.id} 
      ref={dropRef}
      className={`overflow-hidden cursor-pointer transition-all ${
        isOver ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
      }`}
    >
      <div 
        className={`h-40 bg-muted flex items-center justify-center overflow-hidden ${
          isOver ? 'bg-primary/10' : ''
        }`}
        onClick={() => onSelectGallery(gallery)}
      >
        {gallery.coverImageUrl ? (
          <img 
            src={gallery.coverImageUrl} 
            alt={gallery.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center">
            {renderGalleryIcon()}
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h3 
            className="font-semibold text-lg mb-1 truncate" 
            title={gallery.name}
            onClick={() => onSelectGallery(gallery)}
          >
            {gallery.name}
          </h3>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 -mr-2" 
            onClick={(e) => onShareGallery(gallery, e)}
            title="Share gallery"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        {gallery.description && (
          <p 
            className="text-sm text-muted-foreground mb-3 line-clamp-2"
            onClick={() => onSelectGallery(gallery)}
          >
            {gallery.description}
          </p>
        )}
        <div 
          className="flex items-center justify-between text-xs text-muted-foreground mt-2 pt-2 border-t border-border"
          onClick={() => onSelectGallery(gallery)}
        >
          <div className="flex items-center gap-1">
            {getFileCountIcon()}
            <span>{gallery.fileCount} files</span>
          </div>
          <span>{formatDate(gallery.createdOn)}</span>
        </div>
      </CardContent>
    </Card>
  );
};
