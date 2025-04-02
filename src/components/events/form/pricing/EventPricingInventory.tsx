
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { EventFormSchema } from '../eventFormSchema';
import { SingleTicketPricing } from './SingleTicketPricing';
import { MultipleTicketTypes } from './MultipleTicketTypes';
import { PricingToggle } from './PricingToggle';

interface EventPricingInventoryProps {
  form: UseFormReturn<EventFormSchema>;
}

const EventPricingInventory: React.FC<EventPricingInventoryProps> = ({ form }) => {
  const [hasMultipleTicketTypes, setHasMultipleTicketTypes] = useState<boolean>(
    !!form.getValues('ticketInfo')?.length
  );

  const handleToggleChange = (checked: boolean) => {
    setHasMultipleTicketTypes(checked);
    if (checked && !form.getValues('ticketInfo')?.length) {
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
    
    if (!checked) {
      form.setValue('ticketInfo', []);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h3 className="text-lg font-medium">Pricing & Inventory</h3>
        
        {!hasMultipleTicketTypes ? (
          <>
            <SingleTicketPricing form={form} />
            <PricingToggle 
              checked={hasMultipleTicketTypes} 
              onChange={handleToggleChange} 
            />
          </>
        ) : (
          <MultipleTicketTypes 
            form={form} 
            hasMultipleTicketTypes={hasMultipleTicketTypes}
            setHasMultipleTicketTypes={setHasMultipleTicketTypes}
          />
        )}
      </div>
    </div>
  );
};

export default EventPricingInventory;
