
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { EventImage } from '@/models/EventModel';
import { DEFAULT_EVENT_IMAGE } from '../eventFormSchema';

export const useEventImages = (form: UseFormReturn<any>, initialImages: EventImage[] = []) => {
  const [showImageUploadDialog, setShowImageUploadDialog] = useState(false);
  const [eventImages, setEventImages] = useState<EventImage[]>(initialImages);

  const handleAddImage = (imageUrl: string, metadata?: any) => {
    const newImage: EventImage = {
      url: imageUrl,
      id: Date.now().toString(),
      description: metadata?.description || '',
      metadata: {
        title: metadata?.title || '',
        altText: metadata?.altText || '',
        caption: metadata?.caption || '',
      }
    };

    const updatedImages = [...eventImages, newImage];
    setEventImages(updatedImages);
    form.setValue('images', updatedImages);

    if (updatedImages.length === 1) {
      form.setValue('image', imageUrl);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...eventImages];
    updatedImages.splice(index, 1);
    setEventImages(updatedImages);
    form.setValue('images', updatedImages);

    if (updatedImages.length > 0 && form.getValues('image') === eventImages[index].url) {
      form.setValue('image', updatedImages[0].url);
    } else if (updatedImages.length === 0) {
      form.setValue('image', DEFAULT_EVENT_IMAGE);
    }
  };

  const handleSelectMultipleImages = (files: any[]) => {
    const newImages: EventImage[] = files.map(file => ({
      url: file.url,
      id: file.id,
      description: file.metadata?.description || '',
      metadata: {
        title: file.metadata?.title || '',
        altText: file.metadata?.altText || '',
        caption: file.metadata?.caption || '',
      }
    }));

    const updatedImages = [...eventImages, ...newImages];
    setEventImages(updatedImages);
    form.setValue('images', updatedImages);

    if (eventImages.length === 0 && newImages.length > 0) {
      form.setValue('image', newImages[0].url);
    }
  };

  const setMainImage = (url: string) => {
    form.setValue('image', url);
  };

  return {
    eventImages,
    showImageUploadDialog,
    setShowImageUploadDialog,
    handleAddImage,
    handleRemoveImage,
    handleSelectMultipleImages,
    setMainImage
  };
};
