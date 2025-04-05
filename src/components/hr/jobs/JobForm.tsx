
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JobPosition } from '@/models/JobModel';
import { 
  BasicInfoFields, 
  StatusDateFields, 
  DescriptionField, 
  FormActions,
  RequirementsList,
  ResponsibilitiesList,
  jobFormSchema,
  JobFormValues
} from './form';

interface JobFormProps {
  initialData?: JobPosition | null;
  onSubmit: (data: JobPosition) => void;
  onCancel: () => void;
}

const JobForm: React.FC<JobFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: initialData ? {
      ...initialData,
      closingDate: initialData.closingDate ? new Date(initialData.closingDate) : new Date(),
    } : {
      title: '',
      department: '',
      location: '',
      type: 'Full-time',
      description: '',
      requirements: [''],
      responsibilities: [''],
      status: 'Draft',
      closingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
  });

  const handleSubmit = (values: JobFormValues) => {
    // Create the base job data
    const jobData: JobPosition = {
      id: initialData?.id || Date.now().toString(),
      title: values.title,
      department: values.department,
      location: values.location,
      type: values.type,
      description: values.description,
      requirements: values.requirements,
      responsibilities: values.responsibilities,
      postedDate: initialData?.postedDate || new Date().toISOString(),
      closingDate: values.closingDate.toISOString(),
      status: values.status,
      applications: initialData?.applications || 0,
    };
    
    // Only add salary if it's provided in the form values
    if (values.salary) {
      jobData.salary = {
        min: values.salary.min || 0,
        max: values.salary.max || 0,
        currency: values.salary.currency || 'USD',
      };
    }
    
    // Add optional contactEmail if present
    if (values.contactEmail) {
      jobData.contactEmail = values.contactEmail;
    }
    
    onSubmit(jobData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{initialData ? 'Edit Job Posting' : 'Create New Job Posting'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <BasicInfoFields form={form} />
            <StatusDateFields form={form} />
            <DescriptionField form={form} />

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Requirements</FormLabel>
                  <FormControl>
                    <RequirementsList 
                      requirements={field.value} 
                      onChange={field.onChange} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responsibilities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Responsibilities</FormLabel>
                  <FormControl>
                    <ResponsibilitiesList 
                      responsibilities={field.value} 
                      onChange={field.onChange} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormActions 
              isEditing={!!initialData} 
              onCancel={onCancel} 
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default JobForm;
