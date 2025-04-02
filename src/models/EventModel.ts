
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

export type EventType = 
  | 'Shows and Theatrical Plays'
  | 'Concerts'
  | 'Nightlife'
  | 'Comedy Events'
  | 'Festivals'
  | 'Arabic Events'
  | 'Sports Events'
  | 'Classical Events'
  | 'Business Events'
  | 'Instagrammable Places'
  | 'Eid Events'
  | 'Dining Experiences'
  | 'Exhibitions'
  | 'Art Events'
  | 'Ramadan'
  | 'Automotive'
  | 'Brunches'
  | 'Seminars'
  | 'Conferences'
  | 'Evening Tours'
  | 'New Year Events'
  | 'Night Tours'
  | 'Morning Tours'
  | 'Gaming & Esports'
  | 'Health and Wellness'
  | 'Maritime Heritage';

export interface EventDateRange {
  startDate?: Date;
  endDate?: Date;
  displayValue: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // Stored as a formatted string like "Jan 1 - Jan 30, 2024"
  location: EventLocation;
  image: string;
  images?: EventImage[];
  category: string;
  eventType?: EventType;
  rating: number;
  featured?: boolean;
  contactDetails?: EventContact[];
  ticketInfo?: TicketInfo[];
  createdAt: Date;
  updatedAt: Date;
}

export type EventFormData = Omit<Event, 'id' | 'createdAt' | 'updatedAt'>;
