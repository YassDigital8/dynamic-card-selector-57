import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import StandardLayout from '@/components/layout/StandardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CMSPageList from '@/components/cms/CMSPageList';
import CMSEditor from '@/components/cms/CMSEditor';
import CMSPagePreview from '@/components/cms/CMSPagePreview';
import useCmsState from '@/hooks/cms/useCmsState';
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { FileText, Search } from 'lucide-react';

const CMS = () => {
  const { pageId } = useParams();
  const [currentView, setCurrentView] = useState<string>("pages");
  const { toast } = useToast();
  const navigate = useNavigate();
  const [commandOpen, setCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { 
    pages, 
    selectedPage, 
    components,
    loading,
    loadPages,
    createNewPage,
    publishPage,
    selectPage,
    addComponentToPage,
    updateComponentProps,
    removeComponentFromPage,
    moveComponent,
    savePage
  } = useCmsState();
  
  // Ensure pages is always an array
  const safePages = Array.isArray(pages) ? pages : [];
  
  // Filter pages based on search query with improved null checks
  const filteredPages = React.useMemo(() => {
    if (!searchQuery) return safePages;
    if (!Array.isArray(safePages)) return [];
    
    return safePages.filter(page => {
      if (!page) return false;
      
      const title = page.title || '';
      const slug = page.slug || '';
      const searchLower = searchQuery.toLowerCase();
      
      return title.toLowerCase().includes(searchLower) || 
             slug.toLowerCase().includes(searchLower);
    });
  }, [safePages, searchQuery]);
  
  // Switch to editor view if a page ID is provided
  useEffect(() => {
    if (pageId) {
      setCurrentView("editor");
      selectPage(pageId);
    }
  }, [pageId, selectPage]);
  
  // Listen for keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open command dialog when "/" is pressed
      if (e.key === '/') {
        // Prevent the key from being typed in input fields
        if (
          e.target instanceof HTMLInputElement || 
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement ||
          (e.target instanceof HTMLElement && e.target.isContentEditable)
        ) {
          return;
        }
        
        // Prevent default behavior
        e.preventDefault();
        // Open command dialog
        setCommandOpen(true);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  const handleCreatePage = async (title: string, slug: string, template: string) => {
    // Convert template string to the expected template type
    const validTemplate = (template === 'blank' || template === 'landing' || template === 'about') 
      ? template 
      : 'blank';
      
    const newPageId = await createNewPage(title, slug, validTemplate);
    if (newPageId) {
      toast({
        title: "Success",
        description: `Page "${title}" created successfully`,
      });
      navigate(`/cms/editor/${newPageId}`);
    }
  };
  
  const handlePublishPage = async () => {
    if (selectedPage) {
      const success = await publishPage(selectedPage.id);
      if (success) {
        toast({
          title: "Page Published",
          description: `The page "${selectedPage.title}" has been published successfully.`,
        });
      }
    }
  };
  
  const runCommand = useCallback((command: () => void) => {
    setCommandOpen(false);
    command();
  }, []);
  
  return (
    <StandardLayout pageTitle="Content Management System" pageDescription="Create and manage your website content">
      <Tabs value={currentView} onValueChange={setCurrentView} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="pages" className="data-[state=active]:bg-white">
            Pages
          </TabsTrigger>
          {selectedPage && (
            <TabsTrigger value="editor" className="data-[state=active]:bg-white">
              Page Editor
            </TabsTrigger>
          )}
          {selectedPage && (
            <TabsTrigger value="preview" className="data-[state=active]:bg-white">
              Preview
            </TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="pages" className="mt-0">
          <CMSPageList 
            pages={safePages}
            loading={loading}
            onCreatePage={handleCreatePage}
            onSelectPage={(id) => navigate(`/cms/editor/${id}`)}
          />
        </TabsContent>
        
        {selectedPage && (
          <TabsContent value="editor" className="mt-0">
            <CMSEditor 
              page={selectedPage}
              components={Array.isArray(components) ? components : []}
              onAddComponent={addComponentToPage}
              onUpdateComponent={updateComponentProps}
              onRemoveComponent={removeComponentFromPage}
              onMoveComponent={moveComponent}
              onSavePage={savePage}
              onPublishPage={handlePublishPage}
            />
          </TabsContent>
        )}
        
        {selectedPage && (
          <TabsContent value="preview" className="mt-0">
            <CMSPagePreview page={selectedPage} />
          </TabsContent>
        )}
      </Tabs>
      
      {/* CommandDialog for page search */}
      <CommandDialog 
        open={commandOpen} 
        onOpenChange={setCommandOpen}
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
                onSelect={() => {
                  runCommand(() => navigate(`/cms/editor/${page.id}`));
                }}
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
    </StandardLayout>
  );
};

export default CMS;
