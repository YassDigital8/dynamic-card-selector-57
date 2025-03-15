
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface FileMetadataValues {
  title: string;
  altText: string;
  caption: string;
  description: string;
}

export const useFileMetadata = () => {
  const [metadata, setMetadata] = useState<FileMetadataValues>({
    title: '',
    altText: '',
    caption: '',
    description: ''
  });
  
  const { toast } = useToast();

  const handleMetadataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMetadata(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const updateTitleFromFileName = (fileName: string) => {
    setMetadata(prev => ({
      ...prev,
      title: fileName
    }));
  };

  const resetMetadata = () => {
    setMetadata({
      title: '',
      altText: '',
      caption: '',
      description: ''
    });
  };

  const validateMetadata = (isImage: boolean) => {
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

  return {
    metadata,
    handleMetadataChange,
    updateTitleFromFileName,
    resetMetadata,
    validateMetadata
  };
};
