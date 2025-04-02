
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { EventFormSchema } from '../eventFormSchema';
import { FormDescription } from '@/components/ui/form';
import { PricingToggle } from './PricingToggle';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { TicketTypeCard } from './TicketTypeCard';

interface MultipleTicketTypesProps {
  form: UseFormReturn<EventFormSchema>;
  hasMultipleTicketTypes: boolean;
  setHasMultipleTicketTypes: (value: boolean) => void;
}

export const MultipleTicketTypes: React.FC<MultipleTicketTypesProps> = ({ 
  form, 
  hasMultipleTicketTypes, 
  setHasMultipleTicketTypes 
}) => {
  const ticketInfo = form.watch('ticketInfo') || [];
  
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

  const removeTicketType = (index: number) => {
    const currentTickets = [...(form.getValues('ticketInfo') || [])];
    currentTickets.splice(index, 1);
    form.setValue('ticketInfo', currentTickets);
    
    // If we removed the last ticket type, disable multiple ticket types
    if (currentTickets.length === 0) {
      setHasMultipleTicketTypes(false);
    }
  };

  const handleToggleChange = (checked: boolean) => {
    setHasMultipleTicketTypes(checked);
    if (!checked) {
      form.setValue('ticketInfo', []);
    } else if (checked && !form.getValues('ticketInfo')?.length) {
      addTicketType();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FormDescription>
          Define different ticket types with their own pricing and inventory
        </FormDescription>
        <PricingToggle 
          checked={hasMultipleTicketTypes} 
          onChange={handleToggleChange}
        />
      </div>

      <div className="space-y-3">
        {ticketInfo.map((ticket, index) => (
          <TicketTypeCard
            key={ticket.id}
            ticket={ticket}
            index={index}
            form={form}
            onRemove={() => removeTicketType(index)}
          />
        ))}
        
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
      </div>
    </div>
  );
};
