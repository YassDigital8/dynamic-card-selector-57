
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
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
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AddPageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pos: string;
  language: string;
  selectedSlug: string;
  selectedSubSlug: string;
  onAddPage: (pageData: AddPageFormValues) => Promise<void>;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

export type AddPageFormValues = z.infer<typeof formSchema> & { pageUrlName: string };

const AddPageDialog = ({ 
  open, 
  onOpenChange, 
  pos, 
  language, 
  selectedSlug,
  selectedSubSlug,
  onAddPage 
}: AddPageDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate URL path from selected dropdowns
  const generatedUrlPath = selectedSlug && selectedSubSlug 
    ? `${selectedSlug}/${selectedSubSlug}` 
    : selectedSlug || '';

  const form = useForm<Omit<AddPageFormValues, 'pageUrlName'>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const handleSubmit = async (values: Omit<AddPageFormValues, 'pageUrlName'>) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Include the generated URL path in the submitted data
      await onAddPage({
        ...values, 
        pageUrlName: generatedUrlPath
      });
      form.reset();
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add page');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Add New Page</DialogTitle>
          <DialogDescription>
            Create a new page for {language} in {pos}
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="error" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="mb-4">
              <FormLabel>Page URL Path</FormLabel>
              <div className="p-3 bg-gray-50 border rounded-md text-gray-700">
                {generatedUrlPath || "Please select parent and subparent paths"}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                This path is automatically generated from your selected options.
              </p>
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Page Title" 
                      {...field} 
                    />
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
                      {...field} 
                      className="min-h-[120px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting || !generatedUrlPath}
                className="bg-blue-800 hover:bg-blue-900"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Page'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPageDialog;
