import React from 'react';
import { Button } from '@/components/ui/button';
import { FileDropzone } from '@/components/gallery/FileDropzone';
import ImageMetadataForm from '@/components/gallery/ImageMetadataForm';
import { useFileSelection } from '@/hooks/upload/useFileSelection';
import { useFileMetadata, FileMetadataValues } from '@/hooks/upload/useFileMetadata';

interface UploadTabProps {
  itemLabel: string;
  onAddImage: (imageUrl: string, metadata?: FileMetadataValues) => void;
  onClose: () => void;
  onCancel: () => void;
}

export const UploadTab: React.FC<UploadTabProps> = ({
  itemLabel,
  onAddImage,
  onClose,
  onCancel
}) => {
  const {
    selectedFile,
    filePreview,
    isImage,
    handleFile,
    resetFileSelection
  } = useFileSelection();

  const {
    metadata,
    handleMetadataChange,
    validateMetadata,
    resetMetadata
  } = useFileMetadata();

  const handleAddFromUpload = () => {
    if (filePreview && isImage) {
      if (!validateMetadata(isImage)) {
        return;
      }
      onAddImage(filePreview, metadata);
      resetFileSelection();
      resetMetadata();
      onClose();
    }
  };

  return (
    <>
      <FileDropzone
        onFileSelected={handleFile}
        selectedFile={selectedFile}
        filePreview={filePreview}
        isImage={isImage}
        accept="image/*"
      />
      
      {selectedFile && isImage && (
        <ImageMetadataForm
          metadata={metadata}
          onMetadataChange={handleMetadataChange}
          isImage={isImage}
        />
      )}
      
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
          onClick={handleAddFromUpload}
          disabled={!selectedFile || !isImage}
        >
          Add Image
        </Button>
      </div>
    </>
  );
};
