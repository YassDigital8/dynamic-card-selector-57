
import { AmenityImage } from '@/models/HotelModel';
import { useToast } from '@/hooks/use-toast';

// Process a single file upload for logo
export const handleFileUpload = (
  file: File | undefined, 
  toast: ReturnType<typeof useToast>['toast'],
  onSuccess: (dataUrl: string) => void
) => {
  if (!file) return;
  
  if (!file.type.startsWith('image/')) {
    toast({
      title: "Invalid file type",
      description: "Please upload an image file (JPEG, PNG, etc.)",
      variant: "destructive"
    });
    return;
  }
  
  const reader = new FileReader();
  reader.onload = (e) => {
    if (e.target?.result) {
      onSuccess(e.target.result as string);
      toast({
        title: "Logo updated",
        description: "Hotel logo has been updated successfully",
      });
    }
  };
  reader.readAsDataURL(file);
};

// Process amenity images to ensure they have the correct structure
export const processAmenityImages = (data: any) => {
  // Debug - log the form data before submission
  console.log('Processing amenity images. Form data:', JSON.stringify(data, null, 2));
  
  // Create a deep copy to ensure we don't mutate the original data
  const processedData = JSON.parse(JSON.stringify(data));
  
  // Ensure amenity images data is correctly structured
  const amenityKeysWithImages = ['bar', 'gym', 'spa', 'restaurant', 'breakfast', 'swimmingPool'];
  amenityKeysWithImages.forEach(amenityKey => {
    const imagesKey = `${amenityKey}Images` as string;
    const images = processedData.amenities[imagesKey];
    
    // Ensure images is always an array
    if (!Array.isArray(images)) {
      console.log(`Initializing empty array for ${imagesKey} (was ${typeof images})`);
      processedData.amenities[imagesKey] = [] as AmenityImage[];
      return;
    }
    
    console.log(`Processing ${images.length} images for ${amenityKey}`);
    
    // Process each image in the array to ensure valid structure
    const validatedImages = images.map((img: any, index: number) => {
      if (typeof img !== 'object' || !img) {
        return {
          url: typeof img === 'string' ? img : '',
          id: `${amenityKey}-${index}-${Date.now()}`
        };
      }
      
      return {
        ...img,
        url: img.url || '',
        id: img.id || `${amenityKey}-${index}-${Date.now()}`
      };
    }).filter((img: any) => img.url);
    
    // Assign the validated images back to the processed data
    processedData.amenities[imagesKey] = validatedImages;
    
    console.log(`Validated ${validatedImages.length} images for ${amenityKey}`);
  });
  
  return processedData;
};
