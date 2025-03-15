
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FolderOpen, Image, FileText, Images, Folder, 
  GalleryHorizontal, GalleryVertical, Library, BookImage,
  FileImage, Files, Check
} from 'lucide-react';

interface IconSelectorProps {
  selectedIcon?: string;
  onSelectIcon: (iconName: string) => void;
}

const icons = [
  { name: 'FolderOpen', component: FolderOpen },
  { name: 'Folder', component: Folder },
  { name: 'Image', component: Image },
  { name: 'FileImage', component: FileImage },
  { name: 'Images', component: Images },
  { name: 'FileText', component: FileText },
  { name: 'Files', component: Files },
  { name: 'GalleryHorizontal', component: GalleryHorizontal },
  { name: 'GalleryVertical', component: GalleryVertical },
  { name: 'Library', component: Library },
  { name: 'BookImage', component: BookImage },
];

export const IconSelector: React.FC<IconSelectorProps> = ({ selectedIcon, onSelectIcon }) => {
  return (
    <div className="grid grid-cols-4 gap-2 max-h-60 overflow-y-auto p-2">
      {icons.map((icon) => {
        const IconComponent = icon.component;
        const isSelected = selectedIcon === icon.name;
        
        return (
          <Card 
            key={icon.name}
            className={`cursor-pointer transition-all hover:bg-muted relative ${
              isSelected ? 'ring-2 ring-primary bg-primary/10' : ''
            }`}
            onClick={() => onSelectIcon(icon.name)}
          >
            <CardContent className="p-4 flex flex-col items-center gap-2">
              <IconComponent className={`h-10 w-10 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className="text-xs text-center truncate w-full">{icon.name}</span>
              
              {isSelected && (
                <div className="absolute top-1 right-1 bg-primary rounded-full p-0.5">
                  <Check className="h-3 w-3 text-primary-foreground" />
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
