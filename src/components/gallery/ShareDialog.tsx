
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileInfo, Gallery } from '@/models/FileModel';
import { Check, Copy, Link, Mail, Share2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: FileInfo | Gallery | null;
  itemType: 'file' | 'gallery';
}

export const ShareDialog: React.FC<ShareDialogProps> = ({
  open,
  onOpenChange,
  item,
  itemType
}) => {
  const [copied, setCopied] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const { toast } = useToast();

  if (!item) return null;

  const title = itemType === 'file' 
    ? (item as FileInfo).metadata?.title || (item as FileInfo).name
    : (item as Gallery).name;

  const shareLink = `https://yourdomain.com/share/${itemType}/${item.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    
    toast({
      description: "Link copied to clipboard",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleSendEmail = () => {
    // In a real app, this would call an API to send an email
    if (!emailInput.trim() || !emailInput.includes('@')) {
      toast({
        variant: "destructive",
        description: "Please enter a valid email address",
      });
      return;
    }
    
    toast({
      description: `Invitation sent to ${emailInput}`,
    });
    
    setEmailInput('');
  };

  const handleMakePublic = (value: boolean) => {
    setIsPublic(value);
    
    // In a real app, this would update the item's visibility in the database
    toast({
      description: value 
        ? `${itemType === 'file' ? 'File' : 'Gallery'} is now public` 
        : `${itemType === 'file' ? 'File' : 'Gallery'} is now private`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share {itemType === 'file' ? 'File' : 'Gallery'}
          </DialogTitle>
          <DialogDescription>
            Share <strong>{title}</strong> with others
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="link">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="link">Share Link</TabsTrigger>
            <TabsTrigger value="email">Email Invite</TabsTrigger>
          </TabsList>
          
          <TabsContent value="link" className="space-y-4 pt-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="public-switch"
                checked={isPublic}
                onCheckedChange={handleMakePublic}
              />
              <Label htmlFor="public-switch">Make {isPublic ? 'private' : 'public'}</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-muted p-2 rounded-l-md border border-r-0 border-input">
                    <Link className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="link"
                    value={shareLink}
                    readOnly
                    className="rounded-l-none focus-visible:ring-0"
                  />
                </div>
              </div>
              <Button type="button" size="icon" onClick={handleCopyLink}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="email" className="space-y-4 pt-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email address</Label>
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 bg-muted p-2 rounded-l-md border border-r-0 border-input">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  id="email"
                  placeholder="example@example.com"
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="rounded-l-none focus-visible:ring-0"
                />
              </div>
            </div>
            <Button type="button" onClick={handleSendEmail}>
              Send Invitation
            </Button>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
