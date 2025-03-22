
import React from 'react';
import { Phone, Mail, MapPin, Hash, Globe, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const getContactIcon = (type: string) => {
  switch (type) {
    case 'phone': return <Phone className="h-4 w-4" />;
    case 'email': return <Mail className="h-4 w-4" />;
    case 'address': return <MapPin className="h-4 w-4" />;
    default: return <Hash className="h-4 w-4" />;
  }
};

export const getSocialIcon = (platform: string) => {
  switch (platform) {
    case 'website': return <Globe className="h-4 w-4" />;
    case 'facebook': return <Facebook className="h-4 w-4" />;
    case 'instagram': return <Instagram className="h-4 w-4" />;
    case 'twitter': return <Twitter className="h-4 w-4" />;
    case 'linkedin': return <Linkedin className="h-4 w-4" />;
    default: return <Hash className="h-4 w-4" />;
  }
};

export default {
  getContactIcon,
  getSocialIcon
};
