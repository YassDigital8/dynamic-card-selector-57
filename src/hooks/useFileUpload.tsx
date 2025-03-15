
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
        metadata: {
          ...metadata
        }
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
        title: "File Uploaded Successfully",
        description: (
          <div className="bg-green-50 py-2 -mx-4 px-4 -my-2 rounded-md text-center">
            <p className="text-green-700 mb-3">
              Your file "{selectedFile.name}" has been uploaded.
            </p>
            <div className="flex justify-center gap-3">
              <button 
                onClick={() => document.dispatchEvent(new CustomEvent('view-uploaded-file', { detail: fileInfo }))}
                className="bg-gray-800 text-white px-3 py-1.5 rounded-md flex items-center gap-2 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                View File
              </button>
              <button 
                onClick={() => {
                  resetUploadedFile();
                  document.dispatchEvent(new CustomEvent('reset-upload'));
                }}
                className="bg-white text-gray-800 border border-gray-300 px-3 py-1.5 rounded-md text-sm"
              >
                Upload Another File
              </button>
            </div>
          </div>
        ),
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
