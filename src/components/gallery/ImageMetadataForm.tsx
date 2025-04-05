
import React, { useState, ChangeEvent } from 'react';
import { Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileMetadata } from '@/models/FileModel';
import { FileMetadataValues } from '@/hooks/upload/useFileMetadata';

interface ImageMetadataFormProps {
  metadata: FileMetadataValues;
  onMetadataChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave?: (metadata: FileMetadata) => void;
  onDelete?: () => void;
  isImage: boolean;
  className?: string;
}

const ImageMetadataForm: React.FC<ImageMetadataFormProps> = ({
  metadata,
  onMetadataChange,
  onSave,
  onDelete,
  isImage,
  className = '',
}) => {
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, boolean> = {};
    
    if (!metadata.title?.trim()) {
      newErrors.title = true;
    }
    
    if (isImage && !metadata.altText?.trim()) {
      newErrors.altText = true;
    }
    
    // Add more validation rules as needed
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm() && onSave) {
      onSave(metadata as unknown as FileMetadata);
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
          value={metadata.title || ''}
          onChange={onMetadataChange}
          placeholder="Image title"
          aria-describedby={errors.title ? "title-error" : undefined}
          aria-invalid={errors.title ? true : false}
          required
        />
        {errors.title && (
          <p id="title-error" className="text-sm text-red-500 mt-1">
            Title is required
          </p>
        )}
      </div>
      
      {isImage && (
        <div>
          <Label htmlFor="altText" className="font-medium">
            Alt Text
          </Label>
          <Input
            id="altText"
            name="altText"
            value={metadata.altText || ''}
            onChange={onMetadataChange}
            placeholder="Alternative text for accessibility"
            aria-describedby={errors.altText ? "altText-error" : undefined}
            aria-invalid={errors.altText ? true : false}
            required={isImage}
          />
          {errors.altText && (
            <p id="altText-error" className="text-sm text-red-500 mt-1">
              Alt text is required for images
            </p>
          )}
        </div>
      )}
      
      <div>
        <Label htmlFor="caption" className="font-medium">
          Caption
        </Label>
        <Input
          id="caption"
          name="caption"
          value={metadata.caption || ''}
          onChange={onMetadataChange}
          placeholder="Short caption"
        />
      </div>
      
      <div>
        <Label htmlFor="description" className="font-medium">
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          value={metadata.description || ''}
          onChange={onMetadataChange}
          placeholder="Image description"
          rows={3}
          aria-describedby={errors.description ? "description-error" : undefined}
          aria-invalid={errors.description ? true : false}
        />
      </div>
      
      {onSave && (
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
      )}
    </form>
  );
};

export default ImageMetadataForm;
