
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Image } from 'lucide-react';

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
}

export const ImageMetadataForm: React.FC<ImageMetadataFormProps> = ({
  metadata,
  onMetadataChange,
  isImage
}) => {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center">
          <Image className="h-5 w-5 mr-2 text-blue-500" />
          <h2 className="text-lg font-medium">File Information</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="flex items-center">
              Title <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              value={metadata.title}
              onChange={onMetadataChange}
              className="mt-1"
              placeholder="Enter file title"
              required
            />
          </div>
          
          {isImage && (
            <div>
              <Label htmlFor="altText" className="flex items-center">
                Alternative Text <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="altText"
                name="altText"
                value={metadata.altText}
                onChange={onMetadataChange}
                className="mt-1"
                placeholder="Describe the image for accessibility"
                required
              />
            </div>
          )}
          
          <div>
            <Label htmlFor="caption" className="flex items-center">
              Caption <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="caption"
              name="caption"
              value={metadata.caption}
              onChange={onMetadataChange}
              className="mt-1"
              placeholder="Enter a caption for the file"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description" className="flex items-center">
              Description <span className="text-red-500 ml-1">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              value={metadata.description}
              onChange={onMetadataChange}
              className="mt-1"
              placeholder="Enter a detailed description"
              rows={4}
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
