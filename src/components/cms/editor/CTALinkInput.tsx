
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Check, FileText } from 'lucide-react';
import { CMSPage } from '@/hooks/cms/types';

interface CTALinkInputProps {
  value: string;
  onChange: (value: string) => void;
  pages: CMSPage[];
  label?: string;
}

const CTALinkInput: React.FC<CTALinkInputProps> = ({ 
  value, 
  onChange, 
  pages = [], // Provide default empty array to prevent undefined
  label = "CTA Link"
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [filteredPages, setFilteredPages] = useState<CMSPage[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  
  // Validate input when it changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Check if we should show page search
    setShowSearch(newValue.startsWith('/'));
    
    // Notify parent component
    onChange(newValue);
  };

  // Filter pages whenever the input value changes and it starts with "/"
  useEffect(() => {
    if (inputValue.startsWith('/') && Array.isArray(pages)) {
      const searchTerm = inputValue.substring(1).toLowerCase(); // Remove the leading "/"
      
      // Only filter if we have a searchTerm and valid pages array
      if (searchTerm) {
        const filtered = pages.filter(page => {
          if (!page || typeof page !== 'object') return false;
          if (!page.slug || typeof page.slug !== 'string') return false;
          
          return page.slug.toLowerCase().includes(searchTerm);
        });
        
        setFilteredPages(filtered);
        
        // Open the popover if we have results
        if (filtered.length > 0) {
          setOpen(true);
        } else {
          setOpen(false);
        }
      } else {
        // No search term, show all pages
        setFilteredPages(pages.filter(page => page && typeof page === 'object' && page.slug));
        setOpen(searchTerm === ''); // Open only if there's just a slash
      }
    } else {
      setOpen(false);
      setFilteredPages([]);
    }
  }, [inputValue, pages]);

  // Handle selection of a page from the dropdown
  const handleSelectPage = (slug: string) => {
    const newValue = `/${slug}`;
    setInputValue(newValue);
    onChange(newValue);
    setOpen(false);
  };

  return (
    <div className="mb-4">
      <Label htmlFor="ctaLink" className="block mb-1">
        {label}
      </Label>
      <Popover open={open && showSearch} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              id="ctaLink"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Start with / for internal or # for hash links"
              className={`w-full ${!inputValue.startsWith('/') && !inputValue.startsWith('#') && inputValue ? 'border-red-500' : ''}`}
            />
            {!inputValue.startsWith('/') && !inputValue.startsWith('#') && inputValue && (
              <p className="text-xs text-red-500 mt-1">
                Link must start with "/" for internal pages or "#" for hash links
              </p>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-full" align="start">
          <Command>
            <CommandInput 
              placeholder="Search pages..." 
              value={inputValue.substring(1)}
              onValueChange={(search) => setInputValue(`/${search}`)}
            />
            <CommandEmpty>No pages found</CommandEmpty>
            <CommandGroup heading="Pages">
              {filteredPages.length > 0 ? (
                filteredPages.map((page) => (
                  <CommandItem
                    key={page.id}
                    value={page.slug}
                    onSelect={() => handleSelectPage(page.slug)}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      <span>{page.title || page.slug}</span>
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">/{page.slug}</span>
                    {inputValue === `/${page.slug}` && (
                      <Check className="h-4 w-4 ml-2 text-green-500" />
                    )}
                  </CommandItem>
                ))
              ) : (
                <div className="p-2 text-sm text-center text-muted-foreground">
                  Start typing to search pages
                </div>
              )}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CTALinkInput;
