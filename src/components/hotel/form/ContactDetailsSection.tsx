
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ContactDetail, SocialMedia } from '@/models/HotelModel';
import { Trash2, Plus, Phone, Mail, MapPin, Globe, Facebook, Twitter, Instagram, Linkedin, Hash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useFieldArray, useFormContext } from 'react-hook-form';

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

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'phone': return <Phone className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'address': return <MapPin className="h-4 w-4" />;
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
    <Card className="border-blue-100 dark:border-blue-900">
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
            <div key={field.id} className="grid grid-cols-12 gap-2 items-center border-b pb-2 border-gray-100 dark:border-gray-800">
              {/* Contact Type */}
              <FormField
                control={form.control}
                name={`contactDetails.${index}.type`}
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="phone">Phone</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="address">Address</SelectItem>
                        <SelectItem value="fax">Fax</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Contact Value */}
              <FormField
                control={form.control}
                name={`contactDetails.${index}.value`}
                render={({ field }) => (
                  <FormItem className="col-span-5">
                    <FormControl>
                      <div className="flex items-center space-x-1">
                        <span className="text-muted-foreground">
                          {getContactIcon(form.watch(`contactDetails.${index}.type`))}
                        </span>
                        <Input {...field} placeholder="Contact information" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Contact Label */}
              <FormField
                control={form.control}
                name={`contactDetails.${index}.label`}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Input {...field} placeholder="Label (optional)" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Primary Switch */}
              <FormField
                control={form.control}
                name={`contactDetails.${index}.isPrimary`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-center space-x-1 col-span-1">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={() => handleSetPrimary(index)}
                      />
                    </FormControl>
                    {field.value && <Badge variant="outline" className="text-xs">Primary</Badge>}
                  </FormItem>
                )}
              />
              
              {/* Delete Button */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => contactDetails.remove(index)}
                className="col-span-1 h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
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
            <div key={field.id} className="grid grid-cols-12 gap-2 items-center border-b pb-2 border-gray-100 dark:border-gray-800">
              {/* Platform Type */}
              <FormField
                control={form.control}
                name={`socialMedia.${index}.platform`}
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Platform" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* URL */}
              <FormField
                control={form.control}
                name={`socialMedia.${index}.url`}
                render={({ field }) => (
                  <FormItem className="col-span-6">
                    <FormControl>
                      <div className="flex items-center space-x-1">
                        <span className="text-muted-foreground">
                          {getSocialIcon(form.watch(`socialMedia.${index}.platform`))}
                        </span>
                        <Input {...field} placeholder="URL (https://...)" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Label */}
              <FormField
                control={form.control}
                name={`socialMedia.${index}.label`}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Input {...field} placeholder="Label (optional)" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Delete Button */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => socialMedia.remove(index)}
                className="col-span-1 h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactDetailsSection;
