
import React from 'react';
import { FileMetadataValues } from '@/hooks/upload/useFileMetadata';
import { FileInfo } from '@/models/FileModel';
import { ImageUploadDialog } from '@/components/hotel/form/shared';

interface RoomTypeImageUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddImage: (imageUrl: string, metadata?: FileMetadataValues) => void;
  roomTypeName: string;
  hotelId?: string;
  multiSelect?: boolean;
  onSelectMultiple?: (files: FileInfo[]) => void;
}

const RoomTypeImageUploadDialog: React.FC<RoomTypeImageUploadDialogProps> = ({
  isOpen,
  onClose,
  onAddImage,
  roomTypeName,
  multiSelect = false,
  onSelectMultiple
}) => {
  return (
    <ImageUploadDialog
      isOpen={isOpen}
      onClose={onClose}
      onAddImage={onAddImage}
      itemLabel={roomTypeName}
      multiSelect={multiSelect}
      onSelectMultiple={onSelectMultiple}
    />
  );
};

export default RoomTypeImageUploadDialog;
