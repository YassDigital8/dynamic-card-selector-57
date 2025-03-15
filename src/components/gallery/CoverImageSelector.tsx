
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileDropzone } from '@/components/gallery/FileDropzone';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Image, FileImage } from 'lucide-react';
import { IconSelector } from '@/components/gallery/IconSelector';
import { FileInfo } from '@/models/FileModel';
interface CoverImageSelectorProps {
  coverImage?: string;
  selectedIconName?: string;
  coverImageSource: 'upload' | 'icon' | 'gallery';
  onCoverImageSourceChange: (source: 'upload' | 'icon' | 'gallery') => void;
  onImageUpload: (imageUrl: string) => void;
  onIconSelect: (iconName: string) => void;
  onGalleryImageSelect: (file: FileInfo) => void;
  selectedFile: File | null;
  filePreview: string | null;
  isImage: boolean;
  handleFile: (file: File | null) => void;
  galleryImageFiles: FileInfo[];
}
export const CoverImageSelector: React.FC<CoverImageSelectorProps> = ({
  coverImage,
  selectedIconName,
  coverImageSource,
  onCoverImageSourceChange,
  onImageUpload,
  onIconSelect,
  onGalleryImageSelect,
  selectedFile,
  filePreview,
  isImage,
  handleFile,
  galleryImageFiles
}) => {
  return <Tabs value={coverImageSource} onValueChange={value => onCoverImageSourceChange(value as any)} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="upload" className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          <span>Upload</span>
        </TabsTrigger>
        <TabsTrigger value="icon" className="flex items-center gap-2">
          <Image className="h-4 w-4" />
          <span>Icon</span>
        </TabsTrigger>
        <TabsTrigger value="gallery" className="flex items-center gap-2">
          <FileImage className="h-4 w-4" />
          <span>Gallery</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="upload" className="mt-4">
        {coverImage && coverImageSource === 'upload' ? <div className="relative w-full h-40 mb-2 border rounded-md overflow-hidden">
            <img src={coverImage} alt="Cover preview" className="w-full h-full object-cover" />
            <Button type="button" variant="destructive" size="sm" className="absolute top-2 right-2" onClick={() => onImageUpload('')}>
              Remove
            </Button>
          </div> : <FileDropzone onFileSelected={handleFile} selectedFile={selectedFile} filePreview={filePreview} isImage={isImage} onImageUpload={onImageUpload} accept="image/*" maxFiles={1} className="h-40" />}
      </TabsContent>
      
      <TabsContent value="icon" className="mt-4">
        <IconSelector selectedIcon={selectedIconName} onSelectIcon={onIconSelect} />
      </TabsContent>
      
      <TabsContent value="gallery" className="mt-4">
        {galleryImageFiles.length > 0 ? <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto p-2">
            {galleryImageFiles.map(file => <div key={file.id} className={`relative border rounded-md overflow-hidden cursor-pointer transition-all ${coverImage === file.url ? 'ring-2 ring-primary' : 'hover:opacity-80'}`} onClick={() => onGalleryImageSelect(file)}>
                <div className="aspect-square">
                  <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                </div>
                {coverImage === file.url && <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">Selected</div>
                  </div>}
              </div>)}
          </div> : <Card>
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <FileImage className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No image files in your galleries</p>
            </CardContent>
          </Card>}
      </TabsContent>
    </Tabs>;
};
