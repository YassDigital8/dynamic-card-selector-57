
import { UseFormReturn } from 'react-hook-form';
import { EventFormData, TicketInfo } from '@/models/EventModel';

export const useEventSubmission = (
  form: UseFormReturn<any>,
  onSubmit?: (data: EventFormData) => void
) => {
  const handleFormSubmit = (data: any) => {
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
      images: data.images || [],
      category: data.category,
      eventType: data.eventType as any,
      rating: data.rating,
      featured: data.featured,
      hasTime: data.hasTime,
      startTime: data.startTime,
      endTime: data.endTime,
      price: data.price,
      totalInventory: data.totalInventory,
      remainingInventory: data.remainingInventory || data.totalInventory,
      // Ensure each ticket has required fields, especially 'id'
      ticketInfo: data.ticketInfo?.map((ticket: any) => ({
        id: ticket.id,
        name: ticket.name,
        price: ticket.price,
        description: ticket.description,
        available: ticket.available,
        totalInventory: ticket.totalInventory,
        remainingInventory: ticket.remainingInventory ?? ticket.totalInventory
      })) as TicketInfo[] | undefined
    };
    
    onSubmit(formattedData);
  };

  return {
    handleFormSubmit
  };
};
