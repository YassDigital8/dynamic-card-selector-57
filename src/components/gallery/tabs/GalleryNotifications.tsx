
import React from 'react';
import { FileInfo } from '@/models/FileModel';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';

interface GalleryNotificationsProps {
  children: React.ReactNode;
}

export const GalleryNotifications: React.FC<GalleryNotificationsProps> = ({ children }) => {
  return children;
};

export const useGalleryNotifications = () => {
  const { toast } = useToast();
  
  const showDeleteNotification = () => {
    toast({
      description: (
        <div className="flex items-center gap-2">
          <Trash2 className="h-4 w-4 text-destructive" />
          <span>File deleted successfully</span>
        </div>
      ),
    });
  };
  
  return {
    showDeleteNotification
  };
};
