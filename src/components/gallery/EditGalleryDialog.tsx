
import React from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Gallery, FileInfo } from '@/models/FileModel';
import { useGalleryForm } from '@/hooks/gallery/useGalleryForm';
import { GalleryDialogContent } from '@/components/gallery/GalleryDialogContent';

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
  // Filter only image files
  const galleryImageFiles = files.filter(file => file.type.startsWith('image/'));

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
    onComplete: onUpdateGallery,
    onCancel: () => onOpenChange(false),
    initialData: gallery || {},
    mode: 'edit'
  });

  if (!gallery) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <GalleryDialogContent
        title="Edit Gallery"
        description="Update the details of your gallery"
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
