import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ContactDetail, SocialMedia } from '@/models/HotelModel';
import { Phone, Mail, MapPin, Hash, Globe, Facebook, Twitter, Instagram, Linkedin, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactDetailsCardProps {
  contactDetails?: ContactDetail[];
  socialMedia?: SocialMedia[];
}

const ContactDetailsCard: React.FC<ContactDetailsCardProps> = ({
  contactDetails = [],
  socialMedia = []
}) => {
  const getContactIcon = (type: string) => {
    switch (type) {
      case 'phone': return <Phone className="h-4 w-4" />;
      case 'fax': return <Phone className="h-4 w-4" />;
      case 'whatsapp': return <Phone className="h-4 w-4" />;
      case 'pr': return <Megaphone className="h-4 w-4" />;
      default: return <Hash className="h-4 w-4" />;
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'website': return <Globe className="h-4 w-4" />;
      case 'facebook': return <Facebook className="h-4 w-4" />;
      case 'instagram': return <Instagram className="h-4 w-4" />;
      case 'twitter': return <Twitter className="h-4 w-4" />;
      case 'linkedin': return <Linkedin className="h-4 w-4" />;
      default: return <Hash className="h-4 w-4" />;
    }
  };
  
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'facebook': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'instagram': return 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300';
      case 'twitter': return 'bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300';
      case 'linkedin': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300';
      case 'website': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'phone': return 'Phone';
      case 'fax': return 'Fax';
      case 'whatsapp': return 'WhatsApp';
      case 'pr': return 'PR Contact';
      default: return 'Other';
    }
  };

  const getPlatformLabel = (platform: string) => {
    switch (platform) {
      case 'website': return 'Website';
      case 'facebook': return 'Facebook';
      case 'instagram': return 'Instagram';
      case 'twitter': return 'Twitter';
      case 'linkedin': return 'LinkedIn';
      default: return 'Other';
    }
  };

  const renderContactValue = (contact: ContactDetail) => {
    if (contact.type === 'phone' || contact.type === 'whatsapp') {
      return (
        <a 
          href={`tel:${contact.value.replace(/\s+/g, '')}`}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {contact.value}
        </a>
      );
    } else {
      return contact.value;
    }
  };

  const renderSocialLink = (social: SocialMedia) => {
    const url = social.url.startsWith('http') ? social.url : `https://${social.url}`;
    
    return (
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
      >
        <span className="mr-1">{social.url}</span>
        <Globe className="h-3 w-3" />
      </a>
    );
  };

  const regularContacts = contactDetails.filter(contact => contact.type !== 'pr');
  const prContacts = contactDetails.filter(contact => contact.type === 'pr');

  return (
    <Card className="shadow-sm border-blue-100 dark:border-blue-900 mt-6 w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-blue-700 dark:text-blue-300">
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {regularContacts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {regularContacts.map((contact) => (
              <div key={contact.id} className="flex items-start p-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                <div className="mt-0.5 mr-2 flex-shrink-0">
                  {getContactIcon(contact.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="font-medium text-sm">
                      {getTypeLabel(contact.type)}
                    </div>
                    {contact.isPrimary && (
                      <Badge variant="secondary" className="ml-2 text-xs">Primary</Badge>
                    )}
                  </div>
                  <div className="text-sm mt-0.5">{renderContactValue(contact)}</div>
                  {(contact.personName || contact.personRole) && (
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {contact.personName && (
                        <span>Contact: {contact.personName}</span>
                      )}
                      {contact.personRole && contact.personName && (
                        <span> - </span>
                      )}
                      {contact.personRole && (
                        <span className="font-medium">{contact.personRole}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground italic text-center py-2">
            No contact details available.
          </div>
        )}

        {prContacts.length > 0 && (
          <>
            <Separator className="my-3" />
            <div className="space-y-2">
              <h3 className="text-sm font-medium border-l-4 border-amber-500 pl-2">Public Relations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {prContacts.map((contact) => (
                  <div key={contact.id} className="flex items-start p-2 rounded-md bg-amber-50 dark:bg-amber-950/20 hover:bg-amber-100 dark:hover:bg-amber-950/30 transition-colors">
                    <div className="mt-0.5 mr-2 flex-shrink-0 text-amber-700 dark:text-amber-500">
                      {getContactIcon(contact.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="font-medium text-sm text-amber-700 dark:text-amber-500">
                          PR Contact
                        </div>
                      </div>
                      <div className="text-sm mt-0.5">{renderContactValue(contact)}</div>
                      {(contact.personName || contact.personRole) && (
                        <div className="text-xs text-amber-700/70 dark:text-amber-500/70 mt-0.5">
                          {contact.personName && (
                            <span>{contact.personName}</span>
                          )}
                          {contact.personRole && contact.personName && (
                            <span> - </span>
                          )}
                          {contact.personRole && (
                            <span className="font-medium">{contact.personRole}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {socialMedia.length > 0 && (
          <>
            <Separator className="my-3" />
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Social Media & Website</h3>
              <div className="flex flex-wrap gap-2">
                {socialMedia.map((social) => (
                  <a 
                    key={social.id}
                    href={social.url.startsWith('http') ? social.url : `https://${social.url}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getPlatformColor(social.platform)}`}
                  >
                    <span className="mr-1.5">{getSocialIcon(social.platform)}</span>
                    <span>{social.label || getPlatformLabel(social.platform)}</span>
                  </a>
                ))}
              </div>
            </div>
          </>
        )}

        {contactDetails.length === 0 && socialMedia.length === 0 && (
          <div className="text-center py-4">
            <div className="text-muted-foreground mb-2">No contact information available</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactDetailsCard;
