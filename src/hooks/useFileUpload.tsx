
import { useState } from 'react';
import { FileInfo, Gallery } from '@/models/FileModel';
import { useToast } from '@/hooks/use-toast';
import { useAuthentication } from '@/hooks/useAuthentication';

interface UseFileUploadProps {
  onFileUploaded: (file: FileInfo) => void;
  selectedGalleryId?: string;
  galleries: Gallery[];
}

export const useFileUpload = ({ onFileUploaded, selectedGalleryId = '', galleries }: UseFileUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isImage, setIsImage] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [targetGalleryId, setTargetGalleryId] = useState<string>(selectedGalleryId);
  const [uploadedFile, setUploadedFile] = useState<FileInfo | null>(null);
  const [metadata, setMetadata] = useState({
    title: '',
    altText: '',
    caption: '',
    description: ''
  });
  
  const { toast } = useToast();
  const { userInfo } = useAuthentication();

  const handleFile = (file: File | null) => {
    if (!file) {
      setSelectedFile(null);
      setFilePreview(null);
      setIsImage(false);
      setMetadata({
        title: '',
        altText: '',
        caption: '',
        description: ''
      });
      return;
    }
    
    setSelectedFile(file);
    
    const isImageFile = file.type.startsWith('image/');
    setIsImage(isImageFile);
    
    if (isImageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setFilePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
    
    const fileName = file.name.split('.').slice(0, -1).join('.');
    setMetadata(prev => ({
      ...prev,
      title: fileName
    }));
  };

  const handleMetadataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMetadata(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateMetadata = () => {
    if (!metadata.title.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Title is required.",
      });
      return false;
    }
    
    if (!metadata.caption.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Caption is required.",
      });
      return false;
    }
    
    if (!metadata.description.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Description is required.",
      });
      return false;
    }
    
    if (isImage && !metadata.altText.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Alternative text is required for images.",
      });
      return false;
    }
    
    return true;
  };

  const handleUpload = async () => {
    if (!selectedFile || !targetGalleryId) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "Please select a file and a gallery to upload to.",
      });
      return;
    }
    
    if (!validateMetadata()) {
      return;
    }
    
    setIsUploading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const selectedGalleryName = galleries.find(gallery => gallery.id === targetGalleryId)?.name || 'Unknown gallery';
      
      const fileInfo: FileInfo = {
        id: Date.now().toString(),
        name: selectedFile.name,
        type: selectedFile.type,
        size: Math.round(selectedFile.size / 1024),
        url: filePreview || '/placeholder.svg',
        uploadedBy: userInfo?.email || 'unknown',
        uploadedOn: new Date().toISOString(),
        galleryId: targetGalleryId,
      };
      
      fileInfo.metadata = {
        ...metadata
      };
      
      onFileUploaded(fileInfo);
      setUploadedFile(fileInfo);
      
      setSelectedFile(null);
      setFilePreview(null);
      setIsImage(false);
      setMetadata({
        title: '',
        altText: '',
        caption: '',
        description: ''
      });
      
      toast({
        title: "Upload successful",
        description: `File "${selectedFile.name}" has been uploaded to "${selectedGalleryName}".`,
      });
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "There was an error uploading your file.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const resetUploadedFile = () => {
    setUploadedFile(null);
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
