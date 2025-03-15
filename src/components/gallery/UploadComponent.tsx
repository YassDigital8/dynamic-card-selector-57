import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Image, FileText } from 'lucide-react';
import { FileInfo } from '@/models/FileModel';
import { useToast } from '@/hooks/use-toast';
import { useAuthentication } from '@/hooks/useAuthentication';

interface UploadComponentProps {
  onFileUploaded: (file: FileInfo) => void;
}

export const UploadComponent: React.FC<UploadComponentProps> = ({ onFileUploaded }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isImage, setIsImage] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [metadata, setMetadata] = useState({
    title: '',
    altText: '',
    caption: '',
    description: ''
  });
  
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { userInfo } = useAuthentication();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setSelectedFile(file);
    
    // Check if file is an image
    const isImageFile = file.type.startsWith('image/');
    setIsImage(isImageFile);
    
    // Create preview for images
    if (isImageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setFilePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      
      // Set title to filename by default (without extension)
      const fileName = file.name.split('.').slice(0, -1).join('.');
      setMetadata(prev => ({
        ...prev,
        title: fileName
      }));
    } else {
      setFilePreview(null);
    }
  };

  const handleMetadataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMetadata(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    
    try {
      // In a real application, you would upload the file to a server here
      // For now, we'll simulate the upload with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a mock file info object
      const fileInfo: FileInfo = {
        id: Date.now().toString(),
        name: selectedFile.name,
        type: selectedFile.type,
        size: Math.round(selectedFile.size / 1024), // Convert to KB
        url: filePreview || '/placeholder.svg',
        uploadedBy: userInfo?.email || 'unknown',
        uploadedOn: new Date().toISOString(),
        galleryId: '', // This will be set by the parent component
      };
      
      // Add metadata for images
      if (isImage) {
        fileInfo.metadata = {
          ...metadata
        };
      }
      
      // Notify parent component about the new file
      onFileUploaded(fileInfo);
      
      // Reset form
      setSelectedFile(null);
      setFilePreview(null);
      setIsImage(false);
      setMetadata({
        title: '',
        altText: '',
        caption: '',
        description: ''
      });
      
      // Show success toast
      toast({
        title: "Upload successful",
        description: `File "${selectedFile.name}" has been uploaded.`,
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

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div 
            className={`border-2 border-dashed rounded-lg p-10 text-center ${dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center">
                  {filePreview ? (
                    <div className="mb-4 max-w-xs max-h-64 overflow-hidden">
                      <img
                        src={filePreview}
                        alt="Preview"
                        className="object-contain max-h-64"
                      />
                    </div>
                  ) : (
                    <div className="mb-4 w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg">
                      <FileText className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024).toFixed(2)} KB • {selectedFile.type}
                  </p>
                </div>
                <Button variant="outline" onClick={() => setSelectedFile(null)}>
                  Change File
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-4 w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full">
                    <Upload className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium">Drag and drop file here</h3>
                  <p className="text-sm text-gray-500">or click to browse</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => inputRef.current?.click()}
                >
                  Select File
                </Button>
                <input
                  ref={inputRef}
                  type="file"
                  className="hidden"
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {isImage && selectedFile && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center">
              <Image className="h-5 w-5 mr-2 text-blue-500" />
              <h2 className="text-lg font-medium">Image Metadata</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={metadata.title}
                  onChange={handleMetadataChange}
                  className="mt-1"
                  placeholder="Enter image title"
                />
              </div>
              
              <div>
                <Label htmlFor="altText">Alternative Text</Label>
                <Input
                  id="altText"
                  name="altText"
                  value={metadata.altText}
                  onChange={handleMetadataChange}
                  className="mt-1"
                  placeholder="Describe the image for accessibility"
                />
              </div>
              
              <div>
                <Label htmlFor="caption">Caption</Label>
                <Textarea
                  id="caption"
                  name="caption"
                  value={metadata.caption}
                  onChange={handleMetadataChange}
                  className="mt-1"
                  placeholder="Enter a caption for the image"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={metadata.description}
                  onChange={handleMetadataChange}
                  className="mt-1"
                  placeholder="Enter a detailed description"
                  rows={4}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedFile && (
        <div className="flex justify-end">
          <Button 
            onClick={handleUpload} 
            disabled={isUploading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isUploading ? 'Uploading...' : 'Upload File'}
          </Button>
        </div>
      )}
    </div>
  );
};
