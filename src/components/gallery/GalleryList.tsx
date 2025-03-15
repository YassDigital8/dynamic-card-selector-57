
import React from 'react';
import { Gallery } from '@/models/FileModel';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FolderOpen, Image, FileText, Images, Folder, 
  GalleryHorizontal, GalleryVertical, Library, BookImage 
} from 'lucide-react';
import { formatDate } from '@/lib/date-utils';

interface GalleryListProps {
  galleries: Gallery[];
  onSelectGallery: (gallery: Gallery) => void;
  fileTypes?: Record<string, string[]>; // Map gallery IDs to the file types they contain
}

export const GalleryList: React.FC<GalleryListProps> = ({ 
  galleries, 
  onSelectGallery,
  fileTypes = {} 
}) => {
  const renderGalleryIcon = (gallery: Gallery) => {
    if (gallery.coverImageUrl) {
      return (
        <img 
          src={gallery.coverImageUrl} 
          alt={gallery.name} 
          className="w-full h-full object-cover"
        />
      );
    }

    // Check if we have file type information for this gallery
    const galleryFileTypes = fileTypes[gallery.id] || [];
    
    // Check for mixed content
    const hasPdfs = galleryFileTypes.some(type => type === 'application/pdf');
    const hasImages = galleryFileTypes.some(type => type.startsWith('image/'));
    
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
  const getFileCountIcon = (galleryId: string) => {
    const galleryFileTypes = fileTypes[galleryId] || [];
    
    const hasPdfs = galleryFileTypes.some(type => type === 'application/pdf');
    const hasImages = galleryFileTypes.some(type => type.startsWith('image/'));
    
    if (hasPdfs && hasImages) {
      return <Images className="h-4 w-4" />;
    } else if (hasPdfs) {
      return <FileText className="h-4 w-4" />;
    } else {
      return <Image className="h-4 w-4" />;
    }
  };

  if (galleries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <FolderOpen className="w-16 h-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No galleries yet</h3>
        <p className="text-muted-foreground">Create your first gallery to start uploading files</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {galleries.map((gallery) => (
        <Card 
          key={gallery.id} 
          className="overflow-hidden cursor-pointer transition-all hover:shadow-md"
          onClick={() => onSelectGallery(gallery)}
        >
          <div className="h-40 bg-muted flex items-center justify-center overflow-hidden">
            {gallery.coverImageUrl ? (
              <img 
                src={gallery.coverImageUrl} 
                alt={gallery.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                {renderGalleryIcon(gallery)}
              </div>
            )}
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-1 truncate" title={gallery.name}>
              {gallery.name}
            </h3>
            {gallery.description && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {gallery.description}
              </p>
            )}
            <div className="flex items-center justify-between text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
              <div className="flex items-center gap-1">
                {getFileCountIcon(gallery.id)}
                <span>{gallery.fileCount} files</span>
              </div>
              <span>{formatDate(gallery.createdOn)}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
