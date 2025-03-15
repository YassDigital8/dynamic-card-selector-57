
import React, { useState } from 'react';
import { FileInfo } from '@/models/FileModel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, Download, Trash2, Search } from 'lucide-react';
import { FilePreview } from './FilePreview';
import { FileDetails } from './FileDetails';

interface GalleryProps {
  files: FileInfo[];
}

export const Gallery: React.FC<GalleryProps> = ({ files }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<FileInfo | null>(null);
  
  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.metadata?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.metadata?.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-2 border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {selectedFile ? (
        <div className="space-y-4">
          <Button 
            variant="outline"
            onClick={() => setSelectedFile(null)}
            className="mb-2"
          >
            Back to Gallery
          </Button>
          <FileDetails file={selectedFile} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredFiles.length > 0 ? (
            filteredFiles.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                onView={() => setSelectedFile(file)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              {searchQuery ? 'No files match your search' : 'No files available'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface FileCardProps {
  file: FileInfo;
  onView: () => void;
}

const FileCard: React.FC<FileCardProps> = ({ file, onView }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
        <FilePreview file={file} />
      </div>
      <CardContent className="p-3 flex-1 flex flex-col">
        <div className="mb-2 flex-1">
          <h3 className="font-medium text-sm truncate" title={file.metadata?.title || file.name}>
            {file.metadata?.title || file.name}
          </h3>
          <p className="text-xs text-gray-500 truncate">{file.name}</p>
        </div>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">{file.size} KB</span>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onView}>
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
