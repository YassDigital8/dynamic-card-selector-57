
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { EventFormSchema } from '../../eventFormSchema';
import { TicketTypeCard } from '../TicketTypeCard';

interface TicketTypeListProps {
  form: UseFormReturn<EventFormSchema>;
  onRemove: (index: number) => void;
}

export const TicketTypeList: React.FC<TicketTypeListProps> = ({ form, onRemove }) => {
  const ticketInfo = form.watch('ticketInfo') || [];

  return (
    <div className="space-y-3">
      {ticketInfo.map((ticket, index) => (
        <TicketTypeCard
          key={ticket.id}
          ticket={ticket}
          index={index}
          form={form}
          onRemove={() => onRemove(index)}
        />
      ))}
    </div>
  );
};
