
import React, { useState } from 'react';
import { Gallery, FileInfo } from '@/models/FileModel';
import { ShareDialog } from './ShareDialog';
import { useToast } from '@/hooks/use-toast';
import { GalleryCard } from './GalleryCard';
import EmptyGalleryState from './EmptyGalleryState';

interface GalleryListProps {
  galleries: Gallery[];
  onSelectGallery: (gallery: Gallery) => void;
  onMoveFile?: (file: FileInfo, toGalleryId: string) => void;
  fileTypes?: Record<string, string[]>; // Map gallery IDs to the file types they contain
}

export const GalleryList: React.FC<GalleryListProps> = ({ 
  galleries, 
  onSelectGallery,
  onMoveFile,
  fileTypes = {} 
}) => {
  const [galleryToShare, setGalleryToShare] = useState<Gallery | null>(null);
  const { toast } = useToast();

  const handleShareGallery = (gallery: Gallery, e: React.MouseEvent) => {
    e.stopPropagation();
    setGalleryToShare(gallery);
  };

  const handleMoveFile = (file: FileInfo, toGalleryId: string) => {
    if (onMoveFile) {
      onMoveFile(file, toGalleryId);
      toast({
        description: `File moved to "${galleries.find(g => g.id === toGalleryId)?.name}" gallery`,
      });
    }
  };

  if (galleries.length === 0) {
    return <EmptyGalleryState />;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {galleries.map((gallery) => (
          <GalleryCard
            key={gallery.id}
            gallery={gallery}
            onSelectGallery={onSelectGallery}
            onMoveFile={handleMoveFile}
            onShareGallery={handleShareGallery}
            fileTypes={fileTypes[gallery.id] || []}
          />
        ))}
      </div>

      {/* Share Gallery Dialog */}
      <ShareDialog
        open={galleryToShare !== null}
        onOpenChange={(open) => !open && setGalleryToShare(null)}
        item={galleryToShare}
        itemType="gallery"
      />
    </>
  );
};
