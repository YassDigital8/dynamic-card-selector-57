
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Pencil } from 'lucide-react';
import { Gallery, FileInfo } from '@/models/FileModel';
import { useFileSelection } from '@/hooks/upload/useFileSelection';
import { useToast } from '@/hooks/use-toast';
import { GalleryForm } from '@/components/gallery/GalleryForm';
import { CoverImageSelector } from '@/components/gallery/CoverImageSelector';

interface EditGalleryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gallery: Gallery | null;
  onUpdateGallery: (gallery: Gallery) => void;
  files?: FileInfo[];
}

export const EditGalleryDialog: React.FC<EditGalleryDialogProps> = ({
  open,
  onOpenChange,
  gallery,
  onUpdateGallery,
  files = [],
}) => {
  const [name, setName] = useState(gallery?.name || '');
  const [description, setDescription] = useState(gallery?.description || '');
  const [coverImage, setCoverImage] = useState<string | undefined>(gallery?.coverImageUrl);
  const [selectedIconName, setSelectedIconName] = useState<string | undefined>(gallery?.iconName);
  const [coverImageSource, setCoverImageSource] = useState<'upload' | 'icon' | 'gallery'>(
    gallery?.coverImageUrl ? 'upload' : gallery?.iconName ? 'icon' : 'upload'
  );
  
  const { selectedFile, filePreview, isImage, handleFile, resetFileSelection } = useFileSelection();
  const { toast } = useToast();

  // Reset form when gallery changes
  useEffect(() => {
    if (gallery) {
      setName(gallery.name);
      setDescription(gallery.description || '');
      setCoverImage(gallery.coverImageUrl);
      setSelectedIconName(gallery.iconName);
      
      // Determine initial tab based on gallery data
      if (gallery.coverImageUrl) {
        setCoverImageSource('upload');
      } else if (gallery.iconName) {
        setCoverImageSource('icon');
      } else {
        setCoverImageSource('upload');
      }
      
      resetFileSelection();
    }
  }, [gallery, resetFileSelection]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!gallery) return;
    
    if (!name.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gallery name is required",
      });
      return;
    }
    
    // Create updated gallery object based on the selected source
    const updatedGallery = {
      ...gallery,
      name: name.trim(),
      description: description.trim() || undefined,
    };
    
    if (coverImageSource === 'upload' || coverImageSource === 'gallery') {
      updatedGallery.coverImageUrl = coverImage;
      updatedGallery.iconName = undefined;
    } else if (coverImageSource === 'icon') {
      updatedGallery.iconName = selectedIconName;
      updatedGallery.coverImageUrl = undefined;
    }
    
    onUpdateGallery(updatedGallery);
    
    toast({
      title: "Gallery updated",
      description: `"${name}" gallery has been updated successfully.`,
    });
    
    onOpenChange(false);
  };

  // Handle image upload
  const handleImageUpload = (imageUrl: string) => {
    setCoverImage(imageUrl);
    setSelectedIconName(undefined);
    setCoverImageSource('upload');
  };
  
  // Handle icon selection
  const handleIconSelect = (iconName: string) => {
    setSelectedIconName(iconName);
    setCoverImage(undefined);
    setCoverImageSource('icon');
  };
  
  // Handle gallery image selection
  const handleGalleryImageSelect = (file: FileInfo) => {
    setCoverImage(file.url);
    setSelectedIconName(undefined);
    setCoverImageSource('gallery');
  };

  if (!gallery) return null;

  // Filter only image files
  const galleryImageFiles = files.filter(file => file.type.startsWith('image/'));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pencil className="w-5 h-5" />
            Edit Gallery
          </DialogTitle>
          <DialogDescription>
            Update the details of your gallery
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <GalleryForm
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            onCancel={() => onOpenChange(false)}
            onSubmit={handleSubmit}
          />
          
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Cover Image
            </label>
            
            <CoverImageSelector
              coverImage={coverImage}
              selectedIconName={selectedIconName}
              coverImageSource={coverImageSource}
              onCoverImageSourceChange={setCoverImageSource}
              onImageUpload={handleImageUpload}
              onIconSelect={handleIconSelect}
              onGalleryImageSelect={handleGalleryImageSelect}
              selectedFile={selectedFile}
              filePreview={filePreview}
              isImage={isImage}
              handleFile={handleFile}
              galleryImageFiles={galleryImageFiles}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
