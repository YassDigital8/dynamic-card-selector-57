
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Event } from '@/models/EventModel';
import { eventFormSchema, EventFormSchema, DEFAULT_EVENT_IMAGE } from '../eventFormSchema';
import { parseEventDate } from '../../utils/dateUtils';
import { useEventDates } from './useEventDates';
import { useEventImages } from './useEventImages';
import { useEventSubmission } from './useEventSubmission';

export const useEventForm = (initialData?: Event, onSubmit?: (data: any) => void) => {
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
      price: initialData.price || 0,
      totalInventory: initialData.totalInventory || 0,
      remainingInventory: initialData.remainingInventory || 0,
      ticketInfo: initialData.ticketInfo || []
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
      price: 0,
      totalInventory: 0,
      remainingInventory: 0,
      ticketInfo: [],
    }
  });

  // Use the specialized hooks
  const {
    startDate,
    endDate,
    hasTime,
    setStartDate,
    setEndDate,
    handleTimeToggle
  } = useEventDates(form, initialData?.date);

  const {
    eventImages,
    showImageUploadDialog,
    setShowImageUploadDialog,
    handleAddImage,
    handleRemoveImage,
    handleSelectMultipleImages,
    setMainImage
  } = useEventImages(form, initialData?.images || []);

  const { handleFormSubmit } = useEventSubmission(form, onSubmit);

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
