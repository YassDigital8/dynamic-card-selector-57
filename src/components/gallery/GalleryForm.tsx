
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';

interface GalleryFormProps {
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel?: string;
  cancelLabel?: string;
  showFooter?: boolean;
  nameError?: string;
}

export const GalleryForm: React.FC<GalleryFormProps> = ({
  name,
  setName,
  description,
  setDescription,
  onCancel,
  onSubmit,
  submitLabel = 'Save Changes',
  cancelLabel = 'Cancel',
  showFooter = true,
  nameError
}) => {
  const isMobile = useIsMobile();
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(e);
    }} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" required>Gallery Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter gallery name"
          error={!!nameError}
        />
        {nameError && (
          <p className="text-sm text-destructive mt-1">{nameError}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter gallery description"
          rows={isMobile ? 2 : 3}
        />
      </div>
      
      {showFooter && (
        <DialogFooter className={isMobile ? "mt-3" : "mt-4"}>
          <Button type="button" variant="outline" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button type="submit">{submitLabel}</Button>
        </DialogFooter>
      )}
    </form>
  );
};
