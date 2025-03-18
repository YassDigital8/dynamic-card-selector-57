
import React from 'react';
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
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AddPageFormValues } from '@/viewmodels/PageAdditionViewModel';

interface AddPageDialogFormProps {
  pos: string;
  language: string;
  generatedUrlPath: string;
  onOpenChange: (open: boolean) => void;
  onAddPage: (pageData: AddPageFormValues) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

const AddPageDialogForm = ({
  pos,
  language,
  generatedUrlPath,
  onOpenChange,
  onAddPage,
  isSubmitting,
  error
}: AddPageDialogFormProps) => {
  const form = useForm<Omit<AddPageFormValues, 'pageUrlName'>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const handleSubmit = async (values: Omit<AddPageFormValues, 'pageUrlName'>) => {
    await onAddPage({
      ...values, 
      pageUrlName: generatedUrlPath
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <UrlPathDisplay 
          pos={pos} 
          language={language} 
          generatedUrlPath={generatedUrlPath} 
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Title</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Page Title" 
                  {...field} 
                  error={!!form.formState.errors.title}
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
              <FormLabel required>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Page Description" 
                  {...field} 
                  className="min-h-[120px]"
                  error={!!form.formState.errors.description}
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
            className="bg-blue-600 hover:bg-blue-700"
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
  );
};

// URL Path Display subcomponent
interface UrlPathDisplayProps {
  pos: string;
  language: string;
  generatedUrlPath: string;
}

const UrlPathDisplay = ({ pos, language, generatedUrlPath }: UrlPathDisplayProps) => {
  return (
    <div className="mb-4">
      <FormLabel>Page URL Path</FormLabel>
      <div className="p-3 bg-gray-50 border rounded-md text-gray-700">
        {pos && language ? `${pos.toLowerCase()}/${language.toLowerCase()}/${generatedUrlPath || ""}` : "Please select POS and language"}
      </div>
      <p className="text-xs text-gray-500 mt-1">
        This path is automatically generated from your selected options.
      </p>
    </div>
  );
};

export default AddPageDialogForm;
