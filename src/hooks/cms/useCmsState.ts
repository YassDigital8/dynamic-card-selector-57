
import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { CMSPage, ComponentDefinition, UseCmsStateReturn, PageTemplate } from './types';
import { mockPages, availableComponents } from './mockData';
import { usePageOperations } from './usePageOperations';
import { useComponentOperations } from './useComponentOperations';

const useCmsState = (): UseCmsStateReturn => {
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPage, setSelectedPage] = useState<CMSPage | null>(null);
  const [components] = useState<ComponentDefinition[]>(availableComponents);
  
  const { pages, setPages, createNewPage, savePage, publishPage } = usePageOperations([]);
  
  const componentOps = useComponentOperations(selectedPage, setSelectedPage, components);
  
  const { toast } = useToast();

  // Load pages from mock data (would be replaced with API call)
  const loadPages = useCallback(() => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setPages(mockPages);
      setLoading(false);
    }, 800);
  }, [setPages]);

  // Load pages on initial render
  useEffect(() => {
    loadPages();
  }, [loadPages]);

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
  }, [pages, toast]);

  // Save the page changes
  const savePageWrapper = useCallback(() => {
    if (!selectedPage) return false;
    return savePage(selectedPage);
  }, [selectedPage, savePage]);

  // Create new page with template support
  const createNewPageWrapper = useCallback((title: string, slug: string, template: PageTemplate = 'blank') => {
    return createNewPage(title, slug, template);
  }, [createNewPage]);

  return {
    pages,
    selectedPage,
    components,
    loading,
    loadPages,
    createNewPage: createNewPageWrapper,
    selectPage,
    addComponentToPage: componentOps.addComponentToPage,
    updateComponentProps: componentOps.updateComponentProps,
    removeComponentFromPage: componentOps.removeComponentFromPage,
    moveComponent: componentOps.moveComponent,
    savePage: savePageWrapper,
    publishPage
  };
};

export default useCmsState;
export * from './types';
