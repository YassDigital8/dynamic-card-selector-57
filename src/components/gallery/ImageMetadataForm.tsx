
import React, { useState, ChangeEvent } from 'react';
import { Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileMetadata } from '@/models/FileModel';

interface ImageMetadataFormProps {
  metadata: FileMetadata;
  onSave: (metadata: FileMetadata) => void;
  onDelete?: () => void;
  className?: string;
}

const ImageMetadataForm: React.FC<ImageMetadataFormProps> = ({
  metadata,
  onSave,
  onDelete,
  className = '',
}) => {
  const [formState, setFormState] = useState<FileMetadata>(metadata);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, boolean> = {};
    
    if (!formState.title?.trim()) {
      newErrors.title = true;
    }
    
    // Add more validation rules as needed
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formState);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div>
        <Label htmlFor="title" className="font-medium">
          Title
        </Label>
        <Input
          id="title"
          name="title"
          value={formState.title || ''}
          onChange={handleChange}
          placeholder="Image title"
          aria-describedby={errors.title ? "title-error" : undefined}
          aria-invalid={errors.title ? "true" : "false"}
          required
        />
        {errors.title && (
          <p id="title-error" className="text-sm text-red-500 mt-1">
            Title is required
          </p>
        )}
      </div>
      
      <div>
        <Label htmlFor="altText" className="font-medium">
          Alt Text
        </Label>
        <Input
          id="altText"
          name="altText"
          value={formState.altText || ''}
          onChange={handleChange}
          placeholder="Alternative text for accessibility"
        />
      </div>
      
      <div>
        <Label htmlFor="description" className="font-medium">
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          value={formState.description || ''}
          onChange={handleChange}
          placeholder="Image description"
          rows={3}
          aria-describedby={errors.description ? "description-error" : undefined}
          aria-invalid={errors.description ? "true" : "false"}
          required
        />
      </div>
      
      <div className="flex justify-between pt-2">
        <Button 
          type="submit" 
          className="gap-1"
        >
          <Save className="h-4 w-4" />
          Save
        </Button>
        
        {onDelete && (
          <Button 
            type="button" 
            variant="destructive"
            onClick={onDelete}
            className="gap-1"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        )}
      </div>
    </form>
  );
};

export default ImageMetadataForm;
