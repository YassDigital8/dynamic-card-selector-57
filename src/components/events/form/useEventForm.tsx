
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Event, EventImage, EventFormData } from '@/models/EventModel';
import { eventFormSchema, EventFormSchema, DEFAULT_EVENT_IMAGE } from './eventFormSchema';
import { parseEventDate, formatEventDates } from '../utils/dateUtils';

export const useEventForm = (initialData?: Event, onSubmit?: (data: EventFormData) => void) => {
  const [showImageUploadDialog, setShowImageUploadDialog] = useState(false);
  const [eventImages, setEventImages] = useState<EventImage[]>(
    initialData?.images || []
  );
  const [startDate, setStartDate] = useState<Date | undefined>(
    initialData?.date ? parseEventDate(initialData.date).startDate : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    initialData?.date ? parseEventDate(initialData.date).endDate : undefined
  );
  const [hasTime, setHasTime] = useState<boolean>(
    initialData?.hasTime || false
  );

  const form = useForm<EventFormSchema>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialData ? {
      ...initialData,
      date: initialData.date ? 
        { 
          startDate: parseEventDate(initialData.date).startDate, 
          endDate: parseEventDate(initialData.date).endDate,
          displayValue: initialData.date 
        } : 
        { displayValue: '' },
      hasTime: initialData.hasTime || false,
      startTime: initialData.startTime || '',
      endTime: initialData.endTime || '',
    } : {
      title: "",
      description: "",
      date: { displayValue: '' },
      hasTime: false,
      startTime: '',
      endTime: '',
      location: {
        address: "",
        city: "",
        country: "",
      },
      image: DEFAULT_EVENT_IMAGE,
      images: [],
      category: "",
      eventType: undefined,
      rating: 4.5,
      featured: false,
    }
  });

  // Update date display when dates change
  useEffect(() => {
    if (startDate || endDate) {
      const startTime = form.getValues('startTime');
      const endTime = form.getValues('endTime');
      const hasTimeValue = form.getValues('hasTime');
      
      const displayValue = formatEventDates(startDate, endDate, startTime, endTime, hasTimeValue);
      form.setValue('date', {
        startDate,
        endDate,
        displayValue
      });
    }
  }, [startDate, endDate, form]);

  // Update display value when time changes
  useEffect(() => {
    if (startDate) {
      const startTime = form.getValues('startTime');
      const endTime = form.getValues('endTime');
      const hasTimeValue = form.getValues('hasTime');
      
      const displayValue = formatEventDates(startDate, endDate, startTime, endTime, hasTimeValue);
      form.setValue('date.displayValue', displayValue);
    }
  }, [form.watch('startTime'), form.watch('endTime'), form.watch('hasTime'), startDate, endDate, form]);

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

  const handleTimeToggle = (checked: boolean) => {
    setHasTime(checked);
    form.setValue('hasTime', checked);
    if (!checked) {
      form.setValue('startTime', '');
      form.setValue('endTime', '');
    }
  };

  const handleFormSubmit = (data: EventFormSchema) => {
    if (!onSubmit) return;
    
    const formattedData: EventFormData = {
      title: data.title,
      description: data.description,
      date: data.date.displayValue,
      location: {
        address: data.location.address,
        city: data.location.city,
        country: data.location.country,
      },
      image: data.image,
      images: eventImages,
      category: data.category,
      eventType: data.eventType as any,
      rating: data.rating,
      featured: data.featured,
      hasTime: data.hasTime,
      startTime: data.startTime,
      endTime: data.endTime
    };
    
    onSubmit(formattedData);
  };

  return {
    form,
    startDate,
    endDate,
    hasTime,
    eventImages,
    showImageUploadDialog,
    setStartDate,
    setEndDate,
    setShowImageUploadDialog,
    handleAddImage,
    handleRemoveImage,
    handleSelectMultipleImages,
    setMainImage,
    handleTimeToggle,
    handleFormSubmit
  };
};
