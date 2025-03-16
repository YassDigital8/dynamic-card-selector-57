
import React, { useState } from 'react';
import { FileInfo } from '@/models/FileModel';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Image, File, Eye, Trash2, Share2 } from 'lucide-react';
import { formatDate } from '@/lib/date-utils';
import { Button } from '@/components/ui/button';
import { FileDetails } from './FileDetails';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { FilePreview } from './FilePreview';
import { ShareDialog } from './ShareDialog';

interface FileListProps {
  files: FileInfo[];
  onViewFile?: (file: FileInfo) => void;
  onDeleteFile?: (file: FileInfo) => void;
}

export const FileList: React.FC<FileListProps> = ({ files, onViewFile, onDeleteFile }) => {
  const [previewFile, setPreviewFile] = useState<FileInfo | null>(null);
  const [shareFile, setShareFile] = useState<FileInfo | null>(null);
  
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <Image className="h-10 w-10 text-muted-foreground" />;
    } else if (fileType === 'application/pdf') {
      return <FileText className="h-10 w-10 text-muted-foreground" />;
    } else {
      return <File className="h-10 w-10 text-muted-foreground" />;
    }
  };

  const formatFileSize = (sizeInKB: number) => {
    if (sizeInKB < 1024) {
      return `${sizeInKB} KB`;
    } else {
      return `${(sizeInKB / 1024).toFixed(2)} MB`;
    }
  };

  const handleViewFile = (file: FileInfo) => {
    setPreviewFile(file);
    if (onViewFile) onViewFile(file);
  };

  const closePreview = () => {
    setPreviewFile(null);
  };

  const handleShareFile = (file: FileInfo, e: React.MouseEvent) => {
    e.stopPropagation();
    setShareFile(file);
  };

  if (files.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">No files to display</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {files.map((file) => (
          <Card 
            key={file.id} 
            className="overflow-hidden transition-all hover:shadow-md"
          >
            <div 
              className="h-40 bg-muted flex items-center justify-center overflow-hidden cursor-pointer"
              onClick={() => handleViewFile(file)}
            >
              {file.type.startsWith('image/') ? (
                <img 
                  src={file.url} 
                  alt={file.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  {getFileIcon(file.type)}
                  <span className="text-sm text-muted-foreground mt-2">{file.type.split('/')[1].toUpperCase()}</span>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium text-md mb-1 truncate" title={file.name}>
                {file.name}
              </h3>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                <span>{formatFileSize(file.size)}</span>
                <span>{formatDate(file.uploadedOn)}</span>
              </div>
              {file.metadata && (
                <p className="text-sm mt-2 truncate" title={file.metadata.title || ''}>
                  {file.metadata.title || 'No title'}
                </p>
              )}
              <div className="flex items-center justify-end gap-2 mt-3 pt-2 border-t border-gray-100">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => handleViewFile(file)}
                  title="Preview file"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={(e) => handleShareFile(file, e)}
                  title="Share file"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-red-500 hover:text-red-600" 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onDeleteFile) onDeleteFile(file);
                  }}
                  title="Delete file"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* File Preview Dialog */}
      <Dialog open={previewFile !== null} onOpenChange={(open) => !open && closePreview()}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          {previewFile && (
            <div className="space-y-4">
              <DialogTitle className="text-xl font-semibold">
                {previewFile.metadata?.title || previewFile.name}
              </DialogTitle>
              
              <div className="bg-muted rounded-md max-h-[50vh] flex items-center justify-center overflow-hidden">
                <FilePreview file={previewFile} size="lg" />
              </div>
              
              <FileDetails file={previewFile} />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <ShareDialog
        open={shareFile !== null}
        onOpenChange={(open) => !open && setShareFile(null)}
        item={shareFile}
        itemType="file"
      />
    </>
  );
};
