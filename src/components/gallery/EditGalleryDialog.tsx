
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Gallery } from '@/models/FileModel';
import { FileDropzone } from '@/components/gallery/FileDropzone';
import { Pencil } from 'lucide-react';

interface EditGalleryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gallery: Gallery | null;
  onUpdateGallery: (gallery: Gallery) => void;
}

export const EditGalleryDialog: React.FC<EditGalleryDialogProps> = ({
  open,
  onOpenChange,
  gallery,
  onUpdateGallery,
}) => {
  const [name, setName] = useState(gallery?.name || '');
  const [description, setDescription] = useState(gallery?.description || '');
  const [coverImage, setCoverImage] = useState<string | undefined>(gallery?.coverImageUrl);

  // Reset form when gallery changes
  React.useEffect(() => {
    if (gallery) {
      setName(gallery.name);
      setDescription(gallery.description || '');
      setCoverImage(gallery.coverImageUrl);
    }
  }, [gallery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!gallery) return;
    
    onUpdateGallery({
      ...gallery,
      name,
      description,
      coverImageUrl: coverImage
    });
    
    onOpenChange(false);
  };

  // Handle image upload
  const handleImageUpload = (imageUrl: string) => {
    setCoverImage(imageUrl);
  };

  if (!gallery) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pencil className="w-5 h-5" />
            Edit Gallery
          </DialogTitle>
          <DialogDescription>
            Update the details of your gallery
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Gallery Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter gallery name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter gallery description"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Cover Image</Label>
            {coverImage ? (
              <div className="relative w-full h-40 mb-2 border rounded-md overflow-hidden">
                <img src={coverImage} alt="Cover preview" className="w-full h-full object-cover" />
                <Button 
                  type="button"
                  variant="destructive" 
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => setCoverImage(undefined)}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <FileDropzone
                onImageUpload={handleImageUpload}
                accept="image/*"
                maxFiles={1}
                className="h-40"
              />
            )}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
