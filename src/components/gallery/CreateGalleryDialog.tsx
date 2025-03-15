
import React from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Gallery } from '@/models/FileModel';
import { useGalleryForm } from '@/hooks/gallery/useGalleryForm';
import { GalleryDialogContent } from '@/components/gallery/GalleryDialogContent';

interface CreateGalleryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateGallery: (gallery: Gallery) => void;
}

export const CreateGalleryDialog: React.FC<CreateGalleryDialogProps> = ({ 
  open, 
  onOpenChange,
  onCreateGallery
}) => {
  // Empty array for gallery files since this is just creating a new gallery
  const galleryImageFiles = [];
  
  const {
    name,
    setName,
    description,
    setDescription,
    isSubmitting,
    coverType,
    setCoverType,
    selectedIconName,
    coverImage,
    handleSubmit,
    handleImageUpload,
    handleIconSelect,
    handleGalleryImageSelect,
    submitLabel,
    cancelLabel
  } = useGalleryForm({
    onComplete: onCreateGallery,
    onCancel: () => onOpenChange(false),
    mode: 'create'
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <GalleryDialogContent
        title="Create New Gallery"
        description="Create a new gallery to organize your files and media"
        formProps={{
          name,
          setName,
          description,
          setDescription,
          onCancel: () => onOpenChange(false),
          onSubmit: handleSubmit,
          submitLabel,
          cancelLabel
        }}
        coverSelectorProps={{
          coverImage,
          selectedIconName,
          coverImageSource: coverType,
          onCoverImageSourceChange: setCoverType,
          onImageUpload: handleImageUpload,
          onIconSelect: handleIconSelect,
          onGalleryImageSelect: handleGalleryImageSelect,
          galleryImageFiles
        }}
      />
    </Dialog>
  );
};
