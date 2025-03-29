
export interface EventLocation {
  address: string;
  city: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface EventImage {
  url: string;
  description?: string;
  id?: string;
  metadata?: {
    title?: string;
    altText?: string;
    caption?: string;
  };
}

export interface EventContact {
  id: string;
  type: 'phone' | 'email' | 'website';
  value: string;
  personName?: string;
  isPrimary?: boolean;
}

export interface TicketInfo {
  id: string;
  name: string; // e.g., "Adult", "Child", "Senior"
  price: number;
  description?: string;
  available: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // Could be a range or fixed date
  location: EventLocation;
  image: string;
  images?: EventImage[];
  category: string;
  rating: number;
  featured?: boolean;
  contactDetails?: EventContact[];
  ticketInfo?: TicketInfo[];
  createdAt: Date;
  updatedAt: Date;
}

export type EventFormData = Omit<Event, 'id' | 'createdAt' | 'updatedAt'>;
