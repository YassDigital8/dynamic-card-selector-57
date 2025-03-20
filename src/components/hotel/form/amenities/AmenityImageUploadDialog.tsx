
import React from 'react';
import { FileMetadataValues } from '@/hooks/upload/useFileMetadata';
import { FileInfo } from '@/models/FileModel';
import { ImageUploadDialog } from '@/components/hotel/form/shared';

interface AmenityImageUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddImage: (imageUrl: string, metadata?: FileMetadataValues) => void;
  amenityLabel: string;
  hotelId?: string;
  multiSelect?: boolean;
  onSelectMultiple?: (files: FileInfo[]) => void;
}

const AmenityImageUploadDialog: React.FC<AmenityImageUploadDialogProps> = ({
  isOpen,
  onClose,
  onAddImage,
  amenityLabel,
  multiSelect = false,
  onSelectMultiple
}) => {
  return (
    <ImageUploadDialog
      isOpen={isOpen}
      onClose={onClose}
      onAddImage={onAddImage}
      itemLabel={amenityLabel}
      multiSelect={multiSelect}
      onSelectMultiple={onSelectMultiple}
    />
  );
};

export default AmenityImageUploadDialog;
