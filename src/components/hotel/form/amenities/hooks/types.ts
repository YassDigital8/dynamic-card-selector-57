
import { FileInfo } from '@/models/FileModel';
import { FileMetadataValues } from '@/hooks/upload/useFileMetadata';
import { AmenityImage } from '@/models/HotelModel';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../../formSchema';
import { LucideIcon } from 'lucide-react';

// Types for amenities with images
export type AmenityKeyType = string;

// Common props for amenity hooks
export interface AmenityHookProps {
  form: UseFormReturn<FormValues>;
  hotelId?: string;
}

// Return type for the useAmenityStepManager hook
export interface AmenityStepManagerReturn {
  selectedAmenity: string;
  isImageDialogOpen: boolean;
  openImageDialog: (amenityKey: string) => void;
  handleAddImage: (imageUrl: string, metadata?: FileMetadataValues) => void;
  handleAddMultipleImages: (files: FileInfo[]) => void;
  handleRemoveImage: (amenityKey: string, index: number) => void;
  handleCloseDialog: () => void;
  hasEnabledAmenities: () => boolean;
}

export interface AmenityListItemType {
  name: string;
  label: string;
  icon: LucideIcon;
  hasImages?: boolean;
  imageField?: string;
}
