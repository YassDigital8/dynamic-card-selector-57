
import React from 'react';
import { Phone, Mail, Globe } from 'lucide-react';
import { EventContact } from '@/models/EventModel';

interface EventContactSectionProps {
  contacts: EventContact[];
}

const EventContactSection: React.FC<EventContactSectionProps> = ({ contacts }) => {
  if (!contacts || contacts.length === 0) return null;
  
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
      <div className="space-y-2">
        {contacts.map(contact => (
          <div key={contact.id} className="flex items-center gap-2">
            {contact.type === 'phone' && <Phone className="h-5 w-5 text-muted-foreground" />}
            {contact.type === 'email' && <Mail className="h-5 w-5 text-muted-foreground" />}
            {contact.type === 'website' && <Globe className="h-5 w-5 text-muted-foreground" />}
            <span>{contact.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventContactSection;
