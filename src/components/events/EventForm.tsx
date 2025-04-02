import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Event, EventFormData, EventImage } from '@/models/EventModel';
import { Save, X } from 'lucide-react';
import { ImageUploadDialog } from '@/components/hotel/form/shared';
import { FileInfo } from '@/models/FileModel';
import { eventFormSchema, EventFormSchema, categories, DEFAULT_EVENT_IMAGE } from './form/eventFormSchema';
import { parseEventDate, formatEventDates } from './utils/dateUtils';
import EventImageGallery from './form/EventImageGallery';
import EventBasicInfoFields from './form/EventBasicInfoFields';
import EventDateTimePicker from './form/EventDateTimePicker';
import EventTypeSelector from './form/EventTypeSelector';
import EventLocationFields from './form/EventLocationFields';

interface EventFormProps {
  initialData?: Event;
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const EventForm: React.FC<EventFormProps> = ({ initialData, onSubmit, onCancel, isLoading }) => {
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

  const handleSelectMultipleImages = (files: FileInfo[]) => {
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{initialData ? "Edit Event" : "Add New Event"}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          <CardContent className="space-y-4">
            <EventImageGallery 
              images={eventImages}
              mainImageUrl={form.getValues('image')}
              onAddImages={() => setShowImageUploadDialog(true)}
              onRemoveImage={handleRemoveImage}
              onSetMainImage={setMainImage}
            />

            <EventBasicInfoFields form={form} />

            <EventDateTimePicker 
              form={form}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              handleTimeToggle={handleTimeToggle}
            />

            <EventTypeSelector 
              form={form}
              categories={categories}
            />

            <EventLocationFields form={form} />
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Saving..." : "Save Event"}
            </Button>
          </CardFooter>
        </form>
      </Form>

      <ImageUploadDialog
        isOpen={showImageUploadDialog}
        onClose={() => setShowImageUploadDialog(false)}
        onAddImage={handleAddImage}
        itemLabel="Event"
        multiSelect={true}
        onSelectMultiple={handleSelectMultipleImages}
      />
    </Card>
  );
};

export default EventForm;
