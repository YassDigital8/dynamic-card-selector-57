
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CMSPage, PageTemplate } from './types';
import { pageTemplates } from './pageTemplates';
import { useToast } from '@/hooks/use-toast';

export function usePageOperations(initialPages: CMSPage[] = []) {
  const [pages, setPages] = useState<CMSPage[]>(initialPages);
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
  }, []);
  
  // Save the page changes
  const savePage = useCallback((pageToSave: CMSPage) => {
    if (!pageToSave) return false;
    
    setPages(prevPages => 
      prevPages.map(page => 
        page.id === pageToSave.id ? { ...pageToSave, updatedAt: new Date().toISOString() } : page
      )
    );
    
    return true;
  }, []);

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
    
    return true;
  }, [pages]);
  
  return {
    pages,
    setPages,
    createNewPage,
    savePage,
    publishPage
  };
}
