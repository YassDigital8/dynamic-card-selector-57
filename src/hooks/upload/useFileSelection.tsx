
import { useState } from 'react';

export const useFileSelection = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isImage, setIsImage] = useState(false);

  const handleFile = (file: File | null) => {
    if (!file) {
      setSelectedFile(null);
      setFilePreview(null);
      setIsImage(false);
      return { fileName: '' };
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
    return { fileName };
  };

  const resetFileSelection = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setIsImage(false);
  };

  return {
    selectedFile,
    filePreview,
    isImage,
    handleFile,
    resetFileSelection
  };
};
