
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';
import { PageData } from '@/models/PageModel';

// Form schema validation
const pageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  path: z.string().min(1, 'Path is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  language: z.string().min(1, 'Language is required'),
  pos: z.string().min(1, 'Point of Sale is required'),
});

type PageFormData = z.infer<typeof pageSchema>;

interface AddPageDialogFormProps {
  onSubmit: (data: PageFormData) => void;
  onCancel: () => void;
  categories: string[];
  languages: string[];
  pointsOfSale: string[];
  initialValues?: Partial<PageData>;
}

const AddPageDialogForm: React.FC<AddPageDialogFormProps> = ({
  onSubmit,
  onCancel,
  categories,
  languages,
  pointsOfSale,
  initialValues,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PageFormData>({
    resolver: zodResolver(pageSchema),
    defaultValues: {
      title: initialValues?.title || '',
      path: initialValues?.path || '',
      description: initialValues?.description || '',
      category: initialValues?.category || categories[0],
      language: initialValues?.language || languages[0],
      pos: initialValues?.pos || pointsOfSale[0],
    },
  });

  const onFormSubmit = (data: PageFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            {...register('title')}
            aria-invalid={errors.title ? "true" : "false"}
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="path">Path</Label>
          <Input
            id="path"
            {...register('path')}
            aria-invalid={errors.path ? "true" : "false"}
            className={errors.path ? "border-red-500" : ""}
          />
          {errors.path && (
            <p className="text-red-500 text-sm mt-1">{errors.path.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="Enter a description for this page"
            aria-invalid={errors.description ? "true" : "false"}
            className={errors.description ? "border-red-500" : ""}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger
                    className={errors.category ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="language">Language</Label>
            <Controller
              name="language"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger
                    className={errors.language ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((language) => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.language && (
              <p className="text-red-500 text-sm mt-1">{errors.language.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="pos">Point of Sale</Label>
            <Controller
              name="pos"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className={errors.pos ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select POS" />
                  </SelectTrigger>
                  <SelectContent>
                    {pointsOfSale.map((pos) => (
                      <SelectItem key={pos} value={pos}>
                        {pos}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.pos && (
              <p className="text-red-500 text-sm mt-1">{errors.pos.message}</p>
            )}
          </div>
        </div>
      </div>

      <DialogFooter className="mt-6">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {initialValues ? 'Update Page' : 'Create Page'}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default AddPageDialogForm;
