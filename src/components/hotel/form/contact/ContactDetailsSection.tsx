
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { ContactDetail, SocialMedia } from '@/models/HotelModel';
import ContactItemForm from './ContactItemForm';
import SocialMediaItemForm from './SocialMediaItemForm';

const ContactDetailsSection = () => {
  const form = useFormContext();
  
  const contactDetails = useFieldArray({
    control: form.control,
    name: "contactDetails",
  });
  
  const socialMedia = useFieldArray({
    control: form.control,
    name: "socialMedia",
  });

  const handleAddContact = () => {
    if (contactDetails.fields.length < 10) {
      contactDetails.append({
        id: Date.now().toString(),
        type: 'phone',
        value: '',
        label: '',
        isPrimary: contactDetails.fields.length === 0, // First one is primary by default
      });
    }
  };

  const handleAddSocial = () => {
    socialMedia.append({
      id: Date.now().toString(),
      platform: 'website',
      url: '',
      label: '',
    });
  };

  const handleSetPrimary = (index: number) => {
    // Update all contacts to not primary first
    contactDetails.fields.forEach((_, i) => {
      form.setValue(`contactDetails.${i}.isPrimary`, i === index);
    });
  };

  return (
    <Card className="border-blue-100 dark:border-blue-900 col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl text-blue-700 dark:text-blue-300">
          Contact Information &amp; Social Media
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contact Details */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-md font-medium">Contact Details</h3>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={handleAddContact}
              disabled={contactDetails.fields.length >= 10}
              className="border-blue-200 dark:border-blue-800 text-xs"
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              Add Contact
            </Button>
          </div>
          
          {contactDetails.fields.length === 0 && (
            <div className="text-sm text-muted-foreground italic p-2 text-center">
              No contact details added yet. Click 'Add Contact' to add a new contact.
            </div>
          )}
          
          {contactDetails.fields.map((field, index) => (
            <ContactItemForm 
              key={field.id} 
              index={index} 
              onRemove={() => contactDetails.remove(index)}
              onSetPrimary={() => handleSetPrimary(index)}
            />
          ))}
        </div>

        {/* Social Media */}
        <div className="space-y-4 pt-2">
          <div className="flex justify-between items-center">
            <h3 className="text-md font-medium">Social Media &amp; Website</h3>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={handleAddSocial}
              className="border-blue-200 dark:border-blue-800 text-xs"
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              Add Link
            </Button>
          </div>
          
          {socialMedia.fields.length === 0 && (
            <div className="text-sm text-muted-foreground italic p-2 text-center">
              No social media or website links added yet. Click 'Add Link' to add a new link.
            </div>
          )}
          
          {socialMedia.fields.map((field, index) => (
            <SocialMediaItemForm 
              key={field.id} 
              index={index} 
              onRemove={() => socialMedia.remove(index)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactDetailsSection;
