
import React from 'react';
import { Event, EventFormData } from '@/models/EventModel';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save, X } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EventFormSchema, eventFormSchema } from './eventFormSchema';

interface FormWrapperProps {
  initialData?: Event;
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
  children: React.ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isLoading,
  children 
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{initialData ? "Edit Event" : "Add New Event"}</CardTitle>
      </CardHeader>
      {children}
    </Card>
  );
};

export default FormWrapper;
