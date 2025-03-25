
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../../formSchema';
import { FileInfo } from '@/models/FileModel';

// List of amenities that can have images
export type AmenityWithImages = 'bar' | 'gym' | 'spa' | 'restaurant' | 'breakfast' | 'swimmingPool';

// Type for any amenity key
export type AmenityKeyType = AmenityWithImages | string;

export interface AmenityHookProps {
  form: UseFormReturn<FormValues>;
  hotelId?: string;
}

export interface AmenityStepManagerReturn {
  selectedAmenity: AmenityWithImages | null;
  isImageDialogOpen: boolean;
  openImageDialog: (amenityName: string) => void;
  handleAddImage: (imageUrl: string, metadata?: any) => void;
  handleAddMultipleImages: (files: FileInfo[]) => void;
  handleRemoveImage: (amenityKey: string, index: number) => void;
  handleCloseDialog: () => void;
  hasEnabledAmenities: () => boolean;
  getEnabledCount: () => number;
}
