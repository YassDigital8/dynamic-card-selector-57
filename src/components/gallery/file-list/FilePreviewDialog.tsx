
import React from 'react';
import { FileInfo } from '@/models/FileModel';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { FilePreview } from '../FilePreview';
import { FileDetails } from '../FileDetails';

interface FilePreviewDialogProps {
  file: FileInfo | null;
  onClose: () => void;
}

export const FilePreviewDialog: React.FC<FilePreviewDialogProps> = ({ file, onClose }) => {
  return (
    <Dialog open={file !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        {file && (
          <div className="space-y-4">
            <DialogTitle className="text-xl font-semibold">
              {file.metadata?.title || file.name}
            </DialogTitle>
            
            <div className="bg-muted rounded-md max-h-[50vh] flex items-center justify-center overflow-hidden">
              <FilePreview file={file} size="lg" />
            </div>
            
            <FileDetails file={file} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
