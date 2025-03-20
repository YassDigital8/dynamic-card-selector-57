
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Plus, Images, LucideIcon } from 'lucide-react';
import { 
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form';
import { AmenityImage } from '@/models/HotelModel';
import { FormValues } from '../formSchema';
import { RoomImagesCarousel } from '../../form/room-types';

interface AmenityItemProps {
  name: string;
  label: string;
  icon: LucideIcon;
  hasImages?: boolean;
  imageField?: string;
  form: UseFormReturn<FormValues>;
  onAddImage?: (amenityName: string) => void;
  onAddMultipleImages?: (amenityName: string) => void;
  onRemoveImage?: (amenityKey: string, index: number) => void;
}

const AmenityItem: React.FC<AmenityItemProps> = ({
  name,
  label,
  icon: Icon,
  hasImages = false,
  imageField,
  form,
  onAddImage,
  onAddMultipleImages,
  onRemoveImage
}) => {
  const isChecked = form.watch(name as any);
  const images = imageField ? form.watch(imageField as any) || [] : [];
  
  const handleDeleteImage = (imageUrl: string) => {
    if (!imageField || !onRemoveImage) return;
    
    const amenityKey = name.split('.')[1];
    const imageIndex = images.findIndex((img: AmenityImage) => img.url === imageUrl);
    
    if (imageIndex !== -1) {
      onRemoveImage(amenityKey, imageIndex);
    }
  };

  return (
    <div className="space-y-2">
      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
        <FormControl>
          <Checkbox
            checked={isChecked}
            onCheckedChange={(checked) => {
              form.setValue(name as any, !!checked, { shouldDirty: true });
            }}
          />
        </FormControl>
        <div className="flex items-center space-x-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <FormLabel className="m-0">{label}</FormLabel>
        </div>
      </FormItem>
      
      {/* Image section for amenities that can have images */}
      {hasImages && imageField && (
        <FormItem className={`mt-2 ${!images.length && !isChecked ? 'hidden' : ''}`}>
          <div className="flex items-center justify-between">
            <FormLabel className="text-xs">{label} Images</FormLabel>
            <div className="flex space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="h-7"
                onClick={() => onAddImage && onAddImage(name)}
                disabled={!isChecked}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Image
              </Button>
              
              {onAddMultipleImages && (
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="h-7"
                  onClick={() => onAddMultipleImages(name)}
                  disabled={!isChecked}
                >
                  <Images className="h-3 w-3 mr-1" />
                  Add Multiple
                </Button>
              )}
            </div>
          </div>
          <FormControl>
            {images.length > 0 ? (
              images.length > 1 ? (
                <RoomImagesCarousel 
                  images={images.map((img: AmenityImage) => img.url)}
                  onDeleteImage={onRemoveImage ? handleDeleteImage : undefined}
                  className="mt-2"
                />
              ) : (
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {images.map((image: AmenityImage, index: number) => (
                    <div key={index} className="relative group">
                      <img 
                        src={image.url} 
                        alt={image.description || label}
                        className="h-16 w-full object-cover rounded border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => onRemoveImage && onRemoveImage(name.split('.')[1], index)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="text-xs text-muted-foreground mt-1">No images added yet</div>
            )}
          </FormControl>
          <FormDescription className="text-xs">
            Upload images of your {label.toLowerCase()}
          </FormDescription>
        </FormItem>
      )}
    </div>
  );
};

export default AmenityItem;
