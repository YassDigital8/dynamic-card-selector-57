
import React from 'react';
import { Gallery, FileInfo } from '@/models/FileModel';
import { Card } from '@/components/ui/card';
import { FolderOpen, Image, FileText, Images } from 'lucide-react';
import { useDrop } from '@/hooks/gallery/useDragAndDrop';
import { useToast } from '@/hooks/use-toast';

interface GalleryDropTargetsProps {
  galleries: Gallery[];
  currentGalleryId: string;
  onMoveFile: (file: FileInfo, toGalleryId: string) => void;
  fileTypes: Record<string, string[]>;
}

export const GalleryDropTargets: React.FC<GalleryDropTargetsProps> = ({
  galleries,
  currentGalleryId,
  onMoveFile,
  fileTypes
}) => {
  const { toast } = useToast();

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
      return <Images className="w-10 h-10 text-muted-foreground" />;
    }
    
    // Only PDFs
    if (hasPdfs && !hasImages) {
      return <FileText className="w-10 h-10 text-muted-foreground" />;
    }
    
    // Only images
    if (hasImages && !hasPdfs) {
      return <Image className="w-10 h-10 text-muted-foreground" />;
    }

    return <FolderOpen className="w-10 h-10 text-muted-foreground" />;
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-background/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border">
      <h3 className="font-semibold text-center mb-4">Drop into gallery:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto p-2">
        {galleries
          .filter(gallery => gallery.id !== currentGalleryId) // Don't show current gallery
          .map(gallery => {
            const createDropHandler = (gallery: Gallery) => {
              return (file: FileInfo) => {
                if (file.galleryId === gallery.id) {
                  return; // File is already in this gallery
                }
                
                onMoveFile(file, gallery.id);
                toast({
                  description: `File moved to "${gallery.name}" gallery`,
                });
              };
            };

            const { dropRef, isOver } = useDrop<FileInfo>(createDropHandler(gallery));
            
            return (
              <Card 
                key={gallery.id} 
                ref={dropRef}
                className={`overflow-hidden cursor-pointer transition-all flex items-center p-3 gap-3 ${
                  isOver ? 'ring-2 ring-primary shadow-lg bg-primary/10' : 'hover:bg-accent'
                }`}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-muted rounded-md flex items-center justify-center overflow-hidden">
                  {renderGalleryIcon(gallery)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate" title={gallery.name}>
                    {gallery.name}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {gallery.fileCount} files
                  </p>
                </div>
              </Card>
            );
          })}
      </div>
    </div>
  );
};
