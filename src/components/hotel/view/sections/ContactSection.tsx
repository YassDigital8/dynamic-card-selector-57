
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Hotel } from '@/models/HotelModel';

interface ContactSectionProps {
  hotel: Hotel;
}

const ContactSection: React.FC<ContactSectionProps> = ({ hotel }) => {
  return (
    <Card className="border-0 shadow-none mb-4">
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Details */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Details</h3>
            {hotel.contactDetails && hotel.contactDetails.length > 0 ? (
              <div className="space-y-3">
                {hotel.contactDetails.map((contact) => (
                  <div key={contact.id} className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium capitalize">{contact.type}</span>
                      {contact.isPrimary && (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          Primary
                        </span>
                      )}
                    </div>
                    <p className="text-lg font-medium">{contact.value}</p>
                    {contact.personName && (
                      <p className="text-sm text-gray-500">
                        {contact.personName}
                        {contact.personRole && ` - ${contact.personRole}`}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No contact details available.</p>
            )}
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-medium mb-4">Social Media</h3>
            {hotel.socialMedia && hotel.socialMedia.length > 0 ? (
              <div className="space-y-3">
                {hotel.socialMedia.map((social) => (
                  <div key={social.id} className="p-3 border rounded-md">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium capitalize">{social.platform}</span>
                      <a 
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Open Link
                      </a>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{social.url}</p>
                    {social.label && (
                      <p className="text-xs mt-1">{social.label}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No social media links available.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactSection;
