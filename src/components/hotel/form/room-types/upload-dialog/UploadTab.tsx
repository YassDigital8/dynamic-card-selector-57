
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileDropzone } from '@/components/gallery/FileDropzone';
import { ImageMetadataForm } from '@/components/gallery/ImageMetadataForm';
import { FileMetadataValues } from '@/hooks/upload/useFileMetadata';

interface UploadTabProps {
  selectedFile: File | null;
  filePreview: string | null;
  isImage: boolean;
  metadata: FileMetadataValues;
  onFileSelected: (file: File | null) => void;
  onMetadataChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCancel: () => void;
  onAddImage: () => void;
}

const UploadTab: React.FC<UploadTabProps> = ({
  selectedFile,
  filePreview,
  isImage,
  metadata,
  onFileSelected,
  onMetadataChange,
  onCancel,
  onAddImage
}) => {
  return (
    <div className="space-y-4">
      <FileDropzone
        onFileSelected={onFileSelected}
        selectedFile={selectedFile}
        filePreview={filePreview}
        isImage={isImage}
        accept="image/*"
      />
      
      {selectedFile && isImage && (
        <ImageMetadataForm
          metadata={metadata}
          onMetadataChange={onMetadataChange}
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
          onClick={onAddImage}
          disabled={!selectedFile || !isImage}
        >
          Add Image
        </Button>
      </div>
    </div>
  );
};

export default UploadTab;
