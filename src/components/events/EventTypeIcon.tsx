
import React from 'react';
import { 
  Ticket, Drama, Music, Calendar, Star, Award, Trophy, 
  MicOff, Mic, Camera, Flag, Utensils, Car, Bell, 
  Headphones, Film, Video, Gamepad, Heart
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
    switch (eventType) {
      case 'Shows and Theatrical Plays':
        return <Drama size={size} className={className} />;
      case 'Concerts':
        return <Music size={size} className={className} />;
      case 'Nightlife':
        return <Headphones size={size} className={className} />;
      case 'Comedy Events':
        return <Film size={size} className={className} />;
      case 'Festivals':
      case 'Arabic Events':
        return <Calendar size={size} className={className} />;
      case 'Sports Events':
        return <Award size={size} className={className} />;
      case 'Classical Events':
        return <Music size={size} className={className} />;
      case 'Business Events':
        return <Mic size={size} className={className} />;
      case 'Instagrammable Places':
        return <Camera size={size} className={className} />;
      case 'Eid Events':
      case 'Ramadan':
        return <Calendar size={size} className={className} />;
      case 'Dining Experiences':
      case 'Brunches':
        return <Utensils size={size} className={className} />;
      case 'Automotive':
        return <Car size={size} className={className} />;
      case 'Seminars':
      case 'Conferences':
        return <Mic size={size} className={className} />;
      case 'Evening Tours':
      case 'Night Tours':
      case 'Morning Tours':
        return <Video size={size} className={className} />;
      case 'New Year Events':
        return <Bell size={size} className={className} />;
      case 'Gaming & Esports':
        return <Gamepad size={size} className={className} />;
      case 'Health and Wellness':
        return <Heart size={size} className={className} />;
      case 'Maritime Heritage':
        return <Flag size={size} className={className} />;
      default:
        return <Ticket size={size} className={className} />;
    }
  };

  return getIconForEventType();
};

export default EventTypeIcon;
