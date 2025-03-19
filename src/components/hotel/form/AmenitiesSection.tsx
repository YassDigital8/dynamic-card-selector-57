
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { 
  AirVent, 
  Utensils, 
  Coffee, 
  Wifi, 
  PawPrint,
  HotelIcon,
  Bath,
  BedDouble,
  Waves,
  Dumbbell,
  GlassWater,
  Image,
  Plus
} from 'lucide-react';
import { FormValues } from './formSchema';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileDropzone } from '@/components/gallery/FileDropzone';
import { useFileSelection } from '@/hooks/upload/useFileSelection';
import { AmenityImage } from '@/models/HotelModel';

interface AmenitiesSectionProps {
  form: UseFormReturn<FormValues>;
}

type AmenityWithImages = 'bar' | 'gym' | 'spa' | 'restaurant' | 'breakfast' | 'swimmingPool';

// Amenities that can have images
const amenitiesWithImages: Record<AmenityWithImages, string> = {
  bar: 'Bar',
  gym: 'Gym',
  spa: 'Spa',
  restaurant: 'Restaurant',
  breakfast: 'Breakfast',
  swimmingPool: 'Swimming Pool'
};

const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ form }) => {
  const [selectedAmenity, setSelectedAmenity] = useState<AmenityWithImages | null>(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  
  const {
    selectedFile,
    filePreview,
    isImage,
    handleFile,
    resetFileSelection
  } = useFileSelection();

  // Array of amenities for easier mapping
  const amenities = [
    { name: "amenities.airConditioning", label: "Air Conditioning", icon: AirVent },
    { name: "amenities.bar", label: "Bar", icon: GlassWater, hasImages: true, imageField: "amenities.barImages" },
    { name: "amenities.gym", label: "Gym", icon: Dumbbell, hasImages: true, imageField: "amenities.gymImages" },
    { name: "amenities.parking", label: "Parking", icon: HotelIcon },
    { name: "amenities.spa", label: "Spa", icon: Bath, hasImages: true, imageField: "amenities.spaImages" },
    { name: "amenities.restaurant", label: "Restaurant", icon: Utensils, hasImages: true, imageField: "amenities.restaurantImages" },
    { name: "amenities.breakfast", label: "Breakfast", icon: Coffee, hasImages: true, imageField: "amenities.breakfastImages" },
    { name: "amenities.wifi", label: "WiFi", icon: Wifi },
    { name: "amenities.swimmingPool", label: "Swimming Pool", icon: Waves, hasImages: true, imageField: "amenities.swimmingPoolImages" },
    { name: "amenities.petsAllowed", label: "Pets Allowed", icon: PawPrint },
    { name: "amenities.extraBed", label: "Extra Bed", icon: BedDouble }
  ];
  
  // Get the image field name based on the amenity
  const getImageFieldName = (amenityName: string): string | undefined => {
    const amenity = amenities.find(a => a.name === amenityName);
    return amenity?.imageField;
  };
  
  const openImageDialog = (amenityName: string) => {
    // Extract just the amenity key from the full path (e.g., "amenities.bar" -> "bar")
    const amenityKey = amenityName.split('.')[1] as AmenityWithImages;
    setSelectedAmenity(amenityKey);
    setIsImageDialogOpen(true);
  };
  
  const handleAddImage = () => {
    if (!selectedAmenity || !selectedFile || !filePreview) {
      return;
    }
    
    const imageFieldName = `amenities.${selectedAmenity}Images` as const;
    const currentImages = form.getValues(imageFieldName as any) || [];
    
    const newImage: AmenityImage = {
      url: filePreview,
      description: `${amenitiesWithImages[selectedAmenity]} image`
    };
    
    form.setValue(imageFieldName as any, [...currentImages, newImage], { shouldDirty: true });
    
    resetFileSelection();
    setIsImageDialogOpen(false);
  };
  
  const handleRemoveImage = (amenityName: string, index: number) => {
    const imageFieldName = `amenities.${amenityName}Images` as const;
    const currentImages = form.getValues(imageFieldName as any) || [];
    
    const updatedImages = currentImages.filter((_, i) => i !== index);
    
    form.setValue(imageFieldName as any, updatedImages, { shouldDirty: true });
  };

  return (
    <div className="space-y-6 col-span-2">
      <h3 className="text-lg font-medium text-foreground">Amenities</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {amenities.map((amenity) => (
          <div key={amenity.name} className="space-y-2">
            <FormField
              control={form.control}
              name={amenity.name as any}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="flex items-center space-x-2">
                    <amenity.icon className="h-4 w-4 text-muted-foreground" />
                    <FormLabel className="m-0">{amenity.label}</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            
            {/* Image section for amenities that can have images */}
            {amenity.hasImages && (
              <FormField
                control={form.control}
                name={amenity.imageField as any}
                render={({ field }) => (
                  <FormItem className={`mt-2 ${!field.value?.length ? 'hidden' : ''}`}>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-xs">{amenity.label} Images</FormLabel>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        className="h-7"
                        onClick={() => openImageDialog(amenity.name)}
                        disabled={!form.getValues(amenity.name as any)}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Image
                      </Button>
                    </div>
                    <FormControl>
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        {(field.value || []).map((image: AmenityImage, index: number) => (
                          <div key={index} className="relative group">
                            <img 
                              src={image.url} 
                              alt={image.description || amenity.label}
                              className="h-16 w-full object-cover rounded border"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleRemoveImage(amenity.name.split('.')[1], index)}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    </FormControl>
                    <FormDescription className="text-xs">
                      Upload images of your {amenity.label.toLowerCase()}
                    </FormDescription>
                  </FormItem>
                )}
              />
            )}
          </div>
        ))}
      </div>
      
      {/* Image Upload Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedAmenity && `Add ${amenitiesWithImages[selectedAmenity]} Image`}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <FileDropzone
              onFileSelected={handleFile}
              selectedFile={selectedFile}
              filePreview={filePreview}
              isImage={isImage}
              accept="image/*"
            />
            
            <div className="flex justify-end space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  resetFileSelection();
                  setIsImageDialogOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button 
                type="button"
                onClick={handleAddImage}
                disabled={!selectedFile || !isImage}
              >
                Add Image
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AmenitiesSection;
