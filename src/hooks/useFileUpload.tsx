
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const fileInfo: FileInfo = {
        id: Date.now().toString(),
        name: selectedFile.name,
        type: selectedFile.type,
        size: Math.round(selectedFile.size / 1024),
        url: filePreview || '/placeholder.svg',
        uploadedBy: userInfo?.email || 'unknown',
        uploadedOn: new Date().toISOString(),
        galleryId: targetGalleryId,
        metadata: {
          ...metadata
        }
      };
      
      onFileUploaded(fileInfo);
      setUploadedFile(fileInfo);
      
      resetFileSelection();
      resetMetadata();
      
      showUploadSuccessNotification(fileInfo, selectedFile.name);
      
    } catch (error) {
      showUploadErrorNotification();
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
    handleFile,
    handleMetadataChange,
    handleUpload,
    setTargetGalleryId,
    resetUploadedFile
  };
};
