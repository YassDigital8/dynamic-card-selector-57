
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface ContactFormComponentProps {
  title: string;
  fields: string[];
  submitText: string;
}

const ContactFormComponent: React.FC<ContactFormComponentProps> = ({
  title,
  fields = ['name', 'email', 'message'],
  submitText = 'Send'
}) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      
      <form className="space-y-4">
        {fields.includes('name') && (
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your name" />
          </div>
        )}
        
        {fields.includes('email') && (
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Your email address" />
          </div>
        )}
        
        {fields.includes('phone') && (
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" placeholder="Your phone number" />
          </div>
        )}
        
        {fields.includes('subject') && (
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="Message subject" />
          </div>
        )}
        
        {fields.includes('message') && (
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Your message" rows={4} />
          </div>
        )}
        
        <Button type="submit" className="w-full">{submitText}</Button>
        
        <p className="text-xs text-slate-500 text-center mt-4">
          This is a demonstration form. In a real implementation, this would send data to your backend.
        </p>
      </form>
    </div>
  );
};

export default ContactFormComponent;
