
import React from 'react';
import { 
  Ticket, Music, Star, Utensils, Camera, MapPin, Book, Users, 
  Tent, Mountain, Calendar, ShoppingCart, Briefcase, Heart, Film, 
  Moon, Palette, Bike, Trophy, Martini, Jeep
} from 'lucide-react';
import { EventType } from '@/models/EventModel';

interface EventTypeIconProps {
  eventType: EventType;
  className?: string;
  size?: number;
}

const EventTypeIcon: React.FC<EventTypeIconProps> = ({ 
  eventType, 
  className = "",
  size = 18
}) => {
  const getIconForEventType = () => {
    // Entertainment category
    if (eventType.includes("Music") || eventType.includes("Band")) {
      return <Music size={size} className={className} />;
    }
    if (eventType.includes("Comedy") || eventType.includes("Film") || eventType.includes("Storytelling")) {
      return <Film size={size} className={className} />;
    }
    if (eventType.includes("Dance")) {
      return <Users size={size} className={className} />;
    }
    
    // Festivals category
    if (eventType.includes("Festival") || eventType.includes("Celebrations") || eventType.includes("Eid")) {
      return <Calendar size={size} className={className} />;
    }
    
    // Nightlife category
    if (eventType.includes("Nightlife") || eventType.includes("DJ") || eventType.includes("Garden") || eventType.includes("Rooftop") || eventType.includes("Dinner")) {
      return <Moon size={size} className={className} />;
    }
    
    // Arts & Culture category
    if (eventType.includes("Exhibition") || eventType.includes("Art") || eventType.includes("Museum") || eventType.includes("Poetry") || eventType.includes("Calligraphy")) {
      return <Palette size={size} className={className} />;
    }
    if (eventType.includes("Historic") || eventType.includes("Building")) {
      return <Star size={size} className={className} />;
    }
    
    // Shopping category
    if (eventType.includes("Shopping") || eventType.includes("Souq") || eventType.includes("Pop-ups") || eventType.includes("Bazaars") || eventType.includes("Fashion") || eventType.includes("Market")) {
      return <ShoppingCart size={size} className={className} />;
    }
    
    // Education & Business category
    if (eventType.includes("Seminars") || eventType.includes("Networking") || eventType.includes("Job") || eventType.includes("Digital") || eventType.includes("Training") || eventType.includes("Language")) {
      return <Briefcase size={size} className={className} />;
    }
    
    // Health & Wellness category
    if (eventType.includes("Yoga") || eventType.includes("Wellness") || eventType.includes("Health") || eventType.includes("Hammam") || eventType.includes("Self-Care")) {
      return <Heart size={size} className={className} />;
    }
    
    // Attractions & Tours category
    if (eventType.includes("Tours") || eventType.includes("Walking") || eventType.includes("Site") || eventType.includes("Religious") || eventType.includes("Mountain") || eventType.includes("Guided")) {
      return <MapPin size={size} className={className} />;
    }
    
    // Family & Kids category
    if (eventType.includes("Kids") || eventType.includes("Family") || eventType.includes("Puppet") || eventType.includes("Zoo") || eventType.includes("Park")) {
      return <Users size={size} className={className} />;
    }
    
    // Sports category
    if (eventType.includes("Football") || eventType.includes("Sports") || eventType.includes("Martial") || eventType.includes("Fitness")) {
      return <Trophy size={size} className={className} />;
    }
    if (eventType.includes("Cycling")) {
      return <Bike size={size} className={className} />;
    }
    
    // Adventure category
    if (eventType.includes("Hiking") || eventType.includes("Camping")) {
      return <Tent size={size} className={className} />;
    }
    if (eventType.includes("Climbing") || eventType.includes("Paragliding")) {
      return <Mountain size={size} className={className} />;
    }
    if (eventType.includes("4x4") || eventType.includes("Desert")) {
      return <Jeep size={size} className={className} />;
    }
    if (eventType.includes("Horseback")) {
      return <Utensils size={size} className={className} />;
    }
    
    // Instagrammable Spots category
    if (eventType.includes("Panoramic") || eventType.includes("Views") || eventType.includes("Cafés") || eventType.includes("Installations") || eventType.includes("Sunset")) {
      return <Camera size={size} className={className} />;
    }
    
    // Default icon if no matches
    return <Ticket size={size} className={className} />;
  };

  return getIconForEventType();
};

export default EventTypeIcon;
