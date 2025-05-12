
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import StandardLayout from '@/components/layout/StandardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CMSPageList from '@/components/cms/CMSPageList';
import CMSEditor from '@/components/cms/CMSEditor';
import CMSPagePreview from '@/components/cms/CMSPagePreview';
import useCmsState from '@/hooks/cms/useCmsState';

const CMS = () => {
  const { pageId } = useParams();
  const [currentView, setCurrentView] = useState<string>("pages");
  const { toast } = useToast();
  const navigate = useNavigate();
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
  
  // Switch to editor view if a page ID is provided
  useEffect(() => {
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
            pages={pages}
            loading={loading}
            onCreatePage={handleCreatePage}
            onSelectPage={(id) => navigate(`/cms/editor/${id}`)}
          />
        </TabsContent>
        
        {selectedPage && (
          <TabsContent value="editor" className="mt-0">
            <CMSEditor 
              page={selectedPage}
              components={components}
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
    </StandardLayout>
  );
};

export default CMS;
