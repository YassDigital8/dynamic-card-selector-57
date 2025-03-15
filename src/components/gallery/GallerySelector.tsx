
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Gallery } from '@/models/FileModel';

interface GallerySelectorProps {
  galleries: Gallery[];
  selectedGalleryId: string;
  onGalleryChange: (galleryId: string) => void;
}

export const GallerySelector: React.FC<GallerySelectorProps> = ({
  galleries,
  selectedGalleryId,
  onGalleryChange
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="gallery-select">Select Gallery</Label>
      <Select
        value={selectedGalleryId}
        onValueChange={onGalleryChange}
        disabled={galleries.length === 0}
      >
        <SelectTrigger id="gallery-select" className="w-full">
          <SelectValue placeholder="Select a gallery" />
        </SelectTrigger>
        <SelectContent>
          {galleries.map((gallery) => (
            <SelectItem key={gallery.id} value={gallery.id}>
              {gallery.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {galleries.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No galleries available. Please create a gallery first.
        </p>
      )}
    </div>
  );
};
