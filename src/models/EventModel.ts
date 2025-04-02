
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
  // Entertainment
  | "Live Music Nights at Cafés or Cultural Hubs"
  | "Stand-up Comedy and Satirical Shows"
  | "Traditional Storytelling (Hakawati) Evenings"
  | "Local Band Performances and Open Mics"
  | "Dance Performances (Dabke, Contemporary)"
  | "Cultural Film Screenings"
  
  // Festivals
  | "Cultural Heritage Festivals"
  | "Local Food and Craft Festivals"
  | "Eid and Ramadan Souq Events"
  | "Independence Day Celebrations"
  | "Spring & Harvest Festivals"
  | "Traditional Handicraft Weeks"
  
  // Nightlife
  | "Live Oud or Oriental Music Nights"
  | "Shisha Lounge DJ Nights"
  | "Themed Dinner Parties"
  | "Private Garden Gatherings"
  | "Seasonal Rooftop Events"
  
  // Arts & Culture
  | "Art Exhibitions"
  | "Calligraphy and Pottery Workshops"
  | "Photography Exhibitions"
  | "Poetry Evenings and Book Readings"
  | "Historic Building Tours"
  | "Museum Nights"
  
  // Shopping
  | "Old Souq Shopping Tours"
  | "Local Brand Pop-ups"
  | "Bazaars for Women Entrepreneurs"
  | "Fashion Shows & Designer Events"
  | "Traditional Product Markets"
  
  // Education & Business
  | "University Seminars and Public Lectures"
  | "Startup Networking Events"
  | "Job Fairs for Graduates"
  | "Tech and Digital Training Workshops"
  | "Handicraft Skill Sessions"
  | "Language Exchange Meetups"
  
  // Health & Wellness
  | "Yoga and Meditation Sessions in Parks"
  | "Herbal Wellness Retreats"
  | "Women's Health Awareness Days"
  | "Traditional Hammam Spa Days"
  | "Self-Care and Mental Health Workshops"
  
  // Attractions & Tours
  | "Historic Site Tours"
  | "Old City Walking Tours"
  | "Religious Site Visits"
  | "Mountain Hikes"
  | "Guided Souq & Market Experiences"
  
  // Family & Kids
  | "Storytelling and Puppet Shows"
  | "Kids' Arts & Crafts Days"
  | "Outdoor Park Events"
  | "Local Zoo or Farm Visits"
  | "Interactive Museum Activities"
  
  // Sports
  | "Football Matches"
  | "Martial Arts Tournaments"
  | "Fitness Competitions"
  | "Cycling Tours in the City"
  | "Community Sports Days"
  
  // Adventure
  | "Hiking and Camping in Bloudan or Wadi Qandil"
  | "Rock Climbing Adventures"
  | "Paragliding in Coastal Mountains"
  | "Horseback Riding in Rural Areas"
  | "4x4 Desert Tours near Palmyra"
  
  // Instagrammable Spots
  | "Panoramic Spots in Old Damascus"
  | "Citadel Rooftop Views"
  | "Village Garden Cafés"
  | "Art Installations in Public Spaces"
  | "Sunset Picnics in Valley or Coast";

export interface EventDateRange {
  startDate?: Date;
  endDate?: Date;
  startTime?: string; // Added for time support
  endTime?: string;   // Added for time support
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
  hasTime?: boolean; // Flag to indicate if the event has a specific time
  startTime?: string; // Optional time field 
  endTime?: string;   // Optional time field
  createdAt: Date;
  updatedAt: Date;
}

export type EventFormData = Omit<Event, 'id' | 'createdAt' | 'updatedAt'>;
