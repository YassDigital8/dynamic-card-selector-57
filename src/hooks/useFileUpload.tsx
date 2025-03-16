
import { useState } from 'react';
import { FileInfo, Gallery } from '@/models/FileModel';
import { useAuthentication } from '@/hooks/useAuthentication';
import { useFileSelection } from './upload/useFileSelection';
import { useFileMetadata } from './upload/useFileMetadata';
import { useFileUploadState } from './upload/useFileUploadState';
import { useUploadNotification } from './upload/useUploadNotification';

interface UseFileUploadProps {
  onFileUploaded: (file: FileInfo) => void;
  selectedGalleryId?: string;
  galleries: Gallery[];
}

export const useFileUpload = ({ onFileUploaded, selectedGalleryId = '', galleries }: UseFileUploadProps) => {
  const { userInfo } = useAuthentication();
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const {
    selectedFile,
    filePreview,
    isImage,
    handleFile: baseHandleFile,
    resetFileSelection
  } = useFileSelection();
  
  const {
    metadata,
    handleMetadataChange,
    updateTitleFromFileName,
    resetMetadata,
    validateMetadata
  } = useFileMetadata();
  
  const {
    isUploading,
    setIsUploading,
    targetGalleryId,
    setTargetGalleryId,
    uploadedFile,
    setUploadedFile,
    resetUploadedFile
  } = useFileUploadState({ selectedGalleryId, galleries });
  
  const {
    showUploadSuccessNotification,
    showUploadErrorNotification
  } = useUploadNotification();

  const handleFile = (file: File | null) => {
    const { fileName } = baseHandleFile(file);
    
    if (fileName) {
      updateTitleFromFileName(fileName);
    } else {
      resetMetadata();
    }
  };

  const simulateProgress = () => {
    // Reset progress
    setUploadProgress(0);
    
    // Simulate upload progress with intervals
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        // Gradually increment progress, but stop at 90% (the final 10% comes when upload completes)
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 90) {
          clearInterval(interval);
          return 90;
        }
        return newProgress;
      });
    }, 300);
    
    return interval;
  };

  const handleUpload = async () => {
    if (!selectedFile || !targetGalleryId) {
      showUploadErrorNotification();
      return;
    }
    
    if (!validateMetadata(isImage)) {
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Start progress simulation
      const progressInterval = simulateProgress();
      
      // Simulate upload with delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear progress interval and set to 100%
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      const selectedGallery = galleries.find(g => g.id === targetGalleryId);
      const galleryName = selectedGallery ? selectedGallery.name : 'Unknown Gallery';
      
      const fileInfo: FileInfo = {
        id: Date.now().toString(),
        name: selectedFile.name,
        type: selectedFile.type,
        size: Math.round(selectedFile.size / 1024),
        url: filePreview || '/placeholder.svg',
        uploadedBy: userInfo?.email || 'unknown',
        uploadedOn: new Date().toISOString(),
        galleryId: targetGalleryId,
        galleryName: galleryName,
        metadata: {
          ...metadata
        }
      };
      
      onFileUploaded(fileInfo);
      setUploadedFile(fileInfo);
      
      resetFileSelection();
      resetMetadata();
      
      showUploadSuccessNotification(fileInfo, selectedFile.name);
      
      // Reset progress after a brief delay to ensure the 100% state is visible
      setTimeout(() => {
        setUploadProgress(0);
      }, 500);
      
    } catch (error) {
      showUploadErrorNotification();
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    selectedFile,
    filePreview,
    isImage,
    isUploading,
    targetGalleryId,
    metadata,
    uploadedFile,
    uploadProgress,
    handleFile,
    handleMetadataChange,
    handleUpload,
    setTargetGalleryId,
    resetUploadedFile
  };
};
