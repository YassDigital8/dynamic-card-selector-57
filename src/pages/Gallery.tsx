
import React, { useState } from 'react';
import PageContainer from '@/components/pages/index/PageContainer';
import AuthenticatedContent from '@/components/pages/index/AuthenticatedContent';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gallery as GalleryComponent } from '@/components/gallery/Gallery';
import { UploadComponent } from '@/components/gallery/UploadComponent';
import { useAuthentication } from '@/hooks/useAuthentication';
import { FileInfo, Gallery } from '@/models/FileModel';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { GalleryList } from '@/components/gallery/GalleryList';
import { CreateGalleryDialog } from '@/components/gallery/CreateGalleryDialog';

const GalleryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("galleries");
  const { userInfo } = useAuthentication();
  const [isCreateGalleryOpen, setIsCreateGalleryOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  
  const [galleries, setGalleries] = useState<Gallery[]>([
    {
      id: '1',
      name: 'Product Images',
      description: 'All product marketing images',
      createdBy: 'admin',
      createdOn: '2024-04-10T10:30:00',
      coverImageUrl: '/lovable-uploads/3a621cb8-d92e-4aba-9238-fa2fc37b23a7.png',
      fileCount: 1
    },
    {
      id: '2',
      name: 'Documentation',
      description: 'User manuals and documentation',
      createdBy: 'admin',
      createdOn: '2024-04-09T14:20:00',
      fileCount: 1
    }
  ]);
  
  const [files, setFiles] = useState<FileInfo[]>([
    {
      id: '1',
      name: 'hotapplecider.jpg',
      type: 'image/jpeg',
      size: 35,
      url: '/lovable-uploads/3a621cb8-d92e-4aba-9238-fa2fc37b23a7.png',
      uploadedBy: 'admin',
      uploadedOn: '2024-04-10T10:30:00',
      galleryId: '1',
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
      uploadedOn: '2024-04-09T14:20:00',
      galleryId: '2'
    }
  ]);

  const handleFileUpload = (newFile: FileInfo) => {
    if (selectedGallery) {
      const fileWithGallery = { ...newFile, galleryId: selectedGallery.id };
      setFiles(prevFiles => [fileWithGallery, ...prevFiles]);
      
      // Update file count in gallery
      setGalleries(prevGalleries => 
        prevGalleries.map(gallery => 
          gallery.id === selectedGallery.id 
            ? { ...gallery, fileCount: gallery.fileCount + 1 } 
            : gallery
        )
      );
    }
  };

  const handleCreateGallery = (gallery: Gallery) => {
    setGalleries(prev => [gallery, ...prev]);
    setIsCreateGalleryOpen(false);
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
            <TabsTrigger value="galleries" className="data-[state=active]:bg-white gap-2 text-black dark:text-black">
              Galleries
            </TabsTrigger>
            {selectedGallery && (
              <TabsTrigger value="browse" className="data-[state=active]:bg-white gap-2 text-black dark:text-black">
                Browse Files
              </TabsTrigger>
            )}
            {selectedGallery && (
              <TabsTrigger value="upload" className="data-[state=active]:bg-white gap-2 text-black dark:text-black">
                Upload
              </TabsTrigger>
            )}
          </TabsList>
          
          {activeTab === "galleries" && (
            <Button onClick={() => setIsCreateGalleryOpen(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Gallery
            </Button>
          )}
        </div>
        
        <TabsContent value="galleries" className="mt-0">
          <GalleryList 
            galleries={galleries} 
            onSelectGallery={(gallery) => {
              setSelectedGallery(gallery);
              setActiveTab("browse");
            }} 
          />
        </TabsContent>
        
        <TabsContent value="browse" className="mt-0">
          {selectedGallery && (
            <>
              <div className="mb-4 p-4 bg-muted/30 rounded-lg">
                <h2 className="text-lg font-semibold">{selectedGallery.name}</h2>
                {selectedGallery.description && (
                  <p className="text-sm text-muted-foreground">{selectedGallery.description}</p>
                )}
              </div>
              <GalleryComponent 
                files={files.filter(file => file.galleryId === selectedGallery.id)} 
              />
            </>
          )}
        </TabsContent>
        
        <TabsContent value="upload" className="mt-0">
          {selectedGallery && (
            <>
              <div className="mb-4 p-4 bg-muted/30 rounded-lg">
                <h2 className="text-lg font-semibold">Upload to: {selectedGallery.name}</h2>
              </div>
              <UploadComponent onFileUploaded={handleFileUpload} />
            </>
          )}
        </TabsContent>
      </Tabs>
      
      <CreateGalleryDialog 
        open={isCreateGalleryOpen} 
        onOpenChange={setIsCreateGalleryOpen}
        onCreateGallery={handleCreateGallery}
      />
    </PageContainer>
  );
};

export default GalleryPage;
