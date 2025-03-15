
import React, { useState } from 'react';
import PageContainer from '@/components/pages/index/PageContainer';
import AuthenticatedContent from '@/components/pages/index/AuthenticatedContent';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gallery as GalleryComponent } from '@/components/gallery/Gallery';
import { UploadComponent } from '@/components/gallery/UploadComponent';
import { useAuthentication } from '@/hooks/useAuthentication';
import { FileInfo } from '@/models/FileModel';

const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState("browse");
  const { userInfo } = useAuthentication();
  const [files, setFiles] = useState<FileInfo[]>([
    {
      id: '1',
      name: 'hotapplecider.jpg',
      type: 'image/jpeg',
      size: 35,
      url: '/lovable-uploads/3a621cb8-d92e-4aba-9238-fa2fc37b23a7.png',
      uploadedBy: 'admin',
      uploadedOn: '2024-04-10T10:30:00',
      metadata: {
        title: 'Hot Apple Cider',
        altText: 'A cup of hot apple cider with cinnamon sticks',
        caption: 'Enjoy the warmth of autumn',
        description: 'Freshly brewed hot apple cider with cinnamon sticks and spices',
        dimensions: {
          width: 300,
          height: 479
        }
      }
    },
    {
      id: '2',
      name: 'document.pdf',
      type: 'application/pdf',
      size: 120,
      url: '/placeholder.svg',
      uploadedBy: 'admin',
      uploadedOn: '2024-04-09T14:20:00'
    }
  ]);

  const handleFileUpload = (newFile: FileInfo) => {
    setFiles(prevFiles => [newFile, ...prevFiles]);
  };

  return (
    <PageContainer>
      <AuthenticatedContent userInfo={userInfo} />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Media Gallery</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage and organize your media files</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList className="bg-gray-100">
            <TabsTrigger value="browse" className="data-[state=active]:bg-white gap-2 text-black dark:text-black">
              Browse Files
            </TabsTrigger>
            <TabsTrigger value="upload" className="data-[state=active]:bg-white gap-2 text-black dark:text-black">
              Upload
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="browse" className="mt-0">
          <GalleryComponent files={files} />
        </TabsContent>
        
        <TabsContent value="upload" className="mt-0">
          <UploadComponent onFileUploaded={handleFileUpload} />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default Gallery;
