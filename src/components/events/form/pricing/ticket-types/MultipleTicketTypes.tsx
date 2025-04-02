
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { EventFormSchema } from '../../eventFormSchema';
import { FormDescription } from '@/components/ui/form';
import { PricingToggle } from '../PricingToggle';
import { TicketTypeList } from './TicketTypeList';
import { AddTicketButton } from './AddTicketButton';

interface MultipleTicketTypesProps {
  form: UseFormReturn<EventFormSchema>;
  hasMultipleTicketTypes: boolean;
  setHasMultipleTicketTypes: (value: boolean) => void;
}

const MultipleTicketTypes: React.FC<MultipleTicketTypesProps> = ({ 
  form, 
  hasMultipleTicketTypes, 
  setHasMultipleTicketTypes 
}) => {
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
        <TicketTypeList form={form} onRemove={removeTicketType} />
        <AddTicketButton form={form} />
      </div>
    </div>
  );
};

export default MultipleTicketTypes;
