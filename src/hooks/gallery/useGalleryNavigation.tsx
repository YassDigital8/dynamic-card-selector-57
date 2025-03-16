
import { useState, useEffect } from 'react';
import { Gallery, FileInfo } from '@/models/FileModel';

export interface UseGalleryNavigationReturn {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCreateGalleryOpen: boolean;
  setIsCreateGalleryOpen: (isOpen: boolean) => void;
  selectedGallery: Gallery | null;
  setSelectedGallery: (gallery: Gallery | null) => void;
  selectedFile: FileInfo | null;
  setSelectedFile: (file: FileInfo | null) => void;
  handleSelectGallery: (gallery: Gallery) => void;
  handleViewFile: (file: FileInfo) => void;
}

export const useGalleryNavigation = (): UseGalleryNavigationReturn => {
  const [activeTab, setActiveTab] = useState("galleries");
  const [isCreateGalleryOpen, setIsCreateGalleryOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileInfo | null>(null);
  
  // When selectedGallery becomes null, switch back to galleries tab
  useEffect(() => {
    if (!selectedGallery && (activeTab === "browse")) {
      setActiveTab("galleries");
    }
  }, [selectedGallery, activeTab]);

  // When switching to galleries tab, clear the selected gallery
  useEffect(() => {
    if (activeTab === "galleries") {
      setSelectedGallery(null);
    }
  }, [activeTab]);

  const handleSelectGallery = (gallery: Gallery) => {
    setSelectedGallery(gallery);
    setActiveTab("browse");
  };

  const handleViewFile = (file: FileInfo) => {
    setSelectedFile(file);
    setSelectedGallery(gallery => gallery);
    setActiveTab("browse");
  };

  return {
    activeTab,
    setActiveTab,
    isCreateGalleryOpen,
    setIsCreateGalleryOpen,
    selectedGallery,
    setSelectedGallery,
    selectedFile,
    setSelectedFile,
    handleSelectGallery,
    handleViewFile
  };
};
