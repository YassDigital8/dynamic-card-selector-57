
import React from 'react';
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { FileText } from 'lucide-react';

interface CmsCommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredPages: any[];
  onSelectPage: (pageId: string) => void;
}

const CmsCommandPalette: React.FC<CmsCommandPaletteProps> = ({
  open,
  onOpenChange,
  searchQuery,
  setSearchQuery,
  filteredPages,
  onSelectPage,
}) => {
  return (
    <CommandDialog 
      open={open} 
      onOpenChange={onOpenChange}
    >
      <CommandInput 
        placeholder="Search pages..." 
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <CommandList>
        <CommandEmpty>No pages found with that search term.</CommandEmpty>
        <CommandGroup heading="Pages">
          {filteredPages.map((page) => (
            <CommandItem
              key={page.id}
              onSelect={() => onSelectPage(page.id)}
              className="flex items-center justify-between py-2 cursor-pointer"
            >
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                <span>{page.title}</span>
              </div>
              <span className="text-xs text-muted-foreground ml-2">/{page.slug}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CmsCommandPalette;
