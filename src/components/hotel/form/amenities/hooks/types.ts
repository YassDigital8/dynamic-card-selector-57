
import { FileInfo } from '@/models/FileModel';
import { FileMetadataValues } from '@/hooks/upload/useFileMetadata';
import { AmenityImage } from '@/models/HotelModel';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../../formSchema';

// Types for amenities with images
export type AmenityKeyType = keyof typeof import('../constants').amenitiesWithImages;

// Selected amenity type
export interface SelectedAmenityType {
  key: AmenityKeyType;
  label: string;
}

// Common props for amenity hooks
export interface AmenityHookProps {
  form: UseFormReturn<FormValues>;
  hotelId?: string;
}

// Props for the dialog state hook
export interface DialogStateProps {
  selectedAmenity: SelectedAmenityType | null;
  setSelectedAmenity: (amenity: SelectedAmenityType | null) => void;
  setIsImageDialogOpen: (isOpen: boolean) => void;
}

// Return type for the useAmenityStepManager hook
export interface AmenityStepManagerReturn {
  selectedAmenity: SelectedAmenityType | null;
  isImageDialogOpen: boolean;
  openImageDialog: (amenityKey: string) => void;
  handleAddImage: (imageUrl: string, metadata?: FileMetadataValues) => void;
  handleAddMultipleImages: (files: FileInfo[]) => void;
  handleRemoveImage: (amenityKey: string, index: number) => void;
  handleCloseDialog: () => void;
  hasEnabledAmenities: () => boolean;
}
