
import React from 'react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FileInfo } from '@/models/FileModel';
import { FilePreview } from '../FilePreview';

interface FilePreviewDialogProps {
  file: FileInfo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FilePreviewDialog: React.FC<FilePreviewDialogProps> = ({
  file,
  open,
  onOpenChange
}) => {
  const handleClose = () => {
    onOpenChange(false);
  };

  if (!file) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[80vh] p-0 overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">{file.name}</h2>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
          
          <div className="flex-1 overflow-auto p-6">
            <FilePreview file={file} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
