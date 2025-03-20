
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash2, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface LogoDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onLogoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onLogoRemove: () => void;
  avatarUrl: string;
  hotelName: string;
  initials: string;
}

const LogoDialog: React.FC<LogoDialogProps> = ({
  isOpen,
  onOpenChange,
  onLogoUpload,
  onLogoRemove,
  avatarUrl,
  hotelName,
  initials
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Hotel Logo</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex justify-center mb-4">
            <Avatar className="h-32 w-32 border border-indigo-100 dark:border-indigo-800 shadow-md">
              <AvatarImage src={avatarUrl} alt={hotelName} />
              <AvatarFallback className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="logo-upload" className="mb-2">Upload new logo</Label>
            <Input 
              id="logo-upload" 
              type="file" 
              accept="image/*" 
              onChange={onLogoUpload} 
              className="cursor-pointer" 
            />
          </div>
        </div>
        
        <DialogFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="destructive" 
            onClick={onLogoRemove} 
            size="sm"
            className="mr-auto"
          >
            <Trash2 className="mr-1 h-3.5 w-3.5" />
            Remove Logo
          </Button>
          
          <DialogClose asChild>
            <Button type="button" variant="outline" size="sm">
              <X className="mr-1 h-3.5 w-3.5" />
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoDialog;

