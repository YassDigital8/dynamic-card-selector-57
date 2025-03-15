
import React from 'react';
import { FileInfo, Gallery } from '@/models/FileModel';
import { FileDropzone } from './FileDropzone';
import { ImageMetadataForm } from './ImageMetadataForm';
import { GallerySelector } from './GallerySelector';
import { UploadButton } from './UploadButton';
import { useFileUpload } from '@/hooks/useFileUpload';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface UploadComponentProps {
  onFileUploaded: (file: FileInfo) => void;
  galleries: Gallery[];
  selectedGalleryId?: string;
  onViewFile?: (file: FileInfo) => void;
}

export const UploadComponent: React.FC<UploadComponentProps> = ({ 
  onFileUploaded, 
  galleries,
  selectedGalleryId,
  onViewFile 
}) => {
  const {
    selectedFile,
    filePreview,
    isImage,
    isUploading,
    targetGalleryId,
    metadata,
    uploadedFile,
    handleFile,
    handleMetadataChange,
    handleUpload,
    setTargetGalleryId,
    resetUploadedFile
  } = useFileUpload({ 
    onFileUploaded, 
    selectedGalleryId,
    galleries 
  });

  const handleViewFile = () => {
    if (uploadedFile && onViewFile) {
      onViewFile(uploadedFile);
      resetUploadedFile();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <GallerySelector 
          galleries={galleries}
          selectedGalleryId={targetGalleryId}
          onGalleryChange={setTargetGalleryId}
        />
      </div>

      {uploadedFile ? (
        <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center">
          <h3 className="text-lg font-medium text-green-800 mb-2">
            File Uploaded Successfully
          </h3>
          <p className="text-green-700 mb-4">
            Your file "{uploadedFile.name}" has been uploaded.
          </p>
          <div className="flex justify-center gap-3">
            <Button 
              onClick={handleViewFile}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" /> View File
            </Button>
            <Button 
              variant="outline" 
              onClick={resetUploadedFile}
            >
              Upload Another File
            </Button>
          </div>
        </div>
      ) : (
        <>
          <FileDropzone 
            onFileSelected={handleFile}
            selectedFile={selectedFile}
            filePreview={filePreview}
            isImage={isImage}
          />

          {selectedFile && (
            <ImageMetadataForm 
              metadata={metadata}
              onMetadataChange={handleMetadataChange}
              isImage={isImage}
            />
          )}

          {selectedFile && (
            <UploadButton 
              onUpload={handleUpload}
              isUploading={isUploading}
              disabled={!targetGalleryId}
            />
          )}
        </>
      )}
    </div>
  );
};
