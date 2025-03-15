
import React from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { FileInfo } from '@/models/FileModel';
import { useFileSelection } from '@/hooks/upload/useFileSelection';
import { GalleryForm } from '@/components/gallery/GalleryForm';
import { CoverImageSelector } from '@/components/gallery/CoverImageSelector';

interface GalleryDialogContentProps {
  title: string;
  description: string;
  formProps: {
    name: string;
    setName: (name: string) => void;
    description: string;
    setDescription: (description: string) => void;
    onCancel: () => void;
    onSubmit: (e: React.FormEvent) => void;
    submitLabel: string;
    cancelLabel: string;
  };
  coverSelectorProps: {
    coverImage?: string;
    selectedIconName?: string;
    coverImageSource: 'upload' | 'icon' | 'gallery';
    onCoverImageSourceChange: (source: 'upload' | 'icon' | 'gallery') => void;
    onImageUpload: (imageUrl: string) => void;
    onIconSelect: (iconName: string) => void;
    onGalleryImageSelect: (file: FileInfo) => void;
    galleryImageFiles: FileInfo[];
  };
}

export const GalleryDialogContent: React.FC<GalleryDialogContentProps> = ({
  title,
  description,
  formProps,
  coverSelectorProps
}) => {
  const { selectedFile, filePreview, isImage, handleFile } = useFileSelection();

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>
          {description}
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-6 py-4">
        <div className="space-y-4">
          <CoverImageSelector
            coverImage={coverSelectorProps.coverImage}
            selectedIconName={coverSelectorProps.selectedIconName}
            coverImageSource={coverSelectorProps.coverImageSource}
            onCoverImageSourceChange={coverSelectorProps.onCoverImageSourceChange}
            onImageUpload={coverSelectorProps.onImageUpload}
            onIconSelect={coverSelectorProps.onIconSelect}
            onGalleryImageSelect={coverSelectorProps.onGalleryImageSelect}
            selectedFile={selectedFile}
            filePreview={filePreview}
            isImage={isImage}
            handleFile={handleFile}
            galleryImageFiles={coverSelectorProps.galleryImageFiles}
          />

          <GalleryForm
            name={formProps.name}
            setName={formProps.setName}
            description={formProps.description}
            setDescription={formProps.setDescription}
            onCancel={formProps.onCancel}
            onSubmit={formProps.onSubmit}
            submitLabel={formProps.submitLabel}
            cancelLabel={formProps.cancelLabel}
          />
        </div>
      </div>
    </DialogContent>
  );
};
