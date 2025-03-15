import React, { useState } from 'react';
import { FileInfo } from '@/models/FileModel';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FilePreview } from './FilePreview';
import { Pencil, Save, X, Download, Trash2, FileText } from 'lucide-react';
import { formatDate } from '@/lib/date-utils';

interface FileDetailsProps {
  file: FileInfo;
}

export const FileDetails: React.FC<FileDetailsProps> = ({ file }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMetadata, setEditedMetadata] = useState({
    title: file.metadata?.title || '',
    altText: file.metadata?.altText || '',
    caption: file.metadata?.caption || '',
    description: file.metadata?.description || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedMetadata(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // In a real app, we would save changes to the server here
    // For now, just toggle editing mode off
    setIsEditing(false);
  };

  const isImage = file.type.startsWith('image/');
  const isPdf = file.type.includes('pdf');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardContent className="p-4">
          <div className="bg-gray-50 rounded-md h-60 mb-4 flex items-center justify-center overflow-hidden">
            <FilePreview file={file} size="lg" />
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">File name:</span>
              <span className="font-medium overflow-hidden text-ellipsis">{file.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">File type:</span>
              <span className="font-medium">{file.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">File size:</span>
              <span className="font-medium">{file.size} KB</span>
            </div>
            {isImage && file.metadata?.dimensions && (
              <div className="flex justify-between">
                <span className="text-gray-500">Dimensions:</span>
                <span className="font-medium">{file.metadata.dimensions.width} × {file.metadata.dimensions.height} px</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">Uploaded by:</span>
              <span className="font-medium">{file.uploadedBy}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Uploaded on:</span>
              <span className="font-medium">{formatDate(file.uploadedOn)}</span>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <Button variant="secondary" className="w-full justify-start">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="destructive" className="w-full justify-start">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">File Details</h2>
            {isImage && (
              <Button 
                variant={isEditing ? "outline" : "default"}
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? (
                  <>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </>
                )}
              </Button>
            )}
          </div>

          {isImage ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                {isEditing ? (
                  <Input
                    id="title"
                    name="title"
                    value={editedMetadata.title}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                ) : (
                  <div className="mt-1 p-2 bg-gray-50 rounded border">{file.metadata?.title || '-'}</div>
                )}
              </div>
              
              <div>
                <Label htmlFor="altText">Alternative Text</Label>
                {isEditing ? (
                  <Input
                    id="altText"
                    name="altText"
                    value={editedMetadata.altText}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                ) : (
                  <div className="mt-1 p-2 bg-gray-50 rounded border">{file.metadata?.altText || '-'}</div>
                )}
              </div>
              
              <div>
                <Label htmlFor="caption">Caption</Label>
                {isEditing ? (
                  <Textarea
                    id="caption"
                    name="caption"
                    value={editedMetadata.caption}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                ) : (
                  <div className="mt-1 p-2 bg-gray-50 rounded border min-h-[60px]">{file.metadata?.caption || '-'}</div>
                )}
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                {isEditing ? (
                  <Textarea
                    id="description"
                    name="description"
                    value={editedMetadata.description}
                    onChange={handleInputChange}
                    className="mt-1"
                    rows={4}
                  />
                ) : (
                  <div className="mt-1 p-2 bg-gray-50 rounded border min-h-[100px]">{file.metadata?.description || '-'}</div>
                )}
              </div>

              {isEditing && (
                <Button onClick={handleSave} className="mt-4">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Metadata details are only available for image files.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
