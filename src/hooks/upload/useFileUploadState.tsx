
import { useState } from 'react';
import { FileInfo, Gallery } from '@/models/FileModel';

interface UseFileUploadStateProps {
  selectedGalleryId?: string;
  galleries: Gallery[];
}

export const useFileUploadState = ({ selectedGalleryId = '', galleries }: UseFileUploadStateProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [targetGalleryId, setTargetGalleryId] = useState<string>(selectedGalleryId);
  const [uploadedFile, setUploadedFile] = useState<FileInfo | null>(null);

  const resetUploadedFile = () => {
    setUploadedFile(null);
  };

  return {
    isUploading,
    setIsUploading,
    targetGalleryId,
    setTargetGalleryId,
    uploadedFile,
    setUploadedFile,
    resetUploadedFile
  };
};
