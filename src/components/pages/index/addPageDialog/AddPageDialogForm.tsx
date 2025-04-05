import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { generateSlug } from '@/lib/utils';

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  content: z.string().optional(),
  urlPath: z.string().optional(),
});

interface AddPageDialogFormProps {
  selectedPOS: string;
  selectedLanguage: string;
  generatedUrlPath: string;
  onOpenChange: (open: boolean) => void;
  onAddPage: (formValues: any) => Promise<void>;
  isSubmitting: boolean;
  error: string;
}

const AddPageDialogForm = ({
  selectedPOS,
  selectedLanguage,
  generatedUrlPath,
  onOpenChange,
  onAddPage,
  isSubmitting,
  error,
}: AddPageDialogFormProps) => {
  const [urlPath, setUrlPath] = useState(generatedUrlPath);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      content: '',
      urlPath: generatedUrlPath,
    },
  });

  const onSubmit = async (formValues: z.infer<typeof formSchema>) => {
    try {
      const formData = {
        title: formValues.title,
        description: formValues.description,
        content: formValues.content,
        urlPath: formValues.urlPath,
        selectedPOS,
        selectedLanguage,
      };

      await onAddPage(formData);
      form.reset();
      onOpenChange(false);
    } catch (e) {
      console.error('Failed to add page:', e);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Page Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Page Description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Page Content"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="urlPath"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL Path</FormLabel>
              <FormControl>
                <Input
                  placeholder="URL Path"
                  value={urlPath}
                  onChange={(e) => {
                    const newUrlPath = generateSlug(e.target.value);
                    setUrlPath(newUrlPath);
                    field.onChange(newUrlPath);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <p className="text-red-500">{error}</p>}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
};

export default AddPageDialogForm;
