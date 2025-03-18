
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
  const gallerySelectId = React.useId();
  
  return (
    <div className="space-y-2">
      <Label htmlFor={gallerySelectId}>Select Gallery</Label>
      <Select
        value={selectedGalleryId}
        onValueChange={onGalleryChange}
        disabled={galleries.length === 0}
      >
        <SelectTrigger 
          id={gallerySelectId} 
          className="w-full"
          aria-label="Select a gallery"
          aria-invalid={galleries.length === 0 ? "true" : "false"}
          aria-describedby={galleries.length === 0 ? `${gallerySelectId}-error` : undefined}
        >
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
        <p id={`${gallerySelectId}-error`} className="text-sm text-muted-foreground">
          No galleries available. Please create a gallery first.
        </p>
      )}
    </div>
  );
};
