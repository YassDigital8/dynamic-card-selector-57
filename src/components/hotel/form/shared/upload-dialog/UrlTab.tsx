
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { FileMetadataValues } from '@/hooks/upload/useFileMetadata';

interface UrlTabProps {
  itemLabel: string;
  onAddImage: (imageUrl: string, metadata?: FileMetadataValues) => void;
  onClose: () => void;
  onCancel: () => void;
}

export const UrlTab: React.FC<UrlTabProps> = ({
  itemLabel,
  onAddImage,
  onClose,
  onCancel
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const validateUrl = (url: string) => {
    // Basic URL validation
    try {
      new URL(url);
      return url.match(/\.(jpeg|jpg|gif|png|webp)$/) !== null;
    } catch (_) {
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);
    setIsValidUrl(url === '' || validateUrl(url));
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = () => {
    setIsImageLoaded(false);
    setIsValidUrl(false);
  };

  const handleAddFromUrl = () => {
    if (imageUrl && isValidUrl && isImageLoaded) {
      onAddImage(imageUrl, {
        title: itemLabel,
        altText: `${itemLabel} image`,
        caption: '',
        description: ''
      });
      onClose();
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="image-url">Image URL</Label>
          <Input
            id="image-url"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={handleUrlChange}
            className={!isValidUrl ? 'border-red-500' : ''}
          />
          
          {!isValidUrl && (
            <Alert variant="error" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please enter a valid image URL (ending with .jpg, .jpeg, .png, .gif, or .webp)
              </AlertDescription>
            </Alert>
          )}
        </div>

        {imageUrl && isValidUrl && (
          <div className="aspect-video bg-gray-100 flex items-center justify-center rounded-md overflow-hidden">
            <img 
              src={imageUrl} 
              alt="Preview" 
              className="max-h-full max-w-full object-contain"
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{ display: isImageLoaded ? 'block' : 'none' }}
            />
            {!isImageLoaded && <p className="text-sm text-muted-foreground">Loading image preview...</p>}
          </div>
        )}
      </div>
      
      <div className="flex justify-end space-x-2 mt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          type="button"
          onClick={handleAddFromUrl}
          disabled={!imageUrl || !isValidUrl || !isImageLoaded}
        >
          Add Image
        </Button>
      </div>
    </>
  );
};
