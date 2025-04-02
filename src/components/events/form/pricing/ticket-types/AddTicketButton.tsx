
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { EventFormSchema } from '../../eventFormSchema';

interface AddTicketButtonProps {
  form: UseFormReturn<EventFormSchema>;
}

export const AddTicketButton: React.FC<AddTicketButtonProps> = ({ form }) => {
  const addTicketType = () => {
    const currentTickets = form.getValues('ticketInfo') || [];
    form.setValue('ticketInfo', [
      ...currentTickets,
      {
        id: crypto.randomUUID(),
        name: '',
        price: 0,
        description: '',
        available: true,
        totalInventory: 0,
        remainingInventory: 0
      }
    ]);
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="mt-2 w-full"
      onClick={addTicketType}
    >
      <PlusCircle className="mr-2 h-4 w-4" />
      Add Ticket Type
    </Button>
  );
};
