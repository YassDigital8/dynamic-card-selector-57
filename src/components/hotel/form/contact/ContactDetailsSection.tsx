
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
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
        personName: '',
        personRole: '', // Initialize the new personRole field
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
    <Card className="border-blue-100 dark:border-blue-900 col-span-1 md:col-span-2 shadow-md">
      <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-950 dark:to-transparent border-b">
        <CardTitle className="text-lg sm:text-xl text-blue-700 dark:text-blue-300">
          Contact Information &amp; Social Media
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 sm:space-y-8 pt-4">
        {/* Contact Details */}
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm sm:text-md font-medium border-l-4 border-blue-600 pl-2">Contact Details</h3>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={handleAddContact}
              disabled={contactDetails.fields.length >= 10}
              className="border-blue-200 dark:border-blue-800 text-xs h-8 px-2 bg-white dark:bg-gray-900"
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Contact
            </Button>
          </div>
          
          {contactDetails.fields.length === 0 && (
            <div className="text-xs sm:text-sm text-muted-foreground italic p-3 text-center bg-gray-50 dark:bg-gray-900 border border-dashed rounded-md">
              No contact details added yet. Click 'Add Contact' to add a new contact.
            </div>
          )}
          
          <div className="space-y-3 sm:space-y-4">
            {contactDetails.fields.map((field, index) => (
              <ContactItemForm 
                key={field.id} 
                index={index} 
                onRemove={() => contactDetails.remove(index)}
                onSetPrimary={() => handleSetPrimary(index)}
              />
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div className="space-y-4 pt-4 border-t dark:border-gray-800">
          <div className="flex justify-between items-center mb-4 mt-4">
            <h3 className="text-sm sm:text-md font-medium border-l-4 border-blue-600 pl-2">Social Media &amp; Website</h3>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={handleAddSocial}
              className="border-blue-200 dark:border-blue-800 text-xs h-8 px-2 bg-white dark:bg-gray-900"
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Link
            </Button>
          </div>
          
          {socialMedia.fields.length === 0 && (
            <div className="text-xs sm:text-sm text-muted-foreground italic p-3 text-center bg-gray-50 dark:bg-gray-900 border border-dashed rounded-md">
              No social media or website links added yet. Click 'Add Link' to add a new link.
            </div>
          )}
          
          <div className="space-y-3 sm:space-y-4">
            {socialMedia.fields.map((field, index) => (
              <SocialMediaItemForm 
                key={field.id} 
                index={index} 
                onRemove={() => socialMedia.remove(index)}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactDetailsSection;
