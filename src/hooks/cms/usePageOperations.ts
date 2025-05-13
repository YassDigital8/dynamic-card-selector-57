
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { CMSPage, PageTemplate } from './types';
import { pageTemplates } from './mockData';

interface UsePageOperationsProps {
  pages: CMSPage[];
  setPages: React.Dispatch<React.SetStateAction<CMSPage[]>>;
  selectedPage: CMSPage | null;
  setSelectedPage: React.Dispatch<React.SetStateAction<CMSPage | null>>;
}

export function usePageOperations({
  pages,
  setPages,
  selectedPage,
  setSelectedPage
}: UsePageOperationsProps) {
  const { toast } = useToast();

  // Create a new page
  const createNewPage = useCallback((title: string, slug: string, template: PageTemplate = 'blank') => {
    const now = new Date().toISOString();
    const newPageId = `page-${uuidv4()}`;
    
    const newPage: CMSPage = {
      id: newPageId,
      title,
      slug,
      status: 'draft',
      components: [...pageTemplates[template].components],
      createdAt: now,
      updatedAt: now,
    };
    
    setPages(prevPages => [...prevPages, newPage]);
    return newPageId;
  }, [setPages]);

  // Select a page by ID
  const selectPage = useCallback((pageId: string) => {
    const page = pages.find(p => p.id === pageId);
    setSelectedPage(page || null);
    
    if (!page) {
      toast({
        variant: "destructive",
        title: "Page not found",
        description: `The requested page could not be found.`
      });
    }
  }, [pages, toast, setSelectedPage]);

  // Save the page changes
  const savePage = useCallback(() => {
    if (!selectedPage) return false;
    
    setPages(prevPages => 
      prevPages.map(page => 
        page.id === selectedPage.id ? { ...selectedPage, updatedAt: new Date().toISOString() } : page
      )
    );
    
    return true;
  }, [selectedPage, setPages]);

  // Publish the page
  const publishPage = useCallback((pageId: string) => {
    const pageToPublish = pages.find(p => p.id === pageId);
    if (!pageToPublish) return false;
    
    setPages(prevPages => 
      prevPages.map(page => 
        page.id === pageId 
          ? { 
              ...page, 
              status: 'published', 
              publishedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            } 
          : page
      )
    );
    
    if (selectedPage?.id === pageId) {
      setSelectedPage(prev => 
        prev ? { 
          ...prev, 
          status: 'published', 
          publishedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        } : null
      );
    }
    
    return true;
  }, [pages, selectedPage, setPages, setSelectedPage]);

  return {
    createNewPage,
    selectPage,
    savePage,
    publishPage
  };
}
