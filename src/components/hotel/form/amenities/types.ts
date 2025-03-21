
import { UseFormReturn } from 'react-hook-form';
import { AmenityImage } from '@/models/HotelModel';
import { FileMetadataValues } from '@/hooks/upload/useFileMetadata';
import { FileInfo } from '@/models/FileModel';
import { FormValues } from '../formSchema';
import { LucideIcon } from 'lucide-react';

export type AmenityWithImages = 'bar' | 'gym' | 'spa' | 'restaurant' | 'breakfast' | 'swimmingPool';

export interface UseAmenityImagesProps {
  form: UseFormReturn<FormValues>;
  hotelId?: string;
}

export interface UseAmenityImagesReturn {
  selectedAmenity: AmenityWithImages | null;
  isImageDialogOpen: boolean;
  openImageDialog: (amenityName: string) => void;
  handleAddImage: (imageUrl: string, metadata?: FileMetadataValues) => void;
  handleAddMultipleImages: (files: FileInfo[]) => void;
  handleRemoveImage: (amenityKey: string, index: number) => void;
  handleCloseDialog: () => void;
}

export interface AmenityListItemType {
  name: string;
  label: string;
  icon: LucideIcon;
  hasImages?: boolean;
  imageField?: string;
}
