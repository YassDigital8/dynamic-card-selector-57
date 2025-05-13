
import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import StandardLayout from '@/components/layout/StandardLayout';
import useCmsState from '@/hooks/cms/useCmsState';
import { CmsPageView, CmsCommandPalette, useCmsKeyboardShortcuts, useCmsPageSearch } from '@/components/cms/page';

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
    createNewPage,
    publishPage,
    selectPage,
    addComponentToPage,
    updateComponentProps,
    removeComponentFromPage,
    moveComponent,
    savePage
  } = useCmsState();
  
  // Use our custom hooks
  useCmsKeyboardShortcuts({ setCommandOpen });
  const { filteredPages } = useCmsPageSearch(pages, searchQuery);
  
  // Switch to editor view if a page ID is provided
  React.useEffect(() => {
    if (pageId) {
      setCurrentView("editor");
      selectPage(pageId);
    }
  }, [pageId, selectPage]);
  
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
  
  // This is the function that needs to return the same type as expected in the component
  const handleSavePage = () => {
    return savePage(); // Now this will correctly return a boolean as expected by CmsPageView
  };
  
  const runCommand = useCallback((command: () => void) => {
    setCommandOpen(false);
    command();
  }, []);
  
  const handleCommandSelect = useCallback((pageId: string) => {
    runCommand(() => navigate(`/cms/editor/${pageId}`));
  }, [runCommand, navigate]);
  
  return (
    <StandardLayout pageTitle="Content Management System" pageDescription="Create and manage your website content">
      <CmsPageView
        currentView={currentView}
        setCurrentView={setCurrentView}
        pages={Array.isArray(pages) ? pages : []}
        selectedPage={selectedPage}
        components={Array.isArray(components) ? components : []}
        loading={loading}
        onCreatePage={handleCreatePage}
        onSelectPage={(id) => navigate(`/cms/editor/${id}`)}
        onAddComponent={addComponentToPage}
        onUpdateComponent={updateComponentProps}
        onRemoveComponent={removeComponentFromPage}
        onMoveComponent={moveComponent}
        onSavePage={handleSavePage} // Using our fixed function that returns boolean
        onPublishPage={handlePublishPage}
      />
      
      <CmsCommandPalette
        open={commandOpen}
        onOpenChange={setCommandOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredPages={filteredPages}
        onSelectPage={handleCommandSelect}
      />
    </StandardLayout>
  );
};

export default CMS;
