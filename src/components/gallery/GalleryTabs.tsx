
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Gallery } from '@/models/FileModel';

interface GalleryTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  onCreateGallery: () => void;
}

export const GalleryTabs: React.FC<GalleryTabsProps> = ({
  activeTab,
  setActiveTab,
  onCreateGallery,
  children
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex items-center justify-between mb-6">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="galleries" className="data-[state=active]:bg-white gap-2 text-black dark:text-black">
            Galleries
          </TabsTrigger>
          <TabsTrigger value="browse" className="data-[state=active]:bg-white gap-2 text-black dark:text-black">
            Browse Files
          </TabsTrigger>
          <TabsTrigger value="upload" className="data-[state=active]:bg-white gap-2 text-black dark:text-black">
            Upload
          </TabsTrigger>
        </TabsList>
        
        {activeTab === "galleries" && (
          <Button onClick={onCreateGallery}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Gallery
          </Button>
        )}
      </div>
      
      {children}
    </Tabs>
  );
};
