
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Image } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ImageMetadata {
  title: string;
  altText: string;
  caption: string;
  description: string;
}

interface ImageMetadataFormProps {
  metadata: ImageMetadata;
  onMetadataChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isImage: boolean;
  errors?: Partial<Record<keyof ImageMetadata, string>>;
}

export const ImageMetadataForm: React.FC<ImageMetadataFormProps> = ({
  metadata,
  onMetadataChange,
  isImage,
  errors = {}
}) => {
  const isMobile = useIsMobile();
  
  return (
    <Card>
      <CardContent className={isMobile ? "p-3 space-y-3" : "p-6 space-y-4"}>
        <div className="flex items-center">
          <Image className="h-5 w-5 mr-2 text-blue-500" aria-hidden="true" />
          <h2 className="text-lg font-medium" id="file-info-heading">File Information</h2>
        </div>
        
        <div className={isMobile ? "space-y-3" : "space-y-4"} role="group" aria-labelledby="file-info-heading">
          <div className="space-y-2">
            <Label htmlFor="title" required>Title</Label>
            <Input
              id="title"
              name="title"
              value={metadata.title}
              onChange={onMetadataChange}
              placeholder="Enter file title"
              error={!!errors.title}
              aria-describedby={errors.title ? "title-error" : undefined}
              required
            />
            {errors.title && (
              <p id="title-error" className="text-sm text-destructive mt-1" role="alert">{errors.title}</p>
            )}
          </div>
          
          {isImage && (
            <div className="space-y-2">
              <Label htmlFor="altText" required>Alternative Text</Label>
              <Input
                id="altText"
                name="altText"
                value={metadata.altText}
                onChange={onMetadataChange}
                placeholder="Describe the image for accessibility"
                error={!!errors.altText}
                aria-describedby={errors.altText ? "altText-error" : undefined}
                required
              />
              {errors.altText && (
                <p id="altText-error" className="text-sm text-destructive mt-1" role="alert">{errors.altText}</p>
              )}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="caption" required>Caption</Label>
            <Input
              id="caption"
              name="caption"
              value={metadata.caption}
              onChange={onMetadataChange}
              placeholder="Enter a caption for the file"
              error={!!errors.caption}
              aria-describedby={errors.caption ? "caption-error" : undefined}
              required
            />
            {errors.caption && (
              <p id="caption-error" className="text-sm text-destructive mt-1" role="alert">{errors.caption}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" required>Description</Label>
            <Textarea
              id="description"
              name="description"
              value={metadata.description}
              onChange={onMetadataChange}
              placeholder="Enter a detailed description"
              rows={isMobile ? 3 : 4}
              error={!!errors.description}
              aria-describedby={errors.description ? "description-error" : undefined}
              required
            />
            {errors.description && (
              <p id="description-error" className="text-sm text-destructive mt-1" role="alert">{errors.description}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
